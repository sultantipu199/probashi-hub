-- ==============================================================================
-- Probashi Hub (সৌদি প্রবাসী ওয়ান-স্টপ হাব)
-- Complete PostgreSQL Production Schema with RLS and Full-Text Search
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. SERVICES (50+ Saudi Expat Problem & Solution Workflows)
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category_id INTEGER NOT NULL,
    category_name VARCHAR(150) NOT NULL,
    title VARCHAR(300) NOT NULL,
    title_en VARCHAR(300) NOT NULL,
    summary TEXT NOT NULL,
    urgent BOOLEAN DEFAULT FALSE,
    official_portal VARCHAR(255) NOT NULL,
    steps JSONB NOT NULL DEFAULT '[]'::jsonb,
    required_documents JSONB NOT NULL DEFAULT '[]'::jsonb,
    scam_warnings TEXT NOT NULL,
    official_fees_sar VARCHAR(200) NOT NULL,
    processing_time VARCHAR(150) NOT NULL,
    b2b_service_category VARCHAR(100) NOT NULL DEFAULT 'General Inquiry',
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Full-Text Search Index for instant search across title and summary
CREATE INDEX IF NOT EXISTS services_fts_idx 
ON services USING gin(to_tsvector('simple', title || ' ' || summary));

-- Additional index on slug and category
CREATE INDEX IF NOT EXISTS services_slug_idx ON services(slug);
CREATE INDEX IF NOT EXISTS services_category_idx ON services(category_id);

-- 2. LABOR LAW UPDATES (Articles & Royal Decrees)
CREATE TABLE IF NOT EXISTS labor_law_updates (
    id SERIAL PRIMARY KEY,
    article_number VARCHAR(50) NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    practical_impact TEXT NOT NULL,
    is_hot_topic BOOLEAN DEFAULT FALSE,
    effective_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. B2B LEADS (High-intent Leads for Verified Service Partners)
CREATE TABLE IF NOT EXISTS b2b_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_slug VARCHAR(255) REFERENCES services(slug) ON DELETE SET NULL,
    service_category VARCHAR(100) NOT NULL,
    user_name VARCHAR(200) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    whatsapp_number VARCHAR(50) NOT NULL,
    saudi_city VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, contacted, converted, archived
    partner_id UUID,
    ip_address VARCHAR(100),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS b2b_leads_status_idx ON b2b_leads(status);
CREATE INDEX IF NOT EXISTS b2b_leads_category_idx ON b2b_leads(service_category);

-- 4. PARTNERS (Verified Legal, Cargo, Umrah, MISA Agencies)
CREATE TABLE IF NOT EXISTS partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    cr_number VARCHAR(100) NOT NULL,
    contact_person VARCHAR(150) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    contact_email VARCHAR(150) NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    rating NUMERIC(3,2) DEFAULT 5.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. DAILY EXCHANGE RATES (SAR to BDT live rates from Wallets & Remittance houses)
CREATE TABLE IF NOT EXISTS daily_exchange_rates (
    id SERIAL PRIMARY KEY,
    provider_name VARCHAR(100) NOT NULL, -- STC Pay, Urpay, Al Rajhi Tahweel, SNB QuickPay, Mobily Pay
    provider_code VARCHAR(50) NOT NULL,
    rate_bdt NUMERIC(10, 4) NOT NULL,
    fee_sar NUMERIC(10, 2) DEFAULT 0.00,
    transfer_speed VARCHAR(100) NOT NULL,
    incentive_percent NUMERIC(4, 2) DEFAULT 2.50,
    is_best_rate BOOLEAN DEFAULT FALSE,
    scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS daily_exchange_rates_provider_idx ON daily_exchange_rates(provider_code);
CREATE INDEX IF NOT EXISTS daily_exchange_rates_scraped_idx ON daily_exchange_rates(scraped_at DESC);

-- ==============================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE labor_law_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_exchange_rates ENABLE ROW LEVEL SECURITY;

-- 1. Services Policies: Public read access, admin full access
CREATE POLICY "Allow public read access to services"
ON services FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow service role full access to services"
ON services FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 2. Labor Law Updates Policies: Public read access
CREATE POLICY "Allow public read access to labor law updates"
ON labor_law_updates FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow service role full access to labor law updates"
ON labor_law_updates FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 3. B2B Leads Policies: Public insert allowed (with validation), read restricted
CREATE POLICY "Allow public insert for b2b leads"
ON b2b_leads FOR INSERT
TO anon, authenticated
WITH CHECK (
    char_length(user_name) >= 2 AND 
    char_length(phone_number) >= 8 AND 
    char_length(details) >= 5
);

CREATE POLICY "Allow service role full access to leads"
ON b2b_leads FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 4. Partners Policies: Public read of verified partners only
CREATE POLICY "Allow public read of verified partners"
ON partners FOR SELECT
TO anon, authenticated
USING (verified = true);

CREATE POLICY "Allow service role full access to partners"
ON partners FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 5. Daily Exchange Rates Policies: Public read
CREATE POLICY "Allow public read of exchange rates"
ON daily_exchange_rates FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow service role insert and update for exchange rates"
ON daily_exchange_rates FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
