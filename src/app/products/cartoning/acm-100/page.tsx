import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Cutting-Edge Technology',
    description: 'Advanced Continuous Motion Horizontal Cartoning System with cutting-edge technology for superior performance',
    icon: '⚡'
  },
  {
    title: 'Efficient Carton Processing',
    description: 'Efficiently erects cartons from magazine, precisely inserts products, and securely seals using tuck or glue options',
    icon: '📦'
  },
  {
    title: 'Speed, Precision & Reliability',
    description: 'Designed for speed, precision, and reliability delivering consistent high-quality packaging',
    icon: '🎯'
  },
  {
    title: 'No Carton, No Product',
    description: 'Interlock features ensure "no carton, no product" process guaranteeing accuracy and reducing wastage',
    icon: '🔒'
  },
  {
    title: 'Product Validation & Quality',
    description: 'Each product validated using counters and check weighers before final sealing ensuring only verified items are packed',
    icon: '✅'
  },
  {
    title: 'State-of-the-Art Control',
    description: 'State-of-the-art control systems with user-friendly HMI offering exceptional performance for high-volume operations',
    icon: '🖥️'
  }
];

const keyFeatures = [
  'Advanced Continuous Motion Horizontal Cartoning System with cutting-edge technology',
  'Efficiently erects cartons from magazine with precision and reliability',
  'Precisely inserts products and securely seals using tuck or glue options',
  'Designed for speed, precision, and reliability with consistent high-quality packaging',
  'Interlock features ensure "no carton, no product" process guaranteeing accuracy',
  'Reduces wastage through advanced quality control mechanisms',
  'Seamless integration with Infinity\'s product handling solutions',
  'Ideal for producing high-end products in folding cartons',
  'Optional product visualization during packaging for enhanced control',
  'Ergonomic operator-friendly design enhancing efficiency and usability',
  'Each product validated using counters and check weighers before sealing',
  'State-of-the-art control systems with user-friendly HMI interface',
  'Exceptional performance and value for high-volume packaging operations',
  'Wide range of applications across multiple industries',
  'Advanced servo-driven operations with motion control system',
  'Outstanding quality standards with comprehensive validation'
];

const models = [
  {
    name: 'ACM-100 Automatic Cartoning Machine',
    description: 'Advanced Continuous Motion Horizontal Cartoning System that brings cutting-edge technology to cartoning with speed, precision, and reliability.',
    features: [
      'Efficiently erects cartons from magazine with precision control',
      'Precisely inserts products with advanced automation technology',
      'Securely seals using either tuck or glue options for versatility',
      'Interlock features ensure "no carton, no product" process',
      'Guarantees accuracy and reduces wastage significantly',
      'Seamless integration with Infinity\'s product handling solutions',
      'Ideal for producing high-end products in folding cartons',
      'Optional product visualization during packaging process',
      'Ergonomic operator-friendly design enhancing usability',
      'Each product validated using counters and check weighers before sealing',
      'State-of-the-art control systems with user-friendly HMI',
      'Exceptional performance and value for high-volume packaging operations',
      'Advanced motion control system with servo-driven operations',
      'Continuous motion horizontal cartoning for maximum efficiency',
      'Outstanding quality standards with comprehensive validation',
      'Wide range of applications across multiple industries'
    ],
    specifications: [
      { label: 'Application', value: 'to pack single or multiple products into a carton' },
      { label: 'Product', value: 'pouch/tin/bottle/sachets etc from any VFFS or HFFS machine' },
      { label: 'Input speed', value: 'Upto 100 product per min' },
      { label: 'Max Output Speed', value: 'max 100 cartons/ min' },
      { label: 'Baling Capacity', value: 'NA' },
      { label: 'Packaging Material', value: 'Corrugated Carton boxes' },
      { label: 'Primary Pouch Flatenning', value: 'NA' },
      { label: 'Matrix formation', value: 'pneumatic pushers' },
      { label: 'Secondary bundle packing', value: 'NA' },
      { label: 'Unwinding', value: 'NA' },
      { label: 'Film pulling', value: 'NA' },
      { label: 'Film roll holding', value: 'NA' },
      { label: 'Sealing type', value: 'Glue applicator/ tuck in flap closing' },
      { label: 'Product Feeding', value: 'Automatic into product chain conveyor' },
      { label: 'Product Loading', value: 'horizontal with pneumatic pusher' },
      { label: 'Mode of Operation', value: 'All operations are Servo driven' },
      { label: 'HMI type', value: '7" touch screen with 50 recipe function' },
      { label: 'Carton magazine size', value: '100 Empty cartons' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'SS-304' },
      { label: 'Carton width Adjustment', value: 'NA' },
      { label: 'Matrix', value: 'NA' },
      { label: 'Gripper', value: 'vacuum/mechanical/pneumatic fingers' },
      { label: 'PLC, HMI, Drives, Servo Motors', value: 'Mitsubishi/ Trio make' },
      { label: 'Gear Motor', value: 'Bonfiglioly/ Wanshin/ bonvario/panasonic' },
      { label: 'Sensors', value: 'P&F/ contrinex' },
      { label: 'Belts', value: 'NA' },
      { label: 'Bearings', value: 'NA' },
      { label: 'Pneumatics', value: 'NA' },
      { label: 'Glue Applicator', value: 'Nordson/Baumer make' },
      { label: 'Machine Size', value: 'NA' },
      { label: 'Power Supply', value: '3 phase, 420 VAC, 50Hz' },
      { label: 'Electrical Consumption', value: '3.5 KW' },
      { label: 'Pneumatic Consumption', value: '6 CFM' },
      { label: 'Stitching machine', value: 'NA' },
      { label: 'System Components', value: 'product auto loader/feeder; Product chain conveyor; cartoning machine; carton magazine feeder; flap closing system(glue applicator/tuck in type).' },
      { label: 'Optional Components (additional cost)', value: 'printer; lable applicator; scanner; carton overwrapper.' },
      { label: 'Feature', value: 'Servo /PLC based' },
      { label: 'Feature', value: '10" touch colour screen with 50 recipe function' },
      { label: 'Feature', value: '- x000D' }
    ],
  }
];

const technicalData = {
  performance: [
    { label: 'Input Speed', value: '100', unit: 'products/min' },
    { label: 'Output Speed', value: '100', unit: 'cartons/min' },
    { label: 'Magazine Capacity', value: '100', unit: 'empty cartons' },
    { label: 'Operation Type', value: 'Servo driven', unit: 'all operations' }
  ],
  dimensions: [
    { label: 'Machine Size', value: 'Variable', unit: 'customizable' },
    { label: 'Carton Magazine', value: '100', unit: 'empty cartons' },
    { label: 'Matrix Formation', value: 'Pneumatic pushers', unit: 'system' }
  ],
  power: [
    { label: 'Power Required', value: '3.5', unit: 'KW' },
    { label: 'Voltage', value: '420V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Requirement', value: '6', unit: 'CFM' }
  ],
  components: [
    { label: 'PLC & HMI', value: 'Mitsubishi/Trio', unit: 'make' },
    { label: 'Gear Motor', value: 'Bonfiglioli/Wanshin/Bonvario/Panasonic', unit: 'make' },
    { label: 'Sensors', value: 'P&F/Contrinex', unit: 'make' },
    { label: 'Gripper', value: 'Vacuum/Mechanical/Pneumatic', unit: 'fingers' },
    { label: 'Glue Applicator', value: 'Nordson/Baumer', unit: 'make' }
  ]
};

const specifications = [
  { label: 'Carton Size Range', value: 'Min: 60×20×80mm, Max: 150×80×200mm (customizable)' },
  { label: 'Operation Type', value: 'Continuous motion with servo-controlled positioning' },
  { label: 'Carton Erection', value: 'Gentle magazine-fed erection system' },
  { label: 'Product Feeding', value: 'Automatic feeding with validation systems' },
  { label: 'Sealing Options', value: 'Tuck closure or hot-melt glue sealing' },
  { label: 'Control System', value: 'Advanced PLC with 7" color HMI touchscreen' },
  { label: 'Safety Features', value: '"No carton no product" interlock and emergency stops' },
  { label: 'Material Construction', value: 'MS powder-coated frame, SS304 contact parts' },
  { label: 'Connectivity', value: 'Ethernet, MODBUS, Inverter protocol support' },
  { label: 'Quality Control', value: 'Integrated counters, weigh checkers, product validation' },
  { label: 'Ergonomics', value: 'Outstanding operator-friendly design concept' },
  { label: 'Integration', value: 'Compatible with any primary machine manufacturer' }
];

const applications = [
  'Pharmaceutical Industry',
  'Food & Beverage',
  'Personal Care Products',
  'Cosmetics',
  'Confectionery',
  'Healthcare Products',
  'Consumer Goods',
  'Electronics Packaging',
  'Nutraceuticals',
  'Medical Devices'
];

const certifications = ['ISO 9001:2015'];

export default function ACM100Page() {
  return (
    <ProductDetailPage
      id="acm-100"
      title="ACM-100 Automatic Cartoning Machine"
      description="The Automatic Cartoning Machine (ACM-100) from Infinity Automated Solutions brings cutting-edge technology to cartoning. This advanced Continuous Motion Horizontal Cartoning System efficiently erects cartons from the magazine, precisely inserts products, and securely seals them using either tuck or glue options. Designed for speed, precision, and reliability, it delivers consistent high-quality packaging for a wide range of applications. Equipped with interlock features that ensure a 'no carton, no product' process, the ACM-100 guarantees accuracy and reduces wastage. Its seamless integration with Infinity's product handling solutions makes it ideal for producing high-end products in folding cartons. Optional product visualization during packaging and an ergonomic operator-friendly design further enhance efficiency and usability on the production floor. To maintain the highest quality, each product is validated using counters and check weighers before final sealing, ensuring only verified items are packed."
      features={features}
      models={models}
      applications={applications}
      category="cartoning"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098774/sqcbuioldiwnkfxjxo3l.png"
      slug="products/cartoning/acm-100"
      videoId="LctPdKacUgo"
      videoIds={["LctPdKacUgo", "zfNnHkl5QgxHUx9G"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 