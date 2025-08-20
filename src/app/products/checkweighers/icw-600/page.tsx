import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Dynamic Weighing',
    description: 'Advanced in-motion weighing technology with high precision load cell sensors for real-time weight verification',
    icon: '⚖️'
  },
  {
    title: 'Automatic Rejection',
    description: 'Intelligent rejection system automatically removes products not meeting predetermined weight specifications',
    icon: '🚫'
  },
  {
    title: 'High-Speed Processing',
    description: 'Process up to 120 products per minute with consistent accuracy and minimal production line disruption',
    icon: '⚡'
  },
  {
    title: 'Precision Accuracy',
    description: 'Exceptional weighing accuracy of ±0.5gm ensuring reliable quality control and compliance standards',
    icon: '🎯'
  },
  {
    title: 'Load Cell Technology',
    description: 'Industrial-grade load cell weighing sensors with advanced signal processing for consistent performance',
    icon: '📊'
  },
  {
    title: 'Flexible Rejection',
    description: 'Multiple rejection mechanisms available: Diverter arms, pneumatic pushers, or compressed air systems',
    icon: '🔄'
  }
];

const keyFeatures = [
  'Dynamic weighing and counting of products in continuous motion',
  'Automatic rejection of products not meeting weight specifications',
  'High-speed processing capability up to 120 products per minute',
  'Precision weighing accuracy of ±0.5gm for reliable quality control',
  'Advanced load cell technology with superior signal processing',
  'Multiple rejection mechanisms: Diverter, Pusher, or Air systems',
  'Compact design for easy integration into existing production lines',
  'User-friendly digital display with real-time statistics',
  'Built-in data logging and recording capabilities',
  'Robust construction suitable for industrial environments',
  'Customizable settings for different product specifications',
  'Low maintenance requirements with easy calibration'
];

const models = [
  {
    name: 'ICW-600 Dynamic Checkweigher',
    description: 'High-precision dynamic checkweigher designed for products up to 600 grams with exceptional accuracy and reliability.',
    features: [
      'Weighs and counts products in motion with continuous operation',
      'Rejects products not meeting predetermined weight specifications',
      'High-speed processing capability up to 120 PPM',
      'Precision weighing accuracy of ±0.5gm for quality assurance',
      'Advanced load cell weighing sensor with noise filtration',
      'Multiple rejection mechanisms available for different applications',
      'Suitable for various industries including food, pharma, and manufacturing',
      'Compact and space-efficient design for easy integration',
      'User-friendly operation with intuitive controls',
      'Robust construction for demanding industrial environments',
      'Digital display with comprehensive statistics and reporting',
      'Built-in data logging for quality traceability'
    ],
    specifications: [
      { label: 'Weighing Range', value: '50 gm to 600 gm' },
      { label: 'Weighing Accuracy', value: '+/- 0.5 gm' },
      { label: 'Speed', value: 'up to 120 PPM' },
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
    { label: 'Processing Speed', value: '120', unit: 'PPM' },
    { label: 'Weighing Accuracy', value: '±0.5', unit: 'gm' },
    { label: 'Weight Range', value: '10-600', unit: 'gm' },
    { label: 'Throughput Rate', value: '99.9', unit: '% efficiency' }
  ],
  dimensions: [
    { label: 'Length', value: '1500', unit: 'mm' },
    { label: 'Width', value: '600', unit: 'mm' },
    { label: 'Height', value: '1200', unit: 'mm' },
    { label: 'Net Weight', value: '150', unit: 'kg' }
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
  { label: 'Rejection Systems', value: 'Diverter arms, Pneumatic pushers, or Compressed air systems' },
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
  'Production Monitoring',
  'Confectionery',
  'Dairy Products'
];

const certifications = ['ISO 9001:2015'];

export default function ICW600Page() {
  return (
    <ProductDetailPage
      id="icw-600"
      title="ICW-600 Dynamic Checkweigher"
      subtitle="High-Precision Weight Verification System"
      description="The ICW-600 is a state-of-the-art dynamic checkweigher engineered for high-precision weight verification in continuous production environments. Featuring advanced load cell technology and intelligent rejection systems, it processes up to 120 products per minute with exceptional ±0.5gm accuracy. The system offers multiple rejection mechanisms, comprehensive data logging, and seamless integration capabilities for diverse industrial applications."
      features={features}
      models={models}
      applications={applications}
      category="checkweighers"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098780/ojxj2meqqjouthgdbncd.png"
      slug="products/checkweighers/icw-600"
      videoId="AcGw5jiQwa4"
      videoIds={["AcGw5jiQwa4", "W8JTw3fxgO0"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 