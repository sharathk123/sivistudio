import SizeChart from '@/components/shop/SizeChart';
import StickyHeader from '@/components/ui/StickyHeader';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { Ruler, Scissors, Shirt } from 'lucide-react';

export const metadata = {
    title: 'Size Guide & Measurement | Sivi Studio',
    description: 'Find your perfect fit with our comprehensive size guide and measurement instructions for Sivi Studio handcrafted garments.',
};

export default function SizeGuidePage() {
    return (
        <main className="bg-bone min-h-screen">
            <StickyHeader theme="light" />

            {/* Header */}
            <section className="pt-32 pb-16 px-6 text-center">
                <span className="text-sage text-xs uppercase tracking-widest font-bold block mb-4">Fit Guide</span>
                <h1 className="font-serif text-5xl md:text-6xl text-charcoal italic mb-8">The Perfect Fit</h1>
                <p className="max-w-2xl mx-auto text-charcoal-400 text-lg font-light leading-relaxed">
                    Our garments are designed to celebrate the natural silhouette. Use this guide to find your size,
                    or opt for custom tailoring for a piece made uniquely for you.
                </p>
            </section>

            {/* Visual Guide Boxes */}
            <section className="px-6 pb-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    <MeasurementCard
                        title="Bust"
                        icon={<Shirt className="w-6 h-6 text-sage" />}
                        instruction="Measure around the fullest part of your chest, keeping the tape measure horizontal."
                    />
                    <MeasurementCard
                        title="Waist"
                        icon={<Scissors className="w-6 h-6 text-sage" />}
                        instruction="Measure around your natural waistline, generally the narrowest part of your torso."
                    />
                    <MeasurementCard
                        title="Hips"
                        icon={<Ruler className="w-6 h-6 text-sage" />}
                        instruction="Measure around the fullest part of your hips, keeping your feet together."
                    />
                </div>

                {/* Chart Section */}
                <div className="max-w-4xl mx-auto mb-24">
                    <SizeChart />
                </div>

                {/* CTA Section */}
                <div className="max-w-4xl mx-auto bg-ivory-100 p-12 text-center rounded-sm border border-ivory-200">
                    <h2 className="font-serif text-3xl text-charcoal italic mb-4">Need a Custom Fit?</h2>
                    <p className="text-charcoal-400 mb-8 font-light max-w-lg mx-auto">
                        Every body is unique. Our atelier offers bespoke tailoring to ensure your garment fits perfectly.
                    </p>
                    <Link
                        href="/custom-tailoring"
                        className="inline-block bg-charcoal text-bone py-4 px-8 label-editorial hover:bg-sage transition-colors shadow-lg"
                    >
                        Explore Custom Tailoring
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function MeasurementCard({ title, icon, instruction }: { title: string, icon: React.ReactNode, instruction: string }) {
    return (
        <div className="bg-white p-8 border border-ivory-200 rounded-sm hover-shadow transition-all group">
            <div className="bg-ivory-50 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="font-serif text-xl text-charcoal italic mb-3">{title}</h3>
            <p className="text-sm text-charcoal-400 leading-relaxed font-light">
                {instruction}
            </p>
        </div>
    );
}
