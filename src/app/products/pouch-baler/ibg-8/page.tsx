import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'High-Speed Collection',
    description: 'Collects products from VFFS or HFFS and transfers to high-speed conveyor',
    icon: '⚡'
  },
  {
    title: 'Large Pouch Handling',
    description: 'Handles large size pouches (0.2Kg to 5Kg) with precision',
    icon: '📦'
  },
  {
    title: 'Sandwich Conveyor',
    description: 'Products passed through sandwich conveyor for flattening and size reduction',
    icon: '🔄'
  },
  {
    title: 'Quality Assurance',
    description: 'Option to pass products through Check Weighers or Metal Detector for Quality Assurance',
    icon: '✅'
  },
  {
    title: 'Gate Flap Assembly',
    description: 'Products assembled at gate flap assembly for desired matrix, count, and easy entry to HDPE sacks',
    icon: '🎯'
  },
  {
    title: 'Automated Bagging',
    description: 'Automates the bagging process with sensor-based technology for exact product count',
    icon: '🤖'
  }
];

const keyFeatures = [
  'High-speed collection from VFFS or HFFS with seamless integration',
  'Handles large size pouches from 0.2Kg to 5Kg with precision control',
  'Sandwich conveyor system for pouch flattening and size reduction',
  'Optional Check Weighers and Metal Detector for Quality Assurance',
  'Gate flap assembly for desired matrix formation and product count',
  'Sensor-based technology ensures exact product count and 100% QA',
  'Automates the bagging process for increased efficiency',
  'Significantly increases bagging speed and productivity',
  'Reduces labor costs through automated operations',
  'Advanced PLC-based control system for reliable performance',
  'Multi-level password protection for security',
  'Data report generation and production monitoring',
  'Smart connectivity via Ethernet / MODBUS / Inverter protocol',
  'High-speed operations with precision accuracy',
  '7" Color Touch screen with 50 recipe function',
  'Customized solutions based on client requirements',
  'Universal integration with any primary packaging machine',
  'Comprehensive production data display and transfer features'
];

const models = [
  {
    name: 'IBG-8 Bagging Machine',
    description: 'High-speed bagging machine for collecting and transferring products from VFFS or HFFS to HDPE sacks.',
    features: [
      'Collects products from VFFS or HFFS and transfers to a high-speed conveyor',
      'Handles large size pouches (0.2Kg to 5Kg)',
      'Products passed through a sandwich conveyor for flattening and size reduction',
      'Option to pass products through Check Weighers or Metal Detector for Quality Assurance',
      'Products assembled at gate flap assembly for desired matrix, count, and easy entry to HDPE sacks',
      'Sensor-based technology for exact product count and 100% QA products',
      'Customized solutions based on client requirements',
      '7" Color Touch screen with 50 recipe function',
      'Automates the bagging process',
      'Increases bagging speed',
      'Reduces labor cost',
      'Advanced PLC base control system',
      'Multi-level password protection',
      'Data Report Generation',
      'Smartly connects via Ethernet / MODBUS / Inverter protocol',
      'High-speed operations',
      'Various production data display, report, and transfer features'
    ],
    specifications: [
      { label: 'Overall System Dimensions', value: 'Project Specific Customized Solution' },
      { label: 'Input speed', value: '120 pouch/min' },
      { label: 'Bag type', value: 'HDPE sack' },
      { label: 'Packaging Speed', value: '8 Bags/min' },
      { label: 'Power required', value: '3 Phase 440V AC / 50 Hz / 1 KW' },
      { label: 'Maximum input speed from VFFS', value: '120 packs/minute' },
      { label: 'Output speed', value: '7-8 secondary packs per minute' }
    ],
  }
];

const technicalData = {
  performance: [
    { label: 'Input Speed', value: '120', unit: 'pouches/min' },
    { label: 'Packaging Speed', value: '8', unit: 'bags/min' },
    { label: 'Efficiency', value: '95', unit: '%' }
  ],
  dimensions: [
    { label: 'System Length', value: 'Custom', unit: 'Project Specific' },
    { label: 'System Width', value: 'Custom', unit: 'Project Specific' },
    { label: 'System Height', value: 'Custom', unit: 'Project Specific' },
    { label: 'Footprint', value: 'Optimized', unit: 'Space-efficient' }
  ],
  power: [
    { label: 'Power Consumption', value: '1', unit: 'KW' },
    { label: 'Voltage', value: '440V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Control System', value: 'Advanced PLC', unit: '' }
  ]
};

const specifications = [
  { label: 'Collection System', value: 'High-speed collection from VFFS or HFFS machines' },
  { label: 'Pouch Handling', value: 'Large size pouches from 0.2Kg to 5Kg capacity' },
  { label: 'Conveyor System', value: 'Sandwich conveyor for flattening and size reduction' },
  { label: 'Quality Control', value: 'Optional Check Weighers and Metal Detector integration' },
  { label: 'Assembly System', value: 'Gate flap assembly for matrix formation and counting' },
  { label: 'Bag Type', value: 'HDPE sacks for secondary packaging' },
  { label: 'Control Interface', value: '7" Color Touch screen with 50 recipe function' },
  { label: 'Sensor Technology', value: 'Exact product count with 100% QA capability' },
  { label: 'Connectivity', value: 'Ethernet / MODBUS / Inverter protocol support' },
  { label: 'Security Features', value: 'Multi-level password protection system' },
  { label: 'Data Management', value: 'Production data display, reporting, and transfer' },
  { label: 'Customization', value: 'Project-specific customized solutions available' }
];

const applications = [
  'Food Processing',
  'Spices Industry',
  'Dairy Products',
  'Pharmaceutical Packaging',
  'Chemical Industry',
  'Agricultural Products',
  'Manufacturing Facilities',
  'Industrial Packaging',
  'Consumer Goods',
  'Bulk Packaging'
];

const certifications = ['ISO 9001:2015'];

export default function IBG8Page() {
  return (
    <ProductDetailPage
      id="ibg-8"
      title="IBG-8 Bagging Machine"
      description="The IBG-8 is a high-speed bagging machine designed to collect products from VFFS or HFFS and transfer them to HDPE sacks. This advanced system handles large size pouches from 0.2Kg to 5Kg, featuring sandwich conveyor flattening, optional quality assurance through check weighers or metal detectors, and gate flap assembly for desired matrix formation. With sensor-based technology for exact product count and customizable solutions, the IBG-8 automates the bagging process while reducing labor costs and increasing efficiency."
      features={features}
      models={models}
      applications={applications}
      category="pouch-baler"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098777/pzq3lbtsywtsrulw5xgp.png"
      slug="products/pouch-baler/ibg-8"
      videoId="bins8h_n1bU"
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 