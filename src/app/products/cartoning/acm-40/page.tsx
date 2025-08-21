import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Precision & Reliability',
    description: 'Advanced intermittent motion horizontal cartoning system designed for precision and reliability in folding carton applications',
    icon: '🎯'
  },
  {
    title: 'Gentle Carton Processing',
    description: 'Gently erects cartons from magazine and ensures accurate product insertion with premium handling capabilities',
    icon: '📦'
  },
  {
    title: 'Secure Sealing Options',
    description: 'Securely seals with either tuck or glue options making it ideal for high-quality folding carton applications',
    icon: '🔒'
  },
  {
    title: 'No Carton, No Product',
    description: 'Interlock features providing "no carton, no product" safeguard boosting operational efficiency while maintaining integrity',
    icon: '🛡️'
  },
  {
    title: 'Meticulous Validation',
    description: 'Each product meticulously validated using counters and check weighers ensuring only verified items are packed',
    icon: '✅'
  },
  {
    title: 'Ergonomic Design',
    description: 'Ergonomic, operator-friendly design with state-of-the-art control systems improving productivity and comfort',
    icon: '👥'
  }
];

const keyFeatures = [
  'Advanced intermittent motion horizontal cartoning system for precision and reliability',
  'Gently erects cartons from magazine ensuring perfect formation',
  'Accurate product insertion with premium handling capabilities',
  'Securely seals with either tuck or glue options for versatility',
  'Ideal for high-quality folding carton applications',
  'Interlock features providing "no carton, no product" safeguard',
  'Boosts operational efficiency while maintaining product integrity',
  'Paired with Infinity\'s superior product handling solutions',
  'Delivers exceptional results for premium product packaging',
  'Each product meticulously validated using counters and check weighers',
  'Ensures only verified items make it into shipper carton',
  'Optional product visualization during packaging process',
  'Ergonomic, operator-friendly design improving productivity and comfort',
  'State-of-the-art control systems with user-friendly HMI',
  'Reflects Infinity\'s dedication to unmatched quality and performance',
  'Exceptional value in secondary packaging automation'
];

const models = [
  {
    name: 'ACM-40 Semi Automatic Cartoning Machine',
    description: 'Advanced intermittent motion horizontal cartoning system designed for precision and reliability, ideal for high-quality folding carton applications with superior product handling.',
    features: [
      'Gently erects cartons from magazine ensuring perfect formation',
      'Ensures accurate product insertion with premium handling capabilities',
      'Securely seals with either tuck or glue options for versatility',
      'Interlock features providing "no carton, no product" safeguard',
      'Boosts operational efficiency while maintaining product integrity',
      'Paired with Infinity\'s superior product handling solutions',
      'Delivers exceptional results for premium product packaging',
      'Each product meticulously validated using counters and check weighers',
      'Ensures only verified items make it into shipper carton',
      'Optional product visualization during packaging process',
      'Ergonomic, operator-friendly design improving productivity and comfort',
      'State-of-the-art control systems with user-friendly HMI',
      'Reflects Infinity\'s dedication to unmatched quality and performance',
      'Advanced intermittent motion for precision positioning',
      'Ideal for high-quality folding carton applications',
      'Exceptional value in secondary packaging automation'
    ],
    specifications: [
      { label: 'Application', value: 'to pack single or multiple products into a carton' },
      { label: 'Product', value: 'pouch/tin/bottle/sachets etc from any VFFS or HFFS machine' },
      { label: 'Input speed', value: 'upto 40 products per minute' },
      { label: 'Max Output Speed', value: 'max 40 cartons/ min' },
      { label: 'Baling Capacity', value: 'NA' },
      { label: 'Packaging Material', value: 'Corrugated Carton boxes' },
      { label: 'Primary Pouch Flatenning', value: 'NA' },
      { label: 'Matrix formation', value: 'pneumatic pushers' },
      { label: 'Secondary bundle packing', value: 'NA' },
      { label: 'Unwinding', value: 'NA' },
      { label: 'Film pulling', value: 'NA' },
      { label: 'Film roll holding', value: 'NA' },
      { label: 'Sealing type', value: 'Glue applicator/ tuck in flap closing' },
      { label: 'Product Feeding', value: 'Automatic/Manually into product chain conveyor' },
      { label: 'Product Loading', value: 'horizontal with pneumatic pusher' },
      { label: 'Mode of Operation', value: 'All operations are Servo driven' },
      { label: 'HMI type', value: '10" touch colour screen with 50 recipe function' },
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
      { label: 'Optional Components (additional cost)', value: 'printer; lable applicator; scanner; carton overwrapper.' }
    ],
  }
];

const technicalData = {
  performance: [
    { label: 'Input Speed', value: '40', unit: 'products/min' },
    { label: 'Output Speed', value: '40', unit: 'cartons/min' },
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
  { label: 'Operation Type', value: 'Intermittent motion with servo-controlled positioning' },
  { label: 'Carton Erection', value: 'Gentle magazine-fed erection system' },
  { label: 'Product Feeding', value: 'Automatic/Manual modes with validation systems' },
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
  'Pharmaceutical Packaging',
  'Food & Beverage',
  'Cosmetics & Personal Care',
  'Consumer Goods',
  'Confectionery',
  'Healthcare Products',
  'Nutraceuticals',
  'Chemical Products',
  'Electronic Components',
  'Automotive Parts',
  'Household Items',
  'Retail Products'
];

const certifications = ['ISO 9001:2015'];

export default function ACM40Page() {
  return (
    <ProductDetailPage
      id="acm-40"
      title="ACM-40 Semi Automatic Cartoning Machine"
      subtitle="Advanced Intermittent Motion Horizontal Cartoning System"
      description="The Semi Automatic Cartoning Machine (ACM-40) from Infinity Automated Solutions is an advanced intermittent motion horizontal cartoning system designed for precision and reliability. It gently erects cartons from the magazine, ensures accurate product insertion, and securely seals them with either tuck or glue options, making it ideal for high-quality folding carton applications. With interlock features providing a 'no carton, no product' safeguard, the ACM-40 boosts operational efficiency while maintaining product integrity. When paired with Infinity's superior product handling solutions, it delivers exceptional results for premium product packaging. At the final stage, each product is meticulously validated using counters and check weighers, ensuring only verified items make it into the shipper carton. The ACM-40 also offers optional product visualization during packaging and features an ergonomic, operator-friendly design to improve productivity and comfort."
      features={features}
      models={models}
      applications={applications}
      category="cartoning"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098784/qhdjxx3v1xynhdhzrj1e.png"
      slug="products/cartoning/acm-40"
      videoId="9UTe_6E70Gs"
      videoIds={["9UTe_6E70Gs", "uU5H_GOv7tY"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 