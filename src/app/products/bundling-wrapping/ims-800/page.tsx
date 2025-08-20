import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Multitrack VFFS Integration',
    description: 'Collates strips of products or single pouches from multi-track primary lines',
    icon: '🔄'
  },
  {
    title: 'PICK & PLACE System',
    description: 'Utilizes Infinity\'s PICK & PLACE system for gentle product transfer and precise handling',
    icon: '🤖'
  },
  {
    title: 'Matrix Conveyor',
    description: 'Consists of a matrix conveyor to produce matrices and feed to horizontal flow wraps',
    icon: '📦'
  },
  {
    title: 'Quality Assurance',
    description: 'Sensor-based technology for exact product count and 100% QA products with check-weighing option',
    icon: '✅'
  },
  {
    title: 'Advanced Control System',
    description: '7" Colour HMI Display with advanced PLC base control system and connectivity options',
    icon: '💻'
  },
  {
    title: 'Universal Integration',
    description: 'Can be integrated with any VFFS or HFFS machine of any brand',
    icon: '🔗'
  }
];

const models = [
  {
    name: 'IMS-800/IMS-600 Multitrack VFFS System',
    description: 'Advanced multitrack VFFS system for collating strips of products or single pouches from multi-track primary lines.',
    features: [
      'Collates strips of products or single pouches from multi-track primary lines',
      'Provides further process of bundling or stacking for flow-wrapping',
      'Secondary packs made in Heat Sealable Laminate',
      'Secondary packaging automation includes conveyor at VFFS output and intermediate conveyor to align pouch speed',
      'Consists of a matrix conveyor to produce matrices and feed to horizontal flow wraps',
      'Utilizes Infinity\'s PICK & PLACE system for gentle product transfer, precise handling, and quick changeovers',
      'Sensor-based technology for exact product count and 100% QA products with a check-weighing option',
      'Customized solutions based on client requirements',
      '7" Colour HMI Display (Touch screen)',
      'Advanced PLC base control system',
      'Multi-level password Protection',
      'Data Report Generation',
      'Connectivity through Ethernet / MODBUS / Inverter protocol',
      'Displays Error on Screen',
      'Can be integrated with any VFFS or HFFS machine of any brand',
      'High Speed Operations',
      'Tendency Control available',
      'Various production data display, Report and transfer feature',
      'Attractive & intact secondary pack',
      'Hook up with any primary machine of any make'
    ],
    specifications: [
      { label: 'Application', value: 'For packing strips into a single pouch' },
      { label: 'Product', value: 'strip of pouches from any multi-track VFFS or HFFS machine' },
      { label: 'Input speed', value: 'Upto 600 or 800 PPM (upto 100 ppm from each track)' },
      { label: 'Max Output Speed', value: 'upto 10 packs/ min (product dependant)' },
      { label: 'Baling Capacity', value: 'NA' },
      { label: 'Packaging Material', value: 'heat sealable laminated film/Bopp film/HMLLDPE film above 50 micron' },
      { label: 'Primary Pouch Flatenning', value: 'NA' },
      { label: 'Matrix formation', value: 'vacuum based pick place gantry' },
      { label: 'Secondary bundle packing', value: 'Inverted flow wrapper' },
      { label: 'Unwinding', value: 'Motorized Unwinding' },
      { label: 'Film pulling', value: 'Servo driven paper pulling system' },
      { label: 'Film roll holding', value: 'Pneumatic shaft film roll holding for quick change over' },
      { label: 'Sealing type', value: 'Center seal type pouch (Using horizontal Flow wrap) (Continuous heating sealer with PID)' },
      { label: 'Product Feeding', value: 'Automatic from primary machine' },
      { label: 'Product Loading', value: 'horizontal loading of matrix through conveyor' },
      { label: 'Mode of Operation', value: 'motion controller based' },
      { label: 'HMI type', value: '7" touch screen with 50 recipe function' },
      { label: 'Carton magazine size', value: 'NA' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'SS-304' },
      { label: 'Carton width Adjustment', value: 'NA' },
      { label: 'Matrix', value: 'Desired Matix formation' },
      { label: 'Gripper', value: 'vacuum cups' },
      { label: 'PLC, HMI, Drives, Servo Motors', value: 'Mitsubishi/ Trio make' },
      { label: 'Gear Motor', value: 'Bonfiglioly/ Wanshin/ bonvario/panasonic' },
      { label: 'Sensors', value: 'P&F/ contrinex' },
      { label: 'Belts', value: 'PU/PVC Fransteck make Belts' },
      { label: 'Bearings', value: 'SKF, HCS make' },
      { label: 'Pneumatics', value: 'Festo/SMC/ Schmalz' },
      { label: 'Glue Applicator', value: 'NA' },
      { label: 'Machine Size', value: '5600L x 2000W (variable)' },
      { label: 'Power Supply', value: '3 phase, 420 VAC, 50Hz' },
      { label: 'Electrical Consumption', value: '2.5 KW' },
      { label: 'Pneumatic Consumption', value: '5 CFM' },
      { label: 'Stitching machine', value: 'NA' },
      { label: 'System Components', value: 'Matrix conveyor; Pick and place unit; feeding conveyor; Horizontal Flow wrap machine.' },
      { label: 'Optional Components (additional cost)', value: 'Secondary check weigher & Rejector; Change part for extra variant; Safety guarding as per required safety category.' }
    ],
  }
];

const keyFeatures = [
  'Advanced multitrack VFFS system for collating strips from multi-track primary lines',
  'Utilizes Infinity\'s PICK & PLACE system for gentle product transfer and precise handling',
  'Matrix conveyor system to produce matrices and feed to horizontal flow wraps',
  'Sensor-based technology for exact product count and 100% QA with check-weighing option',
  'Advanced PLC base control system with 7" colour HMI display',
  'Multi-level password protection with data report generation capabilities',
  'Connectivity through Ethernet/MODBUS/Inverter protocol for integration',
  'Can be integrated with any VFFS or HFFS machine of any brand',
  'High-speed operations with tendency control available',
  'Customized solutions based on specific client requirements',
  'Vacuum-based pick place gantry for efficient matrix formation',
  'Quick changeovers with pneumatic shaft film roll holding system'
];

const specifications = [
  { label: 'Application', value: 'For packing strips into a single pouch' },
  { label: 'Product', value: 'strip of pouches from any multi-track VFFS or HFFS machine' },
  { label: 'Input speed', value: 'Upto 600 or 800 PPM (upto 100 ppm from each track)' },
  { label: 'Max Output Speed', value: 'upto 10 packs/ min (product dependant)' },
  { label: 'Baling Capacity', value: 'NA' },
  { label: 'Packaging Material', value: 'heat sealable laminated film/Bopp film/HMLLDPE film above 50 micron' },
  { label: 'Primary Pouch Flatenning', value: 'NA' },
  { label: 'Matrix formation', value: 'vacuum based pick place gantry' },
  { label: 'Secondary bundle packing', value: 'Inverted flow wrapper' },
  { label: 'Unwinding', value: 'Motorized Unwinding' },
  { label: 'Film pulling', value: 'Servo driven paper pulling system' },
  { label: 'Film roll holding', value: 'Pneumatic shaft film roll holding for quick change over' },
  { label: 'Sealing type', value: 'Center seal type pouch (Using horizontal Flow wrap) (Continuous heating sealer with PID)' },
  { label: 'Product Feeding', value: 'Automatic from primary machine' },
  { label: 'Product Loading', value: 'horizontal loading of matrix through conveyor' },
  { label: 'Mode of Operation', value: 'motion controller based' },
  { label: 'HMI type', value: '7" touch screen with 50 recipe function' },
  { label: 'Carton magazine size', value: 'NA' },
  { label: 'Contact parts', value: 'SS-304' },
  { label: 'Non-contact parts', value: 'SS-304' },
  { label: 'Carton width Adjustment', value: 'NA' },
  { label: 'Matrix', value: 'Desired Matix formation' },
  { label: 'Gripper', value: 'vacuum cups' },
  { label: 'PLC, HMI, Drives, Servo Motors', value: 'Mitsubishi/ Trio make' },
  { label: 'Gear Motor', value: 'Bonfiglioly/ Wanshin/ bonvario/panasonic' },
  { label: 'Sensors', value: 'P&F/ contrinex' },
  { label: 'Belts', value: 'PU/PVC Fransteck make Belts' },
  { label: 'Bearings', value: 'SKF, HCS make' },
  { label: 'Pneumatics', value: 'Festo/SMC/ Schmalz' },
  { label: 'Glue Applicator', value: 'NA' },
  { label: 'Machine Size', value: '5600L x 2000W (variable)' },
  { label: 'Power Supply', value: '3 phase, 420 VAC, 50Hz' },
  { label: 'Electrical Consumption', value: '2.5 KW' },
  { label: 'Pneumatic Consumption', value: '5 CFM' },
  { label: 'Stitching machine', value: 'NA' },
  { label: 'System Components', value: 'Matrix conveyor; Pick and place unit; feeding conveyor; Horizontal Flow wrap machine.' },
  { label: 'Optional Components (additional cost)', value: 'Secondary check weigher & Rejector; Change part for extra variant; Safety guarding as per required safety category.' }
];

const applications = [
  'Food Processing',
  'Spices Industry',
  'Dairy Products',
  'Pharmaceutical Packaging',
  'Confectionery Industry',
  'Personal Care Products',
  'Consumer Goods',
  'Industrial Products',
  'Nutraceuticals',
  'Healthcare Products'
];

const technicalData = {
  performance: [
    { label: 'Input Speed', value: '600-800', unit: 'PPM' },
    { label: 'Output Speed', value: '10', unit: 'packs/min' },
    { label: 'Track Capacity', value: '100', unit: 'PPM per track' }
  ],
  dimensions: [
    { label: 'Length', value: '5600', unit: 'mm' },
    { label: 'Width', value: '2000', unit: 'mm (variable)' },
    { label: 'Footprint', value: 'Variable capacity', unit: 'multitrack system' }
  ],
  power: [
    { label: 'Power Required', value: '2.5', unit: 'kW' },
    { label: 'Voltage', value: '420V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Requirement', value: '5', unit: 'CFM' }
  ],
  components: [
    { label: 'PLC & HMI', value: 'Mitsubishi/Trio', unit: 'make' },
    { label: 'Gear Motor', value: 'Bonfiglioli / Wanshin / Bonvario / Panasonic', unit: 'make' },
    { label: 'Sensors', value: 'P&F / Contrinex', unit: 'make' },
    { label: 'Belts', value: 'PU/PVC Fransteck', unit: 'make' },
    { label: 'Bearings', value: 'SKF, HCS', unit: 'make' },
    { label: 'Pneumatics', value: 'Festo/SMC/Schmalz', unit: 'make' }
  ]
};

const certifications = ['ISO 9001:2015'];

export default function IMS800Page() {
  return (
    <ProductDetailPage
      id="ims-800"
      title="IMS-800/600 Multitrack VFFS System"
      subtitle="Advanced Secondary Packaging for Multitrack VFFS"
      description="The IMS-800/600 series represents advanced multitrack VFFS technology, specifically engineered for collating strips of products or single pouches from multi-track primary lines. This comprehensive system provides further processing of bundling or stacking for flow-wrapping, utilizing Infinity's PICK & PLACE system for gentle product transfer and precise handling. With advanced control systems, sensor-based technology for exact product count, and 100% QA capabilities, the IMS series ensures maximum efficiency and reliability in demanding multitrack production environments."
      features={features}
      models={models}
      applications={applications}
      category="bundling-wrapping"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755178597/ilnnb2uya0xricuymb8d.png"
      slug="products/bundling-wrapping/ims-800"
      videoId="ykHyH5rFB90"
      videoIds={["ykHyH5rFB90", "wUqS0YeglFI"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 