import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Space Efficient',
    description: 'Needs less floor space than conventional conveyors',
    icon: '📏'
  },
  {
    title: 'Speed & Reliability',
    description: 'Faster and more reliable than any elevator or lift',
    icon: '⚡'
  },
  {
    title: 'Customizable Height',
    description: 'Height available as per requirement for various applications',
    icon: '🔧'
  },
  {
    title: 'Durable Construction',
    description: 'Available in Mild Steel or Stainless Steel construction',
    icon: '💪'
  },
  {
    title: 'Premium Motors',
    description: 'Equipped with Bonfiglioli/MGM Varvel motors for reliable operation',
    icon: '⭐'
  },
  {
    title: 'Continuous Flow',
    description: 'Provides continuous flow for conveying full and empty cartons, cases, trays, totes, and packaged goods',
    icon: '🔄'
  }
];

const models = [
  {
    name: 'Spiral Conveyor',
    description: 'Space-efficient spiral conveyor system that needs less floor space than conventional conveyors.',
    features: [
      'Needs less floor space than conventional conveyors',
      'Faster and more reliable than any elevator or lift',
      'Customizable height as per requirement',
      'Available in Mild Steel or Stainless Steel construction',
      'Premium motor components',
      'Continuous flow operation',
      'Suitable for various packaged goods',
      'Reliable and efficient operation',
      'Easy maintenance',
      'Robust construction',
      'Suitable for various industrial applications',
      '50mm roller diameter for smooth operation'
    ],
    specifications: [
      { label: 'Application', value: 'For conveying cartons/bags with the help of gravity (Top to Bottom)' },
      { label: 'Product', value: 'Carton, Bag' },
      { label: 'Max Output Speed', value: 'NA' },
      { label: 'Machine Size', value: 'Spiral dia- 760mm, conveyor width- 500mm, height-as per requirement' },
      { label: 'Mode of Operation', value: 'Gravity driven' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Bearings', value: 'SKF, HCH, NTN make' }
    ],
  }
];

const keyFeatures = [
  'Needs less floor space than conventional conveyors',
  'Faster and more reliable than any elevator or lift system',
  'Customizable height available as per specific requirements',
  'Available in both Mild Steel and Stainless Steel construction',
  'Equipped with premium Bonfiglioli/MGM Varvel motors for reliable operation',
  'Provides continuous flow for various packaged goods',
  'Gravity-driven operation for energy efficiency',
  'Space-efficient vertical design optimizing floor utilization',
  'Suitable for cartons, cases, trays, totes, and packaged goods',
  'Robust construction with premium bearings (SKF, HCH, NTN make)',
  'Spiral diameter of 760mm with 500mm conveyor width',
  'Easy maintenance with accessible components'
];

const specifications = [
  { label: 'Application', value: 'For conveying cartons/bags with the help of gravity (Top to Bottom)' },
  { label: 'Product', value: 'Carton, Bag' },
  { label: 'Max Output Speed', value: 'NA' },
  { label: 'Machine Size', value: 'Spiral dia- 760mm, conveyor width- 500mm, height-as per requirement' },
  { label: 'Mode of Operation', value: 'Gravity driven' },
  { label: 'Contact parts', value: 'SS-304' },
  { label: 'Bearings', value: 'SKF, HCH, NTN make' }
];

const certifications = [
  'ISO 9001:2015',
  'FDA Compatible Materials'
];

const applications = [
  'Carton Handling',
  'Case Conveying',
  'Tray Transportation',
  'Tote Handling',
  'Packaged Goods',
  'Warehouse Operations',
  'Distribution Centers',
  'Manufacturing Facilities',
  'Material Handling',
  'Industrial Applications'
];

const technicalData = {
  performance: [
    { label: 'Operation Type', value: 'Gravity driven', unit: 'top to bottom' },
    { label: 'Space Efficiency', value: 'Less floor space', unit: 'than conventional' },
    { label: 'Reliability', value: 'Faster & more reliable', unit: 'than elevators' },
    { label: 'Products Handled', value: 'Cartons, Bags', unit: 'various sizes' }
  ],
  dimensions: [
    { label: 'Spiral Diameter', value: '760', unit: 'mm' },
    { label: 'Conveyor Width', value: '500', unit: 'mm' },
    { label: 'Height', value: 'As per requirement', unit: 'customizable' }
  ],
  power: [
    { label: 'Power Required', value: 'NA', unit: 'gravity driven' },
    { label: 'Energy Efficiency', value: 'Maximum', unit: 'no motor needed' },
    { label: 'Operation Cost', value: 'Minimal', unit: 'maintenance only' }
  ],
  components: [
    { label: 'Bearings', value: 'SKF, HCH, NTN', unit: 'make' },
    { label: 'Contact Parts', value: 'SS-304', unit: 'material' },
    { label: 'Construction', value: 'Mild Steel/Stainless Steel', unit: 'options' },
    { label: 'Operation', value: 'Gravity driven', unit: 'mechanism' }
  ]
};

export default function SpiralConveyorPage() {
  return (
    <ProductDetailPage
      id="spiral-conveyor"
      title="Spiral Conveyor"
      subtitle="Space-Efficient Gravity-Driven Conveying Solution"
      description="The Spiral Conveyor is designed to need less floor space than conventional conveyors while being faster and more reliable than any elevator or lift. Available in Mild Steel or Stainless Steel construction with customizable height as per requirement, it operates on gravity-driven mechanism for energy efficiency. With spiral diameter of 760mm and conveyor width of 500mm, the system provides continuous flow for conveying cartons and bags from top to bottom with premium SKF, HCH, NTN bearings ensuring smooth operation."
      features={features}
      models={models}
      applications={applications}
      category="conveying"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1752945428/spiral_conveyers_rm914h.png"
      slug="products/conveying/spiral-conveyor"
      videoId="AtdiRp4W4K8"
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 