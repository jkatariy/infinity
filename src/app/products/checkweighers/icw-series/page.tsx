'use client';

import { useState } from 'react';
import ProductDetailPage from '@/components/ProductDetailPage';

const features = [
  {
    title: 'Complete Range Coverage',
    description: 'Comprehensive series from 50g to 50kg capacity covering all industrial applications',
    icon: '⚖️'
  },
  {
    title: 'High Precision Weighing',
    description: 'Industry-leading accuracy from ±0.5g to ±50g depending on model and weight range',
    icon: '🎯'
  },
  {
    title: 'Advanced PLC Control',
    description: 'Sophisticated PLC-based control system with 100 product memory and USB connectivity',
    icon: '🔧'
  },
  {
    title: 'Multiple Rejection Systems',
    description: 'Versatile rejection options: Diverter, Pusher, Air blower, and Skid plate systems',
    icon: '🚫'
  },
  {
    title: 'Bi-directional Operation',
    description: 'Flexible installation with left to right or right to left conveyor direction',
    icon: '🔄'
  },
  {
    title: 'Industrial Integration',
    description: 'Seamless integration with existing production lines and interlocks with other machines',
    icon: '🏭'
  }
];

const icwModels = {
  'ICW-600': {
    name: 'ICW-600 Light Duty Checkweigher',
    description: 'Compact checkweigher for light products up to 600g with high accuracy requirements and speeds up to 120 PPM.',
    weighingRange: '50 gm to 600 gm',
    accuracy: '+/- 0.5 gm',
    speed: 'up to 120 PPM',
    specifications: [
      { label: 'Weighing Range', value: '50 gm to 600 gm' },
      { label: 'Weighing Accuracy', value: '+/- 0.5 gm' },
      { label: 'Speed', value: 'up to 120 PPM' },
      { label: 'Direction', value: 'Left to right or right to left' },
      { label: 'Rejection Type', value: 'Underweight or overweight rejection with Diverter/ Pusher/ Air blower/ Skid plate' },
      { label: 'Power required', value: '1 Phase 230V AC/ 50 Hz/ 300 VA' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'MS Powder Coated (can be SS-304)' },
      { label: 'Weighing sensor', value: 'scaime /Essae make Load Cell' },
      { label: 'Bearings', value: 'SKF, HCH make' },
      { label: 'Mode of operation', value: 'PLC based' },
      { label: 'Sensors', value: 'P&F, Continex, Autonics, Wangler make' },
      { label: 'Additional Features', value: 'Advanced PLC based control system; 100 product memory (via USB); Helpful graphical user interface; Printer interface; Multi-level user ID and password; Inbuilt report generation; Data sharing via USB or Ethernet; Net weight display; Statistical data available; Tendency control available; Easy height adjustment for conveyor line; Integration with existing production lines; Interlocks with other machines; Wide operating temperature range (0-40°C); Heavy-duty components and high-quality electronics.' }
    ],
    technicalData: {
      performance: [
        { label: 'Processing Speed', value: '120', unit: 'PPM' },
        { label: 'Weighing Accuracy', value: '±0.5', unit: 'gm' },
        { label: 'Weight Range', value: '50-600', unit: 'gm' },
        { label: 'Throughput Rate', value: '99.8', unit: '% efficiency' }
      ],
      dimensions: [
        { label: 'Length', value: '1800', unit: 'mm' },
        { label: 'Width', value: '800', unit: 'mm' },
        { label: 'Height', value: '1200', unit: 'mm' },
        { label: 'Net Weight', value: '200', unit: 'kg' }
      ],
      power: [
        { label: 'Power Consumption', value: '300', unit: 'VA' },
        { label: 'Voltage', value: '230V AC', unit: '1 Phase' },
        { label: 'Frequency', value: '50', unit: 'Hz' },
        { label: 'Protection Rating', value: 'IP54', unit: '' }
      ]
    }
  },
  'ICW-1200': {
    name: 'ICW-1200 Standard Checkweigher',
    description: 'Versatile checkweigher for medium-weight products from 600g to 1200g with speeds up to 80 PPM.',
    weighingRange: '600 gm to 1200 gm',
    accuracy: '+/- 1 gm',
    speed: 'Up to 80 PPM',
    specifications: [
      { label: 'Weighing Range', value: '600 gm to 1200 gm' },
      { label: 'Weighing Accuracy', value: '+/- 1 gm' },
      { label: 'Speed', value: 'Up to 80 PPM' },
      { label: 'Direction', value: 'Left to right or right to left' },
      { label: 'Rejection Type', value: 'Underweight or overweight rejection with Diverter/ Pusher/ Air blower/ Skid plate' },
      { label: 'Power required', value: '1 Phase 230V AC/ 50 Hz/ 300 VA' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'MS Powder Coated (can be SS-304)' },
      { label: 'Weighing sensor', value: 'scaime /Essae make Load Cell' },
      { label: 'Bearings', value: 'SKF, HCH make' },
      { label: 'Mode of operation', value: 'PLC based' },
      { label: 'Sensors', value: 'P&F, Continex, Autonics, Wangler make' },
      { label: 'Additional Features', value: 'Advanced PLC based control system; 100 product memory (via USB); Helpful graphical user interface; Printer interface; Multi-level user ID and password; Inbuilt report generation; Data sharing via USB or Ethernet; Net weight display; Statistical data available; Tendency control available; Easy height adjustment for conveyor line; Integration with existing production lines; Interlocks with other machines; Wide operating temperature range (0-40°C); Heavy-duty components and high-quality electronics.' }
    ],
    technicalData: {
      performance: [
        { label: 'Processing Speed', value: '80', unit: 'PPM' },
        { label: 'Weighing Accuracy', value: '±1', unit: 'gm' },
        { label: 'Weight Range', value: '600-1200', unit: 'gm' },
        { label: 'Throughput Rate', value: '99.7', unit: '% efficiency' }
      ],
      dimensions: [
        { label: 'Length', value: '2000', unit: 'mm' },
        { label: 'Width', value: '900', unit: 'mm' },
        { label: 'Height', value: '1300', unit: 'mm' },
        { label: 'Net Weight', value: '250', unit: 'kg' }
      ],
      power: [
        { label: 'Power Consumption', value: '300', unit: 'VA' },
        { label: 'Voltage', value: '230V AC', unit: '1 Phase' },
        { label: 'Frequency', value: '50', unit: 'Hz' },
        { label: 'Protection Rating', value: 'IP54', unit: '' }
      ]
    }
  },
  'ICW-6000': {
    name: 'ICW-6000 Medium Duty Checkweigher',
    description: 'Medium duty checkweigher for products from 1200g to 6kg with speeds up to 30 PPM.',
    weighingRange: '1200 gm to 6 kg',
    accuracy: '+/- 5 gm',
    speed: 'Up to 30 PPM',
    specifications: [
      { label: 'Weighing Range', value: '1200 gm to 6 kg' },
      { label: 'Weighing Accuracy', value: '+/- 5 gm' },
      { label: 'Speed', value: 'Up to 30 PPM' },
      { label: 'Direction', value: 'Left to right or right to left' },
      { label: 'Rejection Type', value: 'Underweight or overweight rejection with Diverter/ Pusher/ Air blower/ Skid plate' },
      { label: 'Power required', value: '1 Phase 230V AC/ 50 Hz/ 300 VA' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'MS Powder Coated (can be SS-304)' },
      { label: 'Weighing sensor', value: 'scaime /Essae make Load Cell' },
      { label: 'Bearings', value: 'SKF, HCH make' },
      { label: 'Mode of operation', value: 'PLC based' },
      { label: 'Sensors', value: 'P&F, Continex, Autonics, Wangler make' },
      { label: 'Additional Features', value: 'Advanced PLC based control system; 100 product memory (via USB); Helpful graphical user interface; Printer interface; Multi-level user ID and password; Inbuilt report generation; Data sharing via USB or Ethernet; Net weight display; Statistical data available; Tendency control available; Easy height adjustment for conveyor line; Integration with existing production lines; Interlocks with other machines; Wide operating temperature range (0-40°C); Heavy-duty components and high-quality electronics.' }
    ],
    technicalData: {
      performance: [
        { label: 'Processing Speed', value: '30', unit: 'PPM' },
        { label: 'Weighing Accuracy', value: '±5', unit: 'gm' },
        { label: 'Weight Range', value: '1200-6000', unit: 'gm' },
        { label: 'Throughput Rate', value: '99.5', unit: '% efficiency' }
      ],
      dimensions: [
        { label: 'Length', value: '2400', unit: 'mm' },
        { label: 'Width', value: '1000', unit: 'mm' },
        { label: 'Height', value: '1400', unit: 'mm' },
        { label: 'Net Weight', value: '350', unit: 'kg' }
      ],
      power: [
        { label: 'Power Consumption', value: '300', unit: 'VA' },
        { label: 'Voltage', value: '230V AC', unit: '1 Phase' },
        { label: 'Frequency', value: '50', unit: 'Hz' },
        { label: 'Protection Rating', value: 'IP54', unit: '' }
      ]
    }
  },
  'ICW-25K': {
    name: 'ICW-25K Heavy Duty Checkweigher',
    description: 'Heavy industrial checkweigher for products from 6kg to 25kg with speeds up to 10 PPM.',
    weighingRange: '6 kg to 25 kg',
    accuracy: '+/- 25 gm',
    speed: 'Up to 10 PPM',
    specifications: [
      { label: 'Weighing Range', value: '6 kg to 25 kg' },
      { label: 'Weighing Accuracy', value: '+/- 25 gm' },
      { label: 'Speed', value: 'Up to 10 PPM' },
      { label: 'Direction', value: 'Left to right or right to left' },
      { label: 'Rejection Type', value: 'Underweight or overweight rejection with Diverter/ Pusher/ Air blower/ Skid plate' },
      { label: 'Power required', value: '1 Phase 230V AC/ 50 Hz/ 300 VA' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'MS Powder Coated (can be SS-304)' },
      { label: 'Weighing sensor', value: 'scaime /Essae make Load Cell' },
      { label: 'Bearings', value: 'SKF, HCH make' },
      { label: 'Mode of operation', value: 'PLC based' },
      { label: 'Sensors', value: 'P&F, Continex, Autonics, Wangler make' },
      { label: 'Additional Features', value: 'Advanced PLC based control system; 100 product memory (via USB); Helpful graphical user interface; Printer interface; Multi-level user ID and password; Inbuilt report generation; Data sharing via USB or Ethernet; Net weight display; Statistical data available; Tendency control available; Easy height adjustment for conveyor line; Integration with existing production lines; Interlocks with other machines; Wide operating temperature range (0-40°C); Heavy-duty components and high-quality electronics.' }
    ],
    technicalData: {
      performance: [
        { label: 'Processing Speed', value: '10', unit: 'PPM' },
        { label: 'Weighing Accuracy', value: '±25', unit: 'gm' },
        { label: 'Weight Range', value: '6000-25000', unit: 'gm' },
        { label: 'Throughput Rate', value: '99.5', unit: '% efficiency' }
      ],
      dimensions: [
        { label: 'Length', value: '2800', unit: 'mm' },
        { label: 'Width', value: '1000', unit: 'mm' },
        { label: 'Height', value: '1500', unit: 'mm' },
        { label: 'Net Weight', value: '500', unit: 'kg' }
      ],
      power: [
        { label: 'Power Consumption', value: '300', unit: 'VA' },
        { label: 'Voltage', value: '230V AC', unit: '1 Phase' },
        { label: 'Frequency', value: '50', unit: 'Hz' },
        { label: 'Protection Rating', value: 'IP54', unit: '' }
      ]
    }
  },
  'ICW-50K': {
    name: 'ICW-50K Extra Heavy Duty Checkweigher',
    description: 'Extra heavy industrial checkweigher for products from 25kg to 50kg with speeds up to 10 PPM.',
    weighingRange: '25 kg to 50 kg',
    accuracy: '+/- 50 gm',
    speed: 'Up to 10 PPM',
    specifications: [
      { label: 'Weighing Range', value: '25 kg to 50 kg' },
      { label: 'Weighing Accuracy', value: '+/- 50 gm' },
      { label: 'Speed', value: 'Up to 10 PPM' },
      { label: 'Direction', value: 'Left to right or right to left' },
      { label: 'Rejection Type', value: 'Underweight or overweight rejection with Diverter/ Pusher/ Air blower/ Skid plate' },
      { label: 'Power required', value: '1 Phase 230V AC/ 50 Hz/ 300 VA' },
      { label: 'Contact parts', value: 'SS-304' },
      { label: 'Non-contact parts', value: 'MS Powder Coated (can be SS-304)' },
      { label: 'Weighing sensor', value: 'scaime /Essae make Load Cell' },
      { label: 'Bearings', value: 'SKF, HCH make' },
      { label: 'Mode of operation', value: 'PLC based' },
      { label: 'Sensors', value: 'P&F, Continex, Autonics, Wangler make' },
      { label: 'Additional Features', value: 'Advanced PLC based control system; 100 product memory (via USB); Helpful graphical user interface; Printer interface; Multi-level user ID and password; Inbuilt report generation; Data sharing via USB or Ethernet; Net weight display; Statistical data available; Tendency control available; Easy height adjustment for conveyor line; Integration with existing production lines; Interlocks with other machines; Wide operating temperature range (0-40°C); Heavy-duty components and high-quality electronics.' }
    ],
    technicalData: {
      performance: [
        { label: 'Processing Speed', value: '10', unit: 'PPM' },
        { label: 'Weighing Accuracy', value: '±50', unit: 'gm' },
        { label: 'Weight Range', value: '25000-50000', unit: 'gm' },
        { label: 'Throughput Rate', value: '99.0', unit: '% efficiency' }
      ],
      dimensions: [
        { label: 'Length', value: '3200', unit: 'mm' },
        { label: 'Width', value: '1200', unit: 'mm' },
        { label: 'Height', value: '1600', unit: 'mm' },
        { label: 'Net Weight', value: '700', unit: 'kg' }
      ],
      power: [
        { label: 'Power Consumption', value: '300', unit: 'VA' },
        { label: 'Voltage', value: '230V AC', unit: '1 Phase' },
        { label: 'Frequency', value: '50', unit: 'Hz' },
        { label: 'Protection Rating', value: 'IP54', unit: '' }
      ]
    }
  }
};

const keyFeatures = [
  'Complete series covering 50g to 50kg capacity range for all industrial applications',
  'High precision weighing with accuracy from ±0.5g to ±50g depending on model',
  'Advanced PLC based control system with 100 product memory via USB',
  'Multiple rejection systems: Diverter, Pusher, Air blower, and Skid plate options',
  'Bi-directional operation: Left to right or right to left conveyor direction',
  'Premium components: Scaime/Essae load cells, SKF/HCH bearings',
  'Comprehensive HMI with graphical user interface and printer interface',
  'Multi-level user ID and password protection for security',
  'Inbuilt report generation and statistical data analysis',
  'Data sharing capabilities via USB or Ethernet connectivity',
  'Easy height adjustment for conveyor line integration',
  'Wide operating temperature range (0-40°C) for various environments',
  'Integration ready with existing production lines and machine interlocks',
  'Heavy-duty components and high-quality electronics for reliability'
];

const applications = [
  'Food Processing & Packaging',
  'Pharmaceutical Manufacturing',
  'Chemical Industry',
  'Personal Care Products',
  'Dairy & Beverages',
  'Snack Foods & Confectionery',
  'Pet Food Production',
  'Industrial Manufacturing',
  'Quality Control Systems',
  'Compliance Verification',
  'Production Line Integration',
  'Automated Packaging Lines'
];

const certifications = ['ISO 9001:2015'];

// Create a dynamic model structure for ProductDetailPage
function ICWSeriesPage() {
  const [selectedModel, setSelectedModel] = useState('ICW-600');
  const currentModel = icwModels[selectedModel as keyof typeof icwModels];

  const models = [
    {
      name: currentModel.name,
      description: currentModel.description,
      features: [
        `Weighing Range: ${currentModel.weighingRange}`,
        `Weighing Accuracy: ${currentModel.accuracy}`,
        `Processing Speed: ${currentModel.speed}`,
        'Bi-directional operation capability',
        'Multiple rejection system options',
        'Advanced PLC based control system',
        '100 product memory via USB',
        'Graphical user interface',
        'Multi-level user ID and password',
        'Inbuilt report generation',
        'Data sharing via USB or Ethernet',
        'Statistical data analysis',
        'Easy height adjustment',
        'Production line integration ready'
      ],
      specifications: currentModel.specifications,
    }
  ];

  return (
    <ProductDetailPage
      id="icw-series"
      title="ICW Series Checkweighers"
      description="The ICW series offers a comprehensive range of dynamic checkweighers from light-duty precision units to extra heavy industrial systems. With capacities from 50g to 50kg and industry-leading accuracy, these PLC-based checkweighers ensure quality control and compliance across all manufacturing sectors. Each model features advanced control systems, multiple rejection options, and seamless production line integration capabilities."
      features={features}
      models={models}
      applications={applications}
      category="checkweighers"
      image="https://res.cloudinary.com/dbogkgabu/image/upload/v1755098786/kqahbwtwb9qj0s89rrpq.png"
      slug="products/checkweighers/icw-series"
      videoId="AcGw5jiQwa4"
      specifications={currentModel.specifications}
      keyFeatures={keyFeatures}
      technicalData={currentModel.technicalData}
      certifications={certifications}
      modelSelector={{
        selectedModel,
        setSelectedModel,
        models: icwModels,
        currentModel
      }}
    />
  );
}

export default ICWSeriesPage;