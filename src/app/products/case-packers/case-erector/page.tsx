import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Automatic Carton Erecting',
    description: 'Automatic carton erecting, vertical forming, bottom flaps folding, and bottom tape sealing',
    icon: '📦'
  },
  {
    title: 'Air Cylinder Operation',
    description: 'Carton erecting by air cylinder for reliable and consistent operation',
    icon: '💨'
  },
  {
    title: 'Variable Speed Control',
    description: 'Working speed depends on carton dimensions with optimized performance',
    icon: '⚡'
  },
  {
    title: 'Smart Alerts',
    description: 'Alarm when lacks tape or carton for continuous operation monitoring',
    icon: '🚨'
  },
  {
    title: 'Easy Adjustment',
    description: 'Easily adjustable to fit varying carton sizes',
    icon: '🔧'
  },
  {
    title: 'Premium Components',
    description: 'High-quality components from trusted international brands',
    icon: '⭐'
  }
];

const models = [
  {
    name: 'Case Erector',
    description: 'Automatic case erecting machine with vertical forming, bottom flaps folding, and bottom tape sealing.',
    features: [
      'Automatic carton erecting, vertical forming, bottom flaps folding, and bottom tape sealing',
      'Carton erecting by air cylinder',
      'Working speed depends on carton dimensions',
      'Alarm when lacks tape or carton',
      'Easily adjustable to fit varying carton sizes',
      'Premium international brand components',
      'Reliable and consistent operation',
      'User-friendly operation',
      'Robust construction',
      'Easy maintenance'
    ],
    specifications: [
      { label: 'Max output speed', value: 'upto 15 cartons per minute' },
      { label: 'Minimum carton size', value: 'Min- (280L x 160W x 200H )mm' },
      { label: 'Maximum carton size', value: 'Max- (600L x 400W x 400H)mm' },
      { label: 'Power requirement', value: '220V, 1 phase, 50 Hz' },
      { label: 'Air consumption', value: '6 kg/Sq. cm @450nL/min (0.5MPA)' },
      { label: 'Carton magazine storage', value: '100 cartons (depends on thickness)' },
      { label: 'Tape width', value: '48/60/75 mm' },
      { label: 'Table height', value: '700 +/- 50 mm' },
      { label: 'Pneumatic', value: 'SMC/Festo/Scmalz' },
      { label: 'Safety switches', value: 'Sai control make' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'MS powder coated (can be SS-304 if required)' },
      { label: 'Feature', value: 'Full carton sensor with stop control to prevent overflowing' },
      { label: 'Feature', value: 'Easy change overs and wide range of variant flexibility' }
    ],
  }
];

const keyFeatures = [
  'Automatic carton erecting, vertical forming, bottom flaps folding, and bottom tape sealing',
  'Carton erecting by air cylinder for reliable and consistent operation',
  'Working speed optimized based on carton dimensions for maximum efficiency',
  'Smart alarm system when tape or carton supply is low',
  'Easily adjustable to fit varying carton sizes with quick changeover capability',
  'Premium international brand components ensuring long-term reliability',
  'Full carton sensor with stop control to prevent overflowing',
  'Easy change overs and wide range of variant flexibility',
  'User-friendly operation with minimal training requirements',
  'Robust construction designed for demanding industrial environments',
  'Energy-efficient design with optimized air consumption',
  'Integrated safety systems with emergency stops and protective guards'
];

const specifications = [
  { label: 'Max output speed', value: 'upto 15 cartons per minute' },
  { label: 'Minimum carton size', value: 'Min- (280L x 160W x 200H )mm' },
  { label: 'Maximum carton size', value: 'Max- (600L x 400W x 400H)mm' },
  { label: 'Power requirement', value: '220V, 1 phase, 50 Hz' },
  { label: 'Air consumption', value: '6 kg/Sq. cm @450nL/min (0.5MPA)' },
  { label: 'Carton magazine storage', value: '100 cartons (depends on thickness)' },
  { label: 'Tape width', value: '48/60/75 mm' },
  { label: 'Table height', value: '700 +/- 50 mm' },
  { label: 'Pneumatic', value: 'SMC/Festo/Scmalz' },
  { label: 'Safety switches', value: 'Sai control make' },
  { label: 'Contact parts', value: 'SS-304' },
  { label: 'Non-contact parts', value: 'MS powder coated (can be SS-304 if required)' },
  { label: 'Feature', value: 'Full carton sensor with stop control to prevent overflowing' },
  { label: 'Feature', value: 'Easy change overs and wide range of variant flexibility' }
];

const applications = [
  'Food Processing',
  'Spices Industry',
  'Dairy Products',
  'Pharmaceutical Manufacturing',
  'Ice Cream Production',
  'Cold Storage',
  'Warehouses',
  'Packaging Lines',
  'Distribution Centers',
  'Manufacturing Facilities'
];

const technicalData = {
  performance: [
    { label: 'Max Output Speed', value: '15', unit: 'cartons/min' },
    { label: 'Carton Storage', value: '100', unit: 'cartons' },
    { label: 'Operation Type', value: 'Automatic', unit: 'erecting & sealing' }
  ],
  dimensions: [
    { label: 'Min Carton Size', value: '280×160×200', unit: 'mm (L×W×H)' },
    { label: 'Max Carton Size', value: '600×400×400', unit: 'mm (L×W×H)' },
    { label: 'Table Height', value: '700±50', unit: 'mm' }
  ],
  power: [
    { label: 'Power Required', value: '220V', unit: '1 phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Consumption', value: '450', unit: 'NL/min @ 6 kg/cm²' },
    { label: 'Tape Width', value: '48/60/75', unit: 'mm' }
  ],
  components: [
    { label: 'Pneumatics', value: 'SMC/Festo/Schmalz', unit: 'make' },
    { label: 'Safety Switches', value: 'Sai Control', unit: 'make' },
    { label: 'Contact Parts', value: 'SS-304', unit: 'material' },
    { label: 'Non-Contact Parts', value: 'MS Powder Coated', unit: '(SS optional)' }
  ]
};

const certifications = ['ISO 9001:2015'];

export default function CaseErectorPage() {
  return (
    <ProductDetailPage
      id="case-erector"
      title="Case Erector"
      subtitle="Automatic Carton Erecting and Sealing System"
      description="The Case Erector is an automatic carton erecting machine that handles vertical forming, bottom flaps folding, and bottom tape sealing. Operating with air cylinder technology, it processes up to 15 cartons per minute with easily adjustable settings for varying carton sizes. Built with premium international brand components including SMC/Festo/Schmalz pneumatics and Sai Control safety switches, it ensures reliable operation with smart alerts for tape and carton monitoring and full carton sensor with stop control to prevent overflowing."
      features={features}
      models={models}
      applications={applications}
      category="case-packers"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098774/nu2tjyq4jfbjxoeisycb.png"
      slug="products/case-packers/case-erector"
      videoId="ojzUYCiRvVE"
      videoIds={["ojzUYCiRvVE", "MKtm_gZgRy0"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 