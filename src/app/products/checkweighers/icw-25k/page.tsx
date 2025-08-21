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
    description: 'Weighing accuracy of ±25gm for industrial quality control',
    icon: '🎯'
  },
  {
    title: 'Load Cell Technology',
    description: 'Advanced load cell weighing sensor for consistent performance',
    icon: '📊'
  },
  {
    title: 'Heavy Industrial Design',
    description: 'Designed for large industrial solutions up to 25 kg',
    icon: '🏭'
  }
];

const models = [
  {
    name: 'ICW-25K Dynamic Checkweigher',
    description: 'Heavy industrial dynamic checkweigher for products up to 25 kg with robust construction.',
    features: [
      'Weighs and counts products in motion',
      'Rejects products not meeting predetermined specifications',
      'Industrial processing up to 10 PPM',
      'Industrial weighing accuracy of ±25gm',
      'Advanced load cell weighing sensor',
      'Diverter/Pusher rejection mechanisms',
      'Suitable for various industries',
      'Heavy industrial design for large products',
      'User-friendly operation',
      'Robust construction for industrial use'
    ],
    specifications: [
      { label: 'Weighing Range', value: '6 kg to 25 kg' },
      { label: 'Weighing Accuracy', value: '+/- 25 gm' },
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
  'Heavy industrial dynamic checkweigher for products up to 25 kg',
  'High-precision weighing accuracy of ±25gm for industrial quality control',
  'Robust construction designed for large-scale industrial applications',
  'Advanced load cell technology with superior signal processing capabilities',
  'Multiple rejection mechanisms: Diverter, Pusher, Air blower, Skid plate systems',
  'Processing speed up to 10 products per minute with consistent reliability',
  'Industrial-grade digital display with comprehensive statistics and monitoring',
  'Built-in data logging and recording capabilities for traceability and compliance',
  'Heavy-duty design suitable for demanding industrial environments',
  'Wide operating temperature range (0-40°C) for various conditions',
  'Integration capability with existing production lines and systems',
  'Low maintenance requirements with easy calibration procedures'
];

const specifications = [
  { label: 'Weighing Range', value: '6 kg to 25 kg' },
  { label: 'Weighing Accuracy', value: '+/- 25 gm' },
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
    { label: 'Weighing Accuracy', value: '±25', unit: 'gm' },
    { label: 'Weight Range', value: '6000-25000', unit: 'gm' },
    { label: 'Throughput Rate', value: '99.5', unit: '% efficiency' }
  ],
  dimensions: [
    { label: 'Length', value: '2800', unit: 'mm' },
    { label: 'Width', value: '1000', unit: 'mm' },
    { label: 'Height', value: '1500', unit: 'mm' },
    { label: 'Net Weight', value: '500', unit: 'kg' }
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

export default function ICW25KPage() {
  return (
    <ProductDetailPage
      id="icw-25k"
      title="ICW-25K Dynamic Checkweigher"
      subtitle="Heavy Industrial Weighing Solution"
      description="The ICW-25K is a heavy industrial dynamic checkweigher designed for large products up to 25 kg. With its robust construction and accuracy of ±25gm, it provides reliable quality control for heavy industrial applications. The system features advanced load cell technology and flexible rejection mechanisms for comprehensive quality assurance in demanding manufacturing environments."
      features={features}
      models={models}
      applications={applications}
      category="checkweighers"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/to7gc0wb5jq8dzm3bojs.png"
      slug="products/checkweighers/icw-25k"
      videoId="AcGw5jiQwa4"
      videoIds={["AcGw5jiQwa4", "W8JTw3fxgO0"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 