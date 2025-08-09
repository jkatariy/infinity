import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Vertical Material Transfer',
    description: 'Efficient solution for vertical material transfer (up and down automatically)',
    icon: '⬆️'
  },
  {
    title: 'High Capacity',
    description: 'Handles up to 15 crates per minute with maximum crate weight up to 30 Kg',
    icon: '📦'
  },
  {
    title: 'Customizable Height',
    description: 'Discharge height up to 12 meters with customizable system dimensions',
    icon: '📏'
  },
  {
    title: 'Automatic Operation',
    description: 'Fully automatic up and down operation for continuous material flow',
    icon: '🤖'
  },
  {
    title: 'Robust Construction',
    description: 'Available in SS/MS powder coated construction for durability',
    icon: '💪'
  },
  {
    title: 'High Power System',
    description: '3 Phase 440V AC / 50 Hz / 10 KW power system for reliable operation',
    icon: '⚡'
  }
];

const models = [
  {
    name: 'Crate Lifter',
    description: 'Efficient vertical material transfer solution for automatic up and down movement of crates.',
    features: [
      'Efficient solution for vertical material transfer (up and down automatically)',
      'Handles up to 15 crates per minute',
      'Maximum crate weight up to 30 Kg',
      'Discharge height up to 12 meters',
      'Customizable system dimensions',
      'Automatic operation for continuous material flow',
      'Available in SS/MS powder coated construction',
      'High power system for reliable operation',
      'Robust and durable design',
      'Easy maintenance and operation',
      'Suitable for various industrial applications',
      'Continuous operation capability'
    ],
    specifications: [
      { label: 'Application', value: 'For lifting of cartons or crate to specified height for loading into palletizer using push plate or chain' },
      { label: 'Product', value: 'cartons/crates' },
      { label: 'Max Output Speed', value: '10-15 CPM' },
      { label: 'Machine Size', value: 'Width- 1700 mm, length- 3100 mm, height- 1600 mm' },
      { label: 'Power Supply', value: '3 phase, 420 VAC, 50Hz' },
      { label: 'Electrical Consumption', value: '4 KW' },
      { label: 'Pneumatic Consumption', value: '2 CFM' },
      { label: 'Mode of Operation', value: 'VFD' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'MS powder coated (can be SS if required)' },
      { label: 'Gear Motor', value: 'Bonfiglioly/ Wanshin/ bonvario/panasonic' },
      { label: 'Sensors', value: 'P&F/ contrinex' },
      { label: 'Belts', value: 'PU/PVC Fransteck make Belts' },
      { label: 'Bearings', value: 'SKF, HCS make (Special purpose bearings in dairy plants)' },
      { label: 'Pneumatics', value: 'Festo/SMC' }
    ],
  }
];

const keyFeatures = [
  'Efficient solution for vertical material transfer with automatic up and down movement',
  'Handles up to 15 crates per minute with maximum crate weight up to 30 Kg',
  'Discharge height up to 12 meters with customizable system dimensions',
  'Fully automatic operation for continuous material flow and productivity',
  'Available in SS/MS powder coated construction for enhanced durability',
  'High power 4 KW system with 3 Phase 420V AC / 50 Hz for reliable operation',
  'VFD (Variable Frequency Drive) operation for precise speed control',
  'Premium gear motors from Bonfiglioli/Wanshin/Bonvario/Panasonic',
  'P&F/Contrinex sensors for accurate positioning and safety',
  'PU/PVC Fransteck make belts ensuring smooth material transport',
  'SKF, HCS make bearings with special purpose bearings for dairy plants',
  'Compact machine footprint: 1700mm width, 3100mm length, 1600mm height'
];

const specifications = [
  { label: 'Application', value: 'For lifting of cartons or crate to specified height for loading into palletizer using push plate or chain' },
  { label: 'Product', value: 'cartons/crates' },
  { label: 'Max Output Speed', value: '10-15 CPM' },
  { label: 'Machine Size', value: 'Width- 1700 mm, length- 3100 mm, height- 1600 mm' },
  { label: 'Power Supply', value: '3 phase, 420 VAC, 50Hz' },
  { label: 'Electrical Consumption', value: '4 KW' },
  { label: 'Pneumatic Consumption', value: '2 CFM' },
  { label: 'Mode of Operation', value: 'VFD' },
  { label: 'Contact parts', value: 'SS-304' },
  { label: 'Non-contact parts', value: 'MS powder coated (can be SS if required)' },
  { label: 'Gear Motor', value: 'Bonfiglioly/ Wanshin/ bonvario/panasonic' },
  { label: 'Sensors', value: 'P&F/ contrinex' },
  { label: 'Belts', value: 'PU/PVC Fransteck make Belts' },
  { label: 'Bearings', value: 'SKF, HCS make (Special purpose bearings in dairy plants)' },
  { label: 'Pneumatics', value: 'Festo/SMC' }
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
  'Distribution Centers',
  'Manufacturing Facilities',
  'Material Handling'
];

const technicalData = {
  performance: [
    { label: 'Max Output Speed', value: '10-15', unit: 'CPM' },
    { label: 'Operation Type', value: 'VFD', unit: 'Variable Frequency Drive' },
    { label: 'Load Capacity', value: 'Up to 30', unit: 'kg cartons/crates' },
    { label: 'Lifting Method', value: 'Push plate/Chain', unit: 'palletizer loading' }
  ],
  dimensions: [
    { label: 'Width', value: '1700', unit: 'mm' },
    { label: 'Length', value: '3100', unit: 'mm' },
    { label: 'Height', value: '1600', unit: 'mm' }
  ],
  power: [
    { label: 'Power Required', value: '4', unit: 'KW' },
    { label: 'Voltage', value: '420V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Requirement', value: '2', unit: 'CFM' }
  ],
  components: [
    { label: 'Gear Motor', value: 'Bonfiglioli/Wanshin/Bonvario/Panasonic', unit: 'make' },
    { label: 'Sensors', value: 'P&F/Contrinex', unit: 'make' },
    { label: 'Belts', value: 'PU/PVC Fransteck', unit: 'make' },
    { label: 'Bearings', value: 'SKF, HCS', unit: 'make (Special dairy)' },
    { label: 'Pneumatics', value: 'Festo/SMC', unit: 'make' }
  ]
};

export default function CrateLifterPage() {
  return (
    <ProductDetailPage
      id="crate-lifter"
      title="Crate/Box Lifter"
      subtitle="Vertical Material Transfer Solution"
      description="The Crate/Box Lifter is an efficient solution for lifting cartons or crates to specified height for loading into palletizer using push plate or chain mechanism. With a capacity of up to 15 CPM and maximum load capacity of 30 kg, it features VFD operation for precise control. Built with SS-304 contact parts and MS powder coated non-contact parts (SS optional), powered by a 4 KW system with premium Bonfiglioli/Wanshin/Bonvario/Panasonic gear motors, it ensures reliable operation for food, spices, dairy, pharmaceutical, and warehouse applications."
      features={features}
      models={models}
      applications={applications}
      category="conveying"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1752945429/Vertical_crate_lifters_bovfwa.png"
      slug="products/conveying/crate-lifter"
      videoId="tMLxOUY9cJk"
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 

