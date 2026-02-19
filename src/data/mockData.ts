export const mockPatient = {
  id: "TC-2024-001847",
  name: "Priya Sharma",
  age: 34,
  dob: "15 March 1990",
  bloodGroup: "B+",
  gender: "Female",
  phone: "+91 98765 43210",
  email: "priya.sharma@email.com",
  address: "Sector 14, Gurgaon, Haryana 122001",
  emergencyContact: "Rahul Sharma (+91 98765 43211)",
  insuranceId: "HDFC-HEALTH-2024-7823",
  registeredAt: "Apollo Hospital, Gurgaon",
  photo: null,
};

export const mockMedicalHistory = {
  conditions: ["Type 2 Diabetes (Controlled)", "Hypertension (Stage 1)", "Hypothyroidism"],
  allergies: ["Penicillin", "Sulfa drugs"],
  currentMedications: [
    { name: "Metformin 500mg", frequency: "Twice daily", since: "Jan 2022" },
    { name: "Amlodipine 5mg", frequency: "Once daily", since: "Mar 2023" },
    { name: "Levothyroxine 50mcg", frequency: "Once daily (morning)", since: "Sep 2021" },
  ],
  pastSurgeries: ["Appendectomy (2018)"],
  vaccinations: ["COVID-19 (Covishield, 2 doses + booster)", "Hepatitis B", "Influenza 2024"],
  lastVisit: "12 Feb 2026",
  upcomingAppointment: "5 Mar 2026 – Dr. Anand Kapoor (Endocrinologist)",
};

export const mockGeneticProfile = {
  primaryGene: "CYP2D6",
  diplotype: "*1/*4",
  phenotype: "Intermediate Metabolizer",
  detectedVariants: [
    { gene: "CYP2D6", variant: "*4", effect: "Loss of function", alleleFreq: "21%" },
    { gene: "CYP2C19", variant: "*2", effect: "Reduced function", alleleFreq: "15%" },
    { gene: "SLCO1B1", variant: "c.521T>C", effect: "Reduced transport", alleleFreq: "18%" },
    { gene: "TPMT", variant: "Wild-type", effect: "Normal function", alleleFreq: "94%" },
  ],
  ethnicity: "South Asian",
  analysisDate: "14 Feb 2026",
  vcfFile: "priya_sharma_genome_v2.vcf",
};

export const mockPharmaGuardResult = {
  drug: "Codeine",
  riskLabel: "High Risk",
  riskScore: 82,
  severity: "Contraindicated",
  confidence: 94.7,
  primaryGene: "CYP2D6",
  diplotype: "*1/*4",
  phenotype: "Intermediate Metabolizer",
  variants: ["CYP2D6*4 (loss-of-function)", "CYP2C19*2 (reduced function)"],
  recommendation: "Avoid codeine. Switch to tramadol with dose adjustment or morphine with standard dosing.",
  alternatives: ["Tramadol (reduce dose by 25%)", "Oxycodone (standard dose)", "Morphine (standard dose)"],
  explanation: "CYP2D6*4 allele causes significantly reduced codeine metabolism. The patient converts codeine to morphine at approximately 50% of normal rate. This leads to unpredictable analgesic effect and risk of respiratory depression. CYP2C19*2 co-occurrence further complicates drug metabolism cascade. Clinical guidelines (CPIC 2021) recommend against codeine use in intermediate and poor metabolizers.",
  references: ["CPIC Guideline for Codeine (2021)", "PharmGKB PA166104996", "FDA Drug Safety Communication 2017"],
};

export const mockDoctorStats = {
  totalPatients: 1847,
  riskAlerts: 23,
  recentScans: 8,
  criticalWarnings: 3,
  pharmaAnalyses: 312,
  avgRiskScore: 34,
};

export const mockRecentPatients = [
  { id: "TC-2024-001847", name: "Priya Sharma", age: 34, riskLevel: "High", lastScan: "2 hrs ago", condition: "Diabetes + Hypertension" },
  { id: "TC-2024-001823", name: "Amit Verma", age: 52, riskLevel: "Moderate", lastScan: "4 hrs ago", condition: "Cardiac arrhythmia" },
  { id: "TC-2024-001799", name: "Sunita Rao", age: 28, riskLevel: "Low", lastScan: "Yesterday", condition: "Thyroid disorder" },
  { id: "TC-2024-001756", name: "Rajesh Kumar", age: 67, riskLevel: "High", lastScan: "Yesterday", condition: "CKD + Hypertension" },
  { id: "TC-2024-001734", name: "Meera Joshi", age: 41, riskLevel: "Moderate", lastScan: "2 days ago", condition: "Epilepsy" },
];

export const mockDrugs = [
  { value: "codeine", label: "Codeine (Opioid Analgesic)", gene: "CYP2D6" },
  { value: "warfarin", label: "Warfarin (Anticoagulant)", gene: "CYP2C9 + VKORC1" },
  { value: "clopidogrel", label: "Clopidogrel (Antiplatelet)", gene: "CYP2C19" },
  { value: "simvastatin", label: "Simvastatin (Statin)", gene: "SLCO1B1" },
  { value: "azathioprine", label: "Azathioprine (Immunosuppressant)", gene: "TPMT" },
  { value: "fluorouracil", label: "Fluorouracil (Chemotherapy)", gene: "DPYD" },
  { value: "tamoxifen", label: "Tamoxifen (Anticancer)", gene: "CYP2D6" },
  { value: "sertraline", label: "Sertraline (SSRI)", gene: "CYP2C19" },
];

export const mockAIPrompts = [
  "Generate complete patient medical summary",
  "Show all drug risk interactions",
  "Generate personalized diet plan for diabetes",
  "List lifestyle precautions and recommendations",
  "Explain pharmacogenomic profile in simple terms",
  "Generate discharge summary",
];

export const mockAIResponses: Record<string, string> = {
  summary: `## Medical Summary — Priya Sharma (TC-2024-001847)

**Date:** 19 Feb 2026 | **Prepared by:** Turant Care PharmaGuard AI

---

### Clinical Overview
Patient is a 34-year-old female with a complex multi-system condition profile including Type 2 Diabetes Mellitus (T2DM), Stage 1 Hypertension, and Hypothyroidism. All conditions are currently managed and partially controlled.

### Pharmacogenomic Alert 🔴
Critical finding: Patient carries **CYP2D6*4** (loss-of-function) allele. This classifies her as an **Intermediate Metabolizer** for CYP2D6-substrate drugs including codeine, tramadol, and tamoxifen.

### Key Drug Risks Identified
- ❌ **Codeine** — CONTRAINDICATED (CYP2D6*4 — reduced conversion, unpredictable effect)
- ⚠️ **Clopidogrel** — Use with caution (CYP2C19*2 — reduced antiplatelet effect)
- ✅ **Metformin** — Safe, no significant PGx interaction

### Current Medications Assessment
All three current medications (Metformin, Amlodipine, Levothyroxine) are safe based on pharmacogenomic profile. No dose adjustment required.

### Recommendation
Regular HbA1c monitoring every 3 months. Avoid NSAID pain relievers. Prefer paracetamol for pain management. Annual thyroid panel required.`,
  diet: `## Personalized Diet Plan — Priya Sharma

**Condition-Specific Nutrition Plan for T2DM + Hypertension**

---

### 🌅 Breakfast (7:00–8:00 AM)
- Oats with chia seeds + 1 bowl low-fat curd
- 2 egg whites OR paneer (50g)
- Herbal green tea (no sugar)

### 🌞 Mid-Morning (10:30 AM)
- Handful of walnuts + 1 seasonal fruit (guava/apple)
- Buttermilk (no salt)

### 🍽️ Lunch (1:00–2:00 PM)
- 2 multigrain rotis + 1 cup dal (moong/masoor)
- Sabzi (palak, methi, karela preferred — diabetic-friendly)
- Raw salad with lemon dressing

### 🌆 Evening Snack (5:00 PM)
- Roasted chana or makhana (handful)
- Green tea

### 🌙 Dinner (7:30–8:00 PM)
- 1 multigrain roti + light vegetable soup
- Steamed vegetables or grilled paneer

### ⚠️ Foods to Strictly Avoid
- White rice, maida, refined sugar
- Pickles, papad (high sodium — hypertension)
- Fried snacks, red meat
- Fruit juices (high glycemic index)

### 💊 Supplement Recommendations
- Vitamin D3 (1000 IU/day) — common deficiency in hypothyroidism
- Magnesium (100mg/day) — supports insulin sensitivity`,
  precautions: `## Precautions & Lifestyle Recommendations

**Patient: Priya Sharma | Conditions: T2DM, Hypertension, Hypothyroidism**

---

### 🔴 Critical Medication Precautions
1. **Never take Codeine or any opioid** without prior genetic counseling (CYP2D6 Intermediate Metabolizer)
2. **Levothyroxine** must be taken 30–45 minutes before breakfast, on empty stomach
3. **Metformin** must be taken WITH food to avoid GI side effects
4. Inform all doctors and pharmacists about your **Penicillin allergy**

### 💊 Drug Interactions to Watch
- Avoid NSAIDs (ibuprofen, naproxen) — can raise BP and impair kidney function
- Grapefruit juice interacts with Amlodipine — avoid
- Avoid St. John's Wort supplements — interferes with Levothyroxine

### 🏃 Exercise Recommendations
- 30 minutes brisk walking, 5 days/week
- Yoga or light stretching — stress reduction (lowers cortisol, helps blood sugar)
- Avoid intense exercise without medical supervision

### 🧠 Mental Health
- Stress management is critical — high cortisol raises blood sugar
- 7–8 hours sleep mandatory
- Practice meditation or mindfulness (10 min/day)

### 📋 Monitoring Schedule
- Blood glucose: Daily fasting + 2 hours post-meal
- HbA1c: Every 3 months
- Thyroid (TSH): Every 6 months
- BP: Daily home monitoring
- Annual: Kidney function, lipid profile, eye exam, foot exam`,
};
