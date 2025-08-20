import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Fully Integrated System',
    description: 'Fully integrated and 100% servo-driven case packaging system',
    icon: '🔧'
  },
  {
    title: 'High-Speed VFFS Integration',
    description: 'Expected to be integrated with high-speed primary VFSS or HFFS',
    icon: '📦'
  },
  {
    title: 'Advanced Conveying Technology',
    description: 'Take-up conveying technology enables easy product pitch creation and product transfer',
    icon: '🔄'
  },
  {
    title: 'Pendulum Collator',
    description: 'Strips pass through pendulum collator or specific collation system for matrix formation',
    icon: '🎯'
  },
  {
    title: 'Delta Robotic System',
    description: 'Products fed into cases with engineered Delta Robotic Pick & Place application',
    icon: '🤖'
  },
  {
    title: 'Specialized Grippers',
    description: 'Gripper mechanism utilizes mechanical and vacuum suction cups for accurate product placement',
    icon: '🔧'
  }
];

const keyFeatures = [
  'Fully integrated and 100% servo-driven case packaging system',
  'High-speed integration with primary VFFS or HFFS systems',
  'Take-up conveying technology for easy product pitch creation',
  'Pendulum collator for precise matrix formation of strips',
  'Engineered Delta Robotic Pick & Place application',
  'Specialized grippers with mechanical and vacuum suction capabilities',
  'Carton erectors with bottom taping and closure systems',
  'Optional quality assurance with weighing scale integration',
  'Unbeatable flexibility in compact, space-saving footprint',
  'Higher throughputs with simultaneous multi-tasking capabilities',
  'Shortest cycle times for pick and place operations',
  'Rugged, compact system for boosting top loading output',
  'Open design for exceptional visibility and easy training',
  'Minimal changeover for handling multiple product variants',
  'Optional inline capabilities: Check Weigher, Taping, Label Application',
  'High-Speed, Accuracy & Precision Servo Driven system',
  'Universal integration with any VFFS or HFFS machine',
  'Tower lamp status indication for operational visibility',
  '7" Color Touch screen with 50 recipe function',
  'Advanced diagnostics and error display system'
];

const models = [
  {
    name: 'ICS-200 Case Packer for Strip of Pouches',
    description: 'Fully integrated and 100% servo-driven case packaging system designed for strip of pouches with advanced collation system.',
    features: [
      'Fully integrated and 100% servo-driven case packaging system',
      'Matches speed, accuracy, and efficiency requirements',
      'Expected to be integrated with high-speed primary VFSS or HFFS',
      'Take-up conveying technology enables easy product pitch creation and product transfer',
      'Strips pass through pendulum collator or specific collation system for matrix formation',
      'Products fed into cases with an engineered Delta Robotic Pick & Place application for precise handling',
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
      { label: 'System Dimensions', value: 'Project Specific Customized Solution' },
      { label: 'Input Speed', value: 'Up to 200 PPM (product dependent)' },
      { label: 'Output Speed', value: 'Up to 8-10 cases per minute' },
      { label: 'Air requirement', value: '6 CFM (Approx)' },
      { label: 'Power required', value: '3 Phase 420V AC / 50 Hz' },
      { label: 'Electrical Consumption', value: '8KW Approx' },
      { label: 'MOC', value: 'MS & Contact parts: SS-304' }
    ],
  }
];

const technicalData = {
  performance: [
    { label: 'Input Speed', value: '200', unit: 'PPM' },
    { label: 'Output Speed', value: '8-10', unit: 'cases/min' },
    { label: 'Efficiency', value: '95', unit: '%' },
    { label: 'Cycle Time', value: '6-7.5', unit: 'sec/case' }
  ],
  dimensions: [
    { label: 'System Length', value: 'Custom', unit: 'Project Specific' },
    { label: 'System Width', value: 'Custom', unit: 'Project Specific' },
    { label: 'System Height', value: 'Custom', unit: 'Project Specific' },
    { label: 'Footprint', value: 'Compact', unit: 'Space-saving' }
  ],
  power: [
    { label: 'Power Consumption', value: '8', unit: 'KW (approx)' },
    { label: 'Voltage', value: '420V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Requirement', value: '6', unit: 'CFM' }
  ]
};

const specifications = [
  { label: 'System Type', value: 'Fully integrated servo-driven case packaging system' },
  { label: 'Integration', value: 'Compatible with high-speed primary VFFS or HFFS systems' },
  { label: 'Conveying Technology', value: 'Take-up conveying for product pitch creation and transfer' },
  { label: 'Collation System', value: 'Pendulum collator for strip matrix formation' },
  { label: 'Pick & Place', value: 'Engineered Delta Robotic application with specialized grippers' },
  { label: 'Gripper Mechanism', value: 'Mechanical and vacuum suction cups for accurate placement' },
  { label: 'Case Handling', value: 'Carton erectors with bottom taping and closures' },
  { label: 'Quality Control', value: 'Optional weighing scale for 100% product conformity' },
  { label: 'Control System', value: '7" Color Touch screen with 50 recipe function' },
  { label: 'Material Construction', value: 'MS frame with SS-304 contact parts' },
  { label: 'Connectivity', value: 'Tower lamp status indication and diagnostics' },
  { label: 'Customization', value: 'Project-specific customized solutions available' }
];

const applications = [
  'Pharmaceutical Packaging',
  'Confectionery Industry',
  'Food Processing',
  'Personal Care Products',
  'Medical Devices',
  'Consumer Goods',
  'Nutraceuticals',
  'Healthcare Products',
  'Industrial Products',
  'Strip Packaging'
];

const certifications = ['ISO 9001:2015'];

export default function ICS200Page() {
  return (
    <ProductDetailPage
      id="ics-200"
      title="ICS-200 Case Packer for Strip of Pouches"
      description="The ICS-200 is a fully integrated and 100% servo-driven case packaging system designed specifically for strip of pouches with advanced collation capabilities. Featuring take-up conveying technology for easy product pitch creation, pendulum collator for matrix formation, and engineered Delta Robotic Pick & Place application with specialized grippers and vacuum suction cups. The system delivers unbeatable flexibility in a compact footprint while achieving higher throughputs up to 200 PPM input speed."
      features={features}
      models={models}
      applications={applications}
      category="case-packers"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098778/icqycnzcjm2caqhemj5x.png"
      slug="products/case-packers/ics-200"
      videoId="3n1r_Ju6khw"
      videoIds={["3n1r_Ju6khw", "vLgF0k2zdVo"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 