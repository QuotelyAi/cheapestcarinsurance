'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  riskModifier: number;
  creditImpact?: number;
}

interface Question {
  id: string;
  category: 'driver' | 'vehicle' | 'policy';
  question: string;
  subtext?: string;
  options: QuestionOption[];
  multiSelect?: boolean;
  conditionalOn?: { questionId: string; answerIds: string[] };
  weight: number;
}

interface Driver {
  id: string;
  isPrimary: boolean;
  answers: Record<string, string | string[]>;
}

interface Vehicle {
  id: string;
  isPrimary: boolean;
  answers: Record<string, string | string[]>;
}

interface StateConfig {
  code: string;
  name: string;
  creditScoreAllowed: boolean;
  minCoverageLimits: { bodily: number; property: number; pip?: number };
  requiredCoverages: string[];
  avgBasePremium: number;
  territoryMultipliers: Record<string, number>;
}

interface CarrierScoring {
  id: string;
  name: string;
  creditWeight: number;
  drivingHistoryWeight: number;
  vehicleWeight: number;
  loyaltyDiscount: number;
  bundleDiscount: number;
  preferredRiskProfile: string[];
}

interface PerVehiclePremium {
  vehicleId: string;
  description: string;
  premium: number;
}

interface PerDriverImpact {
  driverId: string;
  description: string;
  impact: number;
}

interface PricingResult {
  monthlyPremium: number;
  annualPremium: number;
  breakdown: {
    basePremium: number;
    driverFactors: number;
    vehicleFactors: number;
    locationFactors: number;
    discounts: number;
    multiCarDiscount: number;
  };
  riskTier: 'preferred' | 'standard' | 'non-standard' | 'high-risk';
  carrierRecommendations: { carrier: string; premium: number; fit: number }[];
  sr22Required: boolean;
  highRiskDrivers: string[];
  perVehiclePremiums: PerVehiclePremium[];
  perDriverImpact: PerDriverImpact[];
}

// ============================================================================
// CONFIGURATION DATA
// ============================================================================

const STATE_CONFIGS: Record<string, StateConfig> = {
  OK: {
    code: 'OK',
    name: 'Oklahoma',
    creditScoreAllowed: true,
    minCoverageLimits: { bodily: 25000, property: 25000 },
    requiredCoverages: ['liability'],
    avgBasePremium: 165,
    territoryMultipliers: { tulsa: 1.12, 'oklahoma-city': 1.15, suburban: 0.95, rural: 0.85 },
  },
  TX: {
    code: 'TX',
    name: 'Texas',
    creditScoreAllowed: true,
    minCoverageLimits: { bodily: 30000, property: 25000, pip: 2500 },
    requiredCoverages: ['liability', 'pip'],
    avgBasePremium: 185,
    territoryMultipliers: { houston: 1.25, dallas: 1.22, austin: 1.15, suburban: 0.92, rural: 0.80 },
  },
  CA: {
    code: 'CA',
    name: 'California',
    creditScoreAllowed: false,
    minCoverageLimits: { bodily: 15000, property: 5000 },
    requiredCoverages: ['liability'],
    avgBasePremium: 210,
    territoryMultipliers: { 'los-angeles': 1.35, 'san-francisco': 1.30, suburban: 0.90, rural: 0.75 },
  },
  FL: {
    code: 'FL',
    name: 'Florida',
    creditScoreAllowed: true,
    minCoverageLimits: { bodily: 10000, property: 10000, pip: 10000 },
    requiredCoverages: ['liability', 'pip'],
    avgBasePremium: 220,
    territoryMultipliers: { miami: 1.45, orlando: 1.20, tampa: 1.22, suburban: 0.95, rural: 0.82 },
  },
  NY: {
    code: 'NY',
    name: 'New York',
    creditScoreAllowed: true,
    minCoverageLimits: { bodily: 25000, property: 10000, pip: 50000 },
    requiredCoverages: ['liability', 'pip', 'uninsured'],
    avgBasePremium: 195,
    territoryMultipliers: { 'new-york-city': 1.55, buffalo: 1.15, suburban: 0.88, rural: 0.78 },
  },
};

const CARRIER_SCORING: CarrierScoring[] = [
  { id: 'progressive', name: 'Progressive', creditWeight: 0.25, drivingHistoryWeight: 0.35, vehicleWeight: 0.25, loyaltyDiscount: 0.05, bundleDiscount: 0.12, preferredRiskProfile: ['young-drivers', 'non-standard'] },
  { id: 'geico', name: 'GEICO', creditWeight: 0.30, drivingHistoryWeight: 0.30, vehicleWeight: 0.25, loyaltyDiscount: 0.08, bundleDiscount: 0.15, preferredRiskProfile: ['good-credit', 'clean-record'] },
  { id: 'state-farm', name: 'State Farm', creditWeight: 0.20, drivingHistoryWeight: 0.35, vehicleWeight: 0.20, loyaltyDiscount: 0.12, bundleDiscount: 0.18, preferredRiskProfile: ['families', 'homeowners'] },
  { id: 'allstate', name: 'Allstate', creditWeight: 0.28, drivingHistoryWeight: 0.32, vehicleWeight: 0.22, loyaltyDiscount: 0.10, bundleDiscount: 0.20, preferredRiskProfile: ['mature-drivers', 'good-credit'] },
  { id: 'bristol-west', name: 'Bristol West', creditWeight: 0.15, drivingHistoryWeight: 0.40, vehicleWeight: 0.30, loyaltyDiscount: 0.03, bundleDiscount: 0.05, preferredRiskProfile: ['non-standard', 'sr22', 'high-risk'] },
  { id: 'safeco', name: 'Safeco', creditWeight: 0.22, drivingHistoryWeight: 0.33, vehicleWeight: 0.28, loyaltyDiscount: 0.07, bundleDiscount: 0.14, preferredRiskProfile: ['standard', 'homeowners'] },
];

// ============================================================================
// QUESTIONS
// ============================================================================

const DRIVER_QUESTIONS: Question[] = [
  {
    id: 'driver-relationship',
    category: 'driver',
    question: 'Who is this driver?',
    weight: 0.02,
    options: [
      { id: 'self', label: 'Me (Primary)', icon: '👤', riskModifier: 1.0 },
      { id: 'spouse', label: 'Spouse', icon: '💑', riskModifier: 0.95 },
      { id: 'child', label: 'Child', icon: '👨‍👧', riskModifier: 1.15 },
      { id: 'other', label: 'Other Household Member', icon: '🏠', riskModifier: 1.05 },
    ],
  },
  {
    id: 'driver-age',
    category: 'driver',
    question: 'How old is this driver?',
    subtext: 'Age significantly affects premium rates',
    weight: 0.15,
    options: [
      { id: '16-17', label: '16-17', icon: '🔰', riskModifier: 2.15, description: 'Teen driver surcharge' },
      { id: '18-20', label: '18-20', icon: '🎓', riskModifier: 1.75, description: 'Young driver rates' },
      { id: '21-25', label: '21-25', icon: '🚗', riskModifier: 1.35 },
      { id: '26-35', label: '26-35', icon: '💼', riskModifier: 1.0, description: 'Prime rates' },
      { id: '36-55', label: '36-55', icon: '🏠', riskModifier: 0.92, description: 'Experienced driver' },
      { id: '56-65', label: '56-65', icon: '⭐', riskModifier: 0.95 },
      { id: '65+', label: '65+', icon: '🌟', riskModifier: 1.08 },
    ],
  },
  {
    id: 'driver-gender',
    category: 'driver',
    question: "What is this driver's gender?",
    weight: 0.05,
    options: [
      { id: 'male', label: 'Male', icon: '👨', riskModifier: 1.05 },
      { id: 'female', label: 'Female', icon: '👩', riskModifier: 0.95 },
      { id: 'non-binary', label: 'Non-binary', icon: '🧑', riskModifier: 1.0 },
    ],
  },
  {
    id: 'driver-marital',
    category: 'driver',
    question: 'Marital status?',
    weight: 0.04,
    options: [
      { id: 'single', label: 'Single', icon: '🙋', riskModifier: 1.05 },
      { id: 'married', label: 'Married', icon: '💍', riskModifier: 0.92 },
      { id: 'divorced', label: 'Divorced', icon: '📋', riskModifier: 1.0 },
      { id: 'widowed', label: 'Widowed', icon: '🕊️', riskModifier: 0.95 },
    ],
  },
  {
    id: 'driver-credit',
    category: 'driver',
    question: 'Credit score range?',
    subtext: 'Most states use credit-based insurance scores',
    weight: 0.20,
    options: [
      { id: 'excellent', label: 'Excellent (750+)', icon: '💎', riskModifier: 0.75, description: 'Best rates' },
      { id: 'good', label: 'Good (700-749)', icon: '✨', riskModifier: 0.90 },
      { id: 'fair', label: 'Fair (650-699)', icon: '📊', riskModifier: 1.10 },
      { id: 'poor', label: 'Poor (550-649)', icon: '📉', riskModifier: 1.35 },
      { id: 'very-poor', label: 'Very Poor (<550)', icon: '⚠️', riskModifier: 1.65, description: 'Non-standard' },
      { id: 'no-credit', label: 'No Credit History', icon: '🆕', riskModifier: 1.25 },
    ],
  },
  {
    id: 'driver-years-licensed',
    category: 'driver',
    question: 'Years licensed?',
    weight: 0.08,
    options: [
      { id: 'less-than-1', label: 'Less than 1 year', icon: '🔰', riskModifier: 1.55 },
      { id: '1-3', label: '1-3 years', icon: '📆', riskModifier: 1.25 },
      { id: '3-5', label: '3-5 years', icon: '📅', riskModifier: 1.08 },
      { id: '5-10', label: '5-10 years', icon: '🗓️', riskModifier: 0.98 },
      { id: '10+', label: '10+ years', icon: '🏆', riskModifier: 0.90 },
    ],
  },
  {
    id: 'driver-accidents',
    category: 'driver',
    question: 'At-fault accidents in last 5 years?',
    weight: 0.18,
    options: [
      { id: 'none', label: 'None', icon: '✅', riskModifier: 0.90, description: 'Clean record' },
      { id: 'one-minor', label: '1 Minor', icon: '⚠️', riskModifier: 1.15 },
      { id: 'one-major', label: '1 Major', icon: '🚨', riskModifier: 1.45 },
      { id: 'two', label: '2 Accidents', icon: '❗', riskModifier: 1.75 },
      { id: 'three-plus', label: '3+ Accidents', icon: '🚫', riskModifier: 2.25, description: 'High-risk' },
    ],
  },
  {
    id: 'driver-violations',
    category: 'driver',
    question: 'Moving violations in last 3 years?',
    weight: 0.15,
    options: [
      { id: 'none', label: 'None', icon: '✅', riskModifier: 0.92 },
      { id: 'one-minor', label: '1 Minor', icon: '⚡', riskModifier: 1.08 },
      { id: 'one-major', label: '1 Major (15+ over)', icon: '🏎️', riskModifier: 1.25 },
      { id: 'two-minor', label: '2 Minor', icon: '⚠️', riskModifier: 1.20 },
      { id: 'multiple', label: 'Multiple', icon: '❗', riskModifier: 1.55 },
    ],
  },
  {
    id: 'driver-dui',
    category: 'driver',
    question: 'Any DUI/DWI in last 10 years?',
    weight: 0.20,
    options: [
      { id: 'none', label: 'No', icon: '✅', riskModifier: 1.0 },
      { id: 'one-old', label: 'Yes, 5+ years ago', icon: '⚠️', riskModifier: 1.65, description: 'May need SR-22' },
      { id: 'one-recent', label: 'Yes, within 5 years', icon: '🚨', riskModifier: 2.25, description: 'SR-22 required' },
      { id: 'multiple', label: 'Multiple', icon: '🚫', riskModifier: 3.0, description: 'High-risk specialist' },
    ],
  },
  {
    id: 'driver-good-student',
    category: 'driver',
    question: 'Eligible for good student discount?',
    subtext: 'B average or better for drivers under 25',
    weight: 0.04,
    conditionalOn: { questionId: 'driver-age', answerIds: ['16-17', '18-20', '21-25'] },
    options: [
      { id: 'yes', label: 'Yes (B average+)', icon: '📚', riskModifier: 0.88, description: 'Up to 12% off' },
      { id: 'no', label: 'No', icon: '❌', riskModifier: 1.0 },
      { id: 'not-student', label: 'Not a student', icon: '🏢', riskModifier: 1.0 },
    ],
  },
  {
    id: 'driver-children-household',
    category: 'driver',
    question: 'Any licensed children (16+) in household?',
    subtext: 'IMPORTANT: All licensed drivers must be listed or they will NOT be covered',
    weight: 0.05,
    options: [
      { id: 'none', label: 'No licensed children', icon: '✅', riskModifier: 1.0 },
      { id: 'one-listed', label: 'Yes, 1 child (already listed)', icon: '👨‍👧', riskModifier: 1.0 },
      { id: 'two-plus-listed', label: 'Yes, 2+ (already listed)', icon: '👨‍👧‍👦', riskModifier: 1.0 },
      { id: 'yes-unlisted', label: 'Yes, but NOT listed above', icon: '⚠️', riskModifier: 1.25, description: 'Must add to policy!' },
      { id: 'excluded', label: 'Yes, will exclude from policy', icon: '🚫', riskModifier: 1.0, description: 'They cannot drive your vehicles' },
    ],
  },
  {
    id: 'driver-rideshare',
    category: 'driver',
    question: 'Do you drive for Uber, Lyft, or delivery apps?',
    subtext: 'Personal auto policies typically DO NOT cover rideshare/delivery',
    weight: 0.06,
    options: [
      { id: 'no', label: 'No', icon: '✅', riskModifier: 1.0 },
      { id: 'uber-lyft', label: 'Yes - Uber/Lyft', icon: '🚖', riskModifier: 1.35, description: 'Need rideshare endorsement' },
      { id: 'delivery', label: 'Yes - DoorDash/Instacart/etc', icon: '🛵', riskModifier: 1.25, description: 'Need delivery coverage' },
      { id: 'both', label: 'Yes - Both rideshare & delivery', icon: '📱', riskModifier: 1.45, description: 'Commercial coverage recommended' },
    ],
  },
];

const VEHICLE_QUESTIONS: Question[] = [
  {
    id: 'vehicle-year',
    category: 'vehicle',
    question: 'What year is this vehicle?',
    weight: 0.08,
    options: [
      { id: '2024-2025', label: '2024-2025', icon: '✨', riskModifier: 1.18, description: 'New vehicle' },
      { id: '2021-2023', label: '2021-2023', icon: '🚗', riskModifier: 1.08 },
      { id: '2018-2020', label: '2018-2020', icon: '🔧', riskModifier: 1.0 },
      { id: '2014-2017', label: '2014-2017', icon: '🔩', riskModifier: 0.90 },
      { id: '2010-2013', label: '2010-2013', icon: '📅', riskModifier: 0.82 },
      { id: 'pre-2010', label: 'Before 2010', icon: '🏛️', riskModifier: 0.75 },
    ],
  },
  {
    id: 'vehicle-type',
    category: 'vehicle',
    question: 'What type of vehicle?',
    weight: 0.10,
    options: [
      { id: 'sedan', label: 'Sedan', icon: '🚗', riskModifier: 0.95 },
      { id: 'suv', label: 'SUV / Crossover', icon: '🚙', riskModifier: 1.08 },
      { id: 'truck', label: 'Pickup Truck', icon: '🛻', riskModifier: 1.05 },
      { id: 'minivan', label: 'Minivan', icon: '🚐', riskModifier: 0.92 },
      { id: 'sports', label: 'Sports Car', icon: '🏎️', riskModifier: 1.45 },
      { id: 'luxury', label: 'Luxury Vehicle', icon: '🚘', riskModifier: 1.35 },
      { id: 'electric', label: 'Electric Vehicle', icon: '⚡', riskModifier: 1.12 },
      { id: 'hybrid', label: 'Hybrid', icon: '🔋', riskModifier: 1.02 },
    ],
  },
  {
    id: 'vehicle-make',
    category: 'vehicle',
    question: 'Vehicle make?',
    weight: 0.06,
    options: [
      { id: 'toyota', label: 'Toyota', icon: '🚗', riskModifier: 0.92, description: 'Lower theft rates' },
      { id: 'honda', label: 'Honda', icon: '🚗', riskModifier: 0.94 },
      { id: 'ford', label: 'Ford', icon: '🛻', riskModifier: 1.0 },
      { id: 'chevrolet', label: 'Chevrolet', icon: '🛻', riskModifier: 1.02 },
      { id: 'nissan', label: 'Nissan', icon: '🚗', riskModifier: 0.98 },
      { id: 'hyundai-kia', label: 'Hyundai / Kia', icon: '🚗', riskModifier: 1.08, description: 'Higher theft risk' },
      { id: 'bmw-mercedes', label: 'BMW / Mercedes', icon: '🚘', riskModifier: 1.25 },
      { id: 'other', label: 'Other', icon: '🚙', riskModifier: 1.0 },
    ],
  },
  {
    id: 'vehicle-value',
    category: 'vehicle',
    question: 'Estimated vehicle value?',
    weight: 0.06,
    options: [
      { id: 'under-10k', label: 'Under $10,000', icon: '💰', riskModifier: 0.85 },
      { id: '10k-20k', label: '$10,000 - $20,000', icon: '💵', riskModifier: 0.95 },
      { id: '20k-35k', label: '$20,000 - $35,000', icon: '💵', riskModifier: 1.05 },
      { id: '35k-50k', label: '$35,000 - $50,000', icon: '💵', riskModifier: 1.18 },
      { id: 'over-50k', label: 'Over $50,000', icon: '💎', riskModifier: 1.35 },
    ],
  },
  {
    id: 'vehicle-use',
    category: 'vehicle',
    question: 'Primary use?',
    weight: 0.04,
    options: [
      { id: 'pleasure', label: 'Pleasure / Weekend', icon: '🎉', riskModifier: 0.88 },
      { id: 'commute-short', label: 'Commute (Under 15 mi)', icon: '🏢', riskModifier: 0.98 },
      { id: 'commute-long', label: 'Commute (15+ mi)', icon: '🌆', riskModifier: 1.08 },
      { id: 'business', label: 'Business Use', icon: '💼', riskModifier: 1.15 },
      { id: 'rideshare', label: 'Rideshare/Delivery', icon: '📱', riskModifier: 1.45 },
    ],
  },
  {
    id: 'vehicle-mileage',
    category: 'vehicle',
    question: 'Annual mileage?',
    weight: 0.06,
    options: [
      { id: 'under-5k', label: 'Under 5,000', icon: '🏠', riskModifier: 0.85, description: 'Low mileage discount' },
      { id: '5k-10k', label: '5,000 - 10,000', icon: '🚶', riskModifier: 0.92 },
      { id: '10k-15k', label: '10,000 - 15,000', icon: '🚗', riskModifier: 1.0, description: 'Average' },
      { id: '15k-20k', label: '15,000 - 20,000', icon: '🛣️', riskModifier: 1.08 },
      { id: 'over-20k', label: 'Over 20,000', icon: '✈️', riskModifier: 1.18 },
    ],
  },
  {
    id: 'vehicle-coverage',
    category: 'vehicle',
    question: 'What coverage type do you need?',
    weight: 0.10,
    options: [
      { id: 'liability-only', label: 'Liability Only', icon: '📋', riskModifier: 0.50, description: 'State minimum - no comp/collision' },
      { id: 'liability-uninsured', label: 'Liability + Uninsured', icon: '🛡️', riskModifier: 0.65, description: 'Good for older vehicles' },
      { id: 'full-coverage', label: 'Full Coverage', icon: '⭐', riskModifier: 1.0, description: 'Comp + Collision included' },
    ],
  },
  {
    id: 'vehicle-comp-deductible',
    category: 'vehicle',
    question: 'Comprehensive deductible?',
    subtext: 'Covers theft, weather, animals, vandalism',
    weight: 0.06,
    conditionalOn: { questionId: 'vehicle-coverage', answerIds: ['full-coverage'] },
    options: [
      { id: '100', label: '$100 Deductible', icon: '💎', riskModifier: 1.25, description: 'Lowest out-of-pocket' },
      { id: '250', label: '$250 Deductible', icon: '✨', riskModifier: 1.15 },
      { id: '500', label: '$500 Deductible', icon: '⭐', riskModifier: 1.0, description: 'Most common' },
      { id: '1000', label: '$1,000 Deductible', icon: '💰', riskModifier: 0.88 },
      { id: '1500', label: '$1,500 Deductible', icon: '💵', riskModifier: 0.82 },
      { id: '2000', label: '$2,000 Deductible', icon: '📉', riskModifier: 0.78, description: 'Lowest premium' },
      { id: '2500', label: '$2,500 Deductible', icon: '⚠️', riskModifier: 0.72 },
    ],
  },
  {
    id: 'vehicle-collision-deductible',
    category: 'vehicle',
    question: 'Collision deductible?',
    subtext: 'Covers damage from accidents',
    weight: 0.06,
    conditionalOn: { questionId: 'vehicle-coverage', answerIds: ['full-coverage'] },
    options: [
      { id: '100', label: '$100 Deductible', icon: '💎', riskModifier: 1.28, description: 'Lowest out-of-pocket' },
      { id: '250', label: '$250 Deductible', icon: '✨', riskModifier: 1.18 },
      { id: '500', label: '$500 Deductible', icon: '⭐', riskModifier: 1.0, description: 'Most common' },
      { id: '1000', label: '$1,000 Deductible', icon: '💰', riskModifier: 0.85 },
      { id: '1500', label: '$1,500 Deductible', icon: '💵', riskModifier: 0.78 },
      { id: '2000', label: '$2,000 Deductible', icon: '📉', riskModifier: 0.72, description: 'Lowest premium' },
      { id: '2500', label: '$2,500 Deductible', icon: '⚠️', riskModifier: 0.68 },
    ],
  },
  {
    id: 'vehicle-safety',
    category: 'vehicle',
    question: 'Safety features? (Select all)',
    subtext: 'Advanced safety features reduce rates',
    weight: 0.05,
    multiSelect: true,
    options: [
      { id: 'basic', label: 'Basic Only', icon: '➖', riskModifier: 1.0 },
      { id: 'backup-camera', label: 'Backup Camera', icon: '📷', riskModifier: 0.98 },
      { id: 'blind-spot', label: 'Blind Spot Monitor', icon: '👁️', riskModifier: 0.96 },
      { id: 'auto-braking', label: 'Auto Emergency Braking', icon: '🛡️', riskModifier: 0.92 },
      { id: 'lane-assist', label: 'Lane Departure Warning', icon: '🛣️', riskModifier: 0.95 },
    ],
  },
  {
    id: 'vehicle-anti-theft',
    category: 'vehicle',
    question: 'Anti-theft devices?',
    weight: 0.03,
    options: [
      { id: 'none', label: 'None', icon: '❌', riskModifier: 1.0 },
      { id: 'alarm', label: 'Car Alarm', icon: '🔔', riskModifier: 0.97 },
      { id: 'gps', label: 'GPS Tracking', icon: '📍', riskModifier: 0.94 },
      { id: 'comprehensive', label: 'Multiple Systems', icon: '🛡️', riskModifier: 0.90 },
    ],
  },
];

const POLICY_QUESTIONS: Question[] = [
  {
    id: 'state',
    category: 'policy',
    question: 'Which state?',
    weight: 0.12,
    options: [
      { id: 'OK', label: 'Oklahoma', icon: '🌾', riskModifier: 0.95 },
      { id: 'TX', label: 'Texas', icon: '⛽', riskModifier: 1.05 },
      { id: 'CA', label: 'California', icon: '🌴', riskModifier: 1.20 },
      { id: 'FL', label: 'Florida', icon: '🌊', riskModifier: 1.25 },
      { id: 'NY', label: 'New York', icon: '🗽', riskModifier: 1.15 },
    ],
  },
  {
    id: 'territory',
    category: 'policy',
    question: 'Area type?',
    weight: 0.08,
    options: [
      { id: 'major-city', label: 'Major City / Downtown', icon: '🏙️', riskModifier: 1.30 },
      { id: 'urban', label: 'Urban Area', icon: '🌆', riskModifier: 1.15 },
      { id: 'suburban', label: 'Suburban', icon: '🏘️', riskModifier: 0.95 },
      { id: 'small-town', label: 'Small Town', icon: '🏡', riskModifier: 0.88 },
      { id: 'rural', label: 'Rural', icon: '🌾', riskModifier: 0.80 },
    ],
  },
  {
    id: 'garage',
    category: 'policy',
    question: 'Where do you park overnight?',
    weight: 0.03,
    options: [
      { id: 'garage', label: 'Private Garage', icon: '🏠', riskModifier: 0.92 },
      { id: 'carport', label: 'Carport', icon: '🚗', riskModifier: 0.96 },
      { id: 'driveway', label: 'Driveway', icon: '🅿️', riskModifier: 1.0 },
      { id: 'street', label: 'Street Parking', icon: '🛣️', riskModifier: 1.10 },
    ],
  },
  {
    id: 'prior-insurance',
    category: 'policy',
    question: 'How long continuously insured?',
    weight: 0.08,
    options: [
      { id: 'none', label: 'Currently Uninsured', icon: '❌', riskModifier: 1.45, description: 'Lapse surcharge applies' },
      { id: 'less-6mo', label: 'Less than 6 months', icon: '📅', riskModifier: 1.25 },
      { id: '6mo-1yr', label: '6 months - 1 year', icon: '📆', riskModifier: 1.10 },
      { id: '1-3yr', label: '1-3 years', icon: '🗓️', riskModifier: 1.0 },
      { id: '3-5yr', label: '3-5 years', icon: '⭐', riskModifier: 0.92 },
      { id: '5yr+', label: '5+ years', icon: '🏆', riskModifier: 0.85, description: 'Best loyalty discount' },
    ],
  },
  {
    id: 'prior-carrier',
    category: 'policy',
    question: 'Current or most recent insurance company?',
    weight: 0.04,
    options: [
      { id: 'progressive', label: 'Progressive', icon: '🔵', riskModifier: 0.98 },
      { id: 'geico', label: 'GEICO', icon: '🟢', riskModifier: 0.98 },
      { id: 'state-farm', label: 'State Farm', icon: '🔴', riskModifier: 0.96, description: 'Preferred carrier history' },
      { id: 'allstate', label: 'Allstate', icon: '🟠', riskModifier: 0.97 },
      { id: 'usaa', label: 'USAA', icon: '🔷', riskModifier: 0.95, description: 'Excellent carrier history' },
      { id: 'farmers', label: 'Farmers', icon: '🟡', riskModifier: 0.97 },
      { id: 'non-standard', label: 'Bristol West/Dairyland/etc', icon: '⚠️', riskModifier: 1.08, description: 'Non-standard carrier' },
      { id: 'other', label: 'Other/Unknown', icon: '❓', riskModifier: 1.0 },
      { id: 'none', label: 'No prior insurance', icon: '🚫', riskModifier: 1.15 },
    ],
  },
  {
    id: 'prior-limits',
    category: 'policy',
    question: 'Your current/prior liability limits?',
    subtext: 'Higher prior limits = lower rates with most carriers',
    weight: 0.06,
    options: [
      { id: 'state-min', label: 'State Minimum', icon: '📋', riskModifier: 1.15, description: '25/50/25 or similar' },
      { id: '50-100', label: '50/100/50', icon: '🛡️', riskModifier: 1.05 },
      { id: '100-300', label: '100/300/100', icon: '⭐', riskModifier: 0.95, description: 'Most common' },
      { id: '250-500', label: '250/500/250', icon: '✨', riskModifier: 0.90 },
      { id: '500-csl', label: '$500K+ or CSL', icon: '💎', riskModifier: 0.85, description: 'Premium coverage' },
      { id: 'unknown', label: 'Not sure', icon: '❓', riskModifier: 1.05 },
      { id: 'none', label: 'No prior insurance', icon: '🚫', riskModifier: 1.20 },
    ],
  },
  {
    id: 'liability-limits',
    category: 'policy',
    question: 'What liability limits do you want?',
    subtext: 'Protects you if you cause an accident (Bodily Injury/Property Damage)',
    weight: 0.10,
    options: [
      { id: '25-50-25', label: '25/50/25', icon: '📋', riskModifier: 0.75, description: 'OK minimum - basic protection' },
      { id: '30-60-25', label: '30/60/25', icon: '📄', riskModifier: 0.78, description: 'TX minimum' },
      { id: '50-100-50', label: '50/100/50', icon: '🛡️', riskModifier: 0.88, description: 'Good protection' },
      { id: '100-300-100', label: '100/300/100', icon: '⭐', riskModifier: 1.0, description: 'Recommended - Most popular' },
      { id: '250-500-100', label: '250/500/100', icon: '✨', riskModifier: 1.12, description: 'Better protection' },
      { id: '250-500-250', label: '250/500/250', icon: '💎', riskModifier: 1.18, description: 'Strong protection' },
      { id: '500-500-500', label: '500/500/500', icon: '🏆', riskModifier: 1.28, description: 'Maximum protection' },
      { id: '100-csl', label: '$100K CSL', icon: '📊', riskModifier: 0.92, description: 'Combined single limit' },
      { id: '300-csl', label: '$300K CSL', icon: '📈', riskModifier: 1.05 },
      { id: '500-csl', label: '$500K CSL', icon: '💰', riskModifier: 1.22 },
    ],
  },
  {
    id: 'uninsured-motorist',
    category: 'policy',
    question: 'Uninsured/Underinsured Motorist coverage?',
    subtext: 'Protects YOU if hit by someone without adequate insurance',
    weight: 0.05,
    options: [
      { id: 'reject', label: 'Reject/Decline', icon: '❌', riskModifier: 0.85, description: 'Not recommended' },
      { id: 'state-min', label: 'State Minimum', icon: '📋', riskModifier: 0.90 },
      { id: 'match-liability', label: 'Match Liability Limits', icon: '⭐', riskModifier: 1.0, description: 'Recommended' },
      { id: 'stacked', label: 'Stacked Coverage', icon: '💎', riskModifier: 1.15, description: 'Maximum protection' },
    ],
  },
  {
    id: 'discounts',
    category: 'policy',
    question: 'Available discounts? (Select all)',
    weight: 0.08,
    multiSelect: true,
    options: [
      { id: 'none', label: 'None', icon: '➖', riskModifier: 1.0 },
      { id: 'homeowner', label: 'Homeowner', icon: '🏠', riskModifier: 0.92 },
      { id: 'bundle', label: 'Bundle Home/Renters', icon: '📦', riskModifier: 0.85 },
      { id: 'pay-in-full', label: 'Pay in Full', icon: '💳', riskModifier: 0.95 },
      { id: 'paperless', label: 'Paperless / EFT', icon: '📱', riskModifier: 0.97 },
      { id: 'military', label: 'Military/Veteran', icon: '🎖️', riskModifier: 0.88 },
      { id: 'defensive-driving', label: 'Defensive Driving', icon: '🎓', riskModifier: 0.92 },
    ],
  },
];

// ============================================================================
// PRICING ENGINE
// ============================================================================

class InsurancePricingEngine {
  private drivers: Driver[] = [];
  private vehicles: Vehicle[] = [];
  private policyAnswers: Record<string, string | string[]> = {};

  setDrivers(drivers: Driver[]) { this.drivers = drivers; }
  setVehicles(vehicles: Vehicle[]) { this.vehicles = vehicles; }
  setPolicyAnswer(key: string, value: string | string[]) { this.policyAnswers[key] = value; }

  private getModifier(answers: Record<string, string | string[]>, questionId: string, questions: Question[]): number {
    const answer = answers[questionId];
    const question = questions.find(q => q.id === questionId);
    if (!question || !answer) return 1.0;
    if (Array.isArray(answer)) {
      return answer.reduce((acc, a) => {
        const opt = question.options.find(o => o.id === a);
        return acc * (opt?.riskModifier || 1.0);
      }, 1.0);
    }
    const option = question.options.find(o => o.id === answer);
    return option?.riskModifier || 1.0;
  }

  private calculateDriverScore(driver: Driver): number {
    let score = 1.0;
    DRIVER_QUESTIONS.forEach(q => {
      if (driver.answers[q.id]) score *= this.getModifier(driver.answers, q.id, DRIVER_QUESTIONS);
    });
    return score;
  }

  private calculateVehicleScore(vehicle: Vehicle): number {
    let score = 1.0;
    VEHICLE_QUESTIONS.forEach(q => {
      if (vehicle.answers[q.id]) score *= this.getModifier(vehicle.answers, q.id, VEHICLE_QUESTIONS);
    });
    return score;
  }

  private isHighRiskDriver(driver: Driver): boolean {
    const dui = driver.answers['driver-dui'];
    const accidents = driver.answers['driver-accidents'];
    if (dui && dui !== 'none') return true;
    if (accidents === 'three-plus' || accidents === 'two') return true;
    return false;
  }

  private needsSr22(driver: Driver): boolean {
    const dui = driver.answers['driver-dui'];
    return dui === 'one-recent' || dui === 'multiple';
  }

  calculate(): PricingResult {
    const state = this.policyAnswers['state'] as string || 'OK';
    const stateConfig = STATE_CONFIGS[state] || STATE_CONFIGS['OK'];
    const basePremium = stateConfig.avgBasePremium;

    // Calculate aggregate driver score
    let totalDriverScore = 0;
    const perDriverImpact: PerDriverImpact[] = [];
    const highRiskDrivers: string[] = [];

    this.drivers.forEach(driver => {
      const score = this.calculateDriverScore(driver);
      const impact = Math.round((score - 1) * 100);
      const relationship = driver.answers['driver-relationship'] as string;
      perDriverImpact.push({
        driverId: driver.id,
        description: relationship === 'self' ? 'Primary Driver' : relationship || 'Driver',
        impact,
      });
      totalDriverScore += score;
      if (this.isHighRiskDriver(driver)) highRiskDrivers.push(driver.id);
    });
    const avgDriverScore = this.drivers.length > 0 ? totalDriverScore / this.drivers.length : 1.0;

    // Calculate per-vehicle premiums
    const perVehiclePremiums: PerVehiclePremium[] = [];
    let totalVehicleScore = 0;

    this.vehicles.forEach(vehicle => {
      const score = this.calculateVehicleScore(vehicle);
      const vehicleType = vehicle.answers['vehicle-type'] as string;
      const vehicleMake = vehicle.answers['vehicle-make'] as string;
      const vehiclePremium = Math.round(basePremium * score * avgDriverScore);
      perVehiclePremiums.push({
        vehicleId: vehicle.id,
        description: `${vehicleMake || ''} ${vehicleType || 'Vehicle'}`.trim(),
        premium: vehiclePremium,
      });
      totalVehicleScore += score;
    });
    const avgVehicleScore = this.vehicles.length > 0 ? totalVehicleScore / this.vehicles.length : 1.0;

    // Location and policy factors
    let locationScore = 1.0;
    let discountScore = 1.0;
    POLICY_QUESTIONS.forEach(q => {
      if (this.policyAnswers[q.id]) {
        if (q.id === 'discounts') {
          discountScore *= this.getModifier(this.policyAnswers, q.id, POLICY_QUESTIONS);
        } else {
          locationScore *= this.getModifier(this.policyAnswers, q.id, POLICY_QUESTIONS);
        }
      }
    });

    // Multi-car discount
    const multiCarDiscount = this.vehicles.length > 1 ? 0.08 * Math.min(this.vehicles.length - 1, 3) : 0;

    // Calculate total premium
    const rawPremium = basePremium * avgDriverScore * avgVehicleScore * locationScore * discountScore * (1 - multiCarDiscount);
    const monthlyPremium = Math.round(Math.max(rawPremium, 50));

    // Determine risk tier
    let riskTier: PricingResult['riskTier'] = 'standard';
    if (highRiskDrivers.length > 0) riskTier = 'high-risk';
    else if (avgDriverScore > 1.4) riskTier = 'non-standard';
    else if (avgDriverScore < 0.95 && avgVehicleScore < 1.0) riskTier = 'preferred';

    // SR-22 check
    const sr22Required = this.drivers.some(d => this.needsSr22(d));

    // Carrier recommendations
    const carrierRecommendations = CARRIER_SCORING.map(carrier => {
      let fit = 50;
      let premiumMod = 1.0;
      if (carrier.preferredRiskProfile.includes(riskTier)) fit += 25;
      if (riskTier === 'high-risk' && carrier.preferredRiskProfile.includes('sr22')) fit += 20;
      if (riskTier === 'preferred' && carrier.preferredRiskProfile.includes('good-credit')) fit += 15;
      premiumMod = 0.85 + Math.random() * 0.3; // Simulate carrier variation
      return {
        carrier: carrier.name,
        premium: Math.round(monthlyPremium * premiumMod),
        fit: Math.min(fit + Math.floor(Math.random() * 15), 98),
      };
    }).sort((a, b) => b.fit - a.fit).slice(0, 4);

    return {
      monthlyPremium,
      annualPremium: monthlyPremium * 12,
      breakdown: {
        basePremium: Math.round(basePremium),
        driverFactors: Math.round((avgDriverScore - 1) * 100),
        vehicleFactors: Math.round((avgVehicleScore - 1) * 100),
        locationFactors: Math.round((locationScore - 1) * 100),
        discounts: Math.round((1 - discountScore) * 100),
        multiCarDiscount: Math.round(multiCarDiscount * 100),
      },
      riskTier,
      carrierRecommendations,
      sr22Required,
      highRiskDrivers,
      perVehiclePremiums,
      perDriverImpact,
    };
  }
}

// ============================================================================
// UI COMPONENTS
// ============================================================================

const categoryColors = {
  driver: { bg: 'from-indigo-900/40 to-indigo-800/20', accent: '#6366f1', text: 'text-indigo-300' },
  vehicle: { bg: 'from-emerald-900/40 to-emerald-800/20', accent: '#10b981', text: 'text-emerald-300' },
  policy: { bg: 'from-amber-900/40 to-amber-800/20', accent: '#f59e0b', text: 'text-amber-300' },
};

interface ProgressBarProps {
  current: number;
  total: number;
  phase: string;
  phaseProgress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, phase, phaseProgress }) => {
  const progress = (current / total) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white/70">{phase}</span>
        <span className="text-sm text-white/40">{Math.round(progress)}% complete</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between mt-3">
        {['Drivers', 'Vehicles', 'Policy', 'Results'].map((label, i) => (
          <div key={label} className={`text-xs ${i < phaseProgress ? 'text-white/70' : 'text-white/30'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 mx-auto ${i < phaseProgress ? 'bg-indigo-500' : i === phaseProgress ? 'bg-indigo-500/50 ring-2 ring-indigo-400' : 'bg-white/10'}`}>
              {i < phaseProgress ? '✓' : i + 1}
            </div>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

interface OptionButtonProps {
  option: QuestionOption;
  selected: boolean;
  onSelect: () => void;
  category: Question['category'];
}

const OptionButton: React.FC<OptionButtonProps> = ({ option, selected, onSelect, category }) => {
  const colors = categoryColors[category];
  return (
    <button onClick={onSelect} className={`relative group w-full p-4 rounded-xl text-left transition-all duration-300 border-2 overflow-hidden ${selected ? 'border-white/40 bg-white/15 shadow-lg scale-[1.02]' : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'}`} style={{ boxShadow: selected ? `0 0 30px ${colors.accent}30` : undefined }}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{option.icon}</span>
        <div className="flex-1 min-w-0">
          <div className={`font-semibold ${selected ? 'text-white' : 'text-white/95'}`}>{option.label}</div>
          {option.description && <div className="text-sm text-white/50 mt-0.5">{option.description}</div>}
        </div>
        {selected && <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent }}><svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>}
      </div>
    </button>
  );
};

interface EntityTabsProps {
  entities: { id: string; label: string; isPrimary: boolean }[];
  activeId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  entityType: 'driver' | 'vehicle';
  maxEntities: number;
}

const EntityTabs: React.FC<EntityTabsProps> = ({ entities, activeId, onSelect, onAdd, onRemove, entityType, maxEntities }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {entities.map((entity, i) => (
        <button key={entity.id} onClick={() => onSelect(entity.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeId === entity.id ? 'bg-white/20 text-white border border-white/30' : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'}`}>
          {entityType === 'driver' ? '👤' : '🚗'} {entity.label}
          {!entity.isPrimary && entities.length > 1 && (
            <span onClick={(e) => { e.stopPropagation(); onRemove(entity.id); }} className="ml-1 text-white/40 hover:text-red-400 cursor-pointer">×</span>
          )}
        </button>
      ))}
      {entities.length < maxEntities && (
        <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-white/40 border border-dashed border-white/20 hover:bg-white/10 hover:text-white/60 transition-all">
          + Add {entityType === 'driver' ? 'Driver' : 'Vehicle'}
        </button>
      )}
    </div>
  );
};

interface ResultsDisplayProps {
  result: PricingResult;
  drivers: Driver[];
  vehicles: Vehicle[];
  stateConfig: StateConfig | null;
  onRestart: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, drivers, vehicles, stateConfig, onRestart }) => {
  const riskTierColors = {
    preferred: { bg: 'from-emerald-500/20 to-emerald-600/10', text: 'text-emerald-400', label: 'Preferred' },
    standard: { bg: 'from-blue-500/20 to-blue-600/10', text: 'text-blue-400', label: 'Standard' },
    'non-standard': { bg: 'from-amber-500/20 to-amber-600/10', text: 'text-amber-400', label: 'Non-Standard' },
    'high-risk': { bg: 'from-red-500/20 to-red-600/10', text: 'text-red-400', label: 'High-Risk' },
  };
  const tierInfo = riskTierColors[result.riskTier];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-2">Your Estimated Premium</h2>
        <p className="text-white/50">Based on {drivers.length} driver{drivers.length > 1 ? 's' : ''} and {vehicles.length} vehicle{vehicles.length > 1 ? 's' : ''} in {stateConfig?.name || 'your state'}</p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="text-white/50 text-sm uppercase tracking-wider mb-1">Monthly Premium</div>
              <div className="text-5xl md:text-7xl font-light text-white">${result.monthlyPremium}<span className="text-2xl text-white/40">/mo</span></div>
              <div className="text-white/40 mt-2">${result.annualPremium.toLocaleString()} annually</div>
            </div>
            <div className="text-right">
              <div className={`px-6 py-3 rounded-full bg-gradient-to-r ${tierInfo.bg} border border-white/10 mb-3`}>
                <span className={`text-lg font-medium ${tierInfo.text}`}>{tierInfo.label} Risk</span>
              </div>
              <div className="text-white/50 text-sm">{drivers.length} Driver{drivers.length > 1 ? 's' : ''} · {vehicles.length} Vehicle{vehicles.length > 1 ? 's' : ''}</div>
            </div>
          </div>
          {result.sr22Required && (
            <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <div><div className="font-medium text-amber-400">SR-22 Required</div><div className="text-sm text-amber-400/70">One or more drivers require an SR-22 filing</div></div>
            </div>
          )}
        </div>
      </div>

      {/* Important Coverage Warnings */}
      {drivers.some(d => d.answers['driver-rideshare'] && d.answers['driver-rideshare'] !== 'no') && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚨</span>
            <div>
              <div className="font-medium text-red-400">RIDESHARE/DELIVERY WARNING</div>
              <div className="text-sm text-red-400/80 mt-1">
                <strong>Personal auto insurance does NOT cover Uber, Lyft, DoorDash, Instacart, or other app-based driving.</strong>
                {' '}If you drive for any of these services, you MUST add a rideshare endorsement or commercial coverage.
                Without proper coverage, you will have NO insurance protection while logged into the app!
              </div>
            </div>
          </div>
        </div>
      )}

      {drivers.some(d => d.answers['driver-children-household'] === 'yes-unlisted') && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <div className="font-medium text-red-400">UNLISTED DRIVER WARNING</div>
              <div className="text-sm text-red-400/80 mt-1">
                <strong>You indicated there are licensed children in your household who are NOT listed on this policy.</strong>
                {' '}Any licensed driver in your household who is NOT listed on your policy will NOT be covered if they drive your vehicles.
                Claims may be DENIED if an unlisted household member is involved in an accident!
              </div>
            </div>
          </div>
        </div>
      )}

      {drivers.some(d => d.answers['driver-children-household'] === 'excluded') && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📝</span>
            <div>
              <div className="font-medium text-amber-400">EXCLUDED DRIVER REMINDER</div>
              <div className="text-sm text-amber-400/80 mt-1">
                You&apos;ve indicated you will exclude certain household members from coverage.
                <strong> Excluded drivers cannot legally operate your insured vehicles under any circumstances.</strong>
                {' '}If an excluded driver causes an accident in your vehicle, the claim will be denied and you may be liable.
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><span>🚗</span> Per-Vehicle Premiums</h3>
        <div className="space-y-3">
          {result.perVehiclePremiums.map((vp, i) => (
            <div key={vp.vehicleId} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚗</span>
                <div>
                  <div className="font-medium text-white">{vp.description || `Vehicle ${i + 1}`}</div>
                  <div className="text-sm text-white/50">{vehicles[i]?.answers['vehicle-type'] || 'Vehicle'}</div>
                </div>
              </div>
              <div className="text-xl font-light text-white">${vp.premium}/mo</div>
            </div>
          ))}
        </div>
        {result.breakdown.multiCarDiscount > 0 && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between">
            <span className="text-emerald-400">Multi-Car Discount Applied</span>
            <span className="text-emerald-400 font-medium">-{result.breakdown.multiCarDiscount}%</span>
          </div>
        )}
      </div>

      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><span>👥</span> Driver Impact Analysis</h3>
        <div className="space-y-3">
          {result.perDriverImpact.map((di) => {
            const isHighRisk = result.highRiskDrivers.includes(di.driverId);
            return (
              <div key={di.driverId} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{isHighRisk ? '⚠️' : '👤'}</span>
                  <div>
                    <div className="font-medium text-white capitalize">{di.description}</div>
                    {isHighRisk && <div className="text-sm text-red-400">High-risk driver</div>}
                  </div>
                </div>
                <div className={`text-lg font-mono ${di.impact > 10 ? 'text-red-400' : di.impact < -5 ? 'text-emerald-400' : 'text-white/70'}`}>
                  {di.impact > 0 ? '+' : ''}{di.impact}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-medium text-white mb-4">Rate Factors</h3>
          <div className="space-y-3">
            {[
              { label: 'Base Premium', value: `$${result.breakdown.basePremium}`, neutral: true },
              { label: 'Driver Factors', value: `${result.breakdown.driverFactors > 0 ? '+' : ''}${result.breakdown.driverFactors}%` },
              { label: 'Vehicle Factors', value: `${result.breakdown.vehicleFactors > 0 ? '+' : ''}${result.breakdown.vehicleFactors}%` },
              { label: 'Location', value: `${result.breakdown.locationFactors > 0 ? '+' : ''}${result.breakdown.locationFactors}%` },
              { label: 'Multi-Car Discount', value: `-${result.breakdown.multiCarDiscount}%`, discount: true },
              { label: 'Policy Discounts', value: `-${result.breakdown.discounts}%`, discount: true },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-white/60">{item.label}</span>
                <span className={`font-mono ${item.neutral ? 'text-white' : item.discount ? 'text-emerald-400' : item.value.startsWith('+') ? 'text-red-400' : 'text-emerald-400'}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-medium text-white mb-4">Recommended Carriers</h3>
          <div className="space-y-3">
            {result.carrierRecommendations.map((rec, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div>
                  <div className="font-medium text-white">{rec.carrier}</div>
                  <div className="text-sm text-white/50">~${rec.premium}/mo</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${rec.fit}%` }} />
                  </div>
                  <span className="text-sm text-white/60">{rec.fit}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {stateConfig && !stateConfig.creditScoreAllowed && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl">ℹ️</span>
            <div className="text-sm text-blue-300"><strong>{stateConfig.name}</strong> prohibits credit scores in auto insurance pricing.</div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <button onClick={onRestart} className="px-8 py-4 rounded-xl border border-white/20 text-white/80 hover:bg-white/10 transition-all">Start Over</button>
        <Link href="/quote" className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-400 hover:to-purple-400 transition-all shadow-lg shadow-purple-500/25 text-center">Get Actual Quotes →</Link>
      </div>

      <p className="text-center text-white/30 text-sm max-w-2xl mx-auto">This is an estimate based on the information provided. Actual premiums may vary. Powered by Quotely.</p>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

type Phase = 'drivers-count' | 'driver-details' | 'vehicles-count' | 'vehicle-details' | 'policy' | 'results';

const InsurancePricingCalculator: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('drivers-count');
  const [drivers, setDrivers] = useState<Driver[]>([{ id: 'driver-1', isPrimary: true, answers: { 'driver-relationship': 'self' } }]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([{ id: 'vehicle-1', isPrimary: true, answers: {} }]);
  const [policyAnswers, setPolicyAnswers] = useState<Record<string, string | string[]>>({});
  const [activeDriverId, setActiveDriverId] = useState('driver-1');
  const [activeVehicleId, setActiveVehicleId] = useState('vehicle-1');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const pricingEngine = useMemo(() => new InsurancePricingEngine(), []);
  const activeDriver = drivers.find(d => d.id === activeDriverId);
  const activeVehicle = vehicles.find(v => v.id === activeVehicleId);

  const getActiveQuestions = useCallback((questions: Question[], answers: Record<string, string | string[]>): Question[] => {
    return questions.filter((q) => {
      if (!q.conditionalOn) return true;
      const dep = answers[q.conditionalOn.questionId];
      if (!dep) return false;
      return Array.isArray(dep) ? q.conditionalOn.answerIds.some((id) => dep.includes(id)) : q.conditionalOn.answerIds.includes(dep);
    });
  }, []);

  const currentQuestions = useMemo(() => {
    if (phase === 'driver-details' && activeDriver) return getActiveQuestions(DRIVER_QUESTIONS, activeDriver.answers);
    if (phase === 'vehicle-details' && activeVehicle) return getActiveQuestions(VEHICLE_QUESTIONS, activeVehicle.answers);
    if (phase === 'policy') return getActiveQuestions(POLICY_QUESTIONS, policyAnswers);
    return [];
  }, [phase, activeDriver, activeVehicle, policyAnswers, getActiveQuestions]);

  const currentQuestion = currentQuestions[currentQuestionIndex];

  const progress = useMemo(() => {
    let completed = 0, total = 0;
    drivers.forEach(d => { total += DRIVER_QUESTIONS.length; completed += Object.keys(d.answers).length; });
    vehicles.forEach(v => { total += VEHICLE_QUESTIONS.length; completed += Object.keys(v.answers).length; });
    total += POLICY_QUESTIONS.length; completed += Object.keys(policyAnswers).length;
    return { completed, total };
  }, [drivers, vehicles, policyAnswers]);

  const phaseProgress = phase === 'drivers-count' || phase === 'driver-details' ? 1 : phase === 'vehicles-count' || phase === 'vehicle-details' ? 2 : phase === 'policy' ? 3 : 4;

  const handleSelect = (optionId: string) => {
    if (!currentQuestion) return;
    const isMulti = currentQuestion.multiSelect;
    const update = (prev: Record<string, string | string[]>) => {
      if (isMulti) {
        const curr = (prev[currentQuestion.id] as string[]) || [];
        if (optionId === 'basic' || optionId === 'none') return { ...prev, [currentQuestion.id]: [optionId] };
        if (curr.includes(optionId)) { const n = curr.filter(id => id !== optionId); return { ...prev, [currentQuestion.id]: n.length === 0 ? ['none'] : n }; }
        return { ...prev, [currentQuestion.id]: [...curr.filter(id => id !== 'none' && id !== 'basic'), optionId] };
      }
      return { ...prev, [currentQuestion.id]: optionId };
    };
    if (phase === 'driver-details') setDrivers(prev => prev.map(d => d.id === activeDriverId ? { ...d, answers: update(d.answers) } : d));
    else if (phase === 'vehicle-details') setVehicles(prev => prev.map(v => v.id === activeVehicleId ? { ...v, answers: update(v.answers) } : v));
    else if (phase === 'policy') setPolicyAnswers(prev => update(prev));
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentQuestionIndex < currentQuestions.length - 1) setCurrentQuestionIndex(prev => prev + 1);
      else {
        if (phase === 'driver-details') {
          const idx = drivers.findIndex(d => d.id === activeDriverId);
          if (idx < drivers.length - 1) { setActiveDriverId(drivers[idx + 1].id); setCurrentQuestionIndex(0); }
          else setPhase('vehicles-count');
        } else if (phase === 'vehicle-details') {
          const idx = vehicles.findIndex(v => v.id === activeVehicleId);
          if (idx < vehicles.length - 1) { setActiveVehicleId(vehicles[idx + 1].id); setCurrentQuestionIndex(0); }
          else { setPhase('policy'); setCurrentQuestionIndex(0); }
        } else if (phase === 'policy') {
          pricingEngine.setDrivers(drivers); pricingEngine.setVehicles(vehicles);
          Object.entries(policyAnswers).forEach(([k, v]) => pricingEngine.setPolicyAnswer(k, v));
          setPhase('results');
        }
      }
      setIsTransitioning(false);
    }, 200);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) { setIsTransitioning(true); setTimeout(() => { setCurrentQuestionIndex(prev => prev - 1); setIsTransitioning(false); }, 200); }
    else {
      if (phase === 'driver-details') { const idx = drivers.findIndex(d => d.id === activeDriverId); if (idx > 0) { setActiveDriverId(drivers[idx - 1].id); setCurrentQuestionIndex(getActiveQuestions(DRIVER_QUESTIONS, drivers[idx - 1].answers).length - 1); } else setPhase('drivers-count'); }
      else if (phase === 'vehicle-details') { const idx = vehicles.findIndex(v => v.id === activeVehicleId); if (idx > 0) { setActiveVehicleId(vehicles[idx - 1].id); setCurrentQuestionIndex(getActiveQuestions(VEHICLE_QUESTIONS, vehicles[idx - 1].answers).length - 1); } else setPhase('vehicles-count'); }
      else if (phase === 'policy') { setPhase('vehicle-details'); setActiveVehicleId(vehicles[vehicles.length - 1].id); setCurrentQuestionIndex(getActiveQuestions(VEHICLE_QUESTIONS, vehicles[vehicles.length - 1].answers).length - 1); }
    }
  };

  const handleRestart = () => { setDrivers([{ id: 'driver-1', isPrimary: true, answers: { 'driver-relationship': 'self' } }]); setVehicles([{ id: 'vehicle-1', isPrimary: true, answers: {} }]); setPolicyAnswers({}); setActiveDriverId('driver-1'); setActiveVehicleId('vehicle-1'); setCurrentQuestionIndex(0); setPhase('drivers-count'); };

  // Update pricing engine when data changes
  useMemo(() => {
    pricingEngine.setDrivers(drivers);
    pricingEngine.setVehicles(vehicles);
    Object.entries(policyAnswers).forEach(([k, v]) => pricingEngine.setPolicyAnswer(k, v));
  }, [drivers, vehicles, policyAnswers, pricingEngine]);

  const result = useMemo(() => pricingEngine.calculate(), [drivers, vehicles, policyAnswers, pricingEngine]);
  const stateConfig = policyAnswers['state'] ? STATE_CONFIGS[policyAnswers['state'] as string] : null;

  const getCurrentAnswer = () => {
    if (!currentQuestion) return null;
    if (phase === 'driver-details' && activeDriver) return activeDriver.answers[currentQuestion.id];
    if (phase === 'vehicle-details' && activeVehicle) return activeVehicle.answers[currentQuestion.id];
    if (phase === 'policy') return policyAnswers[currentQuestion.id];
    return null;
  };

  const currentAnswer = getCurrentAnswer();
  const hasAnswer = currentAnswer && (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : true);

  if (phase === 'results') return <div className="min-h-screen bg-[#0a0a0f] py-12 px-4"><ResultsDisplay result={result} drivers={drivers} vehicles={vehicles} stateConfig={stateConfig} onRestart={handleRestart} /></div>;

  if (phase === 'drivers-count') return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-indigo-800/20" />
      <div className="relative max-w-2xl mx-auto px-4 py-8 md:py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500/30"><svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
            <div><h1 className="text-xl font-medium text-white">Insurance Quote Calculator</h1><p className="text-white/40 text-sm">Powered by Quotely</p></div>
          </div>
          <ProgressBar current={progress.completed} total={progress.total} phase="Getting Started" phaseProgress={phaseProgress} />
        </div>
        <div className="mb-8"><h2 className="text-2xl md:text-3xl font-light text-white mb-2">How many drivers in your household?</h2><p className="text-white/50">Include all licensed drivers who will operate the vehicles</p></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {[1, 2, 3, 4, 5, 6].map(count => (
            <button key={count} onClick={() => { const nd: Driver[] = Array.from({ length: count }, (_, i) => ({ id: `driver-${i + 1}`, isPrimary: i === 0, answers: i === 0 ? { 'driver-relationship': 'self' } : {} as Record<string, string | string[]> })); setDrivers(nd); setActiveDriverId('driver-1'); }}
              className={`p-6 rounded-xl border-2 transition-all ${drivers.length === count ? 'border-indigo-400 bg-indigo-500/20' : 'border-white/10 bg-white/5 hover:border-white/25'}`}>
              <div className="text-3xl mb-2">👤{count > 1 ? `×${count}` : ''}</div><div className="text-white font-medium">{count} Driver{count > 1 ? 's' : ''}</div>
            </button>
          ))}
        </div>
        <div className="flex justify-end"><button onClick={() => { setPhase('driver-details'); setCurrentQuestionIndex(0); }} className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-white text-gray-900 hover:bg-white/90 shadow-lg transition-all">Continue<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button></div>
      </div>
    </div>
  );

  if (phase === 'vehicles-count') return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-emerald-800/20" />
      <div className="relative max-w-2xl mx-auto px-4 py-8 md:py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/30"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
            <div><h1 className="text-xl font-medium text-white">Insurance Quote Calculator</h1><p className="text-white/40 text-sm">Powered by Quotely</p></div>
          </div>
          <ProgressBar current={progress.completed} total={progress.total} phase="Vehicles" phaseProgress={phaseProgress} />
        </div>
        <div className="mb-8"><h2 className="text-2xl md:text-3xl font-light text-white mb-2">How many vehicles do you need to insure?</h2><p className="text-white/50">Multi-car discounts available for 2+ vehicles</p></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {[1, 2, 3, 4, 5].map(count => (
            <button key={count} onClick={() => { const nv: Vehicle[] = Array.from({ length: count }, (_, i) => ({ id: `vehicle-${i + 1}`, isPrimary: i === 0, answers: {} })); setVehicles(nv); setActiveVehicleId('vehicle-1'); }}
              className={`p-6 rounded-xl border-2 transition-all ${vehicles.length === count ? 'border-emerald-400 bg-emerald-500/20' : 'border-white/10 bg-white/5 hover:border-white/25'}`}>
              <div className="text-3xl mb-2">🚗{count > 1 ? `×${count}` : ''}</div><div className="text-white font-medium">{count} Vehicle{count > 1 ? 's' : ''}</div>
              {count > 1 && <div className="text-xs text-emerald-400 mt-1">Multi-car discount!</div>}
            </button>
          ))}
        </div>
        <div className="flex justify-between">
          <button onClick={() => { setPhase('driver-details'); setActiveDriverId(drivers[drivers.length - 1].id); setCurrentQuestionIndex(getActiveQuestions(DRIVER_QUESTIONS, drivers[drivers.length - 1].answers).length - 1); }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Back</button>
          <button onClick={() => { setPhase('vehicle-details'); setCurrentQuestionIndex(0); }} className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-white text-gray-900 hover:bg-white/90 shadow-lg transition-all">Continue<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
        </div>
      </div>
    </div>
  );

  if (!currentQuestion) return null;
  const colors = categoryColors[currentQuestion.category];
  const entityLabel = phase === 'driver-details' ? `Driver ${drivers.findIndex(d => d.id === activeDriverId) + 1} of ${drivers.length}` : phase === 'vehicle-details' ? `Vehicle ${vehicles.findIndex(v => v.id === activeVehicleId) + 1} of ${vehicles.length}` : 'Policy Details';

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0"><div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} transition-all duration-700`} /><div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-[120px] transition-all duration-700" style={{ backgroundColor: `${colors.accent}15` }} /><div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-[120px] transition-all duration-700" style={{ backgroundColor: `${colors.accent}10` }} /></div>
      <div className="relative max-w-2xl mx-auto px-4 py-8 md:py-16">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.accent}30` }}><svg className="w-5 h-5" style={{ color: colors.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div><div><h1 className="text-xl font-medium text-white">Insurance Quote Calculator</h1><p className="text-white/40 text-sm">Powered by Quotely</p></div></div>
          <ProgressBar current={progress.completed} total={progress.total} phase={entityLabel} phaseProgress={phaseProgress} />
        </div>

        {phase === 'driver-details' && drivers.length > 1 && <EntityTabs entities={drivers.map((d, i) => ({ id: d.id, label: d.answers['driver-relationship'] === 'self' ? 'You' : `Driver ${i + 1}`, isPrimary: d.isPrimary }))} activeId={activeDriverId} onSelect={(id) => { setActiveDriverId(id); setCurrentQuestionIndex(0); }} onAdd={() => { const nid = `driver-${Date.now()}`; setDrivers(prev => [...prev, { id: nid, isPrimary: false, answers: {} }]); }} onRemove={(id) => { setDrivers(prev => prev.filter(d => d.id !== id)); if (activeDriverId === id) setActiveDriverId(drivers[0].id); }} entityType="driver" maxEntities={6} />}
        {phase === 'vehicle-details' && vehicles.length > 1 && <EntityTabs entities={vehicles.map((v, i) => ({ id: v.id, label: v.answers['vehicle-make'] as string || `Vehicle ${i + 1}`, isPrimary: v.isPrimary }))} activeId={activeVehicleId} onSelect={(id) => { setActiveVehicleId(id); setCurrentQuestionIndex(0); }} onAdd={() => { const nid = `vehicle-${Date.now()}`; setVehicles(prev => [...prev, { id: nid, isPrimary: false, answers: {} }]); }} onRemove={(id) => { setVehicles(prev => prev.filter(v => v.id !== id)); if (activeVehicleId === id) setActiveVehicleId(vehicles[0].id); }} entityType="vehicle" maxEntities={5} />}

        <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
          <div className="mb-6"><div className="text-sm text-white/40 mb-2">Question {currentQuestionIndex + 1} of {currentQuestions.length}</div><h2 className="text-2xl md:text-3xl font-light text-white mb-2">{currentQuestion.question}</h2>{currentQuestion.subtext && <p className="text-white/50">{currentQuestion.subtext}</p>}</div>
          <div className={`grid gap-3 ${currentQuestion.options.length > 6 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
            {currentQuestion.options.map((option) => <OptionButton key={option.id} option={option} selected={Array.isArray(currentAnswer) ? currentAnswer.includes(option.id) : currentAnswer === option.id} onSelect={() => handleSelect(option.id)} category={currentQuestion.category} />)}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <button onClick={handleBack} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Back</button>
          <button onClick={handleNext} disabled={!hasAnswer} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${hasAnswer ? 'bg-white text-gray-900 hover:bg-white/90 shadow-lg' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}>{phase === 'policy' && currentQuestionIndex === currentQuestions.length - 1 ? 'Get My Quote' : 'Continue'}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
        </div>

        {(Object.keys(policyAnswers).length >= 2 || drivers.some(d => Object.keys(d.answers).length >= 3)) && (
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between">
              <div><div className="text-sm text-white/50">Live estimate</div><div className="text-xs text-white/30">{drivers.length} driver{drivers.length > 1 ? 's' : ''} • {vehicles.length} vehicle{vehicles.length > 1 ? 's' : ''}</div></div>
              <div className="flex items-baseline gap-1"><span className="text-2xl font-light text-white">${result.monthlyPremium}</span><span className="text-white/40">/mo</span></div>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 0.5s ease-out; }`}</style>
    </div>
  );
};

export default InsurancePricingCalculator;