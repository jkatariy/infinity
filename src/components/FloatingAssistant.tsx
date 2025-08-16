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
    { name: 'Conveying Solutions', label: 'Material Handling & Conveying', href: '/products/conveying' },
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

type Step = 'closed' | 'industry' | 'category' | 'model' | 'lead' | 'action';

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
  const [leadError, setLeadError] = useState<string | null>(null);
  const [lead, setLead] = useState({ name: '', email: '', phone: '' });
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const pushMessage = (msg: Omit<ChatMessage, 'id'>) => {
    setMessages((prev) => [...prev, { id: Math.random().toString(36).slice(2), ...msg }]);
  };

  const resetFlow = () => {
    setSelectedIndustry('');
    setSelectedCategory('');
    setSelectedModel(null);
    setLead({ name: '', email: '', phone: '' });
    setLeadError(null);
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

  const handleAction = (action: 'video' | 'view') => {
    if (!selectedModel) return;
    window.open(selectedModel.href, '_blank');
    pushMessage({ role: 'user', text: action === 'view' ? 'View product page' : 'Watch video' });
    pushMessage({ role: 'bot', text: 'Opened in a new tab. Anything else I can help with?' });
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
        <div className="fixed bottom-24 right-4 left-4 md:left-auto md:right-5 z-50 w-auto max-w-md animate-scaleIn">
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
            <div className="flex flex-col h-[65vh] md:h-96">
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

                {leadError && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl px-3 py-2 text-sm bg-red-50 text-red-700 border border-red-200">
                      {leadError}
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
                          pushMessage({ role: 'bot', text: 'Before we proceed, please share your name, email, and phone.' });
                          setStep('lead');
                        }}
                        className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border text-left hover:bg-gray-50"
                        style={{ borderColor: '#e5e7eb', color: '#111827' }}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                )}

                {step === 'lead' && selectedModel && (
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600">For {selectedModel.name}</div>
                    <input
                      placeholder="Full Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={lead.name}
                      onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    />
                    <input
                      placeholder="Email"
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={lead.email}
                      onChange={(e) => setLead({ ...lead, email: e.target.value })}
                    />
                    <input
                      placeholder="Phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={lead.phone}
                      onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={async () => {
                          if (!lead.name || !lead.email || !lead.phone) {
                            setLeadError('Please fill in name, email, and phone.');
                            return;
                          }
                          setLeadError(null);
                          
                          try {
                            // Submit minimal lead to Zoho via server API
                            const response = await fetch('/api/chatbot-leads', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                name: lead.name,
                                email: lead.email,
                                phone: lead.phone,
                              }),
                            });

                            const result = await response.json();

                            if (!response.ok) {
                              throw new Error(result.error || 'Failed to submit lead');
                            }

                            pushMessage({ role: 'user', text: `${lead.name} • ${lead.email} • ${lead.phone}` });
                            pushMessage({ role: 'bot', text: 'Thanks! Your information has been shared with our team. What would you like to do next?' });
                            setStep('action');
                          } catch (error: any) {
                            setLeadError(error.message || 'Failed to save your information. Please try again.');
                          }
                        }}
                        className="flex-1 px-4 py-2 rounded-lg text-white text-sm hover:opacity-95"
                        style={{ backgroundColor: BRAND_COLORS.primary.blue }}
                      >
                        Continue
                      </button>
                      <button onClick={() => setStep('model')} className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50">Back</button>
                    </div>
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


