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
    description: 'Process up to 30 products per minute with consistent accuracy',
    icon: '⚡'
  },
  {
    title: 'Precision Accuracy',
    description: 'Weighing accuracy of ±5gm for reliable quality control',
    icon: '🎯'
  },
  {
    title: 'Load Cell Technology',
    description: 'Advanced load cell weighing sensor for consistent performance',
    icon: '📊'
  },
  {
    title: 'Heavy-Duty Design',
    description: 'Designed for larger products up to 6000 grams',
    icon: '💪'
  }
];

const models = [
  {
    name: 'ICW-6000 Dynamic Checkweigher',
    description: 'Heavy-duty dynamic checkweigher for products up to 6000 grams with robust construction.',
    features: [
      'Weighs and counts products in motion',
      'Rejects products not meeting predetermined specifications',
      'High-speed processing up to 30 PPM',
      'Precision weighing accuracy of ±5gm',
      'Advanced load cell weighing sensor',
      'Diverter/Pusher rejection mechanisms',
      'Suitable for various industries',
      'Heavy-duty design for larger products',
      'User-friendly operation',
      'Robust construction for industrial use'
    ],
    specifications: [
      { label: 'Weighing Range', value: '1200 gm to 6 kg' },
      { label: 'Weighing Accuracy', value: '+/- 5 gm' },
      { label: 'Speed', value: 'Up to 30 PPM' },
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
  'Heavy-duty dynamic checkweigher for products up to 6000 grams',
  'High-precision weighing accuracy of ±5gm for quality control',
  'Robust construction designed for larger industrial products',
  'Advanced load cell technology with superior signal processing',
  'Multiple rejection mechanisms: Diverter, Pusher, Air systems',
  'Processing speed up to 30 products per minute with consistency',
  'User-friendly digital display with comprehensive statistics',
  'Built-in data logging and recording capabilities for traceability',
  'Compact design suitable for integration into production lines',
  'Industrial-grade construction for demanding environments',
  'Customizable settings for different product specifications',
  'Low maintenance requirements with easy calibration procedures'
];

const specifications = [
  { label: 'Weighing Range', value: '1200 gm to 6 kg' },
  { label: 'Weighing Accuracy', value: '+/- 5 gm' },
  { label: 'Speed', value: 'Up to 30 PPM' },
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
    { label: 'Processing Speed', value: '30', unit: 'PPM' },
    { label: 'Weighing Accuracy', value: '±5', unit: 'gm' },
    { label: 'Weight Range', value: '1200-6000', unit: 'gm' },
    { label: 'Throughput Rate', value: '99.7', unit: '% efficiency' }
  ],
  dimensions: [
    { label: 'Length', value: '2200', unit: 'mm' },
    { label: 'Width', value: '800', unit: 'mm' },
    { label: 'Height', value: '1400', unit: 'mm' },
    { label: 'Net Weight', value: '300', unit: 'kg' }
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

export default function ICW6000Page() {
  return (
    <ProductDetailPage
      id="icw-6000"
      title="ICW-6000 Dynamic Checkweigher"
      description="The ICW-6000 is a heavy-duty dynamic checkweigher designed for larger products up to 6000 grams. With its robust construction and accuracy of ±5gm, it provides reliable quality control for heavier industrial applications. The system features advanced load cell technology and flexible rejection mechanisms for comprehensive quality assurance."
      features={features}
      models={models}
      applications={applications}
      category="checkweighers"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755178600/h99w6hq4fzdkuwv0mitr.png"
      slug="products/checkweighers/icw-6000"
      videoId="AcGw5jiQwa4"
      videoIds={["AcGw5jiQwa4", "W8JTw3fxgO0"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 