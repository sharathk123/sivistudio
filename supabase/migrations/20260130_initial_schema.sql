-- Sivi Studio Initial Database Schema
-- Migration: 20260130_initial_schema
-- Description: Creates core tables for profiles, measurements, orders, and AI consultations

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PROFILES TABLE
-- ============================================================================
-- Linked to auth.users. Tracks user identity and location.
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    hyderabad_locality TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- ============================================================================
-- MEASUREMENTS TABLE
-- ============================================================================
-- One-to-many link to profiles. Stores custom sizing data.
CREATE TABLE IF NOT EXISTS public.measurements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    bust NUMERIC(5,2),
    waist NUMERIC(5,2),
    hips NUMERIC(5,2),
    length NUMERIC(5,2),
    age_group TEXT CHECK (age_group IN ('child', 'teen', 'adult')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.measurements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for measurements
CREATE POLICY "Users can view their own measurements"
    ON public.measurements FOR SELECT
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own measurements"
    ON public.measurements FOR INSERT
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own measurements"
    ON public.measurements FOR UPDATE
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own measurements"
    ON public.measurements FOR DELETE
    USING (auth.uid() = profile_id);

-- ============================================================================
-- ORDERS TABLE
-- ============================================================================
-- Tracks order lifecycle and payment integration.
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'placed' CHECK (status IN ('placed', 'processing', 'shipped', 'delivered', 'cancelled')),
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    total_amount NUMERIC(10,2) NOT NULL,
    shipping_address JSONB,
    pickup_location TEXT, -- For Hyderabad studio pickup
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own orders"
    ON public.orders FOR INSERT
    WITH CHECK (auth.uid() = profile_id);

-- ============================================================================
-- ORDER_ITEMS TABLE
-- ============================================================================
-- Bridge between Supabase and Sanity product catalog.
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    sanity_product_id TEXT NOT NULL, -- Reference to Sanity document
    selected_size TEXT,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    price NUMERIC(10,2) NOT NULL,
    customization_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for order_items (inherit from orders)
CREATE POLICY "Users can view their own order items"
    ON public.order_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id
            AND orders.profile_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert their own order items"
    ON public.order_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id
            AND orders.profile_id = auth.uid()
        )
    );

-- ============================================================================
-- AI_CONSULTATIONS TABLE
-- ============================================================================
-- Stores JSONB logs of Gemini Stylist interactions for long-term personalization.
CREATE TABLE IF NOT EXISTS public.ai_consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    conversation_log JSONB NOT NULL DEFAULT '[]'::jsonb,
    recommendations JSONB DEFAULT '{}'::jsonb,
    session_metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.ai_consultations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_consultations
CREATE POLICY "Users can view their own AI consultations"
    ON public.ai_consultations FOR SELECT
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own AI consultations"
    ON public.ai_consultations FOR INSERT
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own AI consultations"
    ON public.ai_consultations FOR UPDATE
    USING (auth.uid() = profile_id);

-- ============================================================================
-- INDEXES
-- ============================================================================
-- Improve query performance

CREATE INDEX idx_measurements_profile_id ON public.measurements(profile_id);
CREATE INDEX idx_orders_profile_id ON public.orders(profile_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_sanity_product_id ON public.order_items(sanity_product_id);
CREATE INDEX idx_ai_consultations_profile_id ON public.ai_consultations(profile_id);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_measurements_updated_at
    BEFORE UPDATE ON public.measurements
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_consultations_updated_at
    BEFORE UPDATE ON public.ai_consultations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE public.profiles IS 'User profiles linked to auth.users with location data';
COMMENT ON TABLE public.measurements IS 'Custom sizing data for personalized tailoring';
COMMENT ON TABLE public.orders IS 'Order tracking with Razorpay integration';
COMMENT ON TABLE public.order_items IS 'Bridge table connecting orders to Sanity products';
COMMENT ON TABLE public.ai_consultations IS 'Gemini AI Stylist conversation logs for personalization';

COMMENT ON COLUMN public.profiles.hyderabad_locality IS 'Enables automatic Studio Pickup option for Hyderabad users';
COMMENT ON COLUMN public.orders.pickup_location IS 'Studio pickup location for Hyderabad customers';
COMMENT ON COLUMN public.order_items.sanity_product_id IS 'Reference to Sanity CMS product document ID';
