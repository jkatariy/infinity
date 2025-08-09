import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Ergonomic Design',
    description: 'Designed with ergonomic features to minimize operator fatigue when handling products in high-speed applications',
    icon: '👥'
  },
  {
    title: 'Product Handling',
    description: 'Used for product handling and interconnecting products during high-end automation',
    icon: '🔄'
  },
  {
    title: 'Height Adjustment',
    description: 'Two-stage height adjustment on each end for quick table elevation adjustment',
    icon: '📏'
  },
  {
    title: 'Variable Speed Control',
    description: 'Variable speed with batching ability for gaps, eliminating counting needs and increasing productivity',
    icon: '⚡'
  },
  {
    title: 'Stainless Steel Construction',
    description: 'Stainless steel body with guarding for durability and safety',
    icon: '🏗️'
  },
  {
    title: 'Universal Mounting',
    description: 'Universal mounting for integration with 3rd party equipment',
    icon: '🔧'
  }
];

const models = [
  {
    name: 'Roller Conveyor',
    description: 'Ergonomic roller conveyor system designed for product handling and interconnecting products during high-end automation.',
    features: [
      'Designed with ergonomic features to minimize operator fatigue when handling products in high-speed applications',
      'Used for product handling and interconnecting products during high-end automation',
      'Two-stage height adjustment on each end for quick table elevation adjustment',
      'Variable speed with batching ability for gaps, eliminating counting needs and increasing productivity',
      'Stainless steel body with guarding',
      'Universal mounting for integration with 3rd party equipment',
      'Heavy duty construction',
      'Local-remote mode operation',
      'PVC belt with crowned drive roller',
      'Acceleration batching method',
      'Height adjustment with locking casters',
      'Shingling rollers with mounting assembly',
      'Emergency Stop pendent'
    ],
    specifications: [
      { label: 'Conveyor type', value: 'Power roller conveyor' },
      { label: 'Belt type / roller', value: 'PU or PVC food grade belt' },
      { label: 'Conveyor size', value: 'Length, width, Height as per requirement' },
      { label: 'Gear Motor', value: 'Bonfiglioly, Wanshin, Bonvario, panasonic or equivalent make' },
      { label: 'Bearing type (drive end)', value: 'Spectra plast make Pillow bearing' },
      { label: 'Side guards', value: 'Adjustable side guards ± 50 mm' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'M.S. Powder coated (can be SS-304)' },
      { label: 'Conveyor directions', value: 'Unidirectional' },
      { label: 'Foot mount', value: 'Levelling foot mount height ± 50 mm' },
      { label: 'Speed control', value: 'through VFD' }
    ],
  }
];

const keyFeatures = [
  'Designed with ergonomic features to minimize operator fatigue in high-speed applications',
  'Used for product handling and interconnecting products during high-end automation',
  'Two-stage height adjustment on each end for quick table elevation adjustment',
  'Variable speed with batching ability for gaps, eliminating counting needs',
  'Stainless steel body with guarding for durability and safety',
  'Universal mounting for seamless integration with 3rd party equipment',
  'Power roller conveyor type for efficient material transport',
  'PU or PVC food grade belt ensuring food safety compliance',
  'Bonfiglioli/Wanshin/Bonvario/Panasonic gear motors for reliability',
  'Adjustable side guards and levelling foot mount for optimal positioning',
  'Unidirectional conveyor operation with VFD speed control',
  'Emergency Stop pendant for enhanced safety operations'
];

const specifications = [
  { label: 'Conveyor type', value: 'Power roller conveyor' },
  { label: 'Belt type / roller', value: 'PU or PVC food grade belt' },
  { label: 'Conveyor size', value: 'Length, width, Height as per requirement' },
  { label: 'Gear Motor', value: 'Bonfiglioly, Wanshin, Bonvario, panasonic or equivalent make' },
  { label: 'Bearing type (drive end)', value: 'Spectra plast make Pillow bearing' },
  { label: 'Side guards', value: 'Adjustable side guards ± 50 mm' },
  { label: 'Contact parts', value: 'SS-304' },
  { label: 'Non-contact parts', value: 'M.S. Powder coated (can be SS-304)' },
  { label: 'Conveyor directions', value: 'Unidirectional' },
  { label: 'Foot mount', value: 'Levelling foot mount height ± 50 mm' },
  { label: 'Speed control', value: 'through VFD' }
];

const technicalData = {
  performance: [
    { label: 'Conveyor Type', value: 'Power roller', unit: 'system' },
    { label: 'Belt Material', value: 'PU/PVC food grade', unit: 'belt' },
    { label: 'Speed Control', value: 'VFD', unit: 'variable frequency drive' },
    { label: 'Direction', value: 'Unidirectional', unit: 'operation' }
  ],
  dimensions: [
    { label: 'Conveyor Size', value: 'Customizable', unit: 'per requirement' },
    { label: 'Side Guards', value: 'Adjustable', unit: '± 50 mm' },
    { label: 'Foot Mount', value: 'Levelling', unit: '± 50 mm height' }
  ],
  power: [
    { label: 'Gear Motor', value: 'Bonfiglioli/Wanshin/Bonvario/Panasonic', unit: 'make' },
    { label: 'Speed Control', value: 'VFD', unit: 'through variable drive' },
    { label: 'Operation', value: 'Unidirectional', unit: 'direction' }
  ],
  components: [
    { label: 'Belt Type', value: 'PU/PVC food grade', unit: 'belt' },
    { label: 'Bearing Type', value: 'Spectra plast Pillow', unit: 'bearing' },
    { label: 'Contact Parts', value: 'SS-304', unit: 'material' },
    { label: 'Non-Contact Parts', value: 'MS Powder Coated', unit: '(SS optional)' }
  ]
};

const certifications = [
  'ISO 9001:2015',
  'FDA Compatible Materials'
];

const applications = [
  'Food Processing',
  'Spices Industry',
  'Dairy Products',
  'Pharmaceutical Manufacturing',
  'Ice Cream Production',
  'Cold Storage',
  'Warehouses',
  'Product Handling',
  'High-End Automation',
  'Material Handling'
];

export default function RollerConveyorPage() {
  return (
    <ProductDetailPage
      id="roller-conveyor"
      title="Roller Conveyor"
      subtitle="Power Roller Conveyor for High-End Automation"
      description="The Power Roller Conveyor is designed with ergonomic features to minimize operator fatigue when handling products in high-speed applications. Used for product handling and interconnecting products during high-end automation, it features PU or PVC food grade belt, premium Bonfiglioli/Wanshin/Bonvario/Panasonic gear motors, and VFD speed control. With SS-304 contact parts, adjustable side guards, and universal mounting for integration with third-party equipment, it ensures reliable unidirectional operation for food, spices, dairy, pharmaceutical, and warehouse applications."
      features={features}
      models={models}
      applications={applications}
      category="conveying"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1752945423/roller_conveyer_bbe3q5.png"
      slug="products/conveying/roller-conveyor"
      videoId="AtdiRp4W4K8"
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 