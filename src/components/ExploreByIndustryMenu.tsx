'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface MenuItem {
  title: string;
  children?: (string | MenuItem)[];
  href?: string;
}

const industries: MenuItem[] = [
  {
    title: "Food & Beverage",
    children: [
      { 
        title: "Tea & Spices", 
        children: [
          { title: "IBP-120", href: "/products/bundling-wrapping/ibp-120" },
          { title: "IBS-200", href: "/products/bundling-wrapping/ibs-200" },
          { title: "ACM-40", href: "/products/cartoning/acm-40" },
          { title: "ICP-120", href: "/products/case-packers/icp-120" },
          { title: "IBG-8", href: "/products/pouch-baler/ibg-h8-v8" },
          { title: "IMS-600/800", href: "/products/bundling-wrapping/ims-800" }
        ]
      },
      { 
        title: "Beverage", 
        children: [
          { title: "IBP-120", href: "/products/bundling-wrapping/ibp-120" },
          { title: "ICB-200", href: "/products/case-packers/icb-120" }
        ]
      },
      { 
        title: "Biscuits", 
        children: [
          { title: "IBP-200", href: "/products/bundling-wrapping/ibp-120" },
          { title: "ICP-120", href: "/products/case-packers/icp-120" }
        ]
      },
      { 
        title: "Sugar / Flour / Staple Foods", 
        children: [
          { title: "IBL-500", href: "/products/pouch-baler/ibl-500" },
          { title: "IBG-8", href: "/products/pouch-baler/ibg-h8-v8" }
        ]
      }
    ]
  },
  {
    title: "Pharmaceuticals",
    children: [
      { title: "ICP-120", href: "/products/case-packers/icp-120" },
      { title: "ACM-40/100", href: "/products/cartoning/acm-100" },
      { title: "Check Weighers ICW", href: "/products/checkweighers-inspection" }
    ]
  },
  {
    title: "Personal Care",
    children: [
      { title: "IBP-120", href: "/products/bundling-wrapping/ibp-120" },
      { title: "ICP-120", href: "/products/case-packers/icp-120" },
      { title: "ACM-40/100", href: "/products/cartoning/acm-100" }
    ]
  },
  {
    title: "Chemical",
    children: [
      { title: "IBP-120", href: "/products/bundling-wrapping/ibp-120" },
      { title: "ICP-120", href: "/products/case-packers/icp-120" }
    ]
  },
  {
    title: "Automotive",
    children: [
      { title: "ACM-40/100", href: "/products/cartoning/acm-100" },
      { title: "ICP-120", href: "/products/case-packers/icp-120" },
      { title: "Conveying Solutions", href: "/products/conveying" }
    ]
  },
  {
    title: "E-commerce",
    children: [
      { title: "ICP-120", href: "/products/case-packers/icp-120" },
      { title: "Taping System", href: "/products/case-packers/case-sealer" },
      { title: "Check Weigher", href: "/products/checkweighers-inspection" },
      { title: "Conveying Solutions", href: "/products/conveying" }
    ]
  }
];

function NestedMenu({ items }: { items: (string | MenuItem)[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="ml-4 border-l border-gray-200 pl-4 space-y-2">
      {items.map((item, idx) => {
        if (typeof item === "string") {
          return (
            <li key={idx} className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200">
              {item}
            </li>
          );
        }

        // If item has href, it's a clickable model
        if (item.href) {
          return (
            <li key={idx}>
              <Link
                href={item.href}
                className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200 block py-1"
              >
                {item.title}
              </Link>
            </li>
          );
        }

        // If item has children, it's a category
        return (
          <li key={idx}>
            <button
              className="flex items-center justify-between w-full text-left font-medium text-gray-800 hover:text-blue-700 transition-colors duration-200 py-1"
              onClick={() => setOpen(open === item.title ? null : item.title)}
            >
              {item.title}
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${open === item.title ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {open === item.title && item.children && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <NestedMenu items={item.children} />
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

export default function ExploreByIndustryMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="px-4 py-2 text-gray-800 font-medium hover:text-blue-700 transition-colors duration-200"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
      >
        EXPLORE BY INDUSTRY
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-80 bg-white/95 backdrop-blur-[8px] border border-white/30 rounded-xl shadow-lg p-4 z-50 max-h-[500px] overflow-y-auto"
            onMouseLeave={() => setOpen(false)}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.95) 100%)',
            }}
          >
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">INDUSTRIES</h3>
            </div>
            <NestedMenu items={industries} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
