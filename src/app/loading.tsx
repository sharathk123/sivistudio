export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-bone">
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-1.5 md:gap-3 opacity-0 animate-fadeInUp">
                    <span className="text-3xl tracking-nav uppercase whitespace-nowrap font-bodoni font-bold text-charcoal">
                        SIVI
                    </span>
                    <span className="text-3xl whitespace-nowrap font-allura text-charcoal">
                        the couturière
                    </span>
                </div>
            </div>
        </div>
    )
}
