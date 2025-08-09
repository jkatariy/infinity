'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { BRAND_COLORS } from '@/lib/theme';

type CategoryKey =
  | 'bundling-wrapping'
  | 'pouch-baler'
  | 'cartoning'
  | 'case-packers'
  | 'checkweighers'
  | 'inspection'
  | 'conveying';

type ModelLink = { name: string; href: string; label: string };

const categories: { id: CategoryKey; name: string }[] = [
  { id: 'bundling-wrapping', name: 'Bundling & Wrapping' },
  { id: 'pouch-baler', name: 'Pouch Baler & Bagging' },
  { id: 'cartoning', name: 'Cartoning' },
  { id: 'case-packers', name: 'Case Packers' },
  { id: 'checkweighers', name: 'Checkweighers' },
  { id: 'inspection', name: 'Inspection' },
  { id: 'conveying', name: 'Conveying' },
];

const allModels: Record<CategoryKey, ModelLink[]> = {
  'bundling-wrapping': [
    { name: 'IBP-120', label: 'Pouch-into-Pouch (IBP-120)', href: '/products/bundling-wrapping/ibp-120' },
    { name: 'IBS-200', label: 'Strip-into-Pouch (IBS-200)', href: '/products/bundling-wrapping/ibs-200' },
    { name: 'ISP-120', label: 'Pouch-into-Shrink (ISP-120)', href: '/products/bundling-wrapping/isp-120' },
    { name: 'IMS-800/600', label: 'Multitrack Strips to Pouch (IMS-800/600)', href: '/products/bundling-wrapping/ims-800' },
    { name: 'IWB-120', label: 'Bottles-into-Shrink (IWB-120)', href: '/products/bundling-wrapping/iwb-200' },
  ],
  'pouch-baler': [
    { name: 'IBL-500', label: 'Pouch-into-Gusset Bag Baler (IBL-500)', href: '/products/pouch-baler/ibl-500' },
    { name: 'IBG-8', label: 'Pouch-into-HDPE Bag (IBG-8)', href: '/products/pouch-baler/ibg-8' },
    { name: 'IBG-H8 & IBG-V8', label: 'Pouch-into-HDPE Bag (IBG-H8 / IBG-V8)', href: '/products/pouch-baler/ibg-h8-v8' },
  ],
  cartoning: [
    { name: 'ACM-100', label: 'Product-into-Carton (ACM-100)', href: '/products/cartoning/acm-100' },
    { name: 'ACM-40', label: 'Product-into-Carton (ACM-40, Semi-auto)', href: '/products/cartoning/acm-40' },
  ],
  'case-packers': [
    { name: 'ICP-120', label: 'Shipper Case Packing (ICP-120)', href: '/products/case-packers/icp-120' },
    { name: 'ICS-200', label: 'Case Packer: Strip of Pouches (ICS-200)', href: '/products/case-packers/ics-200' },
    { name: 'ICB-120', label: 'Case Packer: Bottles (ICB-120)', href: '/products/case-packers/icb-120' },
    { name: 'Case Erector', label: 'Case Erector (Auto)', href: '/products/case-packers/case-erector' },
    { name: 'Case Sealer', label: 'Case Sealer (Auto)', href: '/products/case-packers/case-sealer' },
  ],
  checkweighers: [
    { name: 'ICW Series', label: 'Dynamic Checkweighing (All Models)', href: '/products/checkweighers/icw-series' },
    { name: 'ICW-600', label: 'Checkweighing 50g–600g (ICW-600)', href: '/products/checkweighers/icw-600' },
    { name: 'ICW-1200', label: 'Checkweighing 600g–1200g (ICW-1200)', href: '/products/checkweighers/icw-1200' },
    { name: 'ICW-6000', label: 'Checkweighing 1.2kg–6kg (ICW-6000)', href: '/products/checkweighers/icw-6000' },
    { name: 'ICW-25K', label: 'Checkweighing 6kg–25kg (ICW-25K)', href: '/products/checkweighers/icw-25k' },
    { name: 'ICW-50K', label: 'Checkweighing 25kg–50kg (ICW-50K)', href: '/products/checkweighers/icw-50k' },
  ],
  inspection: [
    { name: 'Vision Systems', label: 'Automated Vision Inspection', href: '/products/inspection/vision-systems' },
  ],
  conveying: [
    { name: 'Flat Belt', label: 'Flat Belt Conveyor', href: '/products/conveying/flat-belt' },
    { name: 'Modular Conveyor', label: 'Modular Belt Conveyor', href: '/products/conveying/modular-conveyor' },
    { name: 'Roller Conveyor', label: 'Roller Conveyor', href: '/products/conveying/roller-conveyor' },
    { name: 'Compression Conveyor', label: 'Compression Conveyor', href: '/products/conveying/compression-conveyor' },
    { name: 'Z Type Bucket Elevator', label: 'Z Type Bucket Elevator', href: '/products/conveying/z-bucket-elevator' },
    { name: 'Crate Lifter', label: 'Vertical Crate/Box Lifter', href: '/products/conveying/crate-lifter' },
    { name: 'Spiral Conveyor', label: 'Spiral Conveyor', href: '/products/conveying/spiral-conveyor' },
    { name: 'Box Lifter', label: 'Box Lifter', href: '/products/conveying/box-lifter' },
  ],
};

const industries = [
  'Food & Beverage',
  'Pharmaceuticals',
  'Personal Care & Cosmetics',
  'Spices & Masala',
  'Dairy & Beverages',
  'Textiles & Apparel',
  'E-commerce & Fulfillment',
];

type Step = 'closed' | 'industry' | 'category' | 'model' | 'action' | 'contact' | 'submitted';

type ChatMessage = {
  id: string;
  role: 'bot' | 'user';
  text: string;
};

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('closed');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | ''>('');
  const [selectedModel, setSelectedModel] = useState<ModelLink | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [contact, setContact] = useState({ name: '', email: '', phone: '', company: '', requirements: '' });
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const pushMessage = (msg: Omit<ChatMessage, 'id'>) => {
    setMessages((prev) => [...prev, { id: Math.random().toString(36).slice(2), ...msg }]);
  };

  const resetFlow = () => {
    setSelectedIndustry('');
    setSelectedCategory('');
    setSelectedModel(null);
    setContact({ name: '', email: '', phone: '', company: '', requirements: '' });
    setFormError(null);
    setMessages([]);
    setStep('industry');
    // seed intro
    setTimeout(() => {
      pushMessage({ role: 'bot', text: "Hi! I'm your Infinity Assistant. Let's find the right solution." });
      pushMessage({ role: 'bot', text: 'First, which industry are you exploring?' });
    }, 0);
  };

  const handleOpen = () => {
    setOpen(true);
    setStep('industry');
    setMessages([]);
    // initial greeting
    setTimeout(() => {
      pushMessage({ role: 'bot', text: "Hi! I'm your Infinity Assistant. Let's find the right solution." });
      pushMessage({ role: 'bot', text: 'First, which industry are you exploring?' });
    }, 0);
  };

  const handleClose = () => {
    setOpen(false);
    setStep('closed');
  };

  const handleAction = (action: 'video' | 'view' | 'quote') => {
    if (!selectedModel) return;
    if (action === 'view' || action === 'video') {
      window.open(selectedModel.href, '_blank');
      pushMessage({ role: 'user', text: action === 'view' ? 'View product page' : 'Watch video' });
      pushMessage({ role: 'bot', text: 'Opened in a new tab. Anything else I can help with?' });
      return;
    }
    if (action === 'quote') {
      pushMessage({ role: 'user', text: 'Request a quote' });
      pushMessage({ role: 'bot', text: 'Sure, please share your contact details.' });
      setStep('contact');
    }
  };

  const submitLead = async () => {
    if (!selectedModel) return;
    setFormLoading(true);
    setFormError(null);
    try {
      // basic validation for required short answers
      if (!contact.company || !contact.requirements || !contact.email || !contact.name || !contact.phone) {
        setFormError('Please fill in all fields: name, email, phone, company, and a short requirement.');
        setFormLoading(false);
        return;
      }
      const res = await fetch('/api/zoho-crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: contact.name,
          email: contact.email,
          phone: contact.phone,
          company: contact.company,
          selectedModel: selectedModel.name,
          requirements: `${contact.requirements}\nLead from Infinity Assistant | Industry: ${selectedIndustry} | Category: ${selectedCategory}`,
          leadSource: 'Floating Assistant',
          productInterest: selectedModel.name,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || 'Submission failed');
      }
      pushMessage({ role: 'user', text: `Submitted details for ${selectedModel.name}` });
      pushMessage({ role: 'bot', text: 'Thank you! Our team will reach out shortly.' });
      setStep('submitted');
    } catch (err: any) {
      setFormError(err.message || 'Something went wrong');
    } finally {
      setFormLoading(false);
    }
  };

  // Auto-scroll on new messages
  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  return (
    <>
      {/* Floating Button */}
      <button
        aria-label="Open Assistant"
        onClick={handleOpen}
        className="fixed bottom-5 right-5 z-50 rounded-full shadow-lg text-white w-14 h-14 flex items-center justify-center animate-float"
        style={{ backgroundColor: BRAND_COLORS.primary.blue }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND_COLORS.blue[600])}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND_COLORS.primary.blue)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h8m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Popup Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[92vw] max-w-md animate-scaleIn">
          <div className="relative rounded-2xl bg-white shadow-2xl overflow-hidden border" style={{ borderColor: `${BRAND_COLORS.primary.blue}26` }}>
            {/* Header */}
            <div
              className="px-4 py-3 border-b flex items-center justify-between relative"
              style={{
                background:
                  `linear-gradient(135deg, ${BRAND_COLORS.blue[50]} 0%, ${BRAND_COLORS.primary.blue}0F 100%)`,
                borderColor: `${BRAND_COLORS.primary.blue}26`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center text-white shadow"
                    style={{ backgroundColor: BRAND_COLORS.primary.blue }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h8" />
                    </svg>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white" style={{ backgroundColor: BRAND_COLORS.primary.green }} />
                </div>
                <div className="leading-tight">
                  <h3 className="text-sm font-semibold text-gray-900">Infinity Assistant</h3>
                  <p className="text-[11px] text-gray-500">Online • Typically replies instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={resetFlow} className="text-xs px-2 py-1 rounded-md hover:bg-gray-100" style={{ color: BRAND_COLORS.primary.blue }}>Reset</button>
                <button onClick={handleClose} aria-label="Close assistant" className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex flex-col" style={{ height: '24rem' }}>
              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                        m.role === 'user'
                          ? 'bg-brand-green-50 text-gray-900'
                          : 'bg-brand-blue-50 text-gray-900'
                      }`}
                      style={
                        m.role === 'user'
                          ? { border: `1px solid ${BRAND_COLORS.primary.green}33` }
                          : { border: `1px solid ${BRAND_COLORS.primary.blue}26` }
                      }
                    >
                      {m.text}
                    </div>
                  </div>
                ))}

                {formError && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl px-3 py-2 text-sm bg-red-50 text-red-700 border border-red-200">
                      {formError}
                    </div>
                  </div>
                )}
              </div>

              {/* Composer / Quick Actions */}
              <div className="border-t p-3 space-y-2" style={{ borderColor: `${BRAND_COLORS.primary.blue}1A` }}>
                {step === 'industry' && (
                  <div className="grid grid-cols-2 gap-2">
                    {industries.map((ind) => (
                      <button
                        key={ind}
                        onClick={() => {
                          setSelectedIndustry(ind);
                          pushMessage({ role: 'user', text: ind });
                          pushMessage({ role: 'bot', text: 'Great! Choose a solution category.' });
                          setStep('category');
                        }}
                        className="text-xs sm:text-sm px-3 py-2 rounded-full border hover:bg-gray-50 text-left"
                        style={{ borderColor: '#e5e7eb', color: '#111827' }}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                )}

                {step === 'category' && (
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          pushMessage({ role: 'user', text: cat.name });
                          pushMessage({ role: 'bot', text: 'Nice choice. Pick a specific model.' });
                          setStep('model');
                        }}
                        className="text-xs sm:text-sm px-3 py-2 rounded-full border hover:bg-gray-50 text-left"
                        style={{ borderColor: '#e5e7eb', color: '#111827' }}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}

                {step === 'model' && selectedCategory && (
                  <div className="grid grid-cols-1 gap-2 max-h-40 overflow-auto pr-1">
                    {allModels[selectedCategory].map((m) => (
                      <button
                        key={m.href}
                        onClick={() => {
                          setSelectedModel(m);
                          pushMessage({ role: 'user', text: m.label });
                          pushMessage({ role: 'bot', text: 'What would you like to do next?' });
                          setStep('action');
                        }}
                        className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border text-left hover:bg-gray-50"
                        style={{ borderColor: '#e5e7eb', color: '#111827' }}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                )}

                {step === 'action' && selectedModel && (
                  <div className="grid grid-cols-1 gap-2">
                    <button onClick={() => handleAction('video')} className="px-4 py-2.5 rounded-lg border text-left hover:bg-gray-50 text-sm" style={{ borderColor: '#e5e7eb' }}>
                      ▶ Watch Video
                    </button>
                    <button onClick={() => handleAction('view')} className="px-4 py-2.5 rounded-lg border text-left hover:bg-gray-50 text-sm" style={{ borderColor: '#e5e7eb' }}>
                      🔍 View Product Page
                    </button>
                    <button onClick={() => handleAction('quote')} className="px-4 py-2.5 rounded-lg border text-left hover:bg-gray-50 text-sm" style={{ borderColor: '#e5e7eb' }}>
                      🧾 Request Quote
                    </button>
                  </div>
                )}

                {step === 'contact' && selectedModel && (
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600">For {selectedModel.name}</div>
                    <input
                      placeholder="Full Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    />
                    <input
                      placeholder="Email"
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    />
                    <input
                      placeholder="Phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    />
                    <input
                      placeholder="Company"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={contact.company}
                      onChange={(e) => setContact({ ...contact, company: e.target.value })}
                    />
                    <textarea
                      placeholder="Briefly describe your requirement (e.g., speeds, formats, constraints)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-20"
                      value={contact.requirements}
                      onChange={(e) => setContact({ ...contact, requirements: e.target.value })}
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={submitLead}
                        disabled={formLoading}
                        className={`flex-1 px-4 py-2 rounded-lg text-white text-sm ${formLoading ? 'bg-brand-blue-400' : 'hover:opacity-95'}`}
                        style={{ backgroundColor: BRAND_COLORS.primary.blue }}
                      >
                        {formLoading ? 'Submitting...' : 'Submit'}
                      </button>
                      <button onClick={() => setStep('action')} className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50">Back</button>
                    </div>
                  </div>
                )}

                {step === 'submitted' && (
                  <div className="space-y-3 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Thanks! We will reach out shortly.</p>
                    <button onClick={handleClose} className="mt-1 px-4 py-2 rounded-lg text-white text-sm w-full hover:opacity-95" style={{ backgroundColor: BRAND_COLORS.primary.blue }}>
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


