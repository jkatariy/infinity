import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Side Belt Driven',
    description: 'Side belts driven system for smooth and consistent operation',
    icon: '🔄'
  },
  {
    title: 'Automatic Flap Folding',
    description: 'Automatically flaps folding top covers for efficient sealing',
    icon: '📦'
  },
  {
    title: 'Simultaneous Sealing',
    description: 'Sealing top and bottom simultaneously for maximum efficiency',
    icon: '⚡'
  },
  {
    title: 'Manual Adjustment',
    description: 'Manually adjust height and width for varying carton sizes',
    icon: '🔧'
  },
  {
    title: 'Safety Guards',
    description: 'Machine guarded by acrylic barriers from both sides',
    icon: '🛡️'
  },
  {
    title: 'Premium Components',
    description: 'High-quality components from trusted international brands',
    icon: '⭐'
  }
];

const models = [
  {
    name: 'Case Sealer',
    description: 'Automatic case sealing machine with side belt driven system and simultaneous top and bottom sealing.',
    features: [
      'Side belts driven system',
      'Automatically flaps folding top covers',
      'Sealing top and bottom simultaneously',
      'Manually adjust height and width for varying carton sizes',
      'Machine guarded by acrylic barriers from both sides',
      'Premium international brand components',
      'High-speed operation',
      'Reliable and consistent sealing',
      'User-friendly operation',
      'Robust construction'
    ],
    specifications: [
      { label: 'Max output speed', value: 'upto 15 cartons per minute' },
      { label: 'Minimum carton size', value: 'Min- (280L x 160W x 200H )mm' },
      { label: 'Maximum carton size', value: 'Max- (600L x 400W x 400H)mm' },
      { label: 'Power requirement', value: '220V, 1 phase, 50 Hz' },
      { label: 'Air consumption', value: '5-6 kg/Sq. cm @150nL/min (0.5MPA)' },
      { label: 'Carton magazine storage', value: 'NA' },
      { label: 'Tape width', value: 'NA' },
      { label: 'Table height', value: 'NA' },
      { label: 'Pneumatic', value: 'SMC/Festo/Scmalz' },
      { label: 'Safety switches', value: 'Sai control make' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'MS powder coated (can be SS-304)' },
      { label: 'Feature', value: 'wide range of variant flexibility' }
    ],
  }
];

const keyFeatures = [
  'Side belts driven system for smooth and consistent operation',
  'Automatically flaps folding top covers for efficient sealing',
  'Sealing top and bottom simultaneously for maximum efficiency',
  'Manually adjust height and width for varying carton sizes',
  'Machine guarded by acrylic barriers from both sides for safety',
  'Premium international brand components ensuring reliability',
  'Wide range of variant flexibility for different carton configurations',
  'High-speed operation with consistent sealing performance',
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
  { label: 'Air consumption', value: '5-6 kg/Sq. cm @150nL/min (0.5MPA)' },
  { label: 'Carton magazine storage', value: 'NA' },
  { label: 'Tape width', value: 'NA' },
  { label: 'Table height', value: 'NA' },
  { label: 'Pneumatic', value: 'SMC/Festo/Scmalz' },
  { label: 'Safety switches', value: 'Sai control make' },
  { label: 'Contact parts', value: 'SS-304' },
  { label: 'Non-contact parts', value: 'MS powder coated (can be SS-304)' },
  { label: 'Feature', value: 'wide range of variant flexibility' }
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
    { label: 'Operation Type', value: 'Automatic', unit: 'sealing' },
    { label: 'Sealing Method', value: 'Flap folding', unit: 'both sides' }
  ],
  dimensions: [
    { label: 'Min Carton Size', value: '280×160×200', unit: 'mm (L×W×H)' },
    { label: 'Max Carton Size', value: '600×400×400', unit: 'mm (L×W×H)' },
    { label: 'Adjustment', value: 'Manual height & width', unit: 'variable' }
  ],
  power: [
    { label: 'Power Required', value: '220V', unit: '1 phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Consumption', value: '150', unit: 'NL/min @ 5-6 kg/cm²' },
    { label: 'Features', value: 'Wide variant', unit: 'flexibility' }
  ],
  components: [
    { label: 'Pneumatics', value: 'SMC/Festo/Schmalz', unit: 'make' },
    { label: 'Safety Switches', value: 'Sai Control', unit: 'make' },
    { label: 'Contact Parts', value: 'SS-304', unit: 'material' },
    { label: 'Non-Contact Parts', value: 'MS Powder Coated', unit: '(SS optional)' }
  ]
};

const certifications = ['ISO 9001:2015'];

export default function CaseSealerPage() {
  return (
    <ProductDetailPage
      id="case-sealer"
      title="Case Sealer"
      description="The Case Sealer is a side belt driven automatic case sealing machine that handles flap folding and seals both top and bottom simultaneously. Operating up to 15 cartons per minute, it features manual height and width adjustment for varying carton sizes and is protected by acrylic barriers on both sides. Built with premium international components including SMC/Festo/Schmalz pneumatics and Sai Control safety switches, it ensures reliable and consistent sealing performance with wide range of variant flexibility."
      features={features}
      models={models}
      applications={applications}
      category="case-packers"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098775/lphxuwk9yeykyaojtmxx.png"
      slug="products/case-packers/case-sealer"
      videoId="ojzUYCiRvVE"
      videoIds={["ojzUYCiRvVE", "MKtm_gZgRy0"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 