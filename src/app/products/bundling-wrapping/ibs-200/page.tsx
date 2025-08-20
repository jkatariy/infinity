import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Efficient Strip Bundling',
    description: 'Built for efficient bundling of strips of pouches weighing between 50g and 200g',
    icon: '📦'
  },
  {
    title: 'Reduced Manual Work',
    description: 'Minimizes manpower needs and maximizes plant efficiency by reducing manual work',
    icon: '🤖'
  },
  {
    title: 'Precise Bundling',
    description: 'Ensures consistent, high-quality output for better productivity and operational control',
    icon: '🎯'
  },
  {
    title: 'Streamlined Handling',
    description: 'Makes handling pouch strips faster, smoother, and more organized',
    icon: '💻'
  },
  {
    title: 'Speed & Reliability',
    description: 'Delivers speed, accuracy, and reliability for all pouch strip bundling needs',
    icon: '⚡'
  },
  {
    title: 'Industry Versatility',
    description: 'Perfect for FMCG, food & beverage, and other consumer goods industries',
    icon: '🏭'
  }
];

const models = [
  {
    name: 'IBS-200 High-Speed Secondary Packaging Machine',
    description: 'Built for efficient bundling of strips of pouches weighing between 50g and 200g. This advanced secondary packaging solution makes handling pouch strips faster, smoother, and more organized.',
    features: [
      'Built for efficient bundling of strips of pouches weighing between 50g and 200g',
      'Advanced secondary packaging solution for pouch strips',
      'Reduces manual work, minimizing manpower needs significantly',
      'Maximizes plant efficiency with precise bundling capabilities',
      'Makes handling pouch strips faster, smoother, and more organized',
      'Ensures consistent, high-quality output for better productivity',
      'Provides better operational control and process optimization',
      'Perfect for FMCG, food & beverage, and consumer goods industries',
      'Delivers speed, accuracy, and reliability for all bundling needs',
      'Advanced automation technology for modern packaging requirements',
      'Customized solutions based on specific client requirements',
      'User-friendly operation with minimal training needed',
      'Robust construction ensuring long-term reliability',
      'Energy-efficient design with optimized performance'
    ],
    specifications: [
      { label: 'Application', value: 'For packing strips of pouches into a single pouch' },
      { label: 'Product', value: 'pouch strip from any VFFS or HFFS machine' },
      { label: 'Input speed', value: 'Upto 120PPM (Depends on pouch sizes)' },
      { label: 'Max Output Speed', value: 'Upto 15 packs per minute (product dependant)' },
      { label: 'Baling Capacity', value: 'NA' },
      { label: 'Packaging Material', value: 'Heat sealable laminated film/Bopp film above 35 micron' },
      { label: 'Primary Pouch Flatenning', value: 'Through sandwich conveyor for stable collation of pouches' },
      { label: 'Matrix formation', value: 'vacuum based pick place gantry/ dual servo based strip folding system' },
      { label: 'Secondary bundle packing', value: 'Inverted flow wrapper' },
      { label: 'Unwinding', value: 'Motorized film Unwinding' },
      { label: 'Film pulling', value: 'Servo driven paper pulling system' },
      { label: 'Film roll holding', value: 'Pneumatic shaft film roll holding for quick change over' },
      { label: 'Sealing type', value: 'Center seal type pouch (Using horizontal Flow wrap) (Continuous heating sealer with PID)' },
      { label: 'Product Feeding', value: 'Automatic from primary machine' },
      { label: 'Product Loading', value: 'horizontal loading of matrix through conveyor' },
      { label: 'Mode of Operation', value: 'motion controller based' },
      { label: 'HMI type', value: '7" touch screen with 50 recipe function' },
      { label: 'Carton magazine size', value: 'NA' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'SS-304' },
      { label: 'Carton width Adjustment', value: 'NA' },
      { label: 'Matrix', value: 'Desired Matix formation' },
      { label: 'Gripper', value: 'vacuum cups' },
      { label: 'PLC, HMI, Drives, Servo Motors', value: 'Mitsubishi/ Trio make' },
      { label: 'Gear Motor', value: 'Bonfiglioly/ Wanshin/ bonvario/panasonic' },
      { label: 'Sensors', value: 'P&F/ contrinex' },
      { label: 'Belts', value: 'PU/PVC Fransteck make Belts' },
      { label: 'Bearings', value: 'SKF, HCS make' },
      { label: 'Pneumatics', value: 'Festo/SMC/ Schmalz' },
      { label: 'Glue Applicator', value: 'NA' },
      { label: 'Machine Size', value: '5800L X 1200W' },
      { label: 'Power Supply', value: '3 phase, 420 VAC, 50Hz' },
      { label: 'Electrical Consumption', value: '2.5 KW' },
      { label: 'Pneumatic Consumption', value: '3.2 CFM' },
      { label: 'Stitching machine', value: 'NA' },
      { label: 'System Components', value: 'Take up conveyor/Compression conveyor; Matrix conveyor; Pick and place unit; feeding conveyor; Horizontal Flow wrap machine; Safety & Guarding.' },
      { label: 'Optional Components (additional cost)', value: 'Secondary check weigher & Rejector; Change part for extra variant; Safety guarding as per required safety category.' },
      { label: 'Feature', value: 'Advanced motion control system' },
      { label: 'Feature', value: 'Multi-level Password Protection' },
      { label: 'Feature', value: 'Production Data Report Generation' },
      { label: 'Feature', value: 'Connectivity through Ethernet / MODBUS /Inverter protocol' },
      { label: 'Feature', value: 'High-Speed, Accuracy & Precision Servo driven system' },
      { label: 'Feature', value: 'Tower lamp to identify machine status' },
      { label: 'Feature', value: 'Easy product setup & changeovers' }
    ],
  }
];

const applications = [
  'FMCG Products',
  'Food & Beverage',
  'Consumer Goods',
  'Snack Foods',
  'Tea & Coffee',
  'Spices & Seasonings',
  'Confectionery Industry',
  'Ready-to-eat Meals',
  'Personal Care Products',
  'Household Products',
  'Pharmaceutical Packaging',
  'Dairy Products'
];

const keyFeatures = [
  'Efficient bundling of strips of pouches weighing between 50g and 200g',
  'Advanced secondary packaging solution for streamlined operations',
  'Reduces manual work, minimizing manpower needs significantly',
  'Maximizes plant efficiency with precise bundling capabilities',
  'Makes handling pouch strips faster, smoother, and more organized',
  'Ensures consistent, high-quality output for better productivity',
  'Perfect for FMCG, food & beverage, and consumer goods industries',
  'Delivers speed, accuracy, and reliability for all bundling needs',
  'Advanced automation technology for modern packaging requirements',
  'Customized solutions based on specific industry requirements',
  'User-friendly operation with minimal training requirements',
  'Robust construction for long-term reliability and performance'
];

const technicalData = {
  performance: [
    { label: 'Input Speed', value: '120', unit: 'PPM' },
    { label: 'Output Speed', value: '15', unit: 'packs/min' },
    { label: 'Matrix Formation', value: 'Vacuum-based pick-and-place', unit: 'gantry system' }
  ],
  dimensions: [
    { label: 'Length', value: '5800', unit: 'mm' },
    { label: 'Width', value: '1200', unit: 'mm' },
    { label: 'Footprint', value: 'Optimized design', unit: 'for efficiency' }
  ],
  power: [
    { label: 'Power Required', value: '2.5', unit: 'kW' },
    { label: 'Voltage', value: '420V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Requirement', value: '3.2', unit: 'CFM' }
  ],
  components: [
    { label: 'PLC & HMI', value: 'Mitsubishi/Trio', unit: 'make' },
    { label: 'Gear Motor', value: 'Bonfiglioli / Wanshinn / Bonvario / Panasonic', unit: 'make' },
    { label: 'Sensors', value: 'Pepperl+Fuchs (P&F) / Contrinex', unit: 'make' },
    { label: 'Belts', value: 'PU/PVC "Fransteck"', unit: 'make' },
    { label: 'Bearings', value: 'SKF, HCS', unit: 'make' },
    { label: 'Pneumatics', value: 'Festo/SMC (some Schmalz)', unit: 'make' }
  ]
};

const specifications = [
  { label: 'Packaging Material', value: 'Heat-sealable laminated film / BOPP film (above 35 µm)' },
  { label: 'Pouch Flattening', value: 'Through sandwich conveyor for stable collation' },
  { label: 'Matrix Formation', value: 'Vacuum-based pick-and-place gantry or dual-servo strip folding system' },
  { label: 'Bundle Packing', value: 'Inverted flow wrapper' },
  { label: 'Film Unwinding', value: 'Motorized film unwinding system' },
  { label: 'Film Pulling', value: 'Servo-driven film pulling system' },
  { label: 'Film Roll Holding', value: 'Pneumatic shaft for quick changeover' },
  { label: 'Sealing Type', value: 'Center-seal pouch using horizontal flow-wrapper with continuous heating sealer jaws and PID controller' },
  { label: 'Product Feeding', value: 'Automatic from primary machine' },
  { label: 'Product Loading', value: 'Horizontal loading of matrix through conveyor' },
  { label: 'Operation Mode', value: 'Motion-controller based automation' },
  { label: 'HMI Interface', value: '7″ touchscreen with 50-recipe memory' },
  { label: 'Contact Parts MOC', value: 'Stainless Steel (SS-304)' },
  { label: 'Non-Contact Parts MOC', value: 'MS powder-coated (SS optional)' },
  { label: 'Gripper System', value: 'Vacuum cups for precise handling' },
  { label: 'Integration', value: 'Compatible with any VFFS or HFFS machine' }
];

const certifications = ['ISO 9001:2015'];

export default function IBS200Page() {
  return (
    <ProductDetailPage
      id="ibs-200"
      title="IBS-200 High-Speed Secondary Packaging Machine"
      description="The IBS-200 specializes in efficient bundling of pouch strips with advanced vacuum-based pick & place gantry technology. This high-performance system handles strips from VFFS/HFFS machines with precision, featuring dual servo strip folding and horizontal flow wrap capabilities. Ideal for food & beverage industries requiring fast, reliable strip packaging solutions."
      features={features}
      models={models}
      applications={applications}
      category="bundling-wrapping"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755178597/no7bf1acf58hgfrvwmnp.png"
      slug="products/bundling-wrapping/ibs-200"
      videoId="M_2HgD2j33Q"
      videoIds={["M_2HgD2j33Q", "DOJaJa3Sak4"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 