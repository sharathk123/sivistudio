'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// Type definitions for Web Speech API
interface SpeechRecognition extends EventTarget {
    lang: string
    continuous: boolean
    interimResults: boolean
    maxAlternatives: number
    start(): void
    stop(): void
    abort(): void
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null
    onend: ((this: SpeechRecognition, ev: Event) => any) | null
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
}

interface SpeechRecognitionEvent extends Event {
    resultIndex: number
    results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
    readonly length: number
    item(index: number): SpeechRecognitionResult
    [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
    readonly length: number
    item(index: number): SpeechRecognitionAlternative
    [index: number]: SpeechRecognitionAlternative
    isFinal: boolean
}

interface SpeechRecognitionAlternative {
    transcript: string
    confidence: number
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string
    message: string
}

declare global {
    interface Window {
        SpeechRecognition?: {
            new(): SpeechRecognition
        }
        webkitSpeechRecognition?: {
            new(): SpeechRecognition
        }
    }
}

interface VoiceSearchOptions {
    lang?: string
    continuous?: boolean
    interimResults?: boolean
    maxAlternatives?: number
}

interface VoiceSearchResult {
    transcript: string
    isFinal: boolean
    confidence?: number
}

interface UseVoiceSearchReturn {
    isListening: boolean
    transcript: string
    isSupported: boolean
    error: string | null
    startListening: () => void
    stopListening: () => void
    resetTranscript: () => void
}

/**
 * Hook for voice search functionality using Web Speech API
 * Provides speech-to-text capabilities for search inputs
 *
 * @example
 * ```tsx
 * const { isListening, transcript, startListening, stopListening, isSupported } = useVoiceSearch()
 *
 * return (
 *   <div>
 *     <input value={transcript} onChange={(e) => setSearchQuery(e.target.value)} />
 *     <button onClick={isListening ? stopListening : startListening}>
 *       {isListening ? '🎤 Stop' : '🎤 Search'}
 *     </button>
 *   </div>
 * )
 * ```
 */
export function useVoiceSearch(options: VoiceSearchOptions = {}): UseVoiceSearchReturn {
    const {
        lang = 'en-US',
        continuous = false,
        interimResults = true,
        maxAlternatives = 1,
    } = options

    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isSupported, setIsSupported] = useState(false)

    const recognitionRef = useRef<SpeechRecognition | null>(null)
    const finalTranscriptRef = useRef('')

    // Check for browser support
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            setIsSupported(!!SpeechRecognition)
        }
    }, [])

    // Initialize speech recognition
    useEffect(() => {
        if (!isSupported) return

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) return

        const recognition = new SpeechRecognition()
        recognition.lang = lang
        recognition.continuous = continuous
        recognition.interimResults = interimResults
        recognition.maxAlternatives = maxAlternatives

        recognition.onstart = () => {
            setIsListening(true)
            setError(null)
        }

        recognition.onend = () => {
            setIsListening(false)
        }

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let interimTranscript = ''
            let finalTranscript = ''

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i]
                const transcript = result[0].transcript

                if (result.isFinal) {
                    finalTranscript += transcript
                } else {
                    interimTranscript += transcript
                }
            }

            if (finalTranscript) {
                finalTranscriptRef.current += finalTranscript
                setTranscript(finalTranscriptRef.current)
            } else if (interimTranscript) {
                setTranscript(finalTranscriptRef.current + interimTranscript)
            }
        }

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            setError(event.error)
            setIsListening(false)

            // Auto-restart on specific errors
            if (event.error === 'no-speech' || event.error === 'audio-capture') {
                // Don't auto-restart, let user decide
            }
        }

        recognitionRef.current = recognition

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort()
            }
        }
    }, [isSupported, lang, continuous, interimResults, maxAlternatives])

    const startListening = useCallback(() => {
        if (!isSupported) {
            setError('Speech recognition is not supported in this browser')
            return
        }

        if (recognitionRef.current) {
            try {
                recognitionRef.current.start()
            } catch (err) {
                // Recognition might already be started
                console.error('Failed to start speech recognition:', err)
            }
        }
    }, [isSupported])

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop()
        }
    }, [])

    const resetTranscript = useCallback(() => {
        setTranscript('')
        finalTranscriptRef.current = ''
    }, [])

    return {
        isListening,
        transcript,
        isSupported,
        error,
        startListening,
        stopListening,
        resetTranscript,
    }
}
