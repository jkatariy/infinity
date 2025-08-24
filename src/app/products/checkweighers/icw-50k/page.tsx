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
    title: 'Industrial Processing',
    description: 'Process up to 10 products per minute with consistent accuracy',
    icon: '⚡'
  },
  {
    title: 'Industrial Accuracy',
    description: 'Weighing accuracy of ±50gm for industrial quality control',
    icon: '🎯'
  },
  {
    title: 'Load Cell Technology',
    description: 'Advanced load cell weighing sensor for consistent performance',
    icon: '📊'
  },
  {
    title: 'Extra Heavy Industrial Design',
    description: 'Designed for extra large industrial solutions up to 50 kg',
    icon: '🏭'
  }
];

const models = [
  {
    name: 'ICW-50K Dynamic Checkweigher',
    description: 'Extra heavy industrial dynamic checkweigher for products up to 50 kg with robust construction.',
    features: [
      'Weighs and counts products in motion',
      'Rejects products not meeting predetermined specifications',
      'Industrial processing up to 10 PPM',
      'Industrial weighing accuracy of ±50gm',
      'Advanced load cell weighing sensor',
      'Diverter/Pusher rejection mechanisms',
      'Suitable for various industries',
      'Extra heavy industrial design for large products',
      'User-friendly operation',
      'Robust construction for industrial use'
    ],
    specifications: [
      { label: 'Weighing Range', value: '25 kg to 50 kg' },
      { label: 'Weighing Accuracy', value: '+/- 50 gm' },
      { label: 'Speed', value: 'Up to 10 PPM' },
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

const keyFeatures = [
  'Extra heavy industrial dynamic checkweigher for products up to 50 kg',
  'High-precision weighing accuracy of ±50gm for the heaviest industrial applications',
  'Ultra-robust construction designed for the most demanding industrial environments',
  'Advanced load cell technology with superior signal processing for heavy products',
  'Multiple rejection mechanisms: Diverter, Pusher, Air blower, Skid plate systems',
  'Processing speed up to 10 products per minute with maximum reliability',
  'Extra heavy-duty digital display with comprehensive statistics and monitoring',
  'Built-in data logging and recording capabilities for complete traceability',
  'Maximum weight capacity design for the largest industrial products',
  'Wide operating temperature range (0-40°C) for extreme conditions',
  'Integration capability with heavy-duty production lines and systems',
  'Ultra-low maintenance requirements with robust calibration procedures'
];

const specifications = [
  { label: 'Weighing Range', value: '25 kg to 50 kg' },
  { label: 'Weighing Accuracy', value: '+/- 50 gm' },
  { label: 'Speed', value: 'Up to 10 PPM' },
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
];

const technicalData = {
  performance: [
    { label: 'Processing Speed', value: '10', unit: 'PPM' },
    { label: 'Weighing Accuracy', value: '±50', unit: 'gm' },
    { label: 'Weight Range', value: '25000-50000', unit: 'gm' },
    { label: 'Throughput Rate', value: '99.3', unit: '% efficiency' }
  ],
  dimensions: [
    { label: 'Length', value: '3200', unit: 'mm' },
    { label: 'Width', value: '1200', unit: 'mm' },
    { label: 'Height', value: '1600', unit: 'mm' },
    { label: 'Net Weight', value: '750', unit: 'kg' }
  ],
  power: [
    { label: 'Power Consumption', value: '300', unit: 'VA' },
    { label: 'Voltage', value: '230V AC', unit: '1 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Protection Rating', value: 'IP54', unit: '' }
  ]
};

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

export default function ICW50KPage() {
  return (
    <ProductDetailPage
      id="icw-50k"
      title="ICW-50K Dynamic Checkweigher"
      description="The ICW-50K is an extra heavy industrial dynamic checkweigher designed for the largest products up to 50 kg. With its ultra-robust construction and accuracy of ±50gm, it provides reliable quality control for the heaviest industrial applications. The system features advanced load cell technology and flexible rejection mechanisms for comprehensive quality assurance in the most demanding manufacturing environments."
      features={features}
      models={models}
      applications={applications}
      category="checkweighers"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/qwdbgrhu0duvwvui6i3t.png"
      slug="products/checkweighers/icw-50k"
      videoId="AcGw5jiQwa4"
      videoIds={["AcGw5jiQwa4", "W8JTw3fxgO0"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 