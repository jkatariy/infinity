import { Metadata } from 'next';
import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Efficient Bundling',
    description: 'Designed for efficient bundling of single pouches weighing between 50g and 200g with streamlined packing process',
    icon: '⚡'
  },
  {
    title: 'Reduced Manual Intervention',
    description: 'Cuts down manpower requirements and boosts plant efficiency by automating pouch handling processes',
    icon: '🤖'
  },
  {
    title: 'Precise Bundling Capability',
    description: 'Ensures consistent output helping achieve higher productivity and better operational control',
    icon: '📦'
  },
  {
    title: 'Advanced Automation',
    description: 'Makes pouch handling faster, easier, and more organized with advanced secondary packaging solution',
    icon: '💻'
  },
  {
    title: 'Speed & Accuracy',
    description: 'Delivers speed, accuracy, and reliability in every bundle for optimal packaging performance',
    icon: '🎯'
  },
  {
    title: 'Industry Versatility',
    description: 'Ideal for industries handling FMCG, food & beverages, and other consumer goods packaging',
    icon: '🏭'
  }
];

const keyFeatures = [
  'Efficient bundling of single pouches weighing between 50g and 200g',
  'Advanced secondary packaging solution for streamlined packing process',
  'Significantly reduces manual intervention and manpower requirements',
  'Boosts plant efficiency with precise bundling capability',
  'Ensures consistent output for higher productivity and operational control',
  'Makes pouch handling faster, easier, and more organized',
  'Delivers speed, accuracy, and reliability in every bundle',
  'Ideal for FMCG, food & beverages, and consumer goods industries',
  'Advanced automation technology for modern packaging needs',
  'Customized solutions based on specific industry requirements',
  'User-friendly operation with minimal training requirements',
  'Robust construction for long-term reliability'
];

const models = [
  {
    name: 'IBP-120 High-Speed Secondary Packaging Machine',
    description: 'Designed for efficient bundling of single pouches weighing between 50g and 200g. This advanced secondary packaging solution streamlines your packing process, reducing manual intervention while boosting plant efficiency.',
    features: [
      'Designed for efficient bundling of single pouches weighing between 50g and 200g',
      'Advanced secondary packaging solution that streamlines packing process',
      'Reduces manual intervention, cutting down manpower requirements significantly',
      'Boosts plant efficiency with precise bundling capability and consistent output',
      'Makes pouch handling faster, easier, and more organized',
      'Delivers speed, accuracy, and reliability in every bundle produced',
      'Ideal for FMCG, food & beverages, and other consumer goods industries',
      'Helps achieve higher productivity and better operational control',
      'Advanced automation technology for modern packaging requirements',
      'Customized solutions based on specific client requirements',
      'User-friendly operation with minimal training needed',
      'Robust construction ensuring long-term reliability and performance',
      'Energy-efficient design with optimized power consumption',
      'Compact footprint suitable for various production floor layouts'
    ],
    specifications: [
      { label: 'Application', value: 'For stacking/bundling of primary pouches into a single pouch' },
      { label: 'Product', value: 'Single Pouches from any VFFS or HFFS machine' },
      { label: 'Input speed', value: 'Upto 120PPM (Depends on pouch sizes)' },
      { label: 'Max Output Speed', value: 'Upto 15 secondary packs per minute (product dependant)' },
      { label: 'Baling Capacity', value: 'NA' },
      { label: 'Packaging Material', value: 'Heat sealable laminated film/Bopp film above 35 micron' },
      { label: 'Primary Pouch Flatenning', value: 'Through sandwich conveyor for stable collation of pouches' },
      { label: 'Matrix formation', value: 'Dual servo high speed race track collator with servo pusher' },
      { label: 'Secondary bundle packing', value: 'Inverted flow wrapper' },
      { label: 'Unwinding', value: 'Motorized film Unwinding' },
      { label: 'Film pulling', value: 'Servo driven paper pulling system' },
      { label: 'Film roll holding', value: 'Pneumatic shaft film roll holding for quick change over' },
      { label: 'Sealing type', value: 'Center seal type pouch (Continuous heating sealer jaws with PID temp controller)' },
      { label: 'Product Feeding', value: 'Automatic from primary machine' },
      { label: 'Product Loading', value: 'horizontal loading of matrix with pneumatic pusher' },
      { label: 'Mode of Operation', value: 'motion controller based' },
      { label: 'HMI type', value: '7" touch screen with 50 recipe function' },
      { label: 'Carton magazine size', value: 'NA' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'MS powder coated (can be SS -304 if required)' },
      { label: 'Carton width Adjustment', value: 'NA' },
      { label: 'Matrix', value: 'Desired Matix formation' },
      { label: 'Gripper', value: 'NA' },
      { label: 'PLC, HMI, Drives, Servo Motors', value: 'Mitsubishi/ Trio make' },
      { label: 'Gear Motor', value: 'Bonfiglioly/ Wanshin/ bonvario/panasonic' },
      { label: 'Sensors', value: 'P&F/ contrinex' },
      { label: 'Belts', value: 'PU/PVC Fransteck make Belts' },
      { label: 'Bearings', value: 'SKF, HCS make (Special purpose bearings in dairy plants)' },
      { label: 'Pneumatics', value: 'Festo/SMC' },
      { label: 'Glue Applicator', value: 'NA' },
      { label: 'Machine Size', value: '5600L x 1600W' },
      { label: 'Power Supply', value: '3 phase, 420 VAC, 50Hz' },
      { label: 'Electrical Consumption', value: '4.5 KW' },
      { label: 'Pneumatic Consumption', value: '5 CFM' },
      { label: 'Stitching machine', value: 'NA' },
      { label: 'System Components', value: 'Take up Sandwitch conveyor (Pouch flatening); High speed conveyor; Dual servo high speed race track collator with servo pusher; Inverted Horizontal Flow wrap machine; Safety and guarding.' },
      { label: 'Optional Components (additional cost)', value: 'Primary check weigher and rejector; Secondary check weigher and rejector; Change part for extra variant; Safety guarding as per required safety category.' },
      { label: 'Feature', value: 'Advanced motion controller base system with four servo drives' },
      { label: 'Feature', value: 'Multi-level user login with password Protection' },
      { label: 'Feature', value: 'Production Data Report Generation' },
      { label: 'Feature', value: 'Connectivity through Ethernet / MODBUS protocol' },
      { label: 'Feature', value: 'High-Speed, Accurate & Precise Servo driven system' },
      { label: 'Feature', value: 'Tower lamp to identify machine status' },
      { label: 'Feature', value: 'Easy product setup & changeovers' },
      { label: 'Feature', value: 'Can hookup with any VFFS or HFSS seamlessly' }
    ],
  }
];

const technicalData = {
  performance: [
    { label: 'Input Speed', value: '120', unit: 'PPM' },
    { label: 'Max Output Speed', value: '15', unit: 'secondary packs/min' },
    { label: 'Matrix Formation', value: 'Dual servo high speed', unit: 'race track collator' }
  ],
  dimensions: [
    { label: 'Length', value: '5600', unit: 'mm' },
    { label: 'Width', value: '1600', unit: 'mm' },
    { label: 'Footprint', value: 'Compact design', unit: 'for efficient production' }
  ],
  power: [
    { label: 'Power Required', value: '4.5', unit: 'kW' },
    { label: 'Voltage', value: '420V AC', unit: '3 Phase' },
    { label: 'Frequency', value: '50', unit: 'Hz' },
    { label: 'Air Requirement', value: '5', unit: 'CFM' }
  ],
  components: [
    { label: 'PLC & HMI', value: 'Mitsubishi/Trio', unit: 'make' },
    { label: 'Gear Motor', value: 'Bonfiglioli / Wanshin / Bonvario / Panasonic', unit: 'make' },
    { label: 'Sensors', value: 'P&F / Contrinex', unit: 'make' },
    { label: 'Belts', value: 'PU/PVC Fransteck', unit: 'make' },
    { label: 'Bearings', value: 'SKF, HCS', unit: 'make (Special purpose bearings)' },
    { label: 'Pneumatics', value: 'Festo/SMC', unit: 'make' }
  ]
};

const specifications = [
  { label: 'Packaging Material', value: 'Heat sealable laminated film/Bopp film above 35 micron' },
  { label: 'Pouch Flattening', value: 'Through sandwich conveyor for stable collation of pouches' },
  { label: 'Matrix Formation', value: 'Dual servo high speed race track collator with servo pusher' },
  { label: 'Bundle Packing', value: 'Inverted flow wrapper' },
  { label: 'Film Unwinding', value: 'Motorized film Unwinding' },
  { label: 'Film Pulling', value: 'Servo driven paper pulling system' },
  { label: 'Film Roll Holding', value: 'Pneumatic shaft film roll holding for quick change over' },
  { label: 'Sealing Type', value: 'Center seal type pouch (Continuous heating sealer jaws with PID temp controller)' },
  { label: 'Product Feeding', value: 'Automatic from primary machine' },
  { label: 'Product Loading', value: 'horizontal loading of matrix with pneumatic pusher' },
  { label: 'Operation Mode', value: 'motion controller based' },
  { label: 'HMI Interface', value: '7" touch screen with 50 recipe function' },
  { label: 'Contact Parts MOC', value: 'SS-304' },
  { label: 'Non-Contact Parts MOC', value: 'MS powder coated (can be SS -304 if required)' },
  { label: 'Matrix Formation', value: 'Desired Matix formation' },
  { label: 'Integration', value: 'Can hookup with any VFFS or HFSS seamlessly' }
];

const applications = [
  'FMCG Products',
  'Food & Beverages',
  'Consumer Goods',
  'Snack Foods',
  'Tea & Coffee',
  'Spices & Seasonings',
  'Biscuits & Confectionery',
  'Ready-to-eat Meals',
  'Personal Care Products',
  'Household Products',
  'Pharmaceutical Packaging',
  'Dairy Products'
];

const certifications = ['ISO 9001:2015'];

export const metadata: Metadata = {
  title: 'IBP-120 Secondary Packaging Machine | Infinity Automated Solutions',
  description: 'IBP-120 high-speed bundling machine for single pouches (50g-200g). Advanced secondary packaging solution with dual servo technology, reducing manual intervention and boosting efficiency for FMCG, food & beverage industries.',
  keywords: 'IBP-120, secondary packaging, bundling machine, pouch packaging, FMCG automation, dual servo, high-speed packaging, Infinity Automated Solutions',
  openGraph: {
    title: 'IBP-120 Secondary Packaging Machine | Infinity Automated Solutions',
    description: 'Advanced secondary packaging solution for efficient bundling of single pouches (50g-200g). High-speed system with dual servo technology for FMCG and food & beverage industries.',
    images: [
      {
        url: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098775/hjmnoiqzl3fosroitm4q.png',
        width: 1200,
        height: 630,
        alt: 'IBP-120 Secondary Packaging Machine for Pouch Bundling',
      },
    ],
    url: 'https://infinitysols.com/products/bundling-wrapping/ibp-120',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IBP-120 Secondary Packaging Machine | Infinity Automated Solutions',
    description: 'Advanced secondary packaging solution for efficient bundling of single pouches (50g-200g). High-speed system with dual servo technology.',
    images: ['https://res.cloudinary.com/dbogkgabu/image/upload/v1755098775/hjmnoiqzl3fosroitm4q.png'],
  },
  alternates: {
    canonical: 'https://infinitysols.com/products/bundling-wrapping/ibp-120',
  },
};

export default function IBP120Page() {
  return (
    <ProductDetailPage
      id="ibp-120"
      title="IBP-120 Bundling Machine"
      description="The IBP-120 is an advanced secondary packaging solution designed for efficient bundling of single pouches (50g-200g). This high-speed system streamlines pouch handling with precise bundling capabilities, reducing manual intervention while boosting plant efficiency. Perfect for FMCG, food & beverage industries, it delivers consistent output with dual servo technology and motion controller-based operation."
      features={features}
      models={models}
      applications={applications}
      category="bundling-wrapping"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098775/hjmnoiqzl3fosroitm4q.png"
      slug="products/bundling-wrapping/ibp-120"
      videoId="DU1sl2XI6Jg"
      videoIds={["DU1sl2XI6Jg", "70d9CgXcvTM"]}
      specifications={specifications}
      keyFeatures={keyFeatures}
      technicalData={technicalData}
      certifications={certifications}
    />
  );
} 