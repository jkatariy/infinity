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

      if (isMounted) {
        if (!error && data && data.length > 0) {
          const sorted = data
            .sort((a: any, b: any) => a.position - b.position)
            .map((row: any) => row.text);
          setLines(sorted);
        } else {
          // Fallback to defaults if nothing in DB
          setLines(DEFAULTS);
        }
        setLoading(false);
      }
    };

    fetchTicker();
    return () => { isMounted = false; };
  }, []);

  const onChange = (i: number, val: string) => {
    setLines(prev => prev.map((v, idx) => (idx === i ? val : v)));
  };

  const addLine = () => {
    setLines(prev => [...prev, '']);
  };

  const removeLine = (indexToRemove: number) => {
    setLines(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const save = async () => {
    setSaving(true);
    try {
      // Filter out empty messages and ensure at least one message exists
      const validLines = lines
        .map(t => (t ?? '').trim())
        .filter(text => text.length > 0);

      if (validLines.length === 0) {
        alert('Please add at least one message before saving.');
        setSaving(false);
        return;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('You must be logged in to save ticker messages.');
        setSaving(false);
        return;
      }

             // Create ticker approval request with enhanced data
       const tickerText = validLines.join(' | ');
       const { error: approvalError } = await supabase
         .from('ticker_approvals')
         .insert({
           ticker_text: tickerText,
           submitted_by: user.id,
           status: 'pending',
           action_type: 'create',
           content_data: {
             ticker_messages: validLines
           }
         });

      if (approvalError) {
        console.error('Approval error:', approvalError);
        throw new Error('Failed to submit for approval');
      }

      setSavedAt(new Date());
      alert('Ticker messages submitted for CMD approval. You will be notified once approved.');
    } catch (e) {
      console.error('Failed to save ticker messages', e);
      alert('Failed to submit for approval. Please try again.');
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
          {saving ? 'Submitting...' : 'Submit for Approval'}
        </button>
      </div>
      
      {/* Approval Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Approval Required</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>All ticker changes require CMD approval before being published. Your changes will be submitted for review.</p>
            </div>
          </div>
        </div>
      </div>

      {savedAt && (
        <div className="text-sm text-green-600">Submitted for approval at {savedAt.toLocaleTimeString()}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lines.map((value, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Line {i + 1}</label>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{value?.length ?? 0}/200</span>
                <button
                  type="button"
                  onClick={() => removeLine(i)}
                  className="text-red-600 hover:text-red-700 text-xs font-medium"
                  aria-label={`Remove line ${i + 1}`}
                >
                  Remove
                </button>
              </div>
            </div>
            <input
              type="text"
              maxLength={200}
              value={value ?? ''}
              onChange={(e) => onChange(i, e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </motion.div>
        ))}
      </div>

      <div>
        <button
          type="button"
          onClick={addLine}
          className="inline-flex items-center px-3 py-2 rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100"
        >
          + Add line
        </button>
      </div>

      <div className="text-sm text-gray-500">
        Notes: Lines are displayed in order. Keep messages concise for best appearance.
      </div>
    </div>
  );
}
