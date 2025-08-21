'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import PageContainer from '@/components/PageContainer';
import Image from 'next/image';

// Enhanced types for comprehensive solution selection
type Industry = {
  id: string;
  name: string;
  description: string;
  icon: string;
  commonProducts: string[];
  commonRequirements: {
    speeds: string[];
    productTypes: string[];
    compliance?: string[];
  };
};

type PackagingSolution = {
  id: string;
  name: string;
  description: string;
  icon: string;
  productTypes: string[];
  industries: string[];
  speedRange: string;
};

type Requirements = {
  productType: string;
  inputSpeed: number;
  outputSpeed: number;
  packagingMaterial: string;
  automation: 'manual' | 'semi-auto' | 'full-auto';
  budget: 'economy' | 'standard' | 'premium';
  specialRequirements: string[];
};

type ProductModel = {
  id: string;
  name: string;
  model: string;
  category: string;
  description: string;
  application: string;
  specs: {
    inputSpeed: string;
    outputSpeed: string;
    productType: string[];
    packagingMaterial: string[];
    powerConsumption: string;
    machineSize: string;
    automation: 'manual' | 'semi-auto' | 'full-auto';
    priceCategory: 'economy' | 'standard' | 'premium';
  };
  features: string[];
  industries: string[];
  matchScore: number;
  productUrl: string;
  technicalHighlights: string[];
};

// Comprehensive industry data based on market analysis
const industries: Industry[] = [
  {
    id: 'food-beverage',
    name: 'Food & Beverage',
    description: 'High-speed packaging for consumables with strict hygiene and safety standards',
    icon: '🍽️',
    commonProducts: ['pouches', 'bottles', 'cartons', 'strips'],
    commonRequirements: {
      speeds: ['60-120 PPM', '100+ cartons/min'],
      productTypes: ['Single pouches', 'Bottles/jars', 'Sachets', 'Strip pouches'],
      compliance: ['Food grade SS-304', 'FDA compliant', 'Easy cleaning']
    }
  },
  {
    id: 'pharmaceuticals',
    name: 'Pharmaceuticals',
    description: 'Precision packaging with validation protocols and regulatory compliance',
    icon: '💊',
    commonProducts: ['pouches', 'cartons', 'strips', 'bottles'],
    commonRequirements: {
      speeds: ['40-100 PPM', 'Medium to high speed'],
      productTypes: ['Blister packs', 'Pouches', 'Bottles', 'Cartons'],
      compliance: ['cGMP compliant', 'Validation protocols', 'Clean room compatible']
    }
  },
  {
    id: 'personal-care',
    name: 'Personal Care & Cosmetics',
    description: 'Aesthetic packaging solutions maintaining product integrity and visual appeal',
    icon: '🧴',
    commonProducts: ['bottles', 'pouches', 'cartons'],
    commonRequirements: {
      speeds: ['40-80 PPM', 'Medium speed operations'],
      productTypes: ['Bottles/jars', 'Sachets', 'Tubes'],
      compliance: ['Aesthetic finish', 'Gentle handling', 'Brand protection']
    }
  },
  {
    id: 'spices-masala',
    name: 'Spices & Masala',
    description: 'Specialized handling for powder products with dust-free packaging',
    icon: '🌶️',
    commonProducts: ['pouches', 'strips', 'cartons'],
    commonRequirements: {
      speeds: ['80-120 PPM', 'High speed bundling'],
      productTypes: ['Single pouches', 'Strip pouches', 'Sachets'],
      compliance: ['Dust control', 'Aroma preservation', 'Quick changeover']
    }
  },
  {
    id: 'dairy-beverages',
    name: 'Dairy & Beverages',
    description: 'Cold chain compatible packaging with moisture protection',
    icon: '🥛',
    commonProducts: ['pouches', 'bottles', 'cartons'],
    commonRequirements: {
      speeds: ['60-120 PPM', 'Continuous operation'],
      productTypes: ['Pouches', 'Bottles', 'Tetra packs'],
      compliance: ['Cold storage compatible', 'Moisture barrier', 'Food grade']
    }
  },
  {
    id: 'textiles-apparel',
    name: 'Textiles & Apparel',
    description: 'Protective packaging ensuring product quality during transport',
    icon: '👕',
    commonProducts: ['bundles', 'cartons', 'bags'],
    commonRequirements: {
      speeds: ['20-60 PPM', 'Medium speed operations'],
      productTypes: ['Fabric bundles', 'Garments', 'Textile products'],
      compliance: ['Dust protection', 'Compression resistance', 'Easy handling']
    }
  },
  {
    id: 'e-commerce',
    name: 'E-commerce & Fulfillment',
    description: 'Versatile packaging for diverse products with tracking integration',
    icon: '📦',
    commonProducts: ['cartons', 'pouches', 'cases'],
    commonRequirements: {
      speeds: ['Variable speed', 'Flexible operations'],
      productTypes: ['Mixed products', 'Variable sizes', 'Multi-format'],
      compliance: ['Tracking integration', 'Damage protection', 'Size flexibility']
    }
  }
];

// Comprehensive packaging solutions mapping
const packagingSolutions: PackagingSolution[] = [
  {
    id: 'pouch-to-pouch',
    name: 'Pouch-into-Pouch',
    description: 'Bundle single pouches from VFFS/HFFS into secondary pouches',
    icon: '📦',
    productTypes: ['Single pouches', 'Sachets'],
    industries: ['food-beverage', 'spices-masala', 'pharmaceuticals'],
    speedRange: '120 PPM input → 15 packs/min output'
  },
  {
    id: 'strip-to-pouch',
    name: 'Strip-into-Pouch',
    description: 'Package pouch strips into single convenient pouches',
    icon: '📦',
    productTypes: ['Pouch strips', 'Strip pouches'],
    industries: ['food-beverage', 'spices-masala', 'dairy-beverages'],
    speedRange: '120 PPM input → 15 packs/min output'
  },
  {
    id: 'pouch-to-shrink',
    name: 'Pouch-into-Shrink',
    description: 'Bundle pouches using heat shrink film for compact packaging',
    icon: '🔥',
    productTypes: ['Single pouches', 'Multiple pouches'],
    industries: ['food-beverage', 'personal-care', 'pharmaceuticals'],
    speedRange: '120 PPM input → 25 packs/min output'
  },
  {
    id: 'bottle-to-shrink',
    name: 'Bottle-into-Shrink',
    description: 'Shrink wrap bottles and jars for multi-pack bundling',
    icon: '🍶',
    productTypes: ['Bottles', 'Jars', 'Containers'],
    industries: ['food-beverage', 'personal-care', 'dairy-beverages'],
    speedRange: '60 bottles/min → 12 packs/min output'
  },
  {
    id: 'product-to-carton',
    name: 'Product-into-Carton',
    description: 'Automated cartoning for individual or multiple products',
    icon: '📮',
    productTypes: ['Pouches', 'Bottles', 'Sachets', 'Tins'],
    industries: ['pharmaceuticals', 'food-beverage', 'personal-care'],
    speedRange: '40-100 products/min → 40-100 cartons/min'
  },
  {
    id: 'pouch-to-bale',
    name: 'Pouch-into-Bale',
    description: 'High-volume baling of pouches into large gusset bags',
    icon: '🎒',
    productTypes: ['Large pouches', 'Multiple pouches'],
    industries: ['food-beverage', 'spices-masala', 'dairy-beverages'],
    speedRange: '120 PPM input → 5-6 bales/min output'
  },
  {
    id: 'pouch-to-hdpe',
    name: 'Pouch-into-HDPE Bag',
    description: 'Fill pouches into pre-formed HDPE bags for bulk packaging',
    icon: '🛍️',
    productTypes: ['Single pouches', 'Multiple pouches'],
    industries: ['food-beverage', 'spices-masala', 'textiles-apparel'],
    speedRange: '120 PPM input → 8 bags/min output'
  },
  {
    id: 'case-packing',
    name: 'Case Packing & Palletizing',
    description: 'End-of-line case packing with robotic integration',
    icon: '📋',
    productTypes: ['Secondary pouches', 'Cartons', 'Bottles'],
    industries: ['e-commerce', 'food-beverage', 'pharmaceuticals'],
    speedRange: 'Variable input → 16 cases/min output'
  },
  {
    id: 'quality-control',
    name: 'Dynamic Checkweighing',
    description: 'In-line weight verification and quality control with automatic rejection',
    icon: '⚖️',
    productTypes: ['All products requiring weight verification'],
    industries: ['food-beverage', 'pharmaceuticals', 'personal-care', 'dairy-beverages'],
    speedRange: '10-120 PPM with automatic rejection'
  },
  {
    id: 'material-handling',
    name: 'Material Handling & Conveying',
    description: 'Product transportation and line integration systems',
    icon: '🔄',
    productTypes: ['All packaged products'],
    industries: ['food-beverage', 'pharmaceuticals', 'dairy-beverages', 'textiles-apparel'],
    speedRange: 'Variable speed with VFD control'
  }
];

// Map certain solutions to illustrative images (fallback to icon/text for others)
const solutionImageMap: Record<string, string> = {
  'pouch-to-pouch': 'https://res.cloudinary.com/dbogkgabu/image/upload/v1754746229/IBP120_edbexr.png',
  'pouch-to-shrink': 'https://res.cloudinary.com/dbogkgabu/image/upload/v1754746230/ISP_120_lvdiwf.png',
  'product-to-carton': 'https://res.cloudinary.com/dbogkgabu/image/upload/v1754746229/ACM100_zoxmwz.png',
  'pouch-to-bale': 'https://res.cloudinary.com/dbogkgabu/image/upload/v1754746229/IBL500_jsneot.png',
  'pouch-to-hdpe': 'https://res.cloudinary.com/dbogkgabu/image/upload/v1754746229/IBG_H8_V8_iv4gin.png',
  'case-packing': 'https://res.cloudinary.com/dbogkgabu/image/upload/v1754746230/ICP120_moud1x.png',
  'bottle-to-shrink': 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098781/vmqgtzrzrbs8jiekt61w.png',
  'strip-to-pouch': 'https://res.cloudinary.com/dbogkgabu/image/upload/v1752945429/IBS-200_y2muoe.png',
  'quality-control': 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098786/kqahbwtwb9qj0s89rrpq.png',
  'material-handling': 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098787/bavrvl5lxecse2d4nsl6.png',
};

// Preferred model mapping per solution to improve matching quality
const solutionToPreferredModelIds: Record<string, string[]> = {
  'pouch-to-pouch': ['ibp-120'],
  'strip-to-pouch': ['ibs-200', 'ims-800'],
  'pouch-to-shrink': ['isp-120'],
  'bottle-to-shrink': ['iwb-120'],
  'product-to-carton': ['acm-100', 'acm-40'],
  'pouch-to-bale': ['ibl-500'],
  'pouch-to-hdpe': ['ibg-h8', 'ibg-v8'],
  'case-packing': ['icp-120', 'case-erector', 'case-sealer'],
  'quality-control': ['icw-600', 'icw-1200', 'icw-6000', 'icw-25k', 'icw-50k'],
  'material-handling': ['flat-belt-conveyor']
};

// Comprehensive product models database with actual specifications
const productModels: ProductModel[] = [
  // Bundling & Wrapping Machines
  {
    id: 'ibp-120',
    name: 'IBP-120 High-Speed Secondary Packaging Machine',
    model: 'IBP-120',
    category: 'bundling-wrapping',
    description: 'Advanced pouch bundling system for single pouches with dual servo technology',
    application: 'For stacking/bundling of primary pouches into a single pouch',
    specs: {
      inputSpeed: 'Up to 120 PPM',
      outputSpeed: 'Up to 15 secondary packs per minute',
      productType: ['Single pouches', 'Sachets', 'Small pouches'],
      packagingMaterial: ['Heat sealable laminated film', 'BOPP film above 35 micron'],
      powerConsumption: '4.5 KW, 5 CFM pneumatic',
      machineSize: '5600L x 1600W',
      automation: 'full-auto',
      priceCategory: 'standard'
    },
    features: [
      'Dual servo high speed race track collator',
      'Pneumatic pusher system',
      'Inverted flow wrapper',
      'Motion controller based operation',
      '7" touch screen with 50 recipes'
    ],
    industries: ['food-beverage', 'spices-masala', 'pharmaceuticals', 'dairy-beverages'],
    matchScore: 0,
    productUrl: '/products/bundling-wrapping/ibp-120',
    technicalHighlights: ['SS-304 contact parts', 'Mitsubishi/Trio PLC & HMI', 'Servo driven system']
  },
  {
    id: 'ibs-200',
    name: 'IBS-200 Strip Packaging Machine',
    model: 'IBS-200',
    category: 'bundling-wrapping',
    description: 'Specialized system for packaging pouch strips using vacuum pick & place gantry',
    application: 'For packing strips of pouches into a single pouch',
    specs: {
      inputSpeed: 'Up to 120 PPM',
      outputSpeed: 'Up to 15 packs per minute',
      productType: ['Pouch strips', 'Strip pouches'],
      packagingMaterial: ['Heat sealable laminated film', 'BOPP film above 35 micron'],
      powerConsumption: '2.5 KW, 3.2 CFM pneumatic',
      machineSize: '5800L x 1200W',
      automation: 'full-auto',
      priceCategory: 'standard'
    },
    features: [
      'Vacuum based pick place gantry',
      'Dual servo strip folding system',
      'Horizontal flow wrap technology',
      'Vacuum cups gripper system',
      'Quick changeover capability'
    ],
    industries: ['food-beverage', 'spices-masala', 'dairy-beverages'],
    matchScore: 0,
    productUrl: '/products/bundling-wrapping/ibs-200',
    technicalHighlights: ['Vacuum technology', 'Strip folding system', 'Schmalz pneumatics']
  },
  {
    id: 'isp-120',
    name: 'ISP-120 Shrink Film Packaging',
    model: 'ISP-120',
    category: 'bundling-wrapping',
    description: 'High-output shrink film packaging with web sealer and shrink tunnel',
    application: 'For stacking/bundling of primary pouches into a shrink film pouch',
    specs: {
      inputSpeed: 'Up to 120 PPM',
      outputSpeed: 'Up to 25 secondary packs per minute',
      productType: ['Single pouches', 'Multiple pouches'],
      packagingMaterial: ['Heat shrink film', 'LD shrink film above 50 micron'],
      powerConsumption: '25 KW, 3.5 CFM pneumatic',
      machineSize: '6200L x 2000W',
      automation: 'full-auto',
      priceCategory: 'premium'
    },
    features: [
      'Web sealer and shrink tunnel',
      'Dual servo race track collator',
      'High-temperature shrink processing',
      'Servo driven pulling system',
      'PID temperature controller'
    ],
    industries: ['food-beverage', 'personal-care', 'pharmaceuticals'],
    matchScore: 0,
    productUrl: '/products/bundling-wrapping/isp-120',
    technicalHighlights: ['25 KW high-power system', 'Shrink tunnel technology', 'Premium components']
  },
  {
    id: 'ims-800',
    name: 'IMS-800 Multi-Track Strip Packaging',
    model: 'IMS-800',
    category: 'bundling-wrapping',
    description: 'Ultra-high speed system for multi-track VFFS/HFFS integration',
    application: 'For packing strips into a single pouch from multi-track machines',
    specs: {
      inputSpeed: 'Up to 600-800 PPM',
      outputSpeed: 'Up to 10 packs per minute',
      productType: ['Strip pouches', 'Multi-track strips'],
      packagingMaterial: ['Heat sealable laminated film', 'BOPP film', 'HMLLDPE film above 50 micron'],
      powerConsumption: '2.5 KW, 5 CFM pneumatic',
      machineSize: '6900L x 3000W',
      automation: 'full-auto',
      priceCategory: 'premium'
    },
    features: [
      'Multi-track compatibility (up to 100 PPM per track)',
      'Vacuum based pick place gantry',
      'Horizontal flow wrap technology',
      'Large footprint for high throughput',
      'Schmalz vacuum system'
    ],
    industries: ['food-beverage', 'spices-masala', 'dairy-beverages'],
    matchScore: 0,
    productUrl: '/products/bundling-wrapping/ims-800',
    technicalHighlights: ['Ultra-high speed', 'Multi-track capability', 'Large scale operation']
  },
  {
    id: 'iwb-120',
    name: 'IWB-120 Bottle Wrapping Machine',
    model: 'IWB-120',
    category: 'bundling-wrapping',
    description: 'Specialized shrink wrapping system for bottles and jars',
    application: 'For stacking/bundling of bottles into a Shrinked pouch',
    specs: {
      inputSpeed: 'upto 60 bottles/min',
      outputSpeed: 'max Upto 12 secondary packs per minute (product dependant)',
      productType: ['Bottles/jars'],
      packagingMaterial: ['heat Shrink/ LD shrink film above 50 micron'],
      powerConsumption: '22 KW, 10 CFM pneumatic',
      machineSize: '6200L x 2000W',
      automation: 'full-auto',
      priceCategory: 'standard'
    },
    features: [
      'pneumatic pushers, plates and traffic management',
      'shrink wrap type (using Web sealer and shrink tunnel)',
      'Automatic/Manual feeding',
      'horizontal loading of matrix with pneumatic pusher',
      'motion controller based'
    ],
    industries: ['food-beverage', 'personal-care', 'dairy-beverages'],
    matchScore: 0,
    productUrl: '/products/bundling-wrapping/iwb-200',
    technicalHighlights: ['Bottle-specific handling', '22 KW power system', 'Traffic management']
  },
  
  // Cartoning Machines
  {
    id: 'acm-100',
    name: 'ACM-100 Automatic Cartoning Machine',
    model: 'ACM-100',
    category: 'cartoning',
    description: 'High-speed continuous motion cartoning with servo-driven operations',
    application: 'To pack single or multiple products into a carton',
    specs: {
      inputSpeed: 'Up to 100 products per minute',
      outputSpeed: 'Up to 100 cartons per minute',
      productType: ['Pouches', 'Tins', 'Bottles', 'Sachets'],
      packagingMaterial: ['Corrugated carton boxes'],
      powerConsumption: '3.5 KW, 6 CFM pneumatic',
      machineSize: '5800L x 1200W',
      automation: 'full-auto',
      priceCategory: 'premium'
    },
    features: [
      'Continuous motion horizontal cartoning',
      'Servo-driven operations',
      'Glue applicator/tuck-in flap closing',
      'Nordson/Baumer glue applicator',
      '100 empty cartons magazine'
    ],
    industries: ['pharmaceuticals', 'food-beverage', 'personal-care'],
    matchScore: 0,
    productUrl: '/products/cartoning/acm-100',
    technicalHighlights: ['100 cartons/min speed', 'Servo-driven precision', 'Premium glue system']
  },
  {
    id: 'acm-40',
    name: 'ACM-40 Semi-Automatic Cartoning Machine',
    model: 'ACM-40',
    category: 'cartoning',
    description: 'Versatile semi-automatic cartoning for medium-speed operations',
    application: 'To pack single or multiple products into a carton',
    specs: {
      inputSpeed: 'Up to 40 products per minute',
      outputSpeed: 'Up to 40 cartons per minute',
      productType: ['Pouches', 'Tins', 'Bottles', 'Sachets'],
      packagingMaterial: ['Corrugated carton boxes'],
      powerConsumption: '3.5 KW, 6 CFM pneumatic',
      machineSize: 'Variable',
      automation: 'semi-auto',
      priceCategory: 'economy'
    },
    features: [
      'Automatic/Manual product feeding',
      'Pneumatic pushers',
      'Rotating wheel carton adjustment',
      'Slitted chain conveyors',
      'Nordson/Baumer glue applicator'
    ],
    industries: ['pharmaceuticals', 'food-beverage', 'personal-care'],
    matchScore: 0,
    productUrl: '/products/cartoning/acm-40',
    technicalHighlights: ['Cost-effective solution', 'Manual flexibility', 'Variable size capability']
  },
  
  // Pouch Baling & Bagging
  {
    id: 'ibl-500',
    name: 'IBL-500 Automatic Baler',
    model: 'IBL-500',
    category: 'pouch-baler',
    description: 'High-capacity automatic baling system for large pouch volumes',
    application: 'For baling of pouches into a gusset pouch',
    specs: {
      inputSpeed: 'Up to 120 PPM',
      outputSpeed: '5-6 bales per minute',
      productType: ['Large pouches', 'Multiple pouches'],
      packagingMaterial: ['Heat sealable laminated film', 'BOPP film', 'HMLLDPE film above 50 micron'],
      powerConsumption: '6 KW, 6 CFM pneumatic',
      machineSize: '7600L x 3200W x 3000H',
      automation: 'full-auto',
      priceCategory: 'premium'
    },
    features: [
      '1-20 kg baling capacity',
      'Pneumatic sliding gates',
      'Vertical loading system',
      'Sandwich conveyor flattening',
      'Large machine footprint'
    ],
    industries: ['food-beverage', 'spices-masala', 'dairy-beverages'],
    matchScore: 0,
    productUrl: '/products/pouch-baler/ibl-500',
    technicalHighlights: ['20 kg baling capacity', 'Large scale operation', 'Vertical loading system']
  },
  {
    id: 'ibg-h8',
    name: 'IBG-H8 Horizontal HDPE Bag Filling',
    model: 'IBG-H8',
    category: 'pouch-baler',
    description: 'Horizontal HDPE bag filling with pusher system',
    application: 'For filling pouches into a preformed HDPE bag',
    specs: {
      inputSpeed: 'Up to 120 PPM',
      outputSpeed: 'Up to 8 bags per minute',
      productType: ['Single pouches', 'Multiple pouches'],
      packagingMaterial: ['HDPE bags'],
      powerConsumption: '8 KW, 8 CFM pneumatic',
      machineSize: 'Variable',
      automation: 'full-auto',
      priceCategory: 'standard'
    },
    features: [
      'Horizontal loading with pusher',
      'Pneumatic sliding gates',
      'Gabbar stitching machine',
      'PLC-based operation',
      'Variable machine sizing'
    ],
    industries: ['food-beverage', 'spices-masala', 'textiles-apparel'],
    matchScore: 0,
    productUrl: '/products/pouch-baler/ibg-h8-v8',
    technicalHighlights: ['HDPE bag filling', 'Horizontal loading', 'Gabbar stitching']
  },
  {
    id: 'ibg-v8',
    name: 'IBG-V8 Vertical HDPE Bag Filling',
    model: 'IBG-V8',
    category: 'pouch-baler',
    description: 'Vertical HDPE bag filling for space-efficient operations',
    application: 'For filling pouches into a preformed HDPE bag',
    specs: {
      inputSpeed: 'Up to 120 PPM',
      outputSpeed: 'Up to 8 bags per minute',
      productType: ['Single pouches', 'Twin track pouches'],
      packagingMaterial: ['HDPE bags'],
      powerConsumption: '8 KW, 8 CFM pneumatic',
      machineSize: 'Variable',
      automation: 'full-auto',
      priceCategory: 'standard'
    },
    features: [
      'Vertical loading with sliding gates',
      'Single/twin track compatibility',
      'Space-efficient design',
      'Gabbar stitching machine',
      'Compact footprint'
    ],
    industries: ['food-beverage', 'spices-masala', 'textiles-apparel'],
    matchScore: 0,
    productUrl: '/products/pouch-baler/ibg-h8-v8',
    technicalHighlights: ['Space-efficient design', 'Twin track capability', 'Vertical loading']
  },
  
  // Case Packing
  {
    id: 'icp-120',
    name: 'ICP-120 Case Packing System',
    model: 'ICP',
    category: 'case-packers',
    description: 'Advanced case packing with robotic integration and flexible sizing',
    application: 'to pack products in a shipper carton (Can be integrated with any VFFS or HFFS machine)',
    specs: {
      inputSpeed: 'matrix dependant',
      outputSpeed: 'Upto 16 cartons/ min',
      productType: ['pouch/strip/bottle/carton/secondary pouch'],
      packagingMaterial: ['Corrugated Carton Boxes with Multiple Ply'],
      powerConsumption: '8 KW, 8 CFM pneumatic',
      machineSize: 'Variable',
      automation: 'full-auto',
      priceCategory: 'premium'
    },
    features: [
      'With race track, diverter system, lane dividers etc',
      'Vertical with slidding gates, pick and place gantry, robotic arm etc',
      'Center taping (side taping can be given if required)',
      'Servo /PLC based',
      '100 Empty cartons magazine'
    ],
    industries: ['e-commerce', 'food-beverage', 'pharmaceuticals'],
    matchScore: 0,
    productUrl: '/products/case-packers/icp-120',
    technicalHighlights: ['Robotic integration', 'Servo/PLC based', 'Multiple gripper options']
  },
  {
    id: 'case-erector',
    name: 'Case Erector',
    model: 'Case Erector',
    category: 'case-packers',
    description: 'Automatic case erector for corrugated carton boxes',
    application: 'Automatic erection of corrugated carton boxes',
    specs: {
      inputSpeed: 'NA',
      outputSpeed: 'upto 15 cartons per minute',
      productType: ['Empty cartons'],
      packagingMaterial: ['Corrugated carton boxes'],
      powerConsumption: '220V, 1 phase, 50 Hz',
      machineSize: 'Variable based on carton size',
      automation: 'full-auto',
      priceCategory: 'standard'
    },
    features: [
      'Minimum carton size: Min- (280L x 160W x 200H )mm',
      'Maximum carton size: Max- (600L x 400W x 400H)mm',
      'Air consumption: 6 kg/Sq. cm @450nL/min (0.5MPA)',
      'Carton magazine storage: 100 cartons (depends on thickness)',
      'Tape width: 48/60/75 mm'
    ],
    industries: ['e-commerce', 'food-beverage', 'pharmaceuticals'],
    matchScore: 0,
    productUrl: '/products/case-packers/case-erector',
    technicalHighlights: ['Pneumatic operation', '100 carton storage', 'Variable carton sizes']
  },
  {
    id: 'case-sealer',
    name: 'Case Sealer',
    model: 'Case Sealer',
    category: 'case-packers',
    description: 'Automatic case sealer for corrugated carton boxes',
    application: 'Automatic sealing of filled corrugated carton boxes',
    specs: {
      inputSpeed: 'NA',
      outputSpeed: 'upto 15 cartons per minute',
      productType: ['Filled cartons'],
      packagingMaterial: ['Corrugated carton boxes'],
      powerConsumption: '220V, 1 phase, 50 Hz',
      machineSize: 'Variable based on carton size',
      automation: 'full-auto',
      priceCategory: 'standard'
    },
    features: [
      'Minimum carton size: Min- (280L x 160W x 200H )mm',
      'Maximum carton size: Max- (600L x 400W x 400H)mm',
      'Air consumption: 5-6 kg/Sq. cm @150nL/min (0.5MPA)',
      'wide range of variant flexibility',
      'SMC/Festo/Scmalz pneumatics'
    ],
    industries: ['e-commerce', 'food-beverage', 'pharmaceuticals'],
    matchScore: 0,
    productUrl: '/products/case-packers/case-sealer',
    technicalHighlights: ['Pneumatic operation', 'Variant flexibility', 'Compact design']
  },

  // Checkweighers
  {
    id: 'icw-600',
    name: 'ICW-600 Dynamic Checkweigher',
    model: 'ICW-600',
    category: 'checkweighers',
    description: 'High-precision dynamic checkweigher for products up to 600 grams',
    application: 'Dynamic weighing and quality control for continuous production lines',
    specs: {
      inputSpeed: 'up to 120 PPM',
      outputSpeed: 'up to 120 PPM (with rejection)',
      productType: ['Small products 50g-600g'],
      packagingMaterial: ['NA'],
      powerConsumption: '1 Phase 230V AC/ 50 Hz/ 300 VA',
      machineSize: 'Compact design',
      automation: 'full-auto',
      priceCategory: 'standard'
    },
    features: [
      'Weighing Range: 50 gm to 600 gm',
      'Weighing Accuracy: +/- 0.5 gm',
      'Left to right or right to left direction',
      'Underweight or overweight rejection with Diverter/ Pusher/ Air blower/ Skid plate',
      'Advanced PLC based control system'
    ],
    industries: ['food-beverage', 'pharmaceuticals', 'personal-care'],
    matchScore: 0,
    productUrl: '/products/checkweighers/icw-600',
    technicalHighlights: ['±0.5g accuracy', 'PLC based', '120 PPM speed']
  },
  {
    id: 'icw-1200',
    name: 'ICW-1200 Dynamic Checkweigher',
    model: 'ICW-1200',
    category: 'checkweighers',
    description: 'Medium capacity dynamic checkweigher for products up to 1200 grams',
    application: 'Dynamic weighing and quality control for medium weight products',
    specs: {
      inputSpeed: 'Up to 80 PPM',
      outputSpeed: 'Up to 80 PPM (with rejection)',
      productType: ['Medium products 600g-1200g'],
      packagingMaterial: ['NA'],
      powerConsumption: '1 Phase 230V AC/ 50 Hz/ 300 VA',
      machineSize: 'Standard design',
      automation: 'full-auto',
      priceCategory: 'standard'
    },
    features: [
      'Weighing Range: 600 gm to 1200 gm',
      'Weighing Accuracy: +/- 1 gm',
      'Left to right or right to left direction',
      'Multiple rejection systems available',
      'Statistical data available'
    ],
    industries: ['food-beverage', 'pharmaceuticals', 'personal-care'],
    matchScore: 0,
    productUrl: '/products/checkweighers/icw-1200',
    technicalHighlights: ['±1g accuracy', 'Statistical data', '80 PPM speed']
  },
  {
    id: 'icw-6000',
    name: 'ICW-6000 Heavy Duty Checkweigher',
    model: 'ICW-6000',
    category: 'checkweighers',
    description: 'Heavy duty checkweigher for products up to 6 kg',
    application: 'Dynamic weighing for heavy products and industrial applications',
    specs: {
      inputSpeed: 'Up to 30 PPM',
      outputSpeed: 'Up to 30 PPM (with rejection)',
      productType: ['Heavy products 1200g-6kg'],
      packagingMaterial: ['NA'],
      powerConsumption: '1 Phase 230V AC/ 50 Hz/ 300 VA',
      machineSize: 'Heavy duty design',
      automation: 'full-auto',
      priceCategory: 'premium'
    },
    features: [
      'Weighing Range: 1200 gm to 6 kg',
      'Weighing Accuracy: +/- 5 gm',
      'Heavy-duty components and high-quality electronics',
      'Integration with existing production lines',
      'Wide operating temperature range (0-40°C)'
    ],
    industries: ['food-beverage', 'pharmaceuticals', 'dairy-beverages'],
    matchScore: 0,
    productUrl: '/products/checkweighers/icw-6000',
    technicalHighlights: ['6kg capacity', 'Heavy-duty design', 'Industrial grade']
  },
  {
    id: 'icw-25k',
    name: 'ICW-25K Industrial Checkweigher',
    model: 'ICW-25K',
    category: 'checkweighers',
    description: 'Industrial checkweigher for heavy products up to 25 kg',
    application: 'Heavy industrial weighing for large products',
    specs: {
      inputSpeed: 'Up to 10 PPM',
      outputSpeed: 'Up to 10 PPM (with rejection)',
      productType: ['Industrial products 6kg-25kg'],
      packagingMaterial: ['NA'],
      powerConsumption: '1 Phase 230V AC/ 50 Hz/ 300 VA',
      machineSize: 'Industrial size',
      automation: 'full-auto',
      priceCategory: 'premium'
    },
    features: [
      'Weighing Range: 6 kg to 25 kg',
      'Weighing Accuracy: +/- 25 gm',
      'scaime /Essae make Load Cell',
      'Interlocks with other machines',
      'Easy height adjustment for conveyor line'
    ],
    industries: ['food-beverage', 'dairy-beverages', 'textiles-apparel'],
    matchScore: 0,
    productUrl: '/products/checkweighers/icw-25k',
    technicalHighlights: ['25kg capacity', 'Industrial grade', 'Machine interlocks']
  },
  {
    id: 'icw-50k',
    name: 'ICW-50K Extra Heavy Checkweigher',
    model: 'ICW-50K',
    category: 'checkweighers',
    description: 'Extra heavy industrial checkweigher for products up to 50 kg',
    application: 'Extra heavy industrial weighing applications',
    specs: {
      inputSpeed: 'Up to 10 PPM',
      outputSpeed: 'Up to 10 PPM (with rejection)',
      productType: ['Extra heavy products 25kg-50kg'],
      packagingMaterial: ['NA'],
      powerConsumption: '1 Phase 230V AC/ 50 Hz/ 300 VA',
      machineSize: 'Extra large design',
      automation: 'full-auto',
      priceCategory: 'premium'
    },
    features: [
      'Weighing Range: 25 kg to 50 kg',
      'Weighing Accuracy: +/- 50 gm',
      'Heavy-duty components and high-quality electronics',
      'Data sharing via USB or Ethernet',
      'Tendency control available'
    ],
    industries: ['food-beverage', 'dairy-beverages', 'textiles-apparel'],
    matchScore: 0,
    productUrl: '/products/checkweighers/icw-50k',
    technicalHighlights: ['50kg capacity', 'USB/Ethernet connectivity', 'Tendency control']
  },

  // Conveying Systems
  {
    id: 'flat-belt-conveyor',
    name: 'Flat Belt Conveyor',
    model: 'Flat Belt Conveyor',
    category: 'conveying',
    description: 'Versatile flat belt conveyor for product transportation',
    application: 'Product transportation and line integration',
    specs: {
      inputSpeed: 'Variable',
      outputSpeed: 'Variable (VFD controlled)',
      productType: ['Various products'],
      packagingMaterial: ['NA'],
      powerConsumption: 'Variable based on size',
      machineSize: 'Length, width, Height as per requirement',
      automation: 'semi-auto',
      priceCategory: 'economy'
    },
    features: [
      'PU or PVC food grade belt',
      'Adjustable side guards ± 50 mm',
      'Levelling foot mount height ± 50 mm',
      'Unidirection or bidirectional',
      'Speed control through VFD'
    ],
    industries: ['food-beverage', 'pharmaceuticals', 'dairy-beverages', 'textiles-apparel'],
    matchScore: 0,
      productUrl: '/products/conveying',
    technicalHighlights: ['Food grade belt', 'VFD control', 'Adjustable guards']
  }
];

export default function ProductSelectorPage() {
  const router = useRouter();
  const [stage, setStage] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
  const [requirements, setRequirements] = useState<Requirements>({
    productType: '',
    inputSpeed: 100,
    outputSpeed: 10,
    packagingMaterial: '',
    automation: 'full-auto',
    budget: 'standard',
    specialRequirements: []
  });
  const [recommendations, setRecommendations] = useState<ProductModel[]>([]);

    // Enhanced matching algorithm
  const calculateRecommendations = () => {
    let scoredModels = productModels.map(model => {
      let score = 0;
      let maxScore = 0;

      // Industry matching (25% weight)
      maxScore += 25;
      if (selectedIndustry && model.industries.includes(selectedIndustry)) {
        score += 25;
      }

      // Solution compatibility (20% weight)
      maxScore += 20;
      const solution = packagingSolutions.find(s => s.id === selectedSolution);
      const preferredIds = selectedSolution ? solutionToPreferredModelIds[selectedSolution] : undefined;
      if (preferredIds && preferredIds.includes(model.id)) {
        score += 20;
      } else if (solution && solution.productTypes.some(type => 
        model.specs.productType.some(modelType => 
          modelType.toLowerCase().includes(type.toLowerCase()) || 
          type.toLowerCase().includes(modelType.toLowerCase())
        )
      )) {
        score += 20;
      }

      // Product type matching (15% weight)
      maxScore += 15;
      if (requirements.productType && model.specs.productType.some(type =>
        type.toLowerCase().includes(requirements.productType.toLowerCase()) ||
        requirements.productType.toLowerCase().includes(type.toLowerCase())
      )) {
        score += 15;
      }

      // Speed matching (15% weight)
      maxScore += 15;
      const modelSpeed = parseInt(model.specs.inputSpeed.replace(/[^\d]/g, ''));
      const reqSpeed = requirements.inputSpeed;
      if (Math.abs(modelSpeed - reqSpeed) <= 20) {
        score += 15;
      } else if (Math.abs(modelSpeed - reqSpeed) <= 50) {
        score += 10;
      }

      // Automation level matching (10% weight)
      maxScore += 10;
      if (model.specs.automation === requirements.automation) {
        score += 10;
      }

      // Budget matching (10% weight)
      maxScore += 10;
      if (model.specs.priceCategory === requirements.budget) {
        score += 10;
      }

      // Packaging material compatibility (5% weight)
      maxScore += 5;
      if (requirements.packagingMaterial && model.specs.packagingMaterial.some(material =>
        material.toLowerCase().includes(requirements.packagingMaterial.toLowerCase())
      )) {
        score += 5;
      }

      return {
        ...model,
        matchScore: Math.round((score / maxScore) * 100)
      };
    });

    // Sort by score and take top 5
    scoredModels.sort((a, b) => b.matchScore - a.matchScore);
    setRecommendations(scoredModels.slice(0, 5));
  };

  const handleNext = () => {
    // Skip former Stage 4 (Technical specifications) entirely
    if (stage === 3) {
      calculateRecommendations();
      setStage(5);
      return;
    }
    setStage(prev => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    // If on recommendations, go back to Stage 3 directly (Stage 4 removed)
    if (stage === 5) {
      setStage(3);
      return;
    }
    setStage(prev => Math.max(prev - 1, 1));
  };

  const resetSelector = () => {
    setStage(1);
    setSelectedIndustry(null);
    setSelectedSolution(null);
    setRequirements({
      productType: '',
      inputSpeed: 100,
      outputSpeed: 10,
      packagingMaterial: '',
      automation: 'full-auto',
      budget: 'standard',
      specialRequirements: []
    });
    setRecommendations([]);
  };

  const handleViewProduct = (productUrl: string) => {
    router.push(productUrl);
  };

  return (
    <PageContainer 
      title="Solution Selector"
      subtitle="Find the perfect packaging automation solution tailored to your industry requirements, product specifications, and operational needs."
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-200
                      ${step <= stage
                        ? 'bg-brand-blue-500 text-white shadow ring-2 ring-white/60'
                        : step === stage + 1
                          ? 'bg-brand-blue-100 text-brand-blue-700 border border-brand-blue-200'
                          : 'bg-gray-100 text-gray-400 border border-gray-200'}`}
                    aria-current={step === stage ? 'step' : undefined}
                  >
                    {step}
                  </div>
                  {step < 5 && (
                    <div
                      className={`w-16 md:w-24 h-1.5 mx-2 rounded-full transition-colors duration-200
                        ${step < stage
                          ? 'bg-gradient-to-r from-brand-blue-500 to-brand-green-500'
                          : 'bg-gray-200/80 border border-white/40'}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-gray-600">
              {stage === 1 && "Select Your Industry"}
              {stage === 2 && "Packaging Solutions"}
              {stage === 3 && "Product Requirements"}
              {stage === 5 && "Recommended Solutions"}
            </div>
          </div>

          {/* Stage Content */}
          <motion.div
            key={stage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Stage 1: Industry Selection */}
            {stage === 1 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  What industry do you operate in?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {industries.map((industry) => (
                    <motion.div
                      key={industry.id}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedIndustry === industry.id
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedIndustry(industry.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-4xl mb-4">{industry.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {industry.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {industry.description}
                      </p>
                      <div className="space-y-2">
                        <div className="text-xs text-gray-500">Common Products:</div>
                        <div className="flex flex-wrap gap-1">
                          {industry.commonProducts.slice(0, 3).map((product, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Stage 2: Solution Selection */}
            {stage === 2 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  Packaging Solutions
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Explore our comprehensive packaging automation solutions designed for various product types and industry requirements.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {packagingSolutions
                    .filter(solution => 
                      !selectedIndustry || solution.industries.includes(selectedIndustry)
                    )
                    .map((solution) => (
                    <motion.div
                      key={solution.id}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedSolution === solution.id
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedSolution(solution.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Visual: prefer image where available, exclude for checkweighers and conveying */}
                      {solutionImageMap[solution.id] ? (
                        <div className="relative w-full h-36 mb-4 overflow-hidden">
                          <Image
                            src={solutionImageMap[solution.id]}
                            alt={solution.name}
                            fill
                            sizes="(max-width: 1024px) 45vw, 25vw"
                            className="object-contain scale-110 origin-center"
                          />
                        </div>
                      ) : (
                        <div className="text-3xl mb-4">{solution.icon}</div>
                      )}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {solution.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {solution.description}
                      </p>
                      <div className="text-xs text-blue-600 font-medium">
                        {solution.speedRange}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Stage 3: Product Requirements */}
            {stage === 3 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Tell us about your product requirements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Type
                    </label>
                    <select
                      value={requirements.productType}
                      onChange={(e) => setRequirements(prev => ({ ...prev, productType: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select product type</option>
                      <option value="Single pouches">Single Pouches</option>
                      <option value="Strip pouches">Strip Pouches</option>
                      <option value="Bottles">Bottles/Jars</option>
                      <option value="Sachets">Sachets</option>
                      <option value="Tins">Tins/Containers</option>
                      <option value="Cartons">Cartons</option>
                      <option value="Small products 50g-600g">Small Products (50g-600g)</option>
                      <option value="Medium products 600g-1200g">Medium Products (600g-1200g)</option>
                      <option value="Heavy products 1200g-6kg">Heavy Products (1.2kg-6kg)</option>
                      <option value="Industrial products 6kg-25kg">Industrial Products (6kg-25kg)</option>
                      <option value="Extra heavy products 25kg-50kg">Extra Heavy Products (25kg-50kg)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Input Speed Required (PPM)
                    </label>
                    <input
                      type="number"
                      value={requirements.inputSpeed}
                      onChange={(e) => setRequirements(prev => ({ ...prev, inputSpeed: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 120"
                    />
                    <p className="text-xs text-gray-500 mt-1">Packs per minute from your primary machine</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Desired Output Speed (packs/min)
                    </label>
                    <input
                      type="number"
                      value={requirements.outputSpeed}
                      onChange={(e) => setRequirements(prev => ({ ...prev, outputSpeed: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 15"
                    />
                    <p className="text-xs text-gray-500 mt-1">Secondary packages per minute required</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Packaging Material
                    </label>
                    <select
                      value={requirements.packagingMaterial}
                      onChange={(e) => setRequirements(prev => ({ ...prev, packagingMaterial: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select packaging material</option>
                      <option value="Heat sealable laminated film">Heat Sealable Laminated Film</option>
                      <option value="BOPP film">BOPP Film</option>
                      <option value="Heat shrink film">Heat Shrink Film</option>
                      <option value="Corrugated carton">Corrugated Carton Boxes</option>
                      <option value="HDPE bags">HDPE Bags</option>
                      <option value="NA">Quality Control Only (No packaging material)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Stage 4 removed per request */}

            {/* Stage 5: Recommendations */}
            {stage === 5 && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Recommended Solutions for Your Requirements
                  </h2>
                  
                  {recommendations.length > 0 ? (
                    <div className="space-y-6">
                      {recommendations.map((model, index) => (
                        <motion.div
                          key={model.id}
                          className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-900">
                                  {model.name}
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  model.matchScore >= 80 ? 'bg-green-100 text-green-800' :
                                  model.matchScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {model.matchScore}% Match
                                </span>
                              </div>
                              <p className="text-gray-600 mb-4">{model.description}</p>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                  <div className="text-xs text-gray-500">Input Speed</div>
                                  <div className="font-semibold text-gray-900">{model.specs.inputSpeed}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Output Speed</div>
                                  <div className="font-semibold text-gray-900">{model.specs.outputSpeed}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Power</div>
                                  <div className="font-semibold text-gray-900">{model.specs.powerConsumption}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Category</div>
                                  <div className="font-semibold text-gray-900 capitalize">{model.specs.priceCategory}</div>
                                </div>
                              </div>

                              <div className="mb-4">
                                <div className="text-xs text-gray-500 mb-2">Key Features</div>
                                <div className="flex flex-wrap gap-2">
                                  {model.features.slice(0, 4).map((feature, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <div className="text-xs text-gray-500 mb-2">Technical Highlights</div>
                                <div className="flex flex-wrap gap-2">
                                  {model.technicalHighlights.map((highlight, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                      {highlight}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleViewProduct(model.productUrl)}
                              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                            >
                              View Detailed Specifications
                            </button>
                            <button aria-label="Request quote for selected model" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                              Request Quote
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-500 mb-4">No matching solutions found.</div>
                      <button
                        onClick={resetSelector}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                      >
                        Start Over
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={stage === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                stage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label="Previous step"
            >
              Previous
            </button>

            <div className="flex gap-3">
              {stage < 5 && (
                <button
                  onClick={handleNext}
                  disabled={(stage === 1 && !selectedIndustry) || (stage === 2 && !selectedSolution)}
                  className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                    (stage === 1 && !selectedIndustry) || (stage === 2 && !selectedSolution)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  aria-label={stage === 4 ? 'Get Recommendations' : 'Next'}
                >
                  {stage === 4 ? 'Get Recommendations' : 'Next'}
                </button>
              )}
              
              {stage === 5 && (
                <button
                  onClick={resetSelector}
                  className="px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Start new search"
                >
                  Start New Search
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}