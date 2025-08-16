import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Large Pouch Handling',
    description: 'Designed for handling pouches weighing 200g, 500g, up to 2kg with precision',
    icon: '📦'
  },
  {
    title: 'High Productivity',
    description: 'Maximum input speed of 120 packs per minute and output of 7-8 secondary packs per minute',
    icon: '⚡'
  },
  {
    title: 'Reduced Manual Handling',
    description: 'Reduces manual handling, improves packaging efficiency, and maintains product quality',
    icon: '🤖'
  },
  {
    title: 'Sensor-Based Technology',
    description: 'Built with sensor-based technology guaranteeing accurate product counting and quality control',
    icon: '💻'
  },
  {
    title: 'VFFS/HFFS Integration',
    description: 'Ideal for products from VFFS or HFFS machines, efficiently collects, aligns, and prepares pouches',
    icon: '🔗'
  },
  {
    title: 'High-Volume Operations',
    description: 'Perfect for high-volume operations ensuring efficient handling with speed, precision, and consistent quality',
    icon: '🏭'
  }
];

const models = [
  {
    name: 'IBL-500 Automatic Baler Machine for Pouches',
    description: 'Designed for handling pouches weighing 200g, 500g, up to 2kg. Ideal for products from VFFS or HFFS machines, efficiently collecting, aligning, and preparing large-sized pouches for secondary packaging.',
    features: [
      'Designed for handling pouches weighing 200g, 500g, up to 2kg',
      'Ideal for products from VFFS or HFFS machines with efficient collection and alignment',
      'Efficiently collects, aligns, and prepares large-sized pouches for secondary packaging',
      'Maximum input speed of 120 packs per minute ensuring high productivity',
      'Output of 7-8 secondary packs per minute for optimal throughput',
      'Built with sensor-based technology guaranteeing accurate product counting',
      'Provides comprehensive quality control throughout the baling process',
      'Perfect for high-volume operations with reduced manual handling',
      'Improves packaging efficiency and maintains consistent product quality',
      'Ideal for FMCG, food & beverage, and consumer goods industries',
      'Ensures efficient handling of large pouches with speed and precision',
      'Delivers consistent quality and reliability in secondary packaging',
      'Advanced automation reducing labor costs and improving efficiency',
      'Customizable solutions based on specific industry requirements'
    ],
    specifications: [
      { label: 'Application', value: 'For baling of pouches into a gusset pouch' },
      { label: 'Product', value: 'Single Pouches from any VFFS or HFFS machine' },
      { label: 'Input speed', value: 'upto 120 ppm' },
      { label: 'Max Output Speed', value: '5-6 bales per minute (product dependant)' },
      { label: 'Baling Capacity', value: '1 kg to 20 kg Bale' },
      { label: 'Packaging Material', value: 'heat sealable laminated film/Bopp film/HMLLDPE film above 50 micron' },
      { label: 'Primary Pouch Flatenning', value: 'Through sandwich conveyor' },
      { label: 'Matrix formation', value: 'dumping through pneumatic sliding gates' },
      { label: 'Secondary bundle packing', value: 'Automatic baler' },
      { label: 'Unwinding', value: 'Motorized Unwinding' },
      { label: 'Film pulling', value: 'Servo driven paper pulling system' },
      { label: 'Film roll holding', value: 'Pneumatic shaft film roll holding for quick change over' },
      { label: 'Sealing type', value: 'Center seal type pouch' },
      { label: 'Product Feeding', value: 'Automatic from primary machine' },
      { label: 'Product Loading', value: 'Vertical Loading of matrix with sliding Gate assembly' },
      { label: 'Mode of Operation', value: 'motion controller based' },
      { label: 'HMI type', value: '7" touch screen with 50 recipe function' },
      { label: 'Carton magazine size', value: 'NA' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'MS powder coated (can be SS if required)' },
      { label: 'Carton width Adjustment', value: 'NA' },
      { label: 'Matrix', value: 'Desired Matix formation' },
      { label: 'Gripper', value: 'NA' },
      { label: 'PLC, HMI, Drives, Servo Motors', value: 'Mitsubishi/ Trio make' },
      { label: 'Gear Motor', value: 'Bonfiglioly/ Wanshin/ bonvario/panasonic' },
      { label: 'Sensors', value: 'P&F/ contrinex' },
      { label: 'Belts', value: 'clitted chain conveyors' },
      { label: 'Bearings', value: 'SKF, HCS make' },
      { label: 'Pneumatics', value: 'Festo/SMC/ Schmalz' },
      { label: 'Glue Applicator', value: 'NA' },
      { label: 'Machine Size', value: '5800L X 1200W' },
      { label: 'Power Supply', value: '3 phase, 420 VAC, 50Hz' },
      { label: 'Electrical Consumption', value: '6 KW' },
      { label: 'Pneumatic Consumption', value: '6 CFM' },
      { label: 'Stitching machine', value: 'NA' },
      { label: 'System Components', value: 'Take up conveyor; Compression conveyor; High speed flat belt conveyor; conveyors for matix formation; Gate assembly; Baler machine; output conveyor.' },
      { label: 'Optional Components (additional cost)', value: 'Primary check weigher and Rejector; Secondary Static check weigher; Safety guarding as per required safety category.' }
    ],
  }
];

const keyFeatures = [
  'Designed for handling pouches weighing 200g, 500g, up to 2kg',
  'Ideal for products from VFFS or HFFS machines with seamless integration',
  'Efficiently collects, aligns, and prepares large-sized pouches for secondary packaging',
  'Maximum input speed of 120 packs per minute for high productivity',
  'Output of 7-8 secondary packs per minute ensuring optimal throughput',
  'Built with sensor-based technology for accurate product counting and quality control',
  'Perfect for high-volume operations reducing manual handling significantly',
  'Improves packaging efficiency and maintains consistent product quality',
  'Ideal for FMCG, food & beverage, and consumer goods industries',
  'Ensures efficient handling of large pouches with speed, precision, and consistent quality',
  'Advanced automation technology for modern packaging requirements',
  'Customizable solutions based on specific industry requirements',
  'User-friendly operation with minimal training needed',
  'Robust construction ensuring long-term reliability and performance'
];

const technicalData = {
  performance: [
    { label: 'Input Speed', value: '120', unit: 'PPM' },
    { label: 'Output Speed', value: '5-6', unit: 'bales/min' },
    { label: 'Baling Capacity', value: '1-20', unit: 'kg Bale' },
    { label: 'Matrix Formation', value: 'Pneumatic sliding gates', unit: 'dumping system' }
  ],
  dimensions: [
    { label: 'Length', value: '5800', unit: 'mm' },
    { label: 'Width', value: '1200', unit: 'mm' },
    { label: 'Footprint', value: 'Optimized design', unit: 'for baling' }
  ],
  power: [
    { label: 'Power Required', value: '6', unit: 'kW' },
    { label: 'Voltage', value: '420V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Requirement', value: '6', unit: 'CFM' }
  ],
  components: [
    { label: 'PLC & HMI', value: 'Mitsubishi/Trio', unit: 'make' },
    { label: 'Gear Motor', value: 'Bonfiglioli / Wanshin / Bonvario / Panasonic', unit: 'make' },
    { label: 'Sensors', value: 'P&F / Contrinex', unit: 'make' },
    { label: 'Belts', value: 'Clitted chain conveyors', unit: 'type' },
    { label: 'Bearings', value: 'SKF, HCS', unit: 'make' },
    { label: 'Pneumatics', value: 'Festo/SMC/Schmalz', unit: 'make' }
  ]
};

const specifications = [
  { label: 'Pouch Size Range', value: 'Pouches weighing 200g, 500g, up to 2kg (0.25 kg to 2 Kg)' },
  { label: 'Conveyor System', value: 'Sandwich conveyor for flattening and size reduction' },
  { label: 'Quality Assurance', value: 'Optional Check Weighers and Metal Detector integration' },
  { label: 'Matrix Formation', value: 'Gate flap assembly for desired count and matrix arrangement' },
  { label: 'Secondary VFFS', value: 'Integrated for exact counting and proper sealing of secondary bags' },
  { label: 'Film Compatibility', value: 'Heat sealable laminated film, BOPP film above 50 micron, LDPE film' },
  { label: 'Film Roll Specifications', value: 'Max diameter 450mm, max width 1200mm, core 70-75mm' },
  { label: 'Bale Format', value: 'CSPP (Center Seal Pillow Pack) with gusset configuration' },
  { label: 'Control System', value: 'Advanced PLC with 7" color touch screen HMI' },
  { label: 'User Management', value: 'Multi-level user ID and password protection' },
  { label: 'Integration', value: 'Compatible with primary packaging machines of any make' },
  { label: 'Operation Mode', value: 'Single operator system with automated sensor technology' }
];

const applications = [
  'FMCG Products',
  'Food & Beverage',
  'Consumer Goods',
  'Snack Foods',
  'Spices Industry',
  'Dairy Products', 
  'Tea & Coffee',
  'Ready-to-eat Meals',
  'Personal Care Products',
  'Household Products',
  'Pharmaceutical Packaging',
  'Pet Food Packaging'
];

const certifications = ['ISO 9001:2015'];

export default function IBL500Page() {
  return (
    <ProductDetailPage
      id="ibl-500"
      title="IBL-500 Automatic Baler Machine for Pouches"
      subtitle="Large Pouch Handling: 200g, 500g, up to 2kg"
      description="The IBL-500 is designed for handling pouches weighing 200g, 500g, up to 2kg. Ideal for products from VFFS or HFFS machines, it efficiently collects, aligns, and prepares large-sized pouches ranging from 0.25kg to 2kg for secondary packaging. With a maximum input speed of 120 packs per minute and output of 7-8 secondary packs per minute, the IBL-500 ensures high productivity. Built with sensor-based technology, it guarantees accurate product counting and quality control. Perfect for high-volume operations, the IBL-500 reduces manual handling, improves packaging efficiency, and maintains product quality. Perfect for FMCG, food & beverage, and other consumer goods industries, the IBL-500 ensures efficient handling of large pouches with speed, precision, and consistent quality."
      features={features}
      models={models}
      applications={applications}
      category="pouch-baler"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098786/q9cecrkqu85kbd95t05o.png"
      slug="products/pouch-baler/ibl-500"
      videoId="6r6ZZAkpCoU"
      videoIds={["6r6ZZAkpCoU", "k8VCVO0gIl0"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 