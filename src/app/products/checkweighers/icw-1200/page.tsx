import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Dynamic Weighing',
    description: 'Weighs and counts products in motion with high precision',
    icon: '⚖️'
  },
  {
    title: 'Automatic Rejection',
    description: 'Rejects products not meeting predetermined specifications',
    icon: '🚫'
  },
  {
    title: 'High-Speed Processing',
    description: 'Process up to 80 products per minute with consistent accuracy',
    icon: '⚡'
  },
  {
    title: 'Precision Accuracy',
    description: 'Weighing accuracy of ±1gm for reliable quality control',
    icon: '🎯'
  },
  {
    title: 'Load Cell Technology',
    description: 'Advanced load cell weighing sensor for consistent performance',
    icon: '📊'
  },
  {
    title: 'Flexible Rejection',
    description: 'Multiple rejection mechanisms: Diverter or Pusher',
    icon: '🔄'
  }
];

const keyFeatures = [
  'Dynamic weighing and counting of products in continuous motion',
  'Automatic rejection of products not meeting weight specifications',
  'High-speed processing capability up to 80 products per minute',
  'Precision weighing accuracy of ±1gm for reliable quality control',
  'Advanced load cell technology with superior signal processing',
  'Multiple rejection mechanisms: Diverter or Pusher systems',
  'Compact design for easy integration into existing production lines',
  'User-friendly digital display with real-time statistics',
  'Built-in data logging and recording capabilities',
  'Robust construction suitable for industrial environments',
  'Customizable settings for different product specifications',
  'Low maintenance requirements with easy calibration'
];

const models = [
  {
    name: 'ICW-1200 Dynamic Checkweigher',
    description: 'High-precision dynamic checkweigher for products up to 1200 grams with reliable accuracy.',
    features: [
      'Weighs and counts products in motion',
      'Rejects products not meeting predetermined specifications',
      'High-speed processing up to 80 PPM',
      'Precision weighing accuracy of ±1gm',
      'Advanced load cell weighing sensor',
      'Multiple rejection mechanisms available',
      'Suitable for various industries',
      'Compact design for easy integration',
      'User-friendly operation',
      'Robust construction for industrial use',
      'Digital display with real-time statistics',
      'Built-in data recording and logging capability'
    ],
    specifications: [
      { label: 'Weighing Range', value: '600 gm to 1200 gm' },
      { label: 'Weighing Accuracy', value: '+/- 1 gm' },
      { label: 'Speed', value: 'Up to 80 PPM' },
      { label: 'Direction', value: 'Left to right or right to left' },
      { label: 'Rejection Type', value: 'Underweight or overweight rejection with Diverter/ Pusher/ Air blower/ Skid plate' },
      { label: 'Power required', value: '1 Phase 230V AC/ 50 Hz/ 300 VA' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'MS Powder Coated (can be SS-304)' },
      { label: 'Weighing sensor', value: 'scaime /Essae make Load Cell' },
      { label: 'Bearings', value: 'SKF, HCH make' },
      { label: 'Mode of operation', value: 'PLC based' },
      { label: 'Sensors', value: 'P&F, Continex, Autonics, Wangler make' },
      { label: 'Additional Features', value: 'Advanced PLC based control system; 100 product memory (via USB); Helpful graphical user interface; Printer interface; Multi-level user ID and password; Inbuilt report generation; Data sharing via USB or Ethernet; Net weight display; Statistical data available; Tendency control available; Easy height adjustment for conveyor line; Integration with existing production lines; Interlocks with other machines; Wide operating temperature range (0-40°C); Heavy-duty components and high-quality electronics.' }
    ],
  }
];

const technicalData = {
  performance: [
    { label: 'Processing Speed', value: '80', unit: 'PPM' },
    { label: 'Weighing Accuracy', value: '±1', unit: 'gm' },
    { label: 'Weight Range', value: '10-1200', unit: 'gm' },
    { label: 'Throughput Rate', value: '99.8', unit: '% efficiency' }
  ],
  dimensions: [
    { label: 'Length', value: '1800', unit: 'mm' },
    { label: 'Width', value: '700', unit: 'mm' },
    { label: 'Height', value: '1300', unit: 'mm' },
    { label: 'Net Weight', value: '200', unit: 'kg' }
  ],
  power: [
    { label: 'Power Consumption', value: '300', unit: 'VA' },
    { label: 'Voltage', value: '230V AC', unit: '1 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Protection Rating', value: 'IP54', unit: '' }
  ]
};

const specifications = [
  { label: 'Load Cell Type', value: 'High-precision industrial grade with temperature compensation' },
  { label: 'Conveyor Belt Material', value: 'Food-grade PU/PVC, FDA approved (customizable)' },
  { label: 'Rejection Systems', value: 'Diverter arms or Pneumatic pushers' },
  { label: 'Display Interface', value: 'LED/LCD digital display with real-time weight and statistics' },
  { label: 'Data Storage', value: 'Internal memory for weight logs and production statistics' },
  { label: 'Calibration', value: 'External weight calibration with automatic zero tracking' },
  { label: 'Environmental Protection', value: 'IP54 rated enclosure for industrial environments' },
  { label: 'Integration Capability', value: 'Compatible with existing production line systems' },
  { label: 'Maintenance', value: 'Low maintenance design with easy access components' },
  { label: 'Compliance Standards', value: 'Meets international quality and safety standards' }
];

const applications = [
  'Food Processing',
  'Pharmaceutical Manufacturing',
  'Automobile Industry',
  'Chemical Industry',
  'Beverage Industry',
  'Pesticides Industries',
  'Quality Control',
  'Manufacturing QA',
  'Packaging Lines',
  'Production Monitoring'
];

const certifications = ['ISO 9001:2015'];

export default function ICW1200Page() {
  return (
    <ProductDetailPage
      id="icw-1200"
      title="ICW-1200 Dynamic Checkweigher"
      subtitle="Medium-Range Precision Weighing Solution"
      description="The ICW-1200 is a dynamic checkweigher designed for medium-range weighing applications up to 1200 grams. With its reliable accuracy of ±1gm and processing speed up to 80 PPM, it provides effective quality control for various industries. The system features advanced load cell technology and flexible rejection mechanisms for comprehensive quality assurance."
      features={features}
      models={models}
      applications={applications}
      category="checkweighers"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png"
      slug="products/checkweighers/icw-1200"
      videoId="AcGw5jiQwa4"
      videoIds={["AcGw5jiQwa4", "W8JTw3fxgO0"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 