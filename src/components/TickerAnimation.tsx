'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export default function TickerAnimation() {
  const fallbackMessages = useMemo(() => [
    "India's First Secondary Packaging Machine Manufacturer",
    "We are going to Anuga Food Tech 2025",
    "90% of Spices in India are Packed by Our Machines",
    "800+ Successful Installations Across Industries",
    "Trusted by Mars, Unilever & Leading FMCG Brands",
    "ISO 9001:2015 Certified Manufacturing Excellence",
    "First in Industry Pouch-in-Pouch Bundling Technology",
    "Serving Food, FMCG, Personal Care & Pharmaceuticals"
  ], []);

  // Start with no messages to avoid showing fallback text before we know DB state
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('ticker_messages')
          .select('position, text')
          .order('position', { ascending: true });

        if (!error && isMounted && data && data.length > 0) {
          const sorted = data
            .sort((a: any, b: any) => a.position - b.position)
            .map((row: any) => row.text)
            .filter((text: string) => text && text.trim().length > 0);
          if (sorted.length > 0) {
            setMessages(sorted);
          } else {
            setMessages(fallbackMessages);
          }
          // Reset ticker to start
          setCurrentMessageIndex(0);
          setDisplayedText('');
          setIsTyping(true);
        } else if (isMounted) {
          // On error or empty response, use fallback after fetch completes
          setMessages(fallbackMessages);
          setCurrentMessageIndex(0);
          setDisplayedText('');
          setIsTyping(true);
        }
      } catch (error) {
        console.warn('Failed to fetch ticker messages, using fallback:', error);
        // Fallback messages are already set in initial state
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMessages();

    return () => { isMounted = false; };
  }, [fallbackMessages]);

  useEffect(() => {
    // Safety check for empty messages array
    if (isLoading || messages.length === 0) return;
    
    const currentMessage = messages[currentMessageIndex] ?? '';
    
    // Skip empty messages but prevent infinite loops
    if (!currentMessage.trim()) {
      const nextIndex = (currentMessageIndex + 1) % messages.length;
      // Check if we've cycled through all messages and all are empty
      if (nextIndex === 0) {
        // If all messages are empty, fallback to fallback messages
        const validFallbacks = fallbackMessages.filter(msg => msg.trim().length > 0);
        if (validFallbacks.length > 0) {
          setMessages(validFallbacks);
          setCurrentMessageIndex(0);
          setDisplayedText('');
          setIsTyping(true);
          return;
        }
      }
      setCurrentMessageIndex(nextIndex);
      return;
    }
    
    if (isTyping) {
      if (displayedText.length < currentMessage.length) {
        const timer = setTimeout(() => {
          setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
        }, 75);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } else {
      if (displayedText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 25);
        return () => clearTimeout(timer);
      } else {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentMessageIndex, messages, fallbackMessages, isLoading]);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full bg-gradient-to-r from-brand-blue-500/90 via-brand-blue-600/90 to-brand-green-500/90 overflow-hidden backdrop-blur-sm">
      {/* Subtle animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.08) 15px, rgba(255,255,255,0.08) 30px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Main ticker content */}
      <div className="relative z-10 h-16 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-center h-full">
            {/* Typewriter text - perfectly centered */}
            <div className="text-center flex-1 flex items-center justify-center">
              <div className="text-white text-lg md:text-xl lg:text-2xl font-bold font-product-sans tracking-wide">
                <span className="inline-flex items-center">
                  {!isLoading && (
                    <>
                      {displayedText}
                      <motion.span
                        animate={{ opacity: showCursor ? 1 : 0 }}
                        transition={{ duration: 0.15 }}
                        className="inline-block w-0.5 h-5 md:h-6 lg:h-7 bg-white ml-1.5"
                      />
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Subtle message counter */}
            <div className="flex-shrink-0 ml-6 hidden lg:flex items-center">
              <div className="text-white/60 text-xs font-medium font-product-sans">
                {String(currentMessageIndex + 1).padStart(2, '0')} / {String(messages.length).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant border effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* Subtle side fade */}
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/5 to-transparent pointer-events-none"></div>
    </div>
  );
}