import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Vertical Material Transfer',
    description: 'Efficient solution for vertical material transfer (up and down automatically)',
    icon: '⬆️'
  },
  {
    title: 'High Speed Operation',
    description: 'Handles up to 50 crates per minute with maximum box weight up to 30 Kg',
    icon: '⚡'
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
    name: 'Box Lifter',
    description: 'Efficient vertical material transfer solution for automatic up and down movement of boxes.',
    features: [
      'Efficient solution for vertical material transfer (up and down automatically)',
      'Handles up to 50 crates per minute',
      'Maximum box weight up to 30 Kg',
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
      { label: 'Overall System Dimensions', value: '3510mm L × 1430mm W × up to 12 meter height' },
      { label: 'Discharge Height', value: 'up to 12 meter' },
      { label: 'Speed', value: 'Up to 50 crates/min' },
      { label: 'Max Box Weight', value: 'Up to 30 Kg' },
      { label: 'MOC', value: 'SS/MS powder coated' },
      { label: 'Power Required', value: '3 Phase 440V AC / 50 Hz / 10 KW' },
      { label: 'Usage/Application', value: 'FOOD, SPICES, DAIRY, PHARMA, ICE CREAM, COLD STORAGE, AND WAREHOUSES' }
    ],
  }
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

export default function BoxLifterPage() {
  return (
    <ProductDetailPage
      id="box-lifter"
      title="Box Lifter"
      description="The Box Lifter is an efficient solution for vertical material transfer, providing automatic up and down movement of boxes at high speeds. With a capacity of up to 50 crates per minute and maximum box weight up to 30 Kg, it features discharge height up to 12 meters. Built with SS/MS powder coated construction and powered by a 3 Phase 440V AC / 50 Hz / 10 KW system, it ensures reliable operation for food, spices, dairy, pharmaceutical, and warehouse applications."
      features={features}
      models={models}
      applications={applications}
      category="Conveying Solutions"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755178596/lofywz27dqkb595tfhkd.png"
      slug="box-lifter"
      videoId="tMLaXUY9cJk"
      videoIds={["tMLaXUY9cJk", "BPVQxTkLoZM"]}
    />
  );
} 