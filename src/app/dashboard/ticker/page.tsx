'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

const DEFAULTS = [
  "India's First Secondary Packaging Machine Manufacturer",
  'We are going to Anuga Food Tech 2025',
  '90% of Spices in India are Packed by Our Machines',
  '800+ Successful Installations Across Industries',
  'Trusted by Mars, Unilever & Leading FMCG Brands',
  'ISO 9001:2015 Certified Manufacturing Excellence',
  'First in Industry Pouch-in-Pouch Bundling Technology',
  'Serving Food, FMCG, Personal Care & Pharmaceuticals',
];

export default function TickerEditorPage() {
  const [lines, setLines] = useState<string[]>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchTicker = async () => {
      const { data, error } = await supabase
        .from('ticker_messages')
        .select('position, text')
        .order('position', { ascending: true });

      if (!error && data && data.length > 0 && isMounted) {
        const arr = Array.from({ length: 8 }, (_, i) => {
          const found = data.find((d: any) => d.position === i + 1);
          return found?.text ?? DEFAULTS[i];
        });
        setLines(arr);
      }
      setLoading(false);
    };

    fetchTicker();
    return () => { isMounted = false; };
  }, []);

  const onChange = (i: number, val: string) => {
    setLines(prev => prev.map((v, idx) => (idx === i ? val : v)));
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = lines.map((text, idx) => ({ position: idx + 1, text }));
      const { error } = await supabase.from('ticker_messages').upsert(payload, { onConflict: 'position' });
      if (error) throw error;
      setSavedAt(new Date());
    } catch (e) {
      console.error('Failed to save ticker messages', e);
      alert('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Ticker Messages</h1>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      {savedAt && (
        <div className="text-sm text-green-600">Saved at {savedAt.toLocaleTimeString()}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Line {i + 1}</label>
              <span className="text-xs text-gray-400">{lines[i]?.length ?? 0}/200</span>
            </div>
            <input
              type="text"
              maxLength={200}
              value={lines[i] ?? ''}
              onChange={(e) => onChange(i, e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </motion.div>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        Notes: Lines are displayed in order. Keep messages concise for best appearance.
      </div>
    </div>
  );
}
