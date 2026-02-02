'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/api/client'
import { Plus, MapPin, Trash2, Edit2, Loader2, Home, Briefcase, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Address {
    id: string
    full_name: string
    address_line1: string
    address_line2?: string
    city: string
    state: string
    zip_code: string
    country: string
    phone_number: string
    is_default: boolean
    type: 'home' | 'work' | 'other'
}

interface AddressFormInputs {
    full_name: string
    address_line1: string
    address_line2?: string
    city: string
    state: string
    zip_code: string
    country: string
    phone_number: string
    type: 'home' | 'work' | 'other'
    is_default: boolean
}

export default function AddressesTab() {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Using explicit generic for useForm
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<AddressFormInputs>({
        defaultValues: {
            country: 'India',
            type: 'home',
            is_default: false
        }
    })

    const fetchAddresses = async () => {
        try {
            const response = await api.getAddresses()
            if (response.success) {
                setAddresses(response.data)
            }
        } catch (error) {
            console.error('Failed to fetch addresses:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAddresses()
    }, [])

    const onSubmit = async (data: AddressFormInputs) => {
        setIsSubmitting(true)
        try {
            if (editingId) {
                await api.updateAddress(editingId, data)
            } else {
                await api.createAddress(data)
            }
            await fetchAddresses()
            reset()
            setIsEditing(false)
            setEditingId(null)
        } catch (error) {
            console.error('Failed to save address:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleEdit = (address: Address) => {
        setEditingId(address.id)
        setValue('full_name', address.full_name)
        setValue('address_line1', address.address_line1)
        setValue('address_line2', address.address_line2)
        setValue('city', address.city)
        setValue('state', address.state)
        setValue('zip_code', address.zip_code)
        setValue('phone_number', address.phone_number)
        setValue('type', address.type)
        setValue('is_default', address.is_default)
        setIsEditing(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this address?')) {
            try {
                await api.deleteAddress(id)
                await fetchAddresses()
            } catch (error) {
                console.error('Failed to delete address:', error)
            }
        }
    }

    const handleAddNew = () => {
        reset({
            country: 'India',
            type: 'home',
            is_default: addresses.length === 0 // Make default if it's the first one
        })
        setEditingId(null)
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditingId(null)
        reset()
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                <div className="h-48 bg-gray-100 rounded-sm"></div>
                <div className="h-48 bg-gray-100 rounded-sm"></div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-3xl text-charcoal italic">Saved Addresses</h2>
                {!isEditing && (
                    <button
                        onClick={handleAddNew}
                        className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-sage hover:text-sage-700 transition-colors"
                    >
                        <Plus size={16} />
                        <span>Add New</span>
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {isEditing ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-ivory p-8 border border-charcoal/10"
                    >
                        <h3 className="font-serif text-2xl text-charcoal mb-6">
                            {editingId ? 'Edit Address' : 'New Address'}
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal-400">Full Name</label>
                                    <input {...register('full_name', { required: true })} className="input-field" placeholder="Recipient Name" />
                                    {errors.full_name && <span className="text-red-500 text-xs">Required</span>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal-400">Phone Number</label>
                                    <input {...register('phone_number', { required: true })} className="input-field" placeholder="Contact Number" />
                                    {errors.phone_number && <span className="text-red-500 text-xs">Required</span>}
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal-400">Address Line 1</label>
                                    <input {...register('address_line1', { required: true })} className="input-field" placeholder="House No, Building, Street" />
                                    {errors.address_line1 && <span className="text-red-500 text-xs">Required</span>}
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal-400">Address Line 2 (Optional)</label>
                                    <input {...register('address_line2')} className="input-field" placeholder="Landmark, Area" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal-400">City</label>
                                    <input {...register('city', { required: true })} className="input-field" />
                                    {errors.city && <span className="text-red-500 text-xs">Required</span>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal-400">State</label>
                                    <input {...register('state', { required: true })} className="input-field" />
                                    {errors.state && <span className="text-red-500 text-xs">Required</span>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal-400">Zip Code</label>
                                    <input {...register('zip_code', { required: true })} className="input-field" />
                                    {errors.zip_code && <span className="text-red-500 text-xs">Required</span>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal-400">Address Type</label>
                                    <select {...register('type')} className="input-field">
                                        <option value="home">Home</option>
                                        <option value="work">Work</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input type="checkbox" {...register('is_default')} id="is_default" className="accent-sage w-4 h-4" />
                                <label htmlFor="is_default" className="text-sm text-charcoal">Make this my default address</label>
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <button type="submit" disabled={isSubmitting} className="btn-primary min-w-[120px] flex justify-center">
                                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Save Address'}
                                </button>
                                <button type="button" onClick={handleCancel} className="text-xs font-bold uppercase tracking-widest text-charcoal-400 hover:text-charcoal px-4 py-3">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {addresses.map((address) => (
                            <div key={address.id} className={`border ${address.is_default ? 'border-sage bg-ivory' : 'border-charcoal/10 bg-white'} p-6 relative group transition-all`}>
                                {address.is_default && (
                                    <div className="absolute top-4 right-4 flex items-center space-x-1 text-sage text-[10px] font-bold uppercase tracking-wider border border-sage px-2 py-0.5">
                                        <Star size={10} fill="currentColor" />
                                        <span>Default</span>
                                    </div>
                                )}

                                <div className="flex items-start space-x-4 mb-4">
                                    <div className={`mt-1 ${address.is_default ? 'text-sage' : 'text-charcoal-400'}`}>
                                        {address.type === 'home' && <Home size={20} />}
                                        {address.type === 'work' && <Briefcase size={20} />}
                                        {address.type === 'other' && <MapPin size={20} />}
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl text-charcoal mb-1">{address.full_name}</h3>
                                        <p className="text-charcoal-400 leading-relaxed text-sm">
                                            {address.address_line1}<br />
                                            {address.address_line2 && <>{address.address_line2}<br /></>}
                                            {address.city}, {address.state} - {address.zip_code}<br />
                                            {address.country}<br />
                                            Phone: {address.phone_number}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-4 pt-4 border-t border-charcoal/10 mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(address)}
                                        className="flex items-center space-x-1 text-xs uppercase tracking-widest font-bold text-charcoal-400 hover:text-charcoal transition-colors"
                                    >
                                        <Edit2 size={12} />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(address.id)}
                                        className="flex items-center space-x-1 text-xs uppercase tracking-widest font-bold text-red-800/60 hover:text-red-800 transition-colors"
                                    >
                                        <Trash2 size={12} />
                                        <span>Remove</span>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {addresses.length === 0 && (
                            <div className="col-span-2 border border-dashed border-charcoal/20 bg-ivory-50 p-12 flex flex-col items-center justify-center text-center">
                                <MapPin className="text-charcoal-400 mb-4" size={32} />
                                <p className="text-charcoal-400 font-light mb-4">No addresses saved yet.</p>
                                <button onClick={handleAddNew} className="btn-secondary text-xs">Add your first address</button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .input-field {
                    width: 100%;
                    padding: 0.75rem;
                    background-color: var(--color-ivory);
                    border: 1px solid rgba(26, 26, 26, 0.1);
                    outline: none;
                    font-family: var(--font-serif);
                    transition: border-color 0.2s;
                }
                .input-field:focus {
                    border-color: var(--color-sage);
                }
            `}</style>
        </div>
    )
}
