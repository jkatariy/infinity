import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Air Removal',
    description: 'Primarily used to remove excess air from packed pouches and flatten pouches',
    icon: '💨'
  },
  {
    title: 'Powder & Granular Processing',
    description: 'Flattens pouches containing powder or granular products into solid brick-like collation',
    icon: '🧱'
  },
  {
    title: 'Large Pouch Handling',
    description: 'Used to remove air from large pouches (2 kg, 5 kg, 10 kg) for convenient secondary packing',
    icon: '📦'
  },
  {
    title: 'Dual Conveyor System',
    description: 'Engineered with 2 parallel conveyors with separate motors for optimal compression',
    icon: '🔄'
  },
  {
    title: 'Controlled Pressure',
    description: 'Gap controlled by wheel with scale to flatten pouches with easy guide adjustments',
    icon: '🎚️'
  },
  {
    title: 'Food-Grade Construction',
    description: 'Rugged construction with MS Powder Coated structure and SS-304 contact parts',
    icon: '🏭'
  }
];

const models = [
  {
    name: 'Compression Conveyor',
    description: 'Specialized conveyor system designed to remove excess air from packed pouches and flatten them into uniform shapes.',
    features: [
      'Primarily used to remove excess air from packed pouches and flatten pouches containing powder or granular products',
      'Used to remove air from large pouches (2 kg, 5 kg, 10 kg) for convenient secondary packing and transportation',
      'Engineered with 2 parallel conveyors with separate motors',
      'Gap controlled by wheel with scale to flatten pouches into a solid brick-like collation',
      'Textured belt conveyor ensures single pouch entry from VFFS and smooth run',
      'Flattens entire pouch surface without removing inner air, creating uniform flat pouches',
      'Easy guide adjustments for controlled pressure capabilities',
      'Rugged construction with MS Powder Coated structure and SS-304 contact parts',
      'Bonfiglioly Make 0.5 & 0.25 HP Gearmotor',
      'SS-304 Make Side Guard (Adjustable Along Width)',
      'Reliable and consistent operation',
      'Easy maintenance and cleaning'
    ],
    specifications: [
      { label: 'Conveyor type', value: 'L shape take up conveyor + flat belt conveyor' },
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
  'Primarily used to remove excess air from packed pouches and flatten pouches',
  'Flattens pouches containing powder or granular products into solid brick-like collation',
  'Used to remove air from large pouches (2 kg, 5 kg, 10 kg) for convenient secondary packing',
  'Engineered with 2 parallel conveyors with separate motors for optimal compression',
  'Gap controlled by wheel with scale to flatten pouches with easy guide adjustments',
  'Textured belt conveyor ensures single pouch entry from VFFS and smooth run',
  'Flattens entire pouch surface without removing inner air, creating uniform flat pouches',
  'Easy guide adjustments for controlled pressure capabilities',
  'Rugged construction with MS Powder Coated structure and SS-304 contact parts',
  'L shape take up conveyor combined with flat belt conveyor design',
  'Unidirectional conveyor operation with VFD speed control',
  'Adjustable side guards and levelling foot mount for optimal positioning'
];

const specifications = [
  { label: 'Conveyor type', value: 'L shape take up conveyor + flat belt conveyor' },
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
    { label: 'Operation Type', value: 'Air removal', unit: 'compression' },
    { label: 'Pouch Handling', value: '2-10', unit: 'kg capacity' },
    { label: 'Conveyor Design', value: 'Dual parallel', unit: 'system' },
    { label: 'Pressure Control', value: 'Gap controlled', unit: 'wheel & scale' }
  ],
  dimensions: [
    { label: 'Conveyor Size', value: 'Customizable', unit: 'per requirement' },
    { label: 'Side Guards', value: 'Adjustable', unit: '± 50 mm' },
    { label: 'Foot Mount', value: 'Levelling', unit: '± 50 mm height' }
  ],
  power: [
    { label: 'Gear Motor', value: 'Bonfiglioli/Wanshin/Bonvario/Panasonic', unit: 'make' },
    { label: 'Speed Control', value: 'VFD', unit: 'variable frequency drive' },
    { label: 'Direction', value: 'Unidirectional', unit: 'operation' }
  ],
  components: [
    { label: 'Belt Type', value: 'PU/PVC food grade', unit: 'belt' },
    { label: 'Bearing Type', value: 'Spectra plast Pillow', unit: 'bearing' },
    { label: 'Contact Parts', value: 'SS-304', unit: 'material' },
    { label: 'Non-Contact Parts', value: 'MS Powder Coated', unit: '(SS optional)' }
  ]
};

const applications = [
  'Food Processing',
  'Spices Industry',
  'Dairy Products',
  'Pharmaceutical Manufacturing',
  'Ice Cream Production',
  'Cold Storage',
  'Warehouses',
  'Powder Processing',
  'Granular Products',
  'Secondary Packaging'
];

const certifications = [
  'ISO 9001:2015',
  'FDA Compatible Materials',
  'Food Grade Certified'
];

export default function CompressionConveyorPage() {
  return (
    <ProductDetailPage
      id="compression-conveyor"
      title="Compression Conveyor"
      subtitle="Air Removal and Pouch Flattening System"
      description="The Compression Conveyor is primarily used to remove excess air from packed pouches and flatten pouches containing powder or granular products. Designed for large pouches (2 kg, 5 kg, 10 kg), it features dual parallel conveyors with separate motors and gap control by wheel with scale. The L shape take up conveyor combined with flat belt conveyor design ensures single pouch entry from VFFS with smooth operation, while the rugged MS Powder Coated structure and SS-304 contact parts provide durability and food-grade compliance."
      features={features}
      models={models}
      applications={applications}
      category="conveying"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1752945422/compression_conveyer_jybkxc.png"
      slug="products/conveying/compression-conveyor"
      videoId="AtdiRp4W4K8"
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 