import Footer from '@/components/ui/Footer'

export default function JournalPage() {
    return (
        <main className="bg-bone min-h-screen flex flex-col">
            <div className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
                <div className="text-center max-w-2xl mx-auto">
                    <span className="text-sage text-xs uppercase tracking-[0.3em] font-bold">The Journal</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-charcoal italic leading-tight mt-6 mb-8">
                        Notes from the Studio
                    </h1>
                    <div className="w-24 h-1 bg-sage mx-auto mb-8" />
                    <p className="text-charcoal-400 text-lg leading-relaxed">
                        Stories of craft, culture, and design. Coming soon.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}
