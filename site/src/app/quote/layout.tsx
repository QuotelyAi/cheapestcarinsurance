import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get a Free Quote',
  description: 'Get a free car insurance quote in Tulsa. Compare rates from multiple providers and save money on your auto coverage.',
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/quote',
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
