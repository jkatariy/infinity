import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Fully Integrated System',
    description: 'Fully integrated and 100% servo-driven case packaging system',
    icon: '🔧'
  },
  {
    title: 'Robotic Pick & Place',
    description: 'Project-specific Robotic Pick & Place application for precise product handling',
    icon: '🤖'
  },
  {
    title: 'Conveying Technology',
    description: 'Conveying technology enables easy product collation or matrix formation',
    icon: '🔄'
  },
  {
    title: 'Carton Handling',
    description: 'Carton erectors with bottom taping, carton closures, and transfer for next processes',
    icon: '📦'
  },
  {
    title: 'Quality Assurance',
    description: 'Optional quality assurance with weighing scale for 100% conforming products',
    icon: '✅'
  },
  {
    title: 'Compact Design',
    description: 'Unbeatable flexibility in a small, space-saving footprint',
    icon: '📏'
  }
];

const models = [
  {
    name: 'ICP-120 Case Packer for Pouches',
    description: 'Fully integrated and 100% servo-driven case packaging system for pouches with robotic pick & place technology.',
    features: [
      'Fully integrated and 100% servo-driven case packaging system',
      'Matches speed, accuracy, and efficiency requirements',
      'Expected to be integrated with high-speed primary VFSS or HFFS',
      'Conveying technology enables easy product collation or matrix formation',
      'Project-specific Robotic Pick & Place application for precise product handling and feeding into cartons',
      'Gripper mechanism utilizes mechanical and vacuum suction cups for accurate product placement',
      'Carton erectors with bottom taping, carton closures, and transfer for next processes',
      'Optional quality assurance with weighing scale for 100% conforming products',
      'Value proposition with unbeatable flexibility in a small, space-saving footprint',
      'Achieves higher throughputs while simultaneously multi-tasking',
      'Secures case flaps, picks and places products in shortest cycle times and compact footprint',
      'Rugged, compact system to boost top loading output',
      'Rotors chosen to deposit flexible bags into cases and pack wide variety of patterns at high speeds',
      'Open design for exceptional visibility and fast, easy operator training',
      'Desired Matrix formation',
      'Minimal changeover for handling multiple variants',
      'Specialized grippers & suction capabilities',
      'Flexibility for Pick & Place of Gantry System',
      'Optional Inline Capabilities: Check Weigher, Taping, Label Application Printing',
      'High-Speed, Accuracy & Precision Servo Driven system',
      'Can be integrated with any VFFS or HFFS machine',
      'Tower lamp to identify machine status',
      '7" Color Touch screen with 50 recipe function'
    ],
    specifications: [
      { label: 'Application', value: 'To pack products in a shipper carton (can integrate with any VFFS or HFFS machine)' },
      { label: 'Product', value: 'Pouches, strips, bottles, cartons, secondary pouches, etc.' },
      { label: 'Input Speed', value: 'Matrix-dependent' },
      { label: 'Max Output Speed', value: 'Up to 16 cartons per minute' },
      { label: 'Packaging Material', value: 'Corrugated carton boxes (multiple-ply)' },
      { label: 'Matrix Formation', value: 'With race-track, lane dividers, diverters, etc.' },
      { label: 'Sealing Type', value: 'Center taping (side taping optional)' },
      { label: 'Product Feeding', value: 'Automatic (manual feeding possible in semi-auto mode)' },
      { label: 'Product Loading', value: 'Vertical with sliding gates, pick-and-place gantry, robotic arm, etc.' },
      { label: 'Mode of Operation', value: 'Servo/PLC based' },
      { label: 'HMI Type', value: '10″ color touchscreen with 50-recipe memory' },
      { label: 'Carton Magazine Size', value: '100 empty cartons' },
      { label: 'Contact Parts', value: 'Stainless Steel (SS-304)' },
      { label: 'Non-Contact Parts', value: 'MS powder-coated (SS optional if required)' },
      { label: 'Carton Width Adjustment', value: 'Through adjustable side guides' },
      { label: 'Matrix', value: 'Desired matrix formation' },
      { label: 'Gripper', value: 'Vacuum, mechanical, or pneumatic fingers' },
      { label: 'PLC, HMI, Drives, Servo Motors', value: 'Mitsubishi/Trio make' },
      { label: 'Gear Motor', value: 'Bonfiglioli / Wanshinn / Bonvario / Panasonic make' },
      { label: 'Sensors', value: 'Pepperl+Fuchs (P&F) / Contrinex make' },
      { label: 'Belts', value: 'PU/PVC "Fransteck" belt conveyors' },
      { label: 'Bearings', value: 'SKF, HCS make' },
      { label: 'Pneumatics', value: 'Festo/SMC / Schmalz' },
      { label: 'Machine Size', value: 'Variable' },
      { label: 'Power Supply', value: '3-phase, 420 VAC, 50 Hz' },
      { label: 'Electrical Consumption', value: '8 kW' },
      { label: 'Pneumatic Consumption', value: '8 CFM' }
    ],
  }
];

const applications = [
  'Food & Beverage Industry',
  'Personal Care Products',
  'Pharmaceutical Packaging',
  'Consumer Goods',
  'Chemical Products',
  'E-commerce Fulfillment',
  'Industrial Products',
  'Retail Distribution',
  'FMCG Products',
  'Healthcare Products'
];

const technicalData = {
  performance: [
    { label: 'Input Speed', value: 'Matrix', unit: 'dependent' },
    { label: 'Output Speed', value: '16', unit: 'cartons/min' },
    { label: 'Operation Mode', value: 'Servo/PLC', unit: 'based' }
  ],
  dimensions: [
    { label: 'Machine Size', value: 'Variable', unit: 'as required' },
    { label: 'Carton Magazine', value: '100', unit: 'empty cartons' },
    { label: 'Footprint', value: 'Compact design', unit: 'with flexibility' }
  ],
  power: [
    { label: 'Power Required', value: '8', unit: 'kW' },
    { label: 'Voltage', value: '420V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Requirement', value: '8', unit: 'CFM' }
  ],
  components: [
    { label: 'PLC & HMI', value: 'Mitsubishi/Trio', unit: 'make' },
    { label: 'Gear Motor', value: 'Bonfiglioli / Wanshinn / Bonvario / Panasonic', unit: 'make' },
    { label: 'Sensors', value: 'Pepperl+Fuchs (P&F) / Contrinex', unit: 'make' },
    { label: 'Belts', value: 'PU/PVC "Fransteck"', unit: 'belt conveyors' },
    { label: 'Bearings', value: 'SKF, HCS', unit: 'make' },
    { label: 'Pneumatics', value: 'Festo/SMC / Schmalz', unit: 'make' }
  ]
};

export default function ICP120Page() {
  return (
    <ProductDetailPage
      id="icp-120"
      title="ICP-120 Case Packer for Pouches"
      description="The ICP-120 is a fully integrated and 100% servo-driven case packaging system designed for pouches with advanced robotic pick & place technology. Expected to be integrated with high-speed primary VFFS or HFFS systems, it features conveying technology for easy product collation, precise gripper mechanisms with mechanical and vacuum suction cups, and optional quality assurance capabilities. The system delivers unbeatable flexibility in a compact footprint while achieving higher throughputs and multi-tasking capabilities."
      features={features}
      models={models}
      applications={applications}
      category="Case Packers"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1752945423/icp-120_c9k0w8.png"
      slug="icp-120"
      videoId="21TRaAm_seg"
      videoIds={["21TRaAm_seg", "J6mietRiBZ8"]}
      technicalData={technicalData}
    />
  );
} 