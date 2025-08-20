'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const GREEN = '#5dc027';
const BLUE = '#0f4277';

interface BaseMenuItem {
  name: string;
  href: string;
}

interface SubMenuItem {
  name: string;
  href?: string;
  submenu?: SubMenuItem[];
}

interface MenuItem {
  name: string;
  href?: string;
  submenu?: SubMenuItem[];
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'product' | 'blog' | 'event' | 'page';
  category?: string;
  image?: string;
  relevance: number;
}

const Header = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchSuggestions, setSearchSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openNestedSubmenu, setOpenNestedSubmenu] = useState<string | null>(null);
  const [openDeepNestedSubmenu, setOpenDeepNestedSubmenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [mounted]);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  // Handle click outside search bar
  useEffect(() => {
    if (!mounted) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchExpanded &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside, { passive: true });
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearchExpanded, mounted]);

  // Debounced search suggestions
  useEffect(() => {
    if (!searchQuery.trim() || !isSearchExpanded) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        
        if (data.success && data.results) {
          setSearchSuggestions(data.results.slice(0, 5)); // Show top 5 suggestions
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Search suggestions error:', error);
        setSearchSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, isSearchExpanded]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || searchSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < searchSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestion >= 0) {
          const suggestion = searchSuggestions[selectedSuggestion];
          router.push(suggestion.url);
          setSearchQuery('');
          setIsSearchExpanded(false);
          setShowSuggestions(false);
          setSelectedSuggestion(-1);
        } else {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setIsSearchExpanded(false);
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        break;
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!mounted) return;
    
    if (isMenuOpen && typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    } else if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isMenuOpen, mounted]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setIsSearching(true);
      setError(null);
      
      // Encode the search query for URL safety
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      
      // Navigate to search page
      router.push(`/search?q=${encodedQuery}`);
      
      // Clear search after successful navigation
      setSearchQuery('');
      setIsSearchExpanded(false);
    } catch (error) {
      console.error('Search navigation error:', error);
      setError('Failed to perform search. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const navItems: MenuItem[] = [
    { name: 'HOME', href: '/' },
    {
      name: 'ABOUT US',
      submenu: [
        { name: 'Profile', href: '/about/profile' },

        { name: 'Infrastructure', href: '/about/infrastructure' },
        { name: 'Awards and Certifications', href: '/about/awards' }
      ],
    },
    {
      name: 'EXPLORE BY SOLUTION',
      submenu: [
        {
          name: 'Bundling and Wrapping Machines',
          href: '/products/bundling-wrapping',
          submenu: [
            { name: 'Secondary Packaging for Pouches (IBP-120)', href: '/products/bundling-wrapping/ibp-120' },
            { name: 'Secondary Packaging for Strip of Pouches (IBS-200)', href: '/products/bundling-wrapping/ibs-200' },
            { name: 'Automatic Shrink Wrapping Machine for Pouches (ISP-120)', href: '/products/bundling-wrapping/isp-120' },
            { name: 'Secondary Packaging for Multitrack VFFS (IMS-800/IMS-600)', href: '/products/bundling-wrapping/ims-800' },
            { name: 'Automatic Shrink Wrapping Machine for Bottles (IWB-200)', href: '/products/bundling-wrapping/iwb-200' }
          ]
        },
        {
          name: 'Automatic Pouch Baler Systems',
          href: '/products/pouch-baler',
          submenu: [
            { name: 'Automatic Baler Machine for Pouches (IBL-500)', href: '/products/pouch-baler/ibl-500' },
            { name: 'Automatic Bagging Machine (IBG-H8 & IBG-V8)', href: '/products/pouch-baler/ibg-h8-v8' }
          ]
        },
        {
          name: 'Cartoning Machines',
          href: '/products/cartoning',
          submenu: [
            { name: 'Automatic Cartoning Machine (ACM-100)', href: '/products/cartoning/acm-100' },
            { name: 'Semi Automatic Cartoning Machine (ACM-40)', href: '/products/cartoning/acm-40' }
          ]
        },
        {
          name: 'Automatic Case Packers',
          href: '/products/case-packers',
          submenu: [
            { name: 'Automated Case Packer for Pouches (ICP-120)', href: '/products/case-packers/icp-120' },
            { name: 'Automated Case Packer for Strip of Pouches (ICS-200)', href: '/products/case-packers/ics-200' },
            { name: 'Automated Case Packer for Bottles (ICB-120)', href: '/products/case-packers/icb-120' },
            { name: 'Automatic Case Erectors and Sealers', href: '/products/case-packers/case-erector' }
          ]
        },
        {
          name: 'Checkweighers & Inspection',
          href: '/products/checkweighers-inspection'
        },
        {
          name: 'Conveying Solutions',
          href: '/products/conveying'
        }
      ]
    },
    {
      name: 'EXPLORE BY INDUSTRY',
      submenu: [
        {
          name: 'Food & Beverage',
          submenu: [
            {
              name: 'Tea & Spices',
              submenu: [
                { name: 'IBP-120', href: '/products/bundling-wrapping/ibp-120' },
                { name: 'IBS-200', href: '/products/bundling-wrapping/ibs-200' },
                { name: 'ACM-40', href: '/products/cartoning/acm-40' },
                { name: 'ICP-120', href: '/products/case-packers/icp-120' },
                { name: 'IBG-8', href: '/products/pouch-baler/ibg-h8-v8' },
                { name: 'IMS-600/800', href: '/products/bundling-wrapping/ims-800' }
              ]
            },
            {
              name: 'Beverage',
              submenu: [
                { name: 'IBP-120', href: '/products/bundling-wrapping/ibp-120' },
                { name: 'ICB-200', href: '/products/case-packers/icb-120' }
              ]
            },
            {
              name: 'Biscuits',
              submenu: [
                { name: 'IBP-200', href: '/products/bundling-wrapping/ibp-120' },
                { name: 'ICP-120', href: '/products/case-packers/icp-120' }
              ]
            },
            {
              name: 'Sugar / Flour / Staple Foods',
              submenu: [
                { name: 'IBL-500', href: '/products/pouch-baler/ibl-500' },
                { name: 'IBG-8', href: '/products/pouch-baler/ibg-h8-v8' }
              ]
            }
          ]
        },
        {
          name: 'Pharmaceuticals',
          submenu: [
            { name: 'ICP-120', href: '/products/case-packers/icp-120' },
            { name: 'ACM-40/100', href: '/products/cartoning/acm-100' },
            { name: 'Check Weighers ICW', href: '/products/checkweighers-inspection' }
          ]
        },
        {
          name: 'Personal Care',
          submenu: [
            { name: 'IBP-120', href: '/products/bundling-wrapping/ibp-120' },
            { name: 'ICP-120', href: '/products/case-packers/icp-120' },
            { name: 'ACM-40/100', href: '/products/cartoning/acm-100' }
          ]
        },
        {
          name: 'Chemical',
          submenu: [
            { name: 'IBP-120', href: '/products/bundling-wrapping/ibp-120' },
            { name: 'ICP-120', href: '/products/case-packers/icp-120' }
          ]
        },
        {
          name: 'Automotive',
          submenu: [
            { name: 'ACM-40/100', href: '/products/cartoning/acm-100' },
            { name: 'ICP-120', href: '/products/case-packers/icp-120' },
            { name: 'Conveying Solutions', href: '/products/conveying' }
          ]
        },
        {
          name: 'E-commerce',
          submenu: [
            { name: 'ICP-120', href: '/products/case-packers/icp-120' },
            { name: 'Taping System', href: '/products/case-packers/case-sealer' },
            { name: 'Check Weigher', href: '/products/checkweighers-inspection' },
            { name: 'Conveying Solutions', href: '/products/conveying' }
          ]
        }
      ]
    },
    { name: 'CLIENTELE', href: '/clientele' },
    { name: 'EVENTS', href: '/events' },
    { name: 'CAREERS', href: '/careers' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'BLOG', href: '/blog' },
  ];

  return (
    <>
      {/* Enhanced Mobile-First Responsive Navbar */}
      <motion.header
        role="banner"
        className={`fixed w-full top-0 z-50 transition-gpu ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-[8px] shadow-lg border-b border-white/20' 
            : 'bg-white/80 backdrop-blur-[6px] shadow-md'
        }`}
        style={{
          transform: 'translateZ(0)',
          willChange: 'transform, opacity',
          background: isScrolled 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.8) 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24 lg:h-28">
            {/* Optimized Logo */}
            <Link href="/" prefetch={false} className="flex-shrink-0">
              <div className="relative w-56 h-16 sm:w-72 sm:h-20 lg:w-80 lg:h-24 transform-gpu">
                <Image
                  src="/logos/logo.png"
                  alt="Infinity Automated Solutions"
                  fill
                  className="object-contain"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 320px"
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </Link>

            {/* Optimized Search and Menu */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative" role="search">
                <motion.form
                  onSubmit={handleSearch}
                  animate={{ 
                    width: isSearchExpanded ? (typeof window !== 'undefined' && window.innerWidth < 640 ? '160px' : '220px') : '40px'
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className={`relative flex items-center transform-gpu ${
                    isSearchExpanded ? 'bg-white/90' : 'bg-white/70'
                  } rounded-full border border-white/30 shadow-sm`}
                >
                  <motion.input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={isSearching}
                    onKeyDown={handleKeyDown}
                    aria-label="Search products"
                    id="site-search-input"
                    animate={{ 
                      width: isSearchExpanded ? '100%' : '0%',
                      padding: isSearchExpanded ? '0.5rem 2.5rem 0.5rem 1rem' : '0'
                    }}
                    transition={{ duration: 0.3 }}
                    className={`bg-transparent outline-none text-gray-700 text-sm transform-gpu ${
                      isSearchExpanded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <button
                    type={isSearchExpanded ? 'submit' : 'button'}
                    onClick={() => !isSearchExpanded && setIsSearchExpanded(true)}
                    disabled={isSearching}
                    className={`${
                      isSearchExpanded ? 'absolute right-2' : 'p-2'
                    } rounded-full transition-gpu`}
                    aria-label={isSearchExpanded ? 'Search' : 'Open search'}
                    aria-expanded={isSearchExpanded}
                    aria-controls="site-search-input"
                  >
                    <MagnifyingGlassIcon 
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        isSearching ? 'animate-pulse' : ''
                      } text-gray-700 transition-gpu`} 
                    />
                  </button>
                </motion.form>

                {/* Search Suggestions Dropdown */}
                <AnimatePresence>
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden"
                    >
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={suggestion.id}
                          onClick={() => {
                            router.push(suggestion.url);
                            setSearchQuery('');
                            setIsSearchExpanded(false);
                            setShowSuggestions(false);
                            setSelectedSuggestion(-1);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                            selectedSuggestion === index ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${
                              suggestion.type === 'product' ? 'bg-blue-500' :
                              suggestion.type === 'page' ? 'bg-green-500' : 'bg-purple-500'
                            }`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {suggestion.title}
                              </p>
                              {suggestion.category && (
                                <p className="text-xs text-gray-500 truncate">
                                  {suggestion.category}
                                </p>
                              )}
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              suggestion.type === 'product' ? 'bg-blue-100 text-blue-700' :
                              suggestion.type === 'page' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                              {suggestion.type}
                            </span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-red-50 border border-red-200 rounded-lg p-3 z-50"
                  >
                    <p className="text-sm text-red-700">{error}</p>
                  </motion.div>
                )}
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full bg-white/70 backdrop-blur-[4px] 
                         border border-white/30 transition-all duration-200 transform-gpu 
                         hover:bg-white/80 hover:scale-105 active:scale-95"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                aria-controls="main-menu-drawer"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 transition-gpu" />
                ) : (
                  <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 transition-gpu" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Optimized Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm sm:max-w-md md:max-w-lg 
                         bg-white/95 backdrop-blur-[8px] shadow-xl z-50 overflow-y-auto transform-gpu"
              role="dialog" aria-modal="true" aria-label="Main menu"
              id="main-menu-drawer"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.95) 100%)',
              }}
            >
              {/* Menu Content */}
              <div className="p-4 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-white/60 transition-gpu transform-gpu"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-600 transition-gpu" />
                  </button>
                </div>
              </div>

              <nav className="p-4" role="navigation" aria-label="Primary">
                {navItems.map((item) => (
                  <div key={item.name} className="mb-2">
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                          className="flex items-center justify-between w-full p-3 text-left text-gray-800 
                                   rounded-lg transition-gpu transform-gpu hover:bg-white/60"
                        >
                          <span className="font-medium">{item.name}</span>
                          <motion.svg
                            animate={{ rotate: openSubmenu === item.name ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="h-4 w-4 text-gray-600 transform-gpu"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </button>
                        
                        <AnimatePresence>
                          {openSubmenu === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="ml-4 mt-2 overflow-hidden"
                            >
                              {item.submenu.map((subItem) => (
                                <div key={subItem.name} className="mb-1">
                                  {'submenu' in subItem ? (
                                    <>
                                      <button
                                        onClick={() => setOpenNestedSubmenu(openNestedSubmenu === subItem.name ? null : subItem.name)}
                                        className="flex items-center justify-between w-full p-2 text-left text-gray-700 
                                                 rounded-md transition-gpu transform-gpu hover:bg-white/40 text-sm"
                                      >
                                        <span className="font-medium">{subItem.name}</span>
                                        <motion.svg
                                          animate={{ rotate: openNestedSubmenu === subItem.name ? 180 : 0 }}
                                          transition={{ duration: 0.3 }}
                                          className="h-3 w-3 text-gray-500 transform-gpu"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </motion.svg>
                                      </button>
                                      
                                      <AnimatePresence>
                                        {openNestedSubmenu === subItem.name && (
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="ml-4 mt-1 overflow-hidden"
                                          >
                                            {subItem.submenu?.map((nestedItem) => (
                                              <div key={nestedItem.name} className="mb-1">
                                                {'submenu' in nestedItem && nestedItem.submenu ? (
                                                  <>
                                                    <button
                                                      onClick={() => setOpenDeepNestedSubmenu(openDeepNestedSubmenu === nestedItem.name ? null : nestedItem.name)}
                                                      className="flex items-center justify-between w-full p-2 text-left text-gray-600 
                                                               rounded-md transition-gpu transform-gpu hover:bg-white/40 text-sm"
                                                    >
                                                      <span className="font-medium">{nestedItem.name}</span>
                                                      <motion.svg
                                                        animate={{ rotate: openDeepNestedSubmenu === nestedItem.name ? 180 : 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="h-3 w-3 text-gray-500 transform-gpu"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                      >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                      </motion.svg>
                                                    </button>
                                                    
                                                    <AnimatePresence>
                                                      {openDeepNestedSubmenu === nestedItem.name && (
                                                        <motion.div
                                                          initial={{ opacity: 0, height: 0 }}
                                                          animate={{ opacity: 1, height: 'auto' }}
                                                          exit={{ opacity: 0, height: 0 }}
                                                          transition={{ duration: 0.3 }}
                                                          className="ml-4 mt-1 overflow-hidden"
                                                        >
                                                          {nestedItem.submenu?.map((deepNestedItem) => (
                                                            <button
                                                              key={deepNestedItem.name}
                                                              onClick={() => {
                                                                setIsMenuOpen(false);
                                                                setOpenSubmenu(null);
                                                                setOpenNestedSubmenu(null);
                                                                setOpenDeepNestedSubmenu(null);
                                                                if (deepNestedItem.href) {
                                                                  router.push(deepNestedItem.href);
                                                                }
                                                              }}
                                                              className="w-full text-left p-2 text-gray-500 rounded-md transition-gpu 
                                                                       transform-gpu hover:bg-white/40 text-xs"
                                                            >
                                                              {deepNestedItem.name}
                                                            </button>
                                                          ))}
                                                        </motion.div>
                                                      )}
                                                    </AnimatePresence>
                                                  </>
                                                ) : (
                                                  <button
                                                    onClick={() => {
                                                      setIsMenuOpen(false);
                                                      setOpenSubmenu(null);
                                                      setOpenNestedSubmenu(null);
                                                      setOpenDeepNestedSubmenu(null);
                                                      if (nestedItem.href) {
                                                        router.push(nestedItem.href);
                                                      }
                                                    }}
                                                    className="w-full text-left p-2 text-gray-600 rounded-md transition-gpu 
                                                             transform-gpu hover:bg-white/40 text-sm"
                                                  >
                                                    {nestedItem.name}
                                                  </button>
                                                )}
                                              </div>
                                            ))}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        setIsMenuOpen(false);
                                        setOpenSubmenu(null);
                                        setOpenDeepNestedSubmenu(null);
                                        if (subItem.href) {
                                          router.push(subItem.href);
                                        }
                                      }}
                                      className="w-full text-left p-2 text-gray-700 rounded-md transition-gpu 
                                               transform-gpu hover:bg-white/40 text-sm"
                                    >
                                      {subItem.name}
                                    </button>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          setOpenSubmenu(null);
                          setOpenNestedSubmenu(null);
                          setOpenDeepNestedSubmenu(null);
                          router.push(item.href || '#');
                        }}
                        className="w-full text-left p-3 text-gray-800 rounded-lg transition-gpu 
                                 transform-gpu hover:bg-white/60 font-medium"
                      >
                        {item.name}
                      </button>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header; 