import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'High Load Capacity',
    description: 'Conveys high loads at high speed with robust construction',
    icon: '💪'
  },
  {
    title: 'Interlocked Plastic Segments',
    description: 'Made of interlocked plastic segments, easily replaceable with minimum investment',
    icon: '🔗'
  },
  {
    title: 'Multiple Chain Widths',
    description: 'Available in standard chain widths from 2" to 24" for various applications',
    icon: '📏'
  },
  {
    title: 'Durable Construction',
    description: 'Available in Mild Steel or Stainless Steel construction',
    icon: '🏗️'
  },
  {
    title: 'Premium Components',
    description: 'Equipped with Bonfiglioli/MGM Varvel motors and Schneider electricals',
    icon: '⭐'
  },
  {
    title: 'Versatile Chain Styles',
    description: 'Multiple chain styles available: Flat Top, Radius flush Grid, LBP Roller, Flat Friction',
    icon: '🔄'
  }
];

const models = [
  {
    name: 'Modular Conveyor',
    description: 'High-capacity modular conveyor system with interlocked plastic segments for heavy-duty applications.',
    features: [
      'Conveys high loads at high speed',
      'Made of interlocked plastic segments, easily replaceable with minimum investment',
      'Available in standard chain widths from 2" to 24"',
      'Multiple chain styles available',
      'Durable construction in Mild Steel or Stainless Steel',
      'Premium motor and electrical components',
      'Variable speed as per requirement',
      'UHMW wearstrips for smooth operation',
      'Customizable for specific applications',
      'Easy maintenance and replacement',
      'Suitable for various industrial applications',
      'Robust and reliable operation'
    ],
    specifications: [
      { label: 'Conveyor type', value: 'NA' },
      { label: 'Belt type / roller', value: 'PVC fabric belt (Make- Interoll Or Equivalent)' },
      { label: 'Conveyor size', value: 'Length, width, Height as per requirement' },
      { label: 'Gear Motor', value: 'Bonfiglioly, Wanshin, Bonvario, panasonic or equivalent make' },
      { label: 'Bearing type (drive end)', value: 'Spectra plast make Pillow bearing' },
      { label: 'Side guards', value: 'Adjustable side guards ± 50 mm' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'M.S. Powder coated (can be SS-304)' },
      { label: 'Conveyor directions', value: 'Unidirection or bidirectional' },
      { label: 'Foot mount', value: 'Levelling foot mount height ± 50 mm' }
    ],
  }
];

const keyFeatures = [
  'Conveys high loads at high speed with robust construction',
  'Made of interlocked plastic segments, easily replaceable with minimum investment',
  'Available in standard chain widths from 2" to 24" for various applications',
  'Multiple chain styles available: Flat Top, Radius flush Grid, LBP Roller, Flat Friction',
  'Durable construction available in Mild Steel or Stainless Steel',
  'Equipped with premium Bonfiglioli/MGM Varvel motors and Schneider electricals',
  'Variable speed control as per application requirements',
  'UHMW wearstrips for smooth operation and longevity',
  'Customizable design for specific industrial applications',
  'Easy maintenance and component replacement capabilities',
  'PVC fabric belt with Interoll or equivalent make',
  'Adjustable side guards and levelling foot mount for optimal positioning'
];

const specifications = [
  { label: 'Conveyor type', value: 'NA' },
  { label: 'Belt type / roller', value: 'PVC fabric belt (Make- Interoll Or Equivalent)' },
  { label: 'Conveyor size', value: 'Length, width, Height as per requirement' },
  { label: 'Gear Motor', value: 'Bonfiglioly, Wanshin, Bonvario, panasonic or equivalent make' },
  { label: 'Bearing type (drive end)', value: 'Spectra plast make Pillow bearing' },
  { label: 'Side guards', value: 'Adjustable side guards ± 50 mm' },
  { label: 'Contact parts', value: 'SS-304' },
  { label: 'Non-contact parts', value: 'M.S. Powder coated (can be SS-304)' },
  { label: 'Conveyor directions', value: 'Unidirection or bidirectional' },
  { label: 'Foot mount', value: 'Levelling foot mount height ± 50 mm' }
];

const technicalData = {
  performance: [
    { label: 'Load Capacity', value: 'High loads', unit: 'high speed' },
    { label: 'Chain Width', value: '2"-24"', unit: 'standard widths' },
    { label: 'Speed', value: 'Variable', unit: 'per requirement' },
    { label: 'Belt Type', value: 'PVC fabric', unit: 'Interoll equivalent' }
  ],
  dimensions: [
    { label: 'Conveyor Size', value: 'Customizable', unit: 'per requirement' },
    { label: 'Side Guards', value: 'Adjustable', unit: '± 50 mm' },
    { label: 'Foot Mount', value: 'Levelling', unit: '± 50 mm height' }
  ],
  power: [
    { label: 'Gear Motor', value: 'Bonfiglioli/Wanshin/Bonvario/Panasonic', unit: 'make' },
    { label: 'Direction', value: 'Unidirection/Bidirectional', unit: 'operation' },
    { label: 'Speed Control', value: 'Variable', unit: 'as required' }
  ],
  components: [
    { label: 'Belt Type', value: 'PVC fabric belt', unit: 'Interoll/Equivalent' },
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
  'Heavy-Duty Material Handling',
  'Industrial Applications',
  'Distribution Centers'
];

export default function ModularConveyorPage() {
  return (
    <ProductDetailPage
      id="modular-conveyor"
      title="Modular Conveyor"
      subtitle="High-Capacity Interlocked Plastic Segment Conveyor"
      description="The Modular Conveyor is designed to convey high loads at high speed using interlocked plastic segments that are easily replaceable with minimum investment. Available in standard chain widths from 2 inches to 24 inches with multiple chain styles including Flat Top, Radius flush Grid, LBP Roller, and Flat Friction. Built with premium Bonfiglioli/Wanshin/Bonvario/Panasonic gear motors and PVC fabric belt with Interoll or equivalent make, it provides reliable operation for food, spices, dairy, pharmaceutical, and warehouse applications."
      features={features}
      models={models}
      applications={applications}
      category="conveying"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1752945423/modular_conveyer_stiian.png"
      slug="products/conveying/modular-conveyor"
      videoId="AtdiRp4W4K8"
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 