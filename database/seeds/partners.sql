-- ==============================================================================
-- Probashi Hub: Verified Service Partners Seeds (Cargo, Legal, Umrah, MISA)
-- ==============================================================================

INSERT INTO partners (
    company_name, category, city, cr_number, contact_person, contact_phone, contact_email, verified, rating
) VALUES
(
    'Al Safwa International Cargo Services',
    'Cargo',
    'Riyadh',
    '1010482910',
    'Mohammed Alamgir Hossain',
    '+966551234567',
    'cargo.riyadh@alsafwa-logistics.sa',
    TRUE,
    4.90
),
(
    'Red Sea Air & Door-to-Door Cargo',
    'Cargo',
    'Jeddah',
    '4030192834',
    'Tariqul Islam',
    '+966509876543',
    'jeddah@redseacargo.com',
    TRUE,
    4.85
),
(
    'Al Khobar Legal Aid & Labor Advocacy Firm',
    'Legal Aid',
    'Dammam / Khobar',
    '2050987123',
    'Adv. Mansour Al-Qahtani',
    '+966540112233',
    'legal@alqahtani-law.sa',
    TRUE,
    4.95
),
(
    'Dar Al-Bayan Official Document Translation & MOFA Attestation',
    'Attestation',
    'Riyadh',
    '1010332211',
    'Sheikh Abdullah Rahman',
    '+966531122334',
    'support@daralbayan-attest.com',
    TRUE,
    4.88
),
(
    'Baitul Haram Umrah & Hajj Services KSA',
    'Umrah',
    'Makkah',
    '4031234567',
    'Maulana Abdul Wadud',
    '+966567788990',
    'umrah@baitulharam-sa.com',
    TRUE,
    4.92
),
(
    'Riyadh Business Solutions & MISA Investor Consultancy',
    'MISA',
    'Riyadh',
    '1010778899',
    'Eng. Faisal Al-Otaibi',
    '+966598877665',
    'info@riyadh-investment.sa',
    TRUE,
    4.91
);
