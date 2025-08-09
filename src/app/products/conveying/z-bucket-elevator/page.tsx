import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Silent Operation',
    description: 'Suitable for silent operations in noise-sensitive environments',
    icon: '🔇'
  },
  {
    title: 'Versatile Food Packaging',
    description: 'Suitable for nearly all types of food packaging applications',
    icon: '🍽️'
  },
  {
    title: 'High Capacity Range',
    description: 'Capacity range from 1 TPH to 10 TPH for various production needs',
    icon: '⚡'
  },
  {
    title: 'Customizable Height',
    description: 'Available up to 12 meter height with customized design',
    icon: '📏'
  },
  {
    title: 'Flexible Design',
    description: 'Z Type / C Type configuration with customized design options',
    icon: '🔧'
  },
  {
    title: 'Durable Construction',
    description: 'Available in Mild Steel or Stainless Steel construction',
    icon: '💪'
  }
];

const models = [
  {
    name: 'Z Type Bucket Elevator',
    description: 'Versatile Z Type / C Type bucket conveyor suitable for silent operations and all types of food packaging.',
    features: [
      'Suitable for silent operations',
      'Suitable for nearly all types of food packaging',
      'Z Type / C Type configuration available',
      'Customized design based on requirements',
      'Available in Mild Steel or Stainless Steel construction',
      'High capacity range from 1 TPH to 10 TPH',
      'Height up to 12 meters',
      '3 Phase power system',
      'Length as per requirement',
      'Robust and reliable operation',
      'Easy maintenance and cleaning',
      'Food-grade construction options'
    ],
    specifications: [
      { label: 'Application', value: 'For conveying grains, snacks or crystalline non-sticky materials' },
      { label: 'Product', value: 'grains, snacks or crystalline non-sticky materials' },
      { label: 'Max Output Speed', value: '100 buckets/min' },
      { label: 'Machine Size', value: 'Width- 1550 mm, length- 1300 mm, height- 2300 mm' },
      { label: 'Power Supply', value: '3 phase, 420 VAC, 50Hz' },
      { label: 'Electrical Consumption', value: '2 KW' },
      { label: 'Mode of Operation', value: 'VFD' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'MS powder coated (can be SS if required)' },
      { label: 'Gear Motor', value: 'Bonfiglioly/ Wanshin/ bonvario/panasonic for infeed/oufeed conveyor' },
      { label: 'Sensors', value: 'P&F level sensors' },
      { label: 'Bearings', value: 'SKF, HCH, NTN make' }
    ],
  }
];

const keyFeatures = [
  'Suitable for silent operations in noise-sensitive environments',
  'Suitable for nearly all types of food packaging applications',
  'High capacity range from 1 TPH to 10 TPH for various production needs',
  'Available up to 12 meter height with customized design capabilities',
  'Z Type / C Type configuration with flexible design options',
  'Available in Mild Steel or Stainless Steel construction for durability',
  'VFD (Variable Frequency Drive) operation for precise control',
  'Premium gear motors from Bonfiglioli/Wanshin/Bonvario/Panasonic',
  'P&F level sensors for accurate material detection and control',
  'SKF, HCH, NTN make bearings ensuring smooth and reliable operation',
  'Compact machine size: 1550mm width, 1300mm length, 2300mm height',
  'Energy-efficient 2 KW electrical consumption for cost-effective operation'
];

const specifications = [
  { label: 'Application', value: 'For conveying grains, snacks or crystalline non-sticky materials' },
  { label: 'Product', value: 'grains, snacks or crystalline non-sticky materials' },
  { label: 'Max Output Speed', value: '100 buckets/min' },
  { label: 'Machine Size', value: 'Width- 1550 mm, length- 1300 mm, height- 2300 mm' },
  { label: 'Power Supply', value: '3 phase, 420 VAC, 50Hz' },
  { label: 'Electrical Consumption', value: '2 KW' },
  { label: 'Mode of Operation', value: 'VFD' },
  { label: 'Contact parts', value: 'SS-304' },
  { label: 'Non-contact parts', value: 'MS powder coated (can be SS if required)' },
  { label: 'Gear Motor', value: 'Bonfiglioly/ Wanshin/ bonvario/panasonic for infeed/oufeed conveyor' },
  { label: 'Sensors', value: 'P&F level sensors' },
  { label: 'Bearings', value: 'SKF, HCH, NTN make' }
];

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
  'Grain Handling',
  'Powder Processing',
  'Bulk Material Handling'
];

const technicalData = {
  performance: [
    { label: 'Max Output Speed', value: '100', unit: 'buckets/min' },
    { label: 'Operation Type', value: 'VFD', unit: 'Variable Frequency Drive' },
    { label: 'Material Handling', value: 'Grains, snacks', unit: 'crystalline non-sticky' },
    { label: 'Control System', value: 'Level sensors', unit: 'P&F make' }
  ],
  dimensions: [
    { label: 'Width', value: '1550', unit: 'mm' },
    { label: 'Length', value: '1300', unit: 'mm' },
    { label: 'Height', value: '2300', unit: 'mm' }
  ],
  power: [
    { label: 'Power Required', value: '2', unit: 'KW' },
    { label: 'Voltage', value: '420V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Operation Mode', value: 'VFD', unit: 'control' }
  ],
  components: [
    { label: 'Gear Motor', value: 'Bonfiglioli/Wanshin/Bonvario/Panasonic', unit: 'infeed/outfeed' },
    { label: 'Sensors', value: 'P&F level sensors', unit: 'make' },
    { label: 'Bearings', value: 'SKF, HCH, NTN', unit: 'make' },
    { label: 'Contact Parts', value: 'SS-304', unit: 'material' },
    { label: 'Non-Contact Parts', value: 'MS Powder Coated', unit: '(SS optional)' }
  ]
};

export default function ZBucketElevatorPage() {
  return (
    <ProductDetailPage
      id="z-bucket-elevator"
      title="Z-bucket Elevator"
      subtitle="Silent Operation Vertical Conveying Solution"
      description="The Z-bucket Elevator is designed for silent operations and is suitable for nearly all types of food packaging applications. Ideal for conveying grains, snacks or crystalline non-sticky materials, this versatile conveyor system offers maximum output speed of 100 buckets per minute. Built with SS-304 contact parts and MS powder coated non-contact parts (SS optional), it provides reliable vertical conveying with VFD operation and P&F level sensors for precise control in food, spices, dairy, pharmaceutical, and warehouse applications."
      features={features}
      models={models}
      applications={applications}
      category="conveying"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1752945428/Z_bucket_elevator_jb7yxi.png"
      slug="products/conveying/z-bucket-elevator"
      videoId="trTK2F6r0E6"
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 