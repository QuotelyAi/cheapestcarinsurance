import { Metadata } from 'next';
import LocationPage from '@/components/LocationPage';
import { carrierCount } from '@/lib/config';

const city = 'Glenpool';
const county = 'Tulsa';
const slug = 'glenpool';
const driveTime = '20 minutes';

export const metadata: Metadata = {
  title: `Cheap Car Insurance ${city}, OK | Compare ${carrierCount} Carriers`,
  description: `Compare car insurance rates in ${city}, Oklahoma from ${carrierCount} carriers. Get free quotes from a licensed independent agency. Serving ${city} and ${county} County.`,
  keywords: [
    `car insurance ${city}`,
    `auto insurance ${city} OK`,
    `cheap car insurance ${city}`,
    `${city} car insurance quotes`,
    `insurance agents ${city} Oklahoma`,
  ],
  openGraph: {
    title: `Cheap Car Insurance ${city}, OK | Compare ${carrierCount} Carriers`,
    description: `Compare car insurance rates in ${city}, Oklahoma from ${carrierCount} carriers.`,
    type: 'website',
  },
  alternates: {
    canonical: `https://cheapestcarinsurancetulsa.com/car-insurance-${slug}`,
  },
};

export default function GlenpoolInsurance() {
  return <LocationPage city={city} county={county} slug={slug} driveTime={driveTime} />;
}
