'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import StickyHeader from '@/components/ui/StickyHeader'
import { IMAGES } from '@/lib/images'

// Dynamically import to avoid SSR issues with Three.js
const FabricViewer = dynamic(() => import('@/components/3d/FabricViewer'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center w-full h-[500px] bg-ivory-100 rounded-lg">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-charcoal/60">Loading 3D viewer...</p>
            </div>
        </div>
    ),
})

const fabricSamples = [
    { name: 'Pochampally Ikat', image: IMAGES.pochampally },
    { name: 'Ikat Fabric Closeup', image: IMAGES.ikatFabricCloseup },
    { name: 'Heritage Pochampally', image: IMAGES.heritagePochampally },
    { name: 'Heritage Jamdani', image: IMAGES.heritageJamdani },
    { name: 'Heritage Sambalpuri', image: IMAGES.heritageSambalpuri },
    { name: 'Heritage Kanjivaram', image: IMAGES.heritageKanjivaram },
    { name: 'Banarasi Dupatta', image: IMAGES.banarasiDupatta },
    { name: 'Chanderi Kurta', image: IMAGES.chanderiKurta },
]

export default function FabricTestPage() {
    const [selectedFabric, setSelectedFabric] = useState(fabricSamples[0])
    const [autoRotate, setAutoRotate] = useState(true)
    const [viewerSize, setViewerSize] = useState<'small' | 'medium' | 'large'>('medium')

    const sizes = {
        small: { width: 300, height: 400 },
        medium: { width: 500, height: 600 },
        large: { width: 700, height: 800 },
    }

    return (
        <main className="min-h-screen bg-bone">
            <StickyHeader theme="light" />

            <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
                {/* Title */}
                <div className="text-center mb-16">
                    <span className="text-sage text-xs font-semibold tracking-[0.3em] uppercase block mb-4">
                        Component Test
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl text-charcoal italic mb-4">
                        3D Fabric Viewer
                    </h1>
                    <p className="text-charcoal-400 text-lg font-light max-w-2xl mx-auto">
                        Interactive 3D fabric viewer test page. Select a fabric, drag to rotate, scroll to zoom.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Controls Panel */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-sage font-semibold mb-4">
                                Select Fabric
                            </h3>
                            <div className="space-y-2">
                                {fabricSamples.map((fabric) => (
                                    <button
                                        key={fabric.name}
                                        onClick={() => setSelectedFabric(fabric)}
                                        className={`w-full text-left px-4 py-3 rounded-sm transition-all text-sm ${selectedFabric.name === fabric.name
                                                ? 'bg-sage text-bone font-medium'
                                                : 'bg-ivory-100 text-charcoal hover:bg-ivory-200'
                                            }`}
                                    >
                                        {fabric.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-sage font-semibold mb-4">
                                Viewer Size
                            </h3>
                            <div className="flex gap-2">
                                {(['small', 'medium', 'large'] as const).map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setViewerSize(size)}
                                        className={`px-4 py-2 rounded-sm text-sm capitalize transition-all ${viewerSize === size
                                                ? 'bg-charcoal text-bone'
                                                : 'bg-ivory-100 text-charcoal hover:bg-ivory-200'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-sage font-semibold mb-4">
                                Options
                            </h3>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={autoRotate}
                                    onChange={(e) => setAutoRotate(e.target.checked)}
                                    className="w-4 h-4 accent-sage"
                                />
                                <span className="text-sm text-charcoal">Auto Rotate</span>
                            </label>
                        </div>

                        <div className="p-4 bg-ivory-100 rounded-sm">
                            <h3 className="text-xs uppercase tracking-widest text-sage font-semibold mb-3">
                                Controls
                            </h3>
                            <ul className="text-sm text-charcoal-400 space-y-2 font-light">
                                <li>🖱️ <strong>Drag</strong> — Rotate fabric</li>
                                <li>🔍 <strong>Scroll</strong> — Zoom in/out</li>
                                <li>👆 <strong>Hover</strong> — Highlights mesh</li>
                            </ul>
                        </div>
                    </div>

                    {/* Viewer */}
                    <div className="lg:col-span-2 flex items-start justify-center">
                        <FabricViewer
                            key={selectedFabric.name}
                            fabricImage={selectedFabric.image}
                            fabricName={selectedFabric.name}
                            width={sizes[viewerSize].width}
                            height={sizes[viewerSize].height}
                            autoRotate={autoRotate}
                            showControls={true}
                        />
                    </div>
                </div>

                {/* Debug Info */}
                <div className="mt-16 p-6 bg-charcoal text-bone rounded-sm font-mono text-xs">
                    <h3 className="text-sage font-semibold mb-3 uppercase tracking-widest text-[10px]">Debug Info</h3>
                    <p>Fabric: <span className="text-sage">{selectedFabric.name}</span></p>
                    <p>Image URL: <span className="text-sage/80 break-all">{selectedFabric.image}</span></p>
                    <p>Size: <span className="text-sage">{sizes[viewerSize].width}×{sizes[viewerSize].height}</span></p>
                    <p>Auto Rotate: <span className="text-sage">{autoRotate ? 'on' : 'off'}</span></p>
                </div>
            </div>
        </main>
    )
}
