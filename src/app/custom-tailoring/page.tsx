import EditorialHero from '@/components/editorial/EditorialHero'
import Footer from '@/components/ui/Footer'

export default function CustomTailoringPage() {
    return (
        <main className="bg-bone min-h-screen flex flex-col">
            <div className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
                <div className="text-center max-w-2xl mx-auto">
                    <span className="text-sage text-xs uppercase tracking-[0.3em] font-bold">Coming Soon</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-charcoal italic leading-tight mt-6 mb-8">
                        Custom Tailoring
                    </h1>
                    <div className="w-24 h-1 bg-sage mx-auto mb-8" />
                    <p className="text-charcoal-400 text-lg leading-relaxed">
                        Exquisite fits, tailored just for you. We are crafting a bespoke experience to bring your vision to life.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}
