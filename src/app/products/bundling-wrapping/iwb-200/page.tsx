import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Bottle Wrapping Specialist',
    description: 'Specifically designed for wrapping bottles and cylindrical containers',
    icon: '🍾'
  },
  {
    title: 'No Bottle-No Film',
    description: 'Intelligent sensor system prevents film waste when no bottles are present',
    icon: '👁️'
  },
  {
    title: 'Multiple Pack Patterns',
    description: 'Create various pack configurations including 2x2, 3x2, 4x2, and custom patterns',
    icon: '📐'
  },
  {
    title: 'Gentle Handling',
    description: 'Soft-grip technology ensures bottles are handled without damage or scratching',
    icon: '🤲'
  },
  {
    title: 'Brand Enhancement',
    description: 'Crystal-clear shrink finish enhances product presentation and brand appeal',
    icon: '✨'
  },
  {
    title: 'High Reliability',
    description: 'Robust construction ensures consistent operation in demanding production environments',
    icon: '🛡️'
  }
];

const models = [
  {
    name: 'IWB-120 Bottle Wrapping Machine',
    description: 'Advanced automatic shrink wrapping machine specifically engineered for bottles and cylindrical containers, featuring innovative handling technology and flexible pack pattern capabilities.',
    features: [
      'Bottle-specific gripper system',
      'Adjustable pack patterns',
      'No bottle-no film technology',
      'Multi-zone shrink tunnel',
      'Brand-enhancing finish',
      'Servo-driven controls',
      'Auto bottle spacing',
      'Quick size changeover',
      'Energy recovery system'
    ],
    specifications: [
      { label: 'Model', value: 'IWB-120' },
      { label: 'Application', value: 'For stacking/bundling of bottles into a Shrinked pouch' },
      { label: 'Product', value: 'Bottles/jars' },
      { label: 'Input speed', value: 'upto 60 bottles/min' },
      { label: 'Max Output Speed', value: 'max Upto 12 secondary packs per minute (product dependant)' },
      { label: 'Baling Capacity', value: 'NA' },
      { label: 'Packaging Material', value: 'heat Shrink/ LD shrink film above 50 micron' },
      { label: 'Primary Pouch Flatenning', value: 'NA' },
      { label: 'Matrix formation', value: 'pneumatic pushers, plates and traffic management' },
      { label: 'Secondary bundle packing', value: 'shrink wrap type (using Web sealer and shrink tunnel)' },
      { label: 'Unwinding', value: 'Motorized Unwinding' },
      { label: 'Film pulling', value: 'Servo driven paper pulling system' },
      { label: 'Film roll holding', value: 'Pneumatic shaft film roll holding for quick change over' },
      { label: 'Sealing type', value: 'shrink wrap type (using Web sealer and shrink tunnel)' },
      { label: 'Product Feeding', value: 'Automatic/Manual' },
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
      { label: 'Pneumatics', value: 'Festo/SMC/ Schmalz' },
      { label: 'Glue Applicator', value: 'NA' },
      { label: 'Machine Size', value: '6200L x 2000W' },
      { label: 'Power Supply', value: '3 phase, 420 VAC, 50Hz' },
      { label: 'Electrical Consumption', value: '22 KW' },
      { label: 'Pneumatic Consumption', value: '10 CFM' },
      { label: 'Stitching machine', value: 'NA' },
      { label: 'System Components', value: 'Matrix conveyor; Pick and place unit; feeding conveyor; Horizontal Flow wrap machine.' },
      { label: 'Optional Components (additional cost)', value: 'Secondary check weigher & Rejector; Change part for extra variant.' }
    ],
  }
];

const keyFeatures = [
  'Automatic shrink wrapping specifically designed for bottles and cylindrical containers',
  'Intelligent "No bottle-no film" sensor system prevents material waste',
  'Multiple pack pattern configurations (2x2, 3x2, 4x2, and custom patterns)',
  'Gentle bottle handling with soft-grip technology prevents damage',
  'Crystal-clear shrink finish enhances product presentation and brand appeal',
  'Servo-driven control system for precise positioning and timing',
  'Quick changeover capability for different bottle sizes and pack patterns',
  'Multi-zone shrink tunnel with controlled temperature zones',
  'Energy recovery system reduces operational costs',
  'Robust construction ensures consistent operation in demanding environments',
  'Advanced HMI with 50-recipe memory for easy operation',
  'Integration capability with existing production lines'
];

const specifications = [
  { label: 'Bottle Size Range', value: 'Diameter: 40-120mm, Height: 150-350mm (customizable)' },
  { label: 'Pack Patterns', value: '2x2, 3x2, 4x2, and custom configurations available' },
  { label: 'Film Type', value: 'PE shrink film, LD shrink film (50-100 micron)' },
  { label: 'Shrink Tunnel', value: 'Multi-zone temperature control with energy recovery' },
  { label: 'Control System', value: 'Advanced PLC with 7" color HMI touchscreen' },
  { label: 'Bottle Detection', value: '"No bottle-no film" intelligent sensor system' },
  { label: 'Changeover Time', value: 'Quick size changeover in under 15 minutes' },
  { label: 'Material Construction', value: 'MS powder-coated frame, SS304 contact parts' },
  { label: 'Safety Features', value: 'Emergency stops, safety interlocks, protective guards' },
  { label: 'Integration', value: 'Compatible with any bottle filling line manufacturer' },
  { label: 'Quality Control', value: 'Sensor-based bottle counting and quality verification' },
  { label: 'Environmental', value: 'Energy-efficient operation with heat recovery system' }
];

const applications = [
  'Beverage Industry',
  'Personal Care Products',
  'Pharmaceutical Bottles',
  'Cosmetic Containers',
  'Chemical Products',
  'Food Condiments',
  'Cleaning Products',
  'Industrial Liquids',
  'Health Supplements',
  'Dairy Products'
];

const technicalData = {
  performance: [
    { label: 'Input Speed', value: '60', unit: 'bottles/min' },
    { label: 'Output Speed', value: '12', unit: 'packs/min' },
    { label: 'Matrix Formation', value: 'Pneumatic pushers', unit: 'traffic management' }
  ],
  dimensions: [
    { label: 'Length', value: '6200', unit: 'mm' },
    { label: 'Width', value: '2000', unit: 'mm' },
    { label: 'Footprint', value: 'Optimized design', unit: 'for bottles' }
  ],
  power: [
    { label: 'Power Required', value: '22', unit: 'kW' },
    { label: 'Voltage', value: '420V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Requirement', value: '10', unit: 'CFM' }
  ],
  components: [
    { label: 'PLC & HMI', value: 'Mitsubishi/Trio', unit: 'make' },
    { label: 'Gear Motor', value: 'Bonfiglioli / Wanshin / Bonvario / Panasonic', unit: 'make' },
    { label: 'Sensors', value: 'P&F / Contrinex', unit: 'make' },
    { label: 'Belts', value: 'PU/PVC Fransteck', unit: 'make' },
    { label: 'Bearings', value: 'SKF, HCS', unit: 'make' },
    { label: 'Pneumatics', value: 'Festo/SMC/Schmalz', unit: 'make' }
  ]
};

const certifications = ['ISO 9001:2015'];

export default function IWB200Page() {
  return (
    <ProductDetailPage
      id="iwb-200"
      title="IWB-120 Bottle Wrapping Machine"
      description="The IWB-120 represents the latest in bottle wrapping technology, engineered specifically for the automatic shrink wrapping of bottles and cylindrical containers. With its specialized bottle-handling technology, intelligent no-bottle-no-film system, and multi-zone shrink tunnel, it delivers exceptional packaging quality while minimizing waste. The machine's versatile design accommodates various bottle sizes and pack patterns, making it ideal for beverage, personal care, and pharmaceutical industries requiring high-speed, precise bottle packaging solutions."
      features={features}
      models={models}
      applications={applications}
      category="bundling-wrapping"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098781/vmqgtzrzrbs8jiekt61w.png"
      slug="products/bundling-wrapping/iwb-200"
      videoId="NMCs_fc0K2c"
      videoIds={["NMCs_fc0K2c"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 