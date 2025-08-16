import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Rigid Product Handling',
    description: 'Used for rigid products like PET bottles, Jars to collate, and neat shrink packs at high production speeds',
    icon: '🍼'
  },
  {
    title: 'Heat Sealable Laminate',
    description: 'Secondary packs made in Heat Sealable Laminate with shrink tunnel processing',
    icon: '🔥'
  },
  {
    title: 'Shrink Tunnel Integration',
    description: 'Flow-wrapped packs travel through a shrink tunnel to produce ready-to-ship packs',
    icon: '🌡️'
  },
  {
    title: 'Versatile Applications',
    description: 'Used to overwrap various packaging including beverages, cosmetics, shampoo bottles, PET bottles, Jars, cans',
    icon: '🎯'
  },
  {
    title: 'High-Speed Collation',
    description: 'Designed to handle high speed from primary lines and product collation for desired matrices',
    icon: '⚡'
  },
  {
    title: 'Quality Assurance',
    description: 'Sensor-based technology for exact product count and 100% QA products',
    icon: '✅'
  }
];

const models = [
  {
    name: 'ISB-120 Shrink Wrapping for Bottles',
    description: 'High-speed shrink wrapping system for rigid products like PET bottles, jars, and cans with integrated shrink tunnel.',
    features: [
      'Used for rigid products like PET bottles, Jars to collate, and neat shrink packs at high production speeds',
      'Secondary packs made in Heat Sealable Laminate',
      'Flow-wrapped packs travel through a shrink tunnel to produce ready-to-ship packs',
      'Used to overwrap various packaging including beverages, cosmetics, shampoo bottles, PET bottles, Jars, cans & ready-to-eat shelf packs',
      'Designed to handle high speed from primary lines and product collation for desired matrices and easy transfer to shrink tunnel',
      'Sensor-based technology for exact product count and 100% QA products',
      '7" Color Touch screen with 50 recipe function',
      'Advanced PLC base control system',
      'Multi-level password Protection',
      'Various production data display, Report and transfer features',
      'Connectivity through Ethernet / MODBUS / Inverter protocol',
      'Displays Error on Screen',
      'Tower Lamp to identify machine status',
      'Eliminates manual secondary packing work completely'
    ],
    specifications: [
      { label: 'Overall dimensions (Approx)', value: '1560mm × 1696mm without Tunnel' },
      { label: 'Secondary packaging speed', value: 'Up to 12 Packs/min' },
      { label: 'Input speed', value: '120 PPM' },
      { label: 'Laminate', value: 'Two side laminate feeding' },
      { label: 'Packaging Material', value: 'Heat shrink LD film above 40 micron' },
      { label: 'Film roll', value: '3" core diameter, max Film roll diameter of 350mm' },
      { label: 'Power required', value: '3 Phase 440V AC / 50 Hz / 22 KW' },
      { label: 'Air requirement', value: '3.2 CFM (Approx)' }
    ],
  }
];

const keyFeatures = [
  'High-speed shrink wrapping system for rigid products like PET bottles and jars',
  'Neat shrink packs at high production speeds with precise collation',
  'Secondary packs made in Heat Sealable Laminate for superior finish',
  'Flow-wrapped packs travel through shrink tunnel for ready-to-ship products',
  'Versatile overwrapping for beverages, cosmetics, bottles, jars, and cans',
  'High-speed handling from primary lines with desired matrix formation',
  'Sensor-based technology ensures exact product count and 100% QA',
  '7" Color Touch screen with 50 recipe function for easy operation',
  'Advanced PLC base control system with multi-level password protection',
  'Comprehensive production data display and reporting features',
  'Connectivity through Ethernet/MODBUS/Inverter protocol for integration',
  'Tower lamp indication for machine status monitoring'
];

const specifications = [
  { label: 'Product Type', value: 'Rigid products: PET bottles, jars, cans, containers' },
  { label: 'Packaging Material', value: 'Heat shrink LD film (above 40 micron)' },
  { label: 'Film Roll Specifications', value: '3" core diameter, max 350mm roll diameter' },
  { label: 'Control System', value: 'Advanced PLC with 7" color touchscreen HMI' },
  { label: 'Recipe Memory', value: '50 recipe storage function for quick changeovers' },
  { label: 'Quality Control', value: 'Sensor-based exact product counting system' },
  { label: 'Connectivity', value: 'Ethernet, MODBUS, Inverter protocol support' },
  { label: 'Safety Features', value: 'Multi-level password protection and error display' },
  { label: 'Status Indication', value: 'Tower lamp for machine status identification' },
  { label: 'Automation Level', value: 'Eliminates manual secondary packing work completely' },
  { label: 'Integration', value: 'Easy transfer to shrink tunnel for final processing' },
  { label: 'Production Data', value: 'Comprehensive display, reporting and transfer features' }
];

const applications = [
  'Beverage Industry',
  'Cosmetics Packaging',
  'Shampoo Bottles',
  'PET Bottles',
  'Jars & Containers',
  'Cans Packaging',
  'Ready-to-Eat Shelf Packs',
  'Personal Care Products',
  'Food & Beverage',
  'Industrial Bottling'
];

const technicalData = {
  performance: [
    { label: 'Packaging Speed', value: '12', unit: 'packs/min' },
    { label: 'Input Speed', value: '120', unit: 'PPM' },
    { label: 'Film Type', value: 'Heat shrink LD', unit: 'above 40 micron' },
    { label: 'QA Accuracy', value: '100', unit: '% sensor-based' }
  ],
  dimensions: [
    { label: 'Length', value: '1560', unit: 'mm (without tunnel)' },
    { label: 'Width', value: '1696', unit: 'mm (without tunnel)' },
    { label: 'Film Roll Core', value: '3', unit: 'inch diameter' },
    { label: 'Max Roll Diameter', value: '350', unit: 'mm' }
  ],
  power: [
    { label: 'Power Required', value: '22', unit: 'KW' },
    { label: 'Voltage', value: '440V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Requirement', value: '3.2', unit: 'CFM (Approx)' }
  ]
};

const certifications = ['ISO 9001:2015'];

export default function ISB120Page() {
  return (
    <ProductDetailPage
      id="isb-120"
      title="ISB-120 Shrink Wrapping for Bottles"
      subtitle="High-Speed Shrink Wrapping System for Rigid Products"
      description="The ISB-120 is designed for rigid products like PET bottles, jars, and cans, providing neat shrink packs at high production speeds. Secondary packs are made in Heat Sealable Laminate and flow-wrapped packs travel through a shrink tunnel to produce ready-to-ship packs. The system handles high speed from primary lines with product collation for desired matrices, featuring sensor-based technology for exact product count and 100% QA products."
      features={features}
      models={models}
      applications={applications}
      category="bundling-wrapping"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755178600/vujuj4xsre8embtxwwdb.png"
      slug="products/bundling-wrapping/isb-120"
      videoId="NgeT9rPPSB4"
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 