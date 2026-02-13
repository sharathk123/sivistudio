'use client'
// @ts-nocheck - React Three Fiber types not yet compatible with React 19

import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useLoader, ThreeElements } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three'

// Add explicit types for React 19 JSX
declare global {
    namespace React {
        namespace JSX {
            interface IntrinsicElements extends ThreeElements { }
        }
    }
}

interface FabricViewerProps {
    fabricImage: string
    fabricName?: string
    width?: number
    height?: number
    className?: string
    autoRotate?: boolean
    showControls?: boolean
}

/**
 * 3D Fabric Viewer Component
 * Displays fabric textures in an interactive 3D environment
 * Users can rotate, zoom, and explore fabric details
 *
 * @example
 * ```tsx
 * <FabricViewer
 *   fabricImage="/images/products/pochampally-ikat-saree.png"
 *   fabricName="Pochampally Ikat"
 *   width={400}
 *   height={500}
 *   autoRotate={true}
 * />
 * ```
 */

function FabricMesh({ fabricImage, fabricName, onTextureError }: { fabricImage: string; fabricName?: string; onTextureError: () => void }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)

    // Load texture with error handling
    const texture = useLoader(
        TextureLoader,
        fabricImage,
        undefined,
        (error) => {
            console.error('Failed to load fabric texture:', error)
            onTextureError()
        }
    )

    useFrame((state) => {
        if (meshRef.current) {
            // Subtle floating animation
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
        }
    })

    return (
        <mesh
            ref={meshRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            position={[0, 0, 0]}
        >
            <planeGeometry args={[2, 2.5]} />
            <meshStandardMaterial
                map={texture}
                side={THREE.DoubleSide}
                roughness={0.8}
                metalness={0.1}
                transparent
                opacity={hovered ? 1 : 0.95}
            />
        </mesh>
    )
}

function LoadingFallback() {
    return (
        <div className="flex items-center justify-center w-full h-full bg-bone/50">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-charcoal/60">Loading 3D fabric viewer...</p>
            </div>
        </div>
    )
}

export default function FabricViewer({
    fabricImage,
    fabricName,
    width = 400,
    height = 500,
    className = '',
    autoRotate = false,
    showControls = true,
}: FabricViewerProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [textureError, setTextureError] = useState(false)

    const handleTextureError = () => {
        setTextureError(true)
    }

    return (
        <div
            className={`relative bg-gradient-to-br from-bone to-sage/10 rounded-lg overflow-hidden ${className}`}
            style={{ width, height }}
        >
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                onCreated={() => setIsLoaded(true)}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                <pointLight position={[-5, 5, 5]} intensity={0.5} color="#9CA770" />
                <pointLight position={[5, -5, 5]} intensity={0.3} color="#D4A574" />

                {/* Environment for realistic reflections */}
                <Environment preset="studio" />

                {/* Fabric mesh */}
                <Suspense fallback={null}>
                    <FabricMesh fabricImage={fabricImage} fabricName={fabricName} onTextureError={handleTextureError} />
                </Suspense>

                {/* Ground shadows */}
                <ContactShadows
                    position={[0, -1.5, 0]}
                    opacity={0.3}
                    scale={5}
                    blur={2}
                    far={2}
                />

                {/* Camera controls */}
                {showControls && (
                    <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        minDistance={2}
                        maxDistance={5}
                        autoRotate={autoRotate}
                        autoRotateSpeed={0.5}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI * 0.75}
                    />
                )}
            </Canvas>

            {/* Loading overlay */}
            {!isLoaded && <LoadingFallback />}

            {/* Error overlay */}
            {isLoaded && textureError && (
                <div className="absolute inset-0 flex items-center justify-center bg-bone/90">
                    <div className="text-center p-6">
                        <svg className="w-12 h-12 text-copper mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-charcoal font-medium mb-2">Failed to load fabric image</p>
                        <p className="text-charcoal/60 text-sm">Please try refreshing the page</p>
                    </div>
                </div>
            )}

            {/* Fabric name overlay */}
            {fabricName && (
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                        <p className="text-sm font-medium text-charcoal">{fabricName}</p>
                        <p className="text-xs text-charcoal/60">Drag to rotate • Scroll to zoom</p>
                    </div>
                </div>
            )}

            {/* 3D badge */}
            <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-2 py-1 bg-sage/90 text-bone text-xs font-medium rounded-full">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                    3D View
                </span>
            </div>
        </div>
    )
}

/**
 * Lightweight 3D fabric card component for product listings
 */
export function FabricCard({
    fabricImage,
    fabricName,
    onClick,
}: {
    fabricImage: string
    fabricName?: string
    onClick?: () => void
}) {
    const [textureError, setTextureError] = useState(false)

    const handleTextureError = () => {
        setTextureError(true)
    }

    return (
        <div
            className="relative aspect-[4/5] bg-gradient-to-br from-bone to-sage/10 rounded-lg overflow-hidden cursor-pointer group"
            onClick={onClick}
        >
            <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <Environment preset="studio" />
                <Suspense fallback={null}>
                    <FabricMesh fabricImage={fabricImage} fabricName={fabricName} onTextureError={handleTextureError} />
                </Suspense>
                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    autoRotate={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI * 0.7}
                />
            </Canvas>

            {/* Error overlay */}
            {textureError && (
                <div className="absolute inset-0 flex items-center justify-center bg-bone/90">
                    <div className="text-center p-4">
                        <svg className="w-8 h-8 text-copper mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-charcoal text-xs">Failed to load</p>
                    </div>
                </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />

            {/* Name overlay */}
            {fabricName && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/60 to-transparent">
                    <p className="text-bone text-sm font-medium">{fabricName}</p>
                </div>
            )}
        </div>
    )
}
