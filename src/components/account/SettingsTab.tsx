'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/api/client'
import { useAuth } from '@/context/AuthContext'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface ProfileFormData {
    full_name: string
    hyderabad_locality: string
    email: string
}

export default function SettingsTab() {
    const { profile, user, refreshProfile } = useAuth()
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const { register, handleSubmit, reset } = useForm<ProfileFormData>({
        defaultValues: {
            full_name: profile?.full_name || '',
            hyderabad_locality: profile?.hyderabad_locality || '',
            email: user?.email || '',
        }
    })

    // Update form when profile loads
    useEffect(() => {
        if (profile) {
            reset({
                full_name: profile.full_name || '',
                hyderabad_locality: profile.hyderabad_locality || '',
                email: user?.email || ''
            })
        }
    }, [profile, user, reset])

    const onSubmit = async (data: ProfileFormData) => {
        setIsSaving(true)
        setMessage(null)
        try {
            await api.updateProfile({
                full_name: data.full_name,
                hyderabad_locality: data.hyderabad_locality
            })
            await refreshProfile()
            toast.success('Profile updated successfully.')
        } catch (error) {
            toast.error('Failed to update profile.')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="max-w-2xl">
            <div className="mb-8">
                <h2 className="font-serif text-3xl text-charcoal italic mb-2">Account Settings</h2>
                <p className="text-charcoal-400 font-light text-sm">Update your personal information and preferences.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-charcoal-400">Full Name</label>
                        <input
                            {...register('full_name', { required: true })}
                            className="input-boutique"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-charcoal-400">Email Address</label>
                        <input
                            {...register('email')}
                            disabled
                            className="input-boutique opacity-50 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal-400">Hyderabad Locality (for delivery)</label>
                    <input
                        {...register('hyderabad_locality')}
                        placeholder="e.g. Banjara Hills, Dilsukhnagar"
                        className="input-boutique"
                    />
                </div>

                {message && (
                    <div className={`p-4 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {message.text}
                    </div>
                )}

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="btn-primary min-w-[150px] flex items-center justify-center"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={18} /> : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    )
}
