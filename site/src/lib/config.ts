// AGENCY CONFIGURATION
// All values here must be real, documented, and verifiable

// Founder/Author information for E-E-A-T
export const founderConfig = {
  name: 'Dustin Wyzard',
  title: 'Founder & Licensed Insurance Agent',
  slug: 'dustin-wyzard',
  bio: 'Dustin Wyzard is the founder of Cheapest Car Insurance and a licensed insurance agent in Oklahoma. With years of experience helping Tulsa-area drivers find affordable coverage, Dustin specializes in comparing rates across multiple carriers to find the best fit for each customer.',
  shortBio: 'Licensed Oklahoma insurance agent and founder of Cheapest Car Insurance.',
  credentials: [
    {
      type: 'license',
      name: 'Oklahoma Insurance License',
      number: '3003308992',
      issuedBy: 'Oklahoma Insurance Department',
      url: 'https://www.oid.ok.gov/',
    },
  ],
  expertise: [
    'Auto Insurance',
    'Oklahoma Insurance Regulations',
    'Insurance Rate Comparison',
    'High-Risk Driver Insurance',
  ],
  social: {
    linkedin: '', // Add when available
  },
};

export const agencyConfig = {
  // Business Information
  name: 'Cheapest Car Insurance Tulsa',
  legalName: 'Cheapest Car Insurance LLC',
  address: {
    street: '6010 S 66th E Ave Suite C',
    city: 'Tulsa',
    state: 'OK',
    zip: '74145',
  },
  phone: '(918) 794-6993',
  email: 'staff@cheapestcarinsurancetulsa.com',

  // Geo coordinates for local SEO
  geo: {
    latitude: 36.0984,
    longitude: -95.8563,
  },

  // Business hours
  hours: {
    weekdays: { open: '09:00', close: '17:00' },
    saturday: null, // closed
    sunday: null, // closed
  },

  // Trademark Information
  trademark: {
    name: 'Cheapest Car Insurance',
    serialNumber: '99578620',
    filingDate: '2026-01-05',
    status: 'pending',
  },

  // License Information - REQUIRED FOR OKLAHOMA
  oklahomaLicenseNumber: '3003308992',

  // Real Carrier Partnerships - These are the actual carriers you have contracts with
  carriers: [
    { name: 'GEICO', id: 'geico' },
    { name: 'Progressive', id: 'progressive' },
    { name: 'Equity Insurance', id: 'equity' },
    { name: 'Harbor Insurance', id: 'harbor' },
    { name: 'Bristol West', id: 'bristol-west' },
    { name: 'National General', id: 'national-general' },
    { name: 'Mercury Insurance', id: 'mercury' },
    { name: 'Safeco', id: 'safeco' },
    { name: 'Falcon Insurance', id: 'falcon' },
    { name: 'Assurance America', id: 'assurance-america' },
  ],

  // Statistics - ONLY USE REAL DATA FROM YOUR RECORDS
  // Set to null if you don't have verified data
  stats: {
    // Average savings - must be calculated from actual customer data
    averageSavings: null as number | null, // e.g., 847 if you have real data showing $847 avg savings

    // Customer count - must be real
    customerCount: null as number | null, // e.g., 500 if you have 500 documented customers

    // Years in business - must be accurate
    yearsInBusiness: null as number | null,

    // Only set these if you have documented proof
    savingsDisclaimer: 'Savings vary by individual. Not all applicants will qualify for savings.',
  },

  // Google Business - 6010 S 66th E Ave Suite C location
  google: {
    placeId: 'ChIJNb1kv4CStocR7AD40BOJfWc',
    businessUrl: 'https://maps.google.com/?cid=7456621553477419244',
    rating: 4.4,
    reviewCount: 18,
  },

  // Social profiles for schema markup
  social: {
    facebook: 'https://www.facebook.com/cheapestcarinsurancetulsa',
    // Add more as they are created
  },
};

// Service Areas for Local SEO
export const serviceAreas = {
  primary: [
    { city: 'Tulsa', county: 'Tulsa', state: 'OK', slug: 'tulsa', population: 413000 },
    { city: 'Broken Arrow', county: 'Tulsa', state: 'OK', slug: 'broken-arrow', population: 115000 },
    { city: 'Owasso', county: 'Tulsa', state: 'OK', slug: 'owasso', population: 40000 },
    { city: 'Bixby', county: 'Tulsa', state: 'OK', slug: 'bixby', population: 30000 },
    { city: 'Jenks', county: 'Tulsa', state: 'OK', slug: 'jenks', population: 26000 },
    { city: 'Sand Springs', county: 'Tulsa', state: 'OK', slug: 'sand-springs', population: 20000 },
    { city: 'Sapulpa', county: 'Creek', state: 'OK', slug: 'sapulpa', population: 22000 },
    { city: 'Glenpool', county: 'Tulsa', state: 'OK', slug: 'glenpool', population: 15000 },
    { city: 'Collinsville', county: 'Tulsa', state: 'OK', slug: 'collinsville', population: 8000 },
  ],
  secondary: [
    { city: 'Bartlesville', county: 'Washington', state: 'OK', slug: 'bartlesville', population: 37000 },
    { city: 'Claremore', county: 'Rogers', state: 'OK', slug: 'claremore', population: 20000 },
    { city: 'Muskogee', county: 'Muskogee', state: 'OK', slug: 'muskogee', population: 36000 },
  ],
  counties: ['Tulsa County', 'Rogers County', 'Wagoner County', 'Creek County'],
  region: 'Northeast Oklahoma',
};

// Carrier count is derived from actual partnerships
export const carrierCount = agencyConfig.carriers.length; // Returns 10 (real number)

// Authoritative Sources for E-E-A-T
export const authoritativeSources = {
  // Oklahoma Insurance Department - Primary regulatory authority
  oid: {
    name: 'Oklahoma Insurance Department',
    url: 'https://www.oid.ok.gov/',
    description: 'Official state insurance regulator',
    services: {
      consumerComplaints: 'https://www.oid.ok.gov/consumers/consumer-assistance/',
      verifyLicense: 'https://www.oid.ok.gov/',
      fileComplaint: 'https://www.oid.ok.gov/consumers/consumer-assistance/',
    },
  },
  // National Association of Insurance Commissioners
  naic: {
    name: 'National Association of Insurance Commissioners',
    url: 'https://content.naic.org/',
    description: 'National insurance regulatory support organization',
    sbs: 'https://sbs.naic.org/',
    services: {
      consumerInfo: 'https://content.naic.org/consumer.htm',
      fileComplaint: 'https://content.naic.org/consumer/file-complaint.htm',
      policyLocator: 'https://eapps.naic.org/life-policy-locator/',
    },
  },
  // Oklahoma Uninsured Vehicle Enforcement Diversion
  uvedok: {
    name: 'Oklahoma Uninsured Vehicle Enforcement Diversion Program',
    url: 'https://www.uvedok.org/',
    description: 'Program to reduce uninsured vehicles on Oklahoma roads',
    resolveNotice: 'https://resolve.autonotice.com/',
    phone: '(405) 806-8833',
  },
  // Service Oklahoma - Vehicle Services
  serviceOklahoma: {
    name: 'Service Oklahoma',
    vehicles: {
      url: 'https://oklahoma.gov/service/all-services/auto-vehicle.html',
      description: 'Vehicle titles, registration, and plates',
    },
    driving: {
      url: 'https://oklahoma.gov/service/all-services/driving-and-automobiles.html',
      description: 'Driver licenses, permits, and driving services',
    },
  },
};

// Oklahoma Insurance Compliance
export const oklahomaCompliance = {
  // Oklahoma Insurance Department
  regulatoryBody: 'Oklahoma Insurance Department',
  regulatoryUrl: 'https://www.oid.ok.gov/',

  // Minimum coverage requirements (Oklahoma state law)
  minimumCoverage: {
    bodilyInjuryPerPerson: 25000,
    bodilyInjuryPerAccident: 50000,
    propertyDamage: 25000,
    description: '25/50/25 minimum liability coverage required by Oklahoma law',
  },

  // Required disclosures
  disclosures: {
    notAllCarriers: 'Not all insurance carriers are represented. Coverage options and pricing vary by carrier and individual circumstances.',
    individualResults: 'Individual results may vary. Savings claims are based on customers who switched and saved; not all customers will experience the same savings.',
    quoteAccuracy: 'Online quotes are estimates only. Final rates are determined by the insurance carrier after full underwriting review.',
  },
};

// Editorial Standards - E-E-A-T Trust Signals
export const editorialStandards = {
  // Content creation process
  process: {
    research: 'All content is researched using official sources including the Oklahoma Insurance Department, NAIC, and state government resources.',
    authorship: 'Content is written by licensed insurance professionals with direct experience in the Oklahoma insurance market.',
    review: 'All content is reviewed for accuracy by our licensed agents before publication.',
    updates: 'Content is reviewed and updated regularly to reflect current Oklahoma insurance laws and market conditions.',
  },
  // Fact-checking sources
  primarySources: [
    'Oklahoma Insurance Department (oid.ok.gov)',
    'National Association of Insurance Commissioners (naic.org)',
    'Oklahoma State Government (oklahoma.gov)',
    'Insurance carrier official documentation',
  ],
  // Transparency commitments
  transparency: {
    compensation: 'We receive commissions from insurance carriers when policies are purchased through our agency. This does not affect our recommendations or the rates you receive.',
    editorial: 'Our editorial content is independent from our business relationships. We provide honest information to help you make informed decisions.',
    accuracy: 'If you find any inaccurate information on our site, please contact us so we can correct it promptly.',
  },
  // Review process
  reviewProcess: {
    factCheck: true,
    licensedReview: true,
    regularUpdates: true,
    sourceCitation: true,
  },
};

// Federal Compliance
export const federalCompliance = {
  // FTC - Endorsements and Testimonials
  ftc: {
    testimonialDisclaimer: 'Testimonials reflect individual experiences and may not be typical. Results vary.',
    materialConnection: 'We may receive compensation from insurance carriers for policies sold.',
  },

  // ADA - Accessibility
  ada: {
    statement: 'We are committed to ensuring digital accessibility for people with disabilities.',
    contactForAssistance: 'If you need assistance, please call us at (918) 794-6993.',
  },

  // TCPA - Communications
  tcpa: {
    consent: 'By submitting your information, you consent to receive calls, texts, and emails regarding insurance quotes. Message and data rates may apply.',
    optOut: 'You may opt out at any time by replying STOP to text messages or clicking unsubscribe in emails.',
  },

  // Privacy
  privacy: {
    dataCollection: 'We collect personal information to provide insurance quotes. See our Privacy Policy for details.',
    dataSecurity: 'Your information is protected using industry-standard encryption.',
  },
};
