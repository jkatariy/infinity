import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Advanced Vision Technology',
    description: 'High-resolution cameras with advanced image processing algorithms',
    icon: '👁️'
  },
  {
    title: 'Multi-Point Inspection',
    description: 'Simultaneous inspection of multiple product features and defects',
    icon: '🔍'
  },
  {
    title: 'Real-Time Processing',
    description: 'High-speed image processing for real-time quality control',
    icon: '⚡'
  },
  {
    title: 'AI-Powered Detection',
    description: 'Machine learning algorithms for improved defect detection accuracy',
    icon: '🤖'
  },
  {
    title: 'Flexible Configuration',
    description: 'Modular system adapts to various product types and inspection requirements',
    icon: '🔧'
  },
  {
    title: 'Data Analytics',
    description: 'Comprehensive reporting and trend analysis for quality improvement',
    icon: '📊'
  }
];

const models = [
  {
    name: 'Vision Pro Standard',
    description: 'Advanced vision inspection system for comprehensive quality control.',
    features: [
      'High-resolution imaging',
      'Multi-feature inspection',
      'Real-time processing',
      'Defect classification',
      'Statistical reporting',
    ],
    specifications: [
      { label: 'Resolution', value: 'Up to 12MP' },
      { label: 'Inspection Speed', value: 'Up to 600 ppm' },
      { label: 'Detection Accuracy', value: '99.9%' },
      { label: 'Lighting', value: 'LED Multi-angle' },
      { label: 'Processing Power', value: 'Intel i7 Quad-core' },
      { label: 'Interface', value: 'Ethernet, USB, Serial' },
      { label: 'Software', value: 'VisionWorks Pro' },
      { label: 'Environment', value: 'IP65 Rated' },
    ],
  },
  {
    name: 'Vision Compact',
    description: 'Compact vision system for basic inspection applications.',
    features: [
      'Space-saving design',
      'Easy setup and operation',
      'Basic defect detection',
      'Cost-effective solution',
      'User-friendly interface',
    ],
    specifications: [
      { label: 'Resolution', value: 'Up to 5MP' },
      { label: 'Inspection Speed', value: 'Up to 300 ppm' },
      { label: 'Detection Accuracy', value: '99.5%' },
      { label: 'Lighting', value: 'LED Ring Light' },
      { label: 'Processing Power', value: 'ARM Cortex-A9' },
      { label: 'Interface', value: 'Ethernet, USB' },
      { label: 'Software', value: 'VisionWorks Lite' },
      { label: 'Environment', value: 'IP54 Rated' },
    ],
  }
];

const keyFeatures = [
  'High-resolution cameras with advanced image processing algorithms for precise inspection',
  'Simultaneous multi-point inspection of various product features and defects',
  'Real-time high-speed image processing for continuous quality control',
  'AI-powered machine learning algorithms for improved detection accuracy',
  'Modular system configuration adaptable to various product types',
  'Comprehensive data analytics with reporting and trend analysis',
  'Advanced defect classification and sorting capabilities',
  'Statistical process control with real-time quality metrics',
  'User-friendly interface with intuitive setup and operation',
  'Integration capabilities with existing production line systems',
  'Customizable inspection parameters for specific product requirements',
  'Remote monitoring and diagnostic capabilities',
  'Scalable architecture for future expansion and upgrades',
  'Cost-effective solutions for various inspection complexity levels'
];

const technicalData = {
  performance: [
    { label: 'Inspection Speed', value: '600', unit: 'PPM' },
    { label: 'Detection Accuracy', value: '99.9', unit: '%' },
    { label: 'Resolution', value: '12', unit: 'MP' },
    { label: 'Processing Time', value: '<10', unit: 'ms' }
  ],
  dimensions: [
    { label: 'Camera Unit', value: '200x150', unit: 'mm' },
    { label: 'Control Cabinet', value: '600x800', unit: 'mm' },
    { label: 'Working Distance', value: '100-500', unit: 'mm' },
    { label: 'Field of View', value: 'Variable', unit: 'Config' }
  ],
  power: [
    { label: 'Power Consumption', value: '500', unit: 'W' },
    { label: 'Voltage', value: '230V AC', unit: '1 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Lighting Power', value: '100', unit: 'W LED' }
  ]
};

const specifications = [
  { label: 'Camera Technology', value: 'High-resolution CCD/CMOS sensors with advanced optics' },
  { label: 'Lighting System', value: 'LED multi-angle illumination with adjustable intensity' },
  { label: 'Image Processing', value: 'Real-time algorithms with AI-powered pattern recognition' },
  { label: 'Software Platform', value: 'VisionWorks Pro with intuitive user interface' },
  { label: 'Detection Capabilities', value: 'Defects, dimensions, colors, text, barcodes, QR codes' },
  { label: 'Data Management', value: 'Comprehensive logging, reporting, and trend analysis' },
  { label: 'Integration', value: 'Ethernet, USB, Serial communication protocols' },
  { label: 'Environmental Rating', value: 'IP65 rated enclosure for industrial environments' },
  { label: 'Calibration', value: 'Automatic calibration with reference standards' },
  { label: 'User Interface', value: 'Touch screen HMI with remote access capabilities' },
  { label: 'Maintenance', value: 'Self-diagnostic features with predictive maintenance alerts' },
  { label: 'Customization', value: 'Modular design for application-specific configurations' }
];

const applications = [
  'Pharmaceutical Quality Control',
  'Food Safety Inspection',
  'Automotive Parts Verification',
  'Electronics Assembly QC',
  'Cosmetic Packaging Inspection',
  'Label Verification',
  'Barcode/QR Code Reading',
  'Dimensional Measurement',
  'Surface Defect Detection',
  'Color Verification',
  'Print Quality Assessment',
  'Packaging Integrity Check'
];

const certifications = ['ISO 9001:2015'];

export default function VisionSystemsPage() {
  return (
    <ProductDetailPage
      id="vision-systems"
      title="Vision Inspection Systems"
      subtitle="Advanced Automated Quality Control"
      description="Our vision inspection systems utilize cutting-edge camera technology and AI-powered image processing to deliver unmatched quality control accuracy. From basic defect detection to complex multi-feature inspection, these systems ensure product quality and compliance across all manufacturing processes."
      features={features}
      models={models}
      applications={applications}
      category="inspection"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098783/eyabelg0f9lzx5kl5hms.png"
      slug="products/inspection/vision-systems"
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 