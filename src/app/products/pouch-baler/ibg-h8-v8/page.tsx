import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Dual Model Configuration',
    description: 'Available in horizontal (H8) and vertical (V8) models for different space requirements and applications',
    icon: '🔄'
  },
  {
    title: 'Bulk Pouch Handling Automation',
    description: 'Specializes in automating bulk pouch handling with speed, accuracy, and seamless integration',
    icon: '🤖'
  },
  {
    title: 'HDPE Bag Packaging',
    description: 'Efficiently collates and packs pouches into durable HDPE bags for secondary packaging',
    icon: '📦'
  },
  {
    title: 'Wide Capacity Range',
    description: 'Designed to handle pouch sizes ranging from 0.2 kg to 5 kg with precision',
    icon: '⚖️'
  },
  {
    title: 'Quality Assurance Options',
    description: 'Optional check weighers and metal detectors ensure highest levels of quality assurance',
    icon: '✅'
  },
  {
    title: 'High-Volume Production Ready',
    description: 'Robust construction and precise operation ideal for high-volume production environments',
    icon: '🏭'
  }
];

const models = [
  {
    name: 'IBG-H8 Automatic Bagging Machine (Horizontal)',
    description: 'Horizontal model designed for automating bulk pouch handling with speed, accuracy, and seamless integration with primary packaging lines.',
    features: [
      'Horizontal orientation for efficient space utilization and easy integration',
      'Built for speed, accuracy, and seamless integration with primary packaging lines',
      'Efficiently collates and packs pouches into durable HDPE bags',
      'Handles pouch sizes ranging from 0.2 kg to 5 kg with precision',
      'Optional check weighers and metal detectors for quality assurance',
      'Robust construction and precise operation for high-volume production',
      'Streamlines secondary packaging process significantly',
      'Ideal for high-volume production environments requiring consistency',
      'Advanced automation technology for modern packaging requirements',
      'Customizable solutions based on specific industry requirements',
      'User-friendly operation with minimal training needed',
      'Energy-efficient design with optimized performance'
    ],
    specifications: [
      { label: 'Application', value: 'For filling a pouches into a preformed HDPE bag' },
      { label: 'Product', value: 'Single Pouches from any VFFS or HFFS machine' },
      { label: 'Input speed', value: 'upto 120 ppm' },
      { label: 'Max Output Speed', value: 'upto 8 bags per minute (product dependant)' },
      { label: 'Baling Capacity', value: 'NA' },
      { label: 'Packaging Material', value: 'HDPE bag' },
      { label: 'Primary Pouch Flatenning', value: 'Through sandwich conveyor' },
      { label: 'Matrix formation', value: 'dumping through pneumatic sliding gates' },
      { label: 'Secondary bundle packing', value: 'automatic bagger' },
      { label: 'Unwinding', value: 'Motorized Unwinding' },
      { label: 'Film pulling', value: 'NA' },
      { label: 'Film roll holding', value: 'Pneumatic shaft film roll holding for quick change over' },
      { label: 'Sealing type', value: 'Center seal type pouch' },
      { label: 'Product Feeding', value: 'Automatic from primary machine' },
      { label: 'Product Loading', value: 'Horizontal Loading of matrix with pusher' },
      { label: 'Mode of Operation', value: 'PLC based' },
      { label: 'HMI type', value: '7" touch screen with 50 recipe function' },
      { label: 'Carton magazine size', value: 'NA' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'SS-304' },
      { label: 'Carton width Adjustment', value: 'Through adjustable side guides' },
      { label: 'Matrix', value: 'NA' },
      { label: 'Gripper', value: 'NA' },
      { label: 'PLC, HMI, Drives, Servo Motors', value: 'Mitsubishi/ Trio make' },
      { label: 'Gear Motor', value: 'Bonfiglioly/ Wanshin/ bonvario/panasonic' },
      { label: 'Sensors', value: 'P&F/ contrinex' },
      { label: 'Belts', value: 'NA' },
      { label: 'Bearings', value: 'NA' },
      { label: 'Pneumatics', value: 'NA' },
      { label: 'Glue Applicator', value: 'NA' },
      { label: 'Machine Size', value: 'variable' },
      { label: 'Power Supply', value: '3 phase, 420 VAC, 50Hz' },
      { label: 'Electrical Consumption', value: '8 KW' },
      { label: 'Pneumatic Consumption', value: '8 CFM' },
      { label: 'Stitching machine', value: 'Gabbar make' }
    ],
  },
  {
    name: 'IBG-V8 Automatic Bagging Machine (Vertical)',
    description: 'Vertical model optimized for space-efficient bulk pouch handling with the same advanced automation and quality features.',
    features: [
      'Vertical orientation for space-efficient installation and operation',
      'Built for speed, accuracy, and seamless integration with primary packaging lines',
      'Efficiently collates and packs pouches into durable HDPE bags',
      'Handles pouch sizes ranging from 0.2 kg to 5 kg with precision',
      'Optional check weighers and metal detectors for quality assurance',
      'Robust construction and precise operation for high-volume production',
      'Compact footprint ideal for space-constrained production areas',
      'Same advanced automation features as horizontal model',
      'Streamlines secondary packaging process significantly',
      'Ideal for high-volume production environments requiring consistency',
      'Advanced automation technology for modern packaging requirements',
      'Energy-efficient design with optimized performance'
    ],
    specifications: [
      { label: 'Application', value: 'For filling a pouches into a preformed HDPE bag' },
      { label: 'Product', value: 'Single Pouches from any single or twin track VFFS or HFFS machine' },
      { label: 'Input speed', value: 'upto 120 ppm' },
      { label: 'Max Output Speed', value: 'upto 8 bags per minute (product dependant)' },
      { label: 'Baling Capacity', value: 'NA' },
      { label: 'Packaging Material', value: 'HDPE bag' },
      { label: 'Primary Pouch Flatenning', value: 'Through sandwich conveyor' },
      { label: 'Matrix formation', value: 'dumping through pneumatic sliding gates' },
      { label: 'Secondary bundle packing', value: 'automatic bagger' },
      { label: 'Unwinding', value: 'Motorized Unwinding' },
      { label: 'Film pulling', value: 'Servo driven paper pulling system' },
      { label: 'Film roll holding', value: 'Pneumatic shaft film roll holding for quick change over' },
      { label: 'Sealing type', value: 'Center seal type pouch' },
      { label: 'Product Feeding', value: 'Automatic from primary machine' },
      { label: 'Product Loading', value: 'Vertical Loading of matrix with sliding Gate assembly' },
      { label: 'Mode of Operation', value: 'PLC based' },
      { label: 'HMI type', value: '7" touch screen with 50 recipe function' },
      { label: 'Carton magazine size', value: 'NA' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'SS-304' },
      { label: 'Carton width Adjustment', value: 'Through Rotationg Wheel' },
      { label: 'Matrix', value: 'NA' },
      { label: 'Gripper', value: 'NA' },
      { label: 'PLC, HMI, Drives, Servo Motors', value: 'Mitsubishi/ Trio make' },
      { label: 'Gear Motor', value: 'Bonfiglioly/ Wanshin/ bonvario/panasonic' },
      { label: 'Sensors', value: 'P&F/ contrinex' },
      { label: 'Belts', value: 'PU/PVC frasntech belt conveyors' },
      { label: 'Bearings', value: 'NA' },
      { label: 'Pneumatics', value: 'NA' },
      { label: 'Glue Applicator', value: 'NA' },
      { label: 'Machine Size', value: 'variable' },
      { label: 'Power Supply', value: '3 phase, 420 VAC, 50Hz' },
      { label: 'Electrical Consumption', value: '8 KW' },
      { label: 'Pneumatic Consumption', value: '8 CFM' },
      { label: 'Stitching machine', value: 'Gabbar make' },
      { label: 'System Components', value: 'NA' }
    ],
  }
];

const applications = [
  'Food (Grains, Pulses, Frozen Foods)',
  'Spices (Masalas, Seasonings)',
  'Dairy & Beverages (Milk Powder, Premixes)',
  'Pharmaceuticals (Bulk Sachets, Powders)',
  'Pet Food (Dry Feed, Treats)',
  'FMCG (Personal Care, Detergents)',
  'Industrial Goods (Granules, Powders)',
  'Tea & Coffee Processing',
  'Ready-to-eat Meals',
  'Household Products',
  'Consumer Goods',
  'Bulk Product Packaging'
];

const keyFeatures = [
  'Available in horizontal (H8) and vertical (V8) models for different space requirements',
  'Specializes in automating bulk pouch handling with speed and accuracy',
  'Built for seamless integration with primary packaging lines',
  'Efficiently collates and packs pouches into durable HDPE bags',
  'Handles pouch sizes ranging from 0.2 kg to 5 kg with precision',
  'Optional check weighers and metal detectors for quality assurance',
  'Robust construction and precise operation for high-volume production',
  'Streamlines secondary packaging process significantly',
  'Ideal for high-volume production environments requiring consistency',
  'Trusted across wide range of industries from food to industrial goods',
  'Advanced automation technology for modern packaging requirements',
  'Energy-efficient design with optimized performance'
];

const technicalData = {
  performance: [
    { label: 'Input Speed', value: '120', unit: 'PPM' },
    { label: 'Output Speed', value: '8', unit: 'bags/min' },
    { label: 'Bag Type', value: 'HDPE', unit: 'preformed bags' },
    { label: 'Matrix Formation', value: 'Pneumatic sliding gates', unit: 'dumping system' }
  ],
  dimensions: [
    { label: 'H8 Configuration', value: 'Horizontal', unit: 'layout' },
    { label: 'V8 Configuration', value: 'Vertical', unit: 'layout' },
    { label: 'Machine Size', value: 'Variable', unit: 'customizable' },
    { label: 'Installation', value: 'Flexible', unit: 'requirements' }
  ],
  power: [
    { label: 'Power Required', value: '8', unit: 'kW' },
    { label: 'Voltage', value: '420V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Requirement', value: '8', unit: 'CFM' }
  ],
  components: [
    { label: 'PLC & HMI', value: 'Mitsubishi/Trio', unit: 'make' },
    { label: 'Gear Motor', value: 'Bonfiglioli/Wanshin/Bonvario/Panasonic', unit: 'make' },
    { label: 'Sensors', value: 'P&F/Contrinex', unit: 'make' },
    { label: 'Stitching Machine', value: 'Gabbar', unit: 'make' },
    { label: 'Control System', value: 'PLC based', unit: 'operation' }
  ]
};

const specifications = [
  { label: 'Model Configurations', value: 'Horizontal (H8) and Vertical (V8) models available' },
  { label: 'Pouch Capacity Range', value: '0.2 kg to 5 kg with precision handling' },
  { label: 'Bag Material', value: 'Durable HDPE bags for secondary packaging' },
  { label: 'Quality Assurance', value: 'Optional check weighers and metal detectors' },
  { label: 'Construction', value: 'Robust, industrial-grade for high-volume production' },
  { label: 'Operation Mode', value: 'Automated bulk pouch handling and collation' },
  { label: 'Integration', value: 'Seamless with primary packaging lines' },
  { label: 'Production Environment', value: 'High-volume, continuous operation' },
  { label: 'Control System', value: 'Advanced PLC with user-friendly interface' },
  { label: 'Industries Served', value: 'Food, spices, dairy, pharmaceuticals, FMCG, industrial goods' }
];

const certifications = ['ISO 9001:2015'];

export default function IBGH8V8Page() {
  return (
    <ProductDetailPage
      id="ibg-h8-v8"
      title="IBG-H8 & IBG-V8 Automatic Bagging Machines"
      description="At Infinity Automated Solutions, we specialize in automating bulk pouch handling with our Automatic Bagging Machines, available in horizontal (H8) and vertical (V8) models. Built for speed, accuracy, and seamless integration with primary packaging lines, these machines streamline your secondary packaging process by efficiently collating and packing pouches into durable HDPE bags. The IBG-H8 and IBG-V8 are designed to handle pouch sizes ranging from 0.2 kg to 5 kg. They can be equipped with optional check weighers and metal detectors to ensure the highest levels of quality assurance. With their robust construction and precise operation, these machines are ideal for high-volume production environments where consistency and efficiency are essential."
      features={features}
      models={models}
      applications={applications}
      category="pouch-baler"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098788/fycdkeggbzabb7ngmdje.jpg"
      slug="products/pouch-baler/ibg-h8-v8"
      videoId="bins8h_n1bU"
      videoIds={["bins8h_n1bU", "bins8h_n1bU"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 