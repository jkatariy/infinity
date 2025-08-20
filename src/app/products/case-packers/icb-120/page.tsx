import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Fully Integrated System',
    description: 'Fully integrated and 100% servo-driven case packaging system',
    icon: '🔧'
  },
  {
    title: 'High-Speed Bottle Filling Integration',
    description: 'Expected to be integrated with high-speed primary bottle filling line',
    icon: '🍼'
  },
  {
    title: 'Advanced Conveying Technology',
    description: 'Conveying technology enables easy product pitch creation and uniform traveling path',
    icon: '🔄'
  },
  {
    title: 'Lane Divider System',
    description: 'State-of-the-art Lane Divider system (servo driven for precise bottle handling and matrix creation)',
    icon: '🎯'
  },
  {
    title: 'Robotic Pick & Place',
    description: 'Project-specific Robotic Pick & Place application for precise product handling',
    icon: '🤖'
  },
  {
    title: 'Specialized Grippers',
    description: 'Gripper mechanism utilizes mechanical and vacuum suction cups for accurate product placement',
    icon: '🔧'
  }
];

const models = [
  {
    name: 'ICB-120 Case Packer for Bottles',
    description: 'Fully integrated and 100% servo-driven case packaging system designed for high-speed bottle filling line integration.',
    features: [
      'Fully integrated and 100% servo-driven case packaging system',
      'Matches speed, accuracy, and efficiency requirements',
      'Expected to be integrated with high-speed primary bottle filling line',
      'Conveying technology enables easy product pitch creation and uniform traveling path',
      'State-of-the-art Lane Divider system (servo driven for precise bottle handling and matrix creation)',
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
      'Can be integrated with any bottle filling line',
      'Tower lamp to identify machine status',
      '7" Color Touch screen with 50 recipe function'
    ],
    specifications: [
      { label: 'System Dimensions', value: 'Project Specific Customized Solution' },
      { label: 'Input Speed', value: 'Up to 120 PPM (product dependent)' },
      { label: 'Output Speed', value: 'Up to 8-10 cases per minute' },
      { label: 'Air requirement', value: '6 CFM (Approx)' },
      { label: 'Power required', value: '3 Phase 420V AC / 50 Hz' },
      { label: 'Electrical Consumption', value: '8KW Approx' },
      { label: 'MOC', value: 'MS & Contact parts: SS-304' }
    ],
  }
];

const keyFeatures = [
  'Fully integrated and 100% servo-driven case packaging system for maximum efficiency',
  'Seamless integration with high-speed primary bottle filling lines',
  'Advanced conveying technology for easy product pitch creation and uniform traveling',
  'State-of-the-art servo-driven Lane Divider system for precise bottle handling',
  'Project-specific Robotic Pick & Place application with advanced gripper technology',
  'Mechanical and vacuum suction cups for accurate product placement',
  'Carton erectors with bottom taping and closure systems',
  'Optional quality assurance with integrated weighing scale for 100% product conformity',
  'Unbeatable flexibility in compact, space-saving footprint design',
  'Higher throughput capability with simultaneous multi-tasking operations',
  'Minimal changeover time for handling multiple product variants',
  'Rugged, compact system design for maximum output efficiency',
  'Open design for exceptional visibility and easy operator training',
  'Desired matrix formation with flexible pattern configurations',
  'Specialized grippers and suction capabilities for various bottle types',
  'Optional inline capabilities: Check weigher, taping, label application',
  'Advanced PLC-based control system with comprehensive diagnostics',
  '7" Color touchscreen with 50 recipe memory function',
  'Multi-level password protection for operational security',
  'Tower lamp status indication for real-time machine monitoring',
  'Ethernet/MODBUS/Inverter protocol connectivity options',
  'Real-time production data reporting and analysis'
];

const technicalData = {
  performance: [
    { label: 'Input Speed', value: '120', unit: 'PPM' },
    { label: 'Output Speed', value: '8-10', unit: 'cases/min' },
    { label: 'Efficiency', value: '98', unit: '%' },
    { label: 'Case Formation', value: 'Matrix', unit: 'pattern' }
  ],
  dimensions: [
    { label: 'Length', value: 'Project', unit: 'Specific' },
    { label: 'Width', value: 'Custom', unit: 'Design' },
    { label: 'Height', value: 'Variable', unit: 'Config' },
    { label: 'Footprint', value: 'Compact', unit: 'Design' }
  ],
  power: [
    { label: 'Power Required', value: '8', unit: 'KW' },
    { label: 'Voltage', value: '420V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Requirement', value: '6', unit: 'CFM' }
  ]
};

const specifications = [
  { label: 'System Type', value: 'Fully integrated servo-driven case packaging system' },
  { label: 'Integration', value: 'Compatible with high-speed bottle filling lines' },
  { label: 'Conveying Technology', value: 'Advanced pitch creation and uniform path technology' },
  { label: 'Lane Divider', value: 'Servo-driven precision bottle handling system' },
  { label: 'Pick & Place', value: 'Project-specific robotic application with specialized grippers' },
  { label: 'Gripper Technology', value: 'Mechanical and vacuum suction cup combination' },
  { label: 'Carton Handling', value: 'Erectors with bottom taping and closure systems' },
  { label: 'Quality Assurance', value: 'Optional integrated weighing scale for 100% conformity' },
  { label: 'Control System', value: 'Advanced PLC-based with 7" color touchscreen' },
  { label: 'Recipe Memory', value: '50 recipe storage capability' },
  { label: 'Connectivity', value: 'Ethernet/MODBUS/Inverter protocol support' },
  { label: 'Safety Features', value: 'Multi-level password protection and status indication' },
  { label: 'Material Construction', value: 'MS frame with SS-304 contact parts' },
  { label: 'Design Philosophy', value: 'Open design for visibility and easy training' }
];

const applications = [
  'Beverage Industry',
  'Bottle Manufacturing', 
  'Dairy Products',
  'Pharmaceutical Bottles',
  'Personal Care Products',
  'Chemical Industry',
  'Food & Beverage',
  'Cosmetics',
  'Healthcare Products',
  'Industrial Bottling',
  'Water Bottling',
  'Juice Processing'
];

const certifications = ['ISO 9001:2015'];

export default function ICB120Page() {
  return (
    <ProductDetailPage
      id="icb-120"
      title="ICB-120 Case Packer for Bottles"
      subtitle="Fully Integrated Servo-Driven Bottle Case Packaging System"
      description="The ICB-120 is a fully integrated and 100% servo-driven case packaging system designed specifically for high-speed bottle filling line integration. Featuring advanced conveying technology for easy product pitch creation, state-of-the-art Lane Divider system for precise bottle handling, and project-specific Robotic Pick & Place application with specialized grippers and vacuum suction cups. The system delivers unbeatable flexibility in a compact footprint while achieving higher throughputs and multi-tasking capabilities."
      features={features}
      models={models}
      applications={applications}
      category="case-packers"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1752945429/ICB120_case_packer_bottles_mqhvdm.png"
      slug="products/case-packers/icb-120"
      videoId="MKtm_gZgRy0"
      videoIds={["MKtm_gZgRy0", "vLgF0k2zdVo"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 