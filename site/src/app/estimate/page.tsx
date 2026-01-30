import { Metadata } from 'next';
import InsurancePricingCalculator from '@/components/InsurancePricingCalculator';

export const metadata: Metadata = {
  title: 'Insurance Premium Estimator | Get Your Estimated Rate',
  description: 'Use our free auto insurance calculator to estimate your premium. Answer a few questions about yourself, your vehicle, and your driving history to see personalized rate estimates.',
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/estimate',
  },
  openGraph: {
    title: 'Insurance Premium Estimator',
    description: 'Get a personalized auto insurance premium estimate in minutes.',
  },
};

export default function EstimatePage() {
  return <InsurancePricingCalculator />;
}
