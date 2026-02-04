export default function Loading() {
    return (
        <div className="flex h-full w-full items-center justify-center bg-ivory-100 min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-1.5 md:gap-3 opacity-0 animate-fadeInUp">
                    <span className="text-xl tracking-nav uppercase whitespace-nowrap font-bodoni font-bold text-charcoal/50">
                        SIVI
                    </span>
                    <span className="text-xl whitespace-nowrap font-allura text-charcoal/50">
                        admin
                    </span>
                </div>
            </div>
        </div>
    )
}
