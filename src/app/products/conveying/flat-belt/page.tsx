import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Versatile Design',
    description: 'Connects products from primary lines and transfers them for further operations with ergonomic features to minimize operator fatigue',
    icon: '🔄'
  },
  {
    title: 'Two-Stage Height Adjustment',
    description: 'Quick table elevation adjustment on each end for optimal positioning and operator comfort in high-speed applications',
    icon: '📏'
  },
  {
    title: 'Variable Speed Control',
    description: 'Variable speed with batching ability for gaps, eliminating counting needs and increasing productivity significantly',
    icon: '⚡'
  },
  {
    title: 'Universal Mounting',
    description: 'Universal mounting system for seamless integration with 3rd party equipment and existing production lines',
    icon: '🔗'
  },
  {
    title: 'Mobile Configuration',
    description: 'Height adjustment with locking casters for easy positioning and mobility throughout the facility',
    icon: '🚚'
  },
  {
    title: 'Shingling System',
    description: 'Shingling rollers with mounting assembly for precise product spacing and controlled flow management',
    icon: '📋'
  }
];

const keyFeatures = [
  'Connects products from primary line and transfers them for further operations',
  'Ergonomic design features to minimize operator fatigue in high-speed applications',
  'Two-stage height adjustment on each end for quick table elevation adjustment',
  'Variable speed with batching ability for gaps, eliminating counting needs',
  'Universal mounting for integration with 3rd party equipment',
  'Height adjustment with locking casters for mobility',
  'Shingling rollers with mounting assembly for product spacing',
  'Emergency Stop pendant for safety compliance',
  'Infeed Belt Conveyor type for smooth product transition',
  'Pillow bearing at drive end for reliable operation',
  'Screw guided guard for operator safety',
  'Leveling foot mount with ±50mm adjustment range',
  'Project-specific customization available',
  'Food-grade materials compatible with hygiene standards'
];

const models = [
  {
    name: 'Flat Belt Conveyor',
    description: 'Versatile flat belt conveyor system designed for connecting products from primary lines and transferring them for further operations with ergonomic design features.',
    features: [
      'Connects products from primary line and transfers them for further operations',
      'Designed with ergonomic features to minimize operator fatigue in high-speed applications',
      'Two-stage height adjustment on each end for quick table elevation adjustment',
      'Variable speed with batching ability for gaps, eliminating counting needs and increasing productivity',
      'Universal mounting for integration with 3rd party equipment',
      'Height adjustment with locking casters',
      'Shingling rollers with mounting assembly',
      'Emergency Stop pendent',
      'Conveyor Type: Infeed Belt Conveyor',
      'Bearing Type at Drive End: Pillow Bearing',
      'Side Guard: Screw Guided Guard',
      'Foot Mount: Leveling Foot Mount ±50mm'
    ],
    specifications: [
      { label: 'Conveyor type', value: 'Flat belt conveyor' },
      { label: 'Belt type / roller', value: 'PU or PVC food grade belt' },
      { label: 'Conveyor size', value: 'Length, width, Height as per requirement' },
      { label: 'Gear Motor', value: 'Bonfiglioly, Wanshin, Bonvario, panasonic or equivalent make' },
      { label: 'Bearing type (drive end)', value: 'Spectra plast make Pillow bearing' },
      { label: 'Side guards', value: 'Adjustable side guards ± 50 mm' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'M.S. Powder coated (can be SS-304)' },
      { label: 'Conveyor directions', value: 'Unidirection or bidirectional' },
      { label: 'Foot mount', value: 'Levelling foot mount height ± 50 mm' },
      { label: 'Speed control', value: 'through VFD' }
    ],
  }
];

const technicalData = {
  performance: [
    { label: 'Conveyor Speed', value: '48-60', unit: 'PPM' },
    { label: 'Belt Width', value: '220', unit: 'mm' },
    { label: 'Load Capacity', value: '50', unit: 'kg/m' },
    { label: 'Efficiency', value: '99.5', unit: '%' }
  ],
  dimensions: [
    { label: 'Belt Width', value: '220', unit: 'mm' },
    { label: 'Pick Up Height', value: '830', unit: 'mm' },
    { label: 'Length', value: 'Project Specific', unit: '' },
    { label: 'Height Adjustment', value: '±50', unit: 'mm' }
  ],
  power: [
    { label: 'Gearmotor', value: 'Variable', unit: 'HP' },
    { label: 'Motor Brands', value: 'MGM/Bonfiglioli', unit: '' },
    { label: 'Drive Type', value: 'Gear Motor', unit: '' },
    { label: 'Speed Control', value: 'Variable', unit: '' }
  ]
};

const specifications = [
  { label: 'Conveyor Type', value: 'Infeed Belt Conveyor for smooth product transition' },
  { label: 'Belt Material', value: 'Food-grade PU/PVC belt suitable for food contact' },
  { label: 'Frame Construction', value: 'MS (Mild Steel) Powder Coated for durability' },
  { label: 'Contact Parts', value: 'SS304 (Stainless Steel) for hygiene compliance' },
  { label: 'Drive System', value: 'MGM Warvel/Bonfiglioli/Bonvario gearmotors' },
  { label: 'Bearing System', value: 'Pillow bearings at drive end for smooth operation' },
  { label: 'Safety Features', value: 'Emergency stop pendant and screw guided guards' },
  { label: 'Mobility', value: 'Locking casters for easy positioning and movement' },
  { label: 'Height Adjustment', value: 'Two-stage adjustment system with ±50mm range' },
  { label: 'Integration', value: 'Universal mounting for 3rd party equipment compatibility' },
  { label: 'Customization', value: 'Project-specific dimensions and configurations available' },
  { label: 'Maintenance', value: 'Easy access design for routine maintenance and cleaning' }
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
  'Manufacturing Facilities',
  'Distribution Centers',
  'Bakery Operations',
  'Confectionery Production'
];

const certifications = [
  'ISO 9001:2015',
  
  'FDA Compatible Materials',
  'Food Grade Certified'
];

export default function FlatBeltPage() {
  return (
    <ProductDetailPage
      id="flat-belt"
      title="Flat Belt Conveyor"
      subtitle="Versatile Product Transfer and Connection System"
      description="The Flat Belt Conveyor is engineered for versatile product transfer applications, connecting primary production lines with downstream operations. Featuring ergonomic design elements to minimize operator fatigue, two-stage height adjustment systems, and variable speed control with batching capabilities. The system includes universal mounting for seamless integration with third-party equipment, locking casters for mobility, and shingling rollers for precise product spacing control."
      features={features}
      models={models}
      applications={applications}
      category="conveying"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1752945421/flatbelt_conveyer_ojukjf.png"
      slug="products/conveying/flat-belt"
      videoId="AtdiRp4W4K8"
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 