import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Fast & Precise Packaging',
    description: 'Delivers fast, precise, and professional secondary packaging for both individual pouches and pouch strips',
    icon: '📦'
  },
  {
    title: 'Advanced Shrink Tunnel',
    description: 'Uses heat-sealable laminate and advanced shrink tunnel process for perfectly wrapped packs',
    icon: '🔥'
  },
  {
    title: 'Enhanced Product Appeal',
    description: 'Produces perfectly wrapped packs that enhance product protection, shelf appeal, and brand presence',
    icon: '🌡️'
  },
  {
    title: 'High-Speed Integration',
    description: 'Input capacity up to 100 packs per minute, output 8-12 secondary packs per minute with VFFS/HFFS integration',
    icon: '⚡'
  },
  {
    title: 'Quality Verification',
    description: 'Sensor-based technology guarantees accurate pouch counting and ensures only quality-verified products are packed',
    icon: '✅'
  },
  {
    title: 'Versatile & Compact',
    description: 'Robust construction, compact footprint, user-friendly interface suitable for large-scale and space-conscious setups',
    icon: '💻'
  }
];

const models = [
  {
    name: 'ISP-120 Automatic Shrink Wrapping Machine for Pouches',
    description: 'Designed to deliver fast, precise, and professional secondary packaging for both individual pouches and pouch strips using heat-sealable laminate and advanced shrink tunnel process.',
    features: [
      'Delivers fast, precise, and professional secondary packaging for individual pouches and pouch strips',
      'Uses heat-sealable laminate and advanced shrink tunnel process for perfect wrapping',
      'Produces perfectly wrapped packs enhancing product protection, shelf appeal, and brand presence',
      'Input capacity up to 100 packs per minute with output of 8-12 secondary packs per minute',
      'Integrates seamlessly with VFFS and HFFS machines for smooth end-of-line operations',
      'Sensor-based technology guarantees accurate pouch counting and quality verification',
      'Ensures only quality-verified products are packed with comprehensive quality control',
      'Robust construction with compact footprint suitable for various production setups',
      'User-friendly interface ideal for both large-scale and space-conscious operations',
      'Versatile handling of wide range of pouch sizes and shapes across multiple sectors',
      'Maintains consistent wrapping quality at high speeds for optimal performance',
      'Trusted across multiple industries for product protection and tamper resistance',
      'Improved shelf presentation enhancing brand visibility and customer appeal',
      'Reliable, efficient, and high-quality shrink wrapping meeting diverse business needs'
    ],
    specifications: [
      { label: 'Application', value: 'For stacking/bundling of primary pouches into a Shrink film pouch' },
      { label: 'Product', value: 'Single Pouches from any VFFS or HFFS machine' },
      { label: 'Input speed', value: 'Upto 120PPM (Depends on pouch sizes)' },
      { label: 'Max Output Speed', value: 'max Upto 25 secondary packs per minute (product dependant)' },
      { label: 'Baling Capacity', value: 'NA' },
      { label: 'Packaging Material', value: 'heat Shrink/ LD shrink film above 50 micron' },
      { label: 'Primary Pouch Flatenning', value: 'Through sandwich conveyor for stable collation of pouches' },
      { label: 'Matrix formation', value: 'Dual servo high speed race track collator with servo pusher' },
      { label: 'Secondary bundle packing', value: 'Web sealer and shrink tunnel' },
      { label: 'Unwinding', value: 'Motorized Unwinding' },
      { label: 'Film pulling', value: 'Servo driven paper pulling system' },
      { label: 'Film roll holding', value: 'Pneumatic shaft film roll holding for quick change over' },
      { label: 'Sealing type', value: 'shrink wrap type (using Web sealer and shrink tunnel)' },
      { label: 'Product Feeding', value: 'Automatic from primary machine' },
      { label: 'Product Loading', value: 'horizontal loading of matrix with pneumatic pusher' },
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
      { label: 'Belts', value: 'PU/PVC Fransteck make Belts' },
      { label: 'Bearings', value: 'SKF, HCS make' },
      { label: 'Pneumatics', value: 'Festo/SMC' },
      { label: 'Glue Applicator', value: 'NA' },
      { label: 'Machine Size', value: '6200L x 2000W' },
      { label: 'Power Supply', value: '3 phase, 420 VAC, 50Hz' },
      { label: 'Electrical Consumption', value: '25 KW' },
      { label: 'Pneumatic Consumption', value: '3.5 CFM' },
      { label: 'Stitching machine', value: 'NA' },
      { label: 'System Components', value: 'Take up conveyor/Compression conveyor; High speed conveyor; Stacking conveyor; Pneumatic Pusher; Web sealer; Shrink tunnel.' },
      { label: 'Optional Components (additional cost)', value: 'Primary check weigher and rejector; Secondary check weigher and rejector; Change part for extra variant; Safety guarding as per required safety category.' }
    ],
  }
];

const applications = [
  'Food (Snacks, Confectionery, Frozen Foods)',
  'Ready-to-eat Meals',
  'Beverages (Juice, Energy Drinks)',
  'Personal Care & Cosmetics (Shampoo, Lotions)',
  'Pharmaceuticals (Tablets, Powders)',
  'Household Goods (Detergents, Cleaning Agents)',
  'Industrial Products (Chemicals, Lubricants)',
  'Tea & Coffee',
  'Spices & Seasonings',
  'Consumer Goods',
  'FMCG Products',
  'Dairy Products'
];

const keyFeatures = [
  'Fast, precise, and professional secondary packaging for individual pouches and pouch strips',
  'Uses heat-sealable laminate and advanced shrink tunnel process',
  'Produces perfectly wrapped packs enhancing product protection and shelf appeal',
  'Input capacity up to 100 packs per minute, output 8-12 secondary packs per minute',
  'Seamless integration with VFFS and HFFS machines for smooth operations',
  'Sensor-based technology for accurate pouch counting and quality verification',
  'Robust construction with compact footprint for various production setups',
  'User-friendly interface suitable for large-scale and space-conscious operations',
  'Versatile handling of wide range of pouch sizes and shapes',
  'Maintains consistent wrapping quality at high speeds',
  'Trusted across multiple industries for comprehensive packaging solutions',
  'Enhanced brand presence through improved shelf presentation'
];

const technicalData = {
  performance: [
    { label: 'Input Speed', value: '120', unit: 'PPM' },
    { label: 'Max Output Speed', value: '25', unit: 'packs/min' },
    { label: 'Sealing Type', value: 'Shrink-wrap', unit: 'web sealer & tunnel' }
  ],
  dimensions: [
    { label: 'Length', value: '6200', unit: 'mm' },
    { label: 'Width', value: '2000', unit: 'mm' },
    { label: 'Footprint', value: 'Extended design', unit: 'for shrink process' }
  ],
  power: [
    { label: 'Power Required', value: '25', unit: 'kW' },
    { label: 'Voltage', value: '420V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Requirement', value: '3.5', unit: 'CFM' }
  ],
  components: [
    { label: 'PLC & HMI', value: 'Mitsubishi/Trio', unit: 'make' },
    { label: 'Gear Motor', value: 'Bonfiglioli / Wanshinn / Bonvario / Panasonic', unit: 'make' },
    { label: 'Sensors', value: 'Pepperl+Fuchs (P&F) / Contrinex', unit: 'make' },
    { label: 'Belts', value: 'PU/PVC "Fransteck"', unit: 'make' },
    { label: 'Bearings', value: 'SKF, HCS', unit: 'make' },
    { label: 'Pneumatics', value: 'Festo/SMC', unit: 'make' }
  ]
};

const specifications = [
  { label: 'Packaging Material', value: 'Heat-shrink / LD shrink film (above 50 µm)' },
  { label: 'Film Roll', value: '3" core diameter, max film roll diameter 350mm' },
  { label: 'Sealing System', value: 'Shrink-wrap using web sealer and shrink tunnel' },
  { label: 'Control System', value: 'Motion-controller based automation' },
  { label: 'HMI Interface', value: '7″ touchscreen with 50-recipe memory' },
  { label: 'Connectivity', value: 'Ethernet / MODBUS / Inverter protocol' },
  { label: 'Safety Features', value: 'Emergency stop, safety guards, tower lamp status indication' },
  { label: 'Quality Assurance', value: 'Sensor-based technology for accurate counting and verification' },
  { label: 'Integration', value: 'Seamless integration with VFFS and HFFS machines' },
  { label: 'Operation', value: 'Eliminates manual secondary packing work completely' }
];

const certifications = ['ISO 9001:2015'];

export default function ISP120Page() {
  return (
    <ProductDetailPage
      id="isp-120"
      title="ISP-120 Automatic Shrink Wrapping Machine for Pouches"
      subtitle="Professional Secondary Packaging for Individual Pouches and Pouch Strips"
      description="The Automatic Shrink Wrapping Machine for Pouches (ISP-120) from Infinity Automated Solutions is designed to deliver fast, precise, and professional secondary packaging for both individual pouches and pouch strips. Using heat-sealable laminate and an advanced shrink tunnel process, it produces perfectly wrapped packs that enhance product protection, shelf appeal, and brand presence. With an input capacity of up to 100 packs per minute and an output of 8-12 secondary packs per minute, the ISP-120 integrates seamlessly with VFFS and HFFS machines, ensuring smooth end-of-line operations. Equipped with sensor-based technology, it guarantees accurate pouch counting and ensures that only quality-verified products are packed. Its robust construction, compact footprint, and user-friendly interface make it suitable for both large-scale and space-conscious production setups."
      features={features}
      models={models}
      applications={applications}
      category="bundling-wrapping"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755178597/qw4z3foigvwo02hce7jp.png"
      slug="products/bundling-wrapping/isp-120"
      videoId="NgeT9rPPSB4"
      videoIds={["NgeT9rPPSB4", "NMCs_fc0K2c"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 