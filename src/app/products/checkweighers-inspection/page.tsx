'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';

// TypeScript interfaces for type safety
interface CheckweigherModel {
  key: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  weighingRange: string;
  accuracy: string;
  speed: string;
}

interface InspectionModel {
  key: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  resolution: string;
  speed: string;
  accuracy: string;
}

type Model = CheckweigherModel | InspectionModel;

// Type for technical specifications
type TechnicalSpecifications = {
  [key: string]: {
    name: string;
    specifications: { label: string; value: string; }[];
    technicalData: {
      performance: { label: string; value: string; unit: string; }[];
      dimensions: { label: string; value: string; unit: string; }[];
      power: { label: string; value: string; unit: string; }[];
    };
  };
};

const categoryColors = {
  accent: '#DC2626',
  light: '#FEF2F2',
  medium: '#FECACA'
};

const checkweigherModels: CheckweigherModel[] = [
  {
    key: 'icw-600',
    name: 'ICW-600',
    subtitle: 'Light Duty Checkweigher',
    description: 'Compact checkweigher for light products up to 600g with high accuracy requirements and speeds up to 120 PPM.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png',
    weighingRange: '50 gm to 600 gm',
    accuracy: '+/- 0.5 gm',
    speed: 'up to 120 PPM'
  },
  {
    key: 'icw-1200',
    name: 'ICW-1200',
    subtitle: 'Standard Checkweigher',
    description: 'Versatile checkweigher for medium-weight products from 600g to 1200g with speeds up to 80 PPM.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png',
    weighingRange: '600 gm to 1200 gm',
    accuracy: '+/- 1 gm',
    speed: 'Up to 80 PPM'
  },
  {
    key: 'icw-6000',
    name: 'ICW-6000',
    subtitle: 'Heavy Duty Checkweigher',
    description: 'Heavy-duty checkweigher for products up to 6000 grams with robust construction and industrial reliability.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png',
    weighingRange: '1200 gm to 6 kg',
    accuracy: '+/- 5 gm',
    speed: 'Up to 30 PPM'
  },
  {
    key: 'icw-25k',
    name: 'ICW-25K',
    subtitle: 'Industrial Checkweigher',
    description: 'Heavy industrial checkweigher for products up to 25 kg with robust construction for demanding environments.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png',
    weighingRange: '6 kg to 25 kg',
    accuracy: '+/- 25 gm',
    speed: 'Up to 10 PPM'
  },
  {
    key: 'icw-50k',
    name: 'ICW-50K',
    subtitle: 'Extra Heavy Industrial Checkweigher',
    description: 'Extra heavy industrial checkweigher for products up to 50 kg with ultra-robust construction.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png',
    weighingRange: '25 kg to 50 kg',
    accuracy: '+/- 50 gm',
    speed: 'Up to 10 PPM'
  }
];

const inspectionModels: InspectionModel[] = [
  {
    key: 'vision-pro',
    name: 'Vision Pro Standard',
    subtitle: 'Advanced Vision Inspection System',
    description: 'High-resolution vision inspection system for comprehensive quality control with AI-powered detection.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098783/eyabelg0f9lzx5kl5hms.png',
    resolution: 'Up to 12MP',
    speed: 'Up to 600 ppm',
    accuracy: '99.9%'
  },
  {
    key: 'vision-compact',
    name: 'Vision Compact',
    subtitle: 'Compact Vision System',
    description: 'Compact vision system for basic inspection applications with space-saving design and easy setup.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098783/eyabelg0f9lzx5kl5hms.png',
    resolution: 'Up to 5MP',
    speed: 'Up to 300 ppm',
    accuracy: '99.5%'
  }
];

const allModels: Model[] = [...checkweigherModels, ...inspectionModels];

const technicalSpecifications: TechnicalSpecifications = {
  'icw-600': {
    name: 'ICW-600 Light Duty Checkweigher',
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
        { label: 'Throughput Rate', value: '99.9', unit: '% efficiency' }
      ],
      dimensions: [
        { label: 'Length', value: '1500', unit: 'mm' },
        { label: 'Width', value: '600', unit: 'mm' },
        { label: 'Height', value: '1200', unit: 'mm' },
        { label: 'Net Weight', value: '150', unit: 'kg' }
      ],
      power: [
        { label: 'Power Consumption', value: '300', unit: 'VA' },
        { label: 'Voltage', value: '230V AC', unit: '1 Phase' },
        { label: 'Frequency', value: '50', unit: 'Hz' },
        { label: 'Protection Rating', value: 'IP54', unit: '' }
      ]
    }
  },
  'icw-1200': {
    name: 'ICW-1200 Standard Checkweigher',
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
        { label: 'Weight Range', value: '10-1200', unit: 'gm' },
        { label: 'Throughput Rate', value: '99.8', unit: '% efficiency' }
      ],
      dimensions: [
        { label: 'Length', value: '1800', unit: 'mm' },
        { label: 'Width', value: '700', unit: 'mm' },
        { label: 'Height', value: '1300', unit: 'mm' },
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
  'icw-6000': {
    name: 'ICW-6000 Heavy Duty Checkweigher',
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
        { label: 'Length', value: '2000', unit: 'mm' },
        { label: 'Width', value: '800', unit: 'mm' },
        { label: 'Height', value: '1500', unit: 'mm' },
        { label: 'Net Weight', value: '300', unit: 'kg' }
      ],
      power: [
        { label: 'Power Consumption', value: '300', unit: 'VA' },
        { label: 'Voltage', value: '230V AC', unit: '1 Phase' },
        { label: 'Frequency', value: '50', unit: 'Hz' },
        { label: 'Protection Rating', value: 'IP54', unit: '' }
      ]
    }
  },
  'icw-25k': {
    name: 'ICW-25K Industrial Checkweigher',
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
        { label: 'Weight Range', value: '6-25', unit: 'kg' },
        { label: 'Throughput Rate', value: '99.0', unit: '% efficiency' }
      ],
      dimensions: [
        { label: 'Length', value: '2500', unit: 'mm' },
        { label: 'Width', value: '1000', unit: 'mm' },
        { label: 'Height', value: '1800', unit: 'mm' },
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
  'icw-50k': {
    name: 'ICW-50K Extra Heavy Industrial Checkweigher',
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
        { label: 'Weight Range', value: '25-50', unit: 'kg' },
        { label: 'Throughput Rate', value: '98.5', unit: '% efficiency' }
      ],
      dimensions: [
        { label: 'Length', value: '3000', unit: 'mm' },
        { label: 'Width', value: '1200', unit: 'mm' },
        { label: 'Height', value: '2000', unit: 'mm' },
        { label: 'Net Weight', value: '800', unit: 'kg' }
      ],
      power: [
        { label: 'Power Consumption', value: '300', unit: 'VA' },
        { label: 'Voltage', value: '230V AC', unit: '1 Phase' },
        { label: 'Frequency', value: '50', unit: 'Hz' },
        { label: 'Protection Rating', value: 'IP54', unit: '' }
      ]
    }
  },
  'vision-pro': {
    name: 'Vision Pro Standard',
    specifications: [
      { label: 'Resolution', value: 'Up to 12MP' },
      { label: 'Inspection Speed', value: 'Up to 600 ppm' },
      { label: 'Detection Accuracy', value: '99.9%' },
      { label: 'Lighting', value: 'LED Multi-angle' },
      { label: 'Processing Power', value: 'Intel i7 Quad-core' },
      { label: 'Interface', value: 'Ethernet, USB, Serial' },
      { label: 'Software', value: 'VisionWorks Pro' },
      { label: 'Environment', value: 'IP65 Rated' },
      { label: 'Camera Technology', value: 'High-resolution CCD/CMOS sensors with advanced optics' },
      { label: 'Image Processing', value: 'Real-time algorithms with AI-powered pattern recognition' },
      { label: 'Detection Capabilities', value: 'Defects, dimensions, colors, text, barcodes, QR codes' },
      { label: 'Data Management', value: 'Comprehensive logging, reporting, and trend analysis' },
      { label: 'Calibration', value: 'Automatic calibration with reference standards' },
      { label: 'User Interface', value: 'Touch screen HMI with remote access capabilities' },
      { label: 'Maintenance', value: 'Self-diagnostic features with predictive maintenance alerts' }
    ],
    technicalData: {
      performance: [
        { label: 'Inspection Speed', value: '600', unit: 'PPM' },
        { label: 'Detection Accuracy', value: '99.9', unit: '%' },
        { label: 'Resolution', value: '12', unit: 'MP' },
        { label: 'Processing Time', value: '<10', unit: 'ms' }
      ],
      dimensions: [
        { label: 'Camera Unit', value: '200x150', unit: 'mm' },
        { label: 'Control Cabinet', value: '600x800', unit: 'mm' },
        { label: 'Working Distance', value: '100-500', unit: 'mm' },
        { label: 'Field of View', value: 'Variable', unit: 'Config' }
      ],
      power: [
        { label: 'Power Consumption', value: '500', unit: 'W' },
        { label: 'Voltage', value: '230V AC', unit: '1 Phase' },
        { label: 'Frequency', value: '50', unit: 'Hz' },
        { label: 'Lighting Power', value: '100', unit: 'W LED' }
      ]
    }
  },
  'vision-compact': {
    name: 'Vision Compact',
    specifications: [
      { label: 'Resolution', value: 'Up to 5MP' },
      { label: 'Inspection Speed', value: 'Up to 300 ppm' },
      { label: 'Detection Accuracy', value: '99.5%' },
      { label: 'Lighting', value: 'LED Ring Light' },
      { label: 'Processing Power', value: 'ARM Cortex-A9' },
      { label: 'Interface', value: 'Ethernet, USB' },
      { label: 'Software', value: 'VisionWorks Lite' },
      { label: 'Environment', value: 'IP54 Rated' },
      { label: 'Camera Technology', value: 'Compact CCD/CMOS sensors with basic optics' },
      { label: 'Image Processing', value: 'Basic real-time algorithms for defect detection' },
      { label: 'Detection Capabilities', value: 'Basic defects, dimensions, colors' },
      { label: 'Data Management', value: 'Basic logging and reporting' },
      { label: 'Calibration', value: 'Manual calibration with reference standards' },
      { label: 'User Interface', value: 'Basic touch screen interface' },
      { label: 'Maintenance', value: 'Standard maintenance with basic diagnostics' }
    ],
    technicalData: {
      performance: [
        { label: 'Inspection Speed', value: '300', unit: 'PPM' },
        { label: 'Detection Accuracy', value: '99.5', unit: '%' },
        { label: 'Resolution', value: '5', unit: 'MP' },
        { label: 'Processing Time', value: '<20', unit: 'ms' }
      ],
      dimensions: [
        { label: 'Camera Unit', value: '150x100', unit: 'mm' },
        { label: 'Control Cabinet', value: '400x600', unit: 'mm' },
        { label: 'Working Distance', value: '80-300', unit: 'mm' },
        { label: 'Field of View', value: 'Fixed', unit: 'Config' }
      ],
      power: [
        { label: 'Power Consumption', value: '300', unit: 'W' },
        { label: 'Voltage', value: '230V AC', unit: '1 Phase' },
        { label: 'Frequency', value: '50', unit: 'Hz' },
        { label: 'Lighting Power', value: '50', unit: 'W LED' }
      ]
    }
  }
};

export default function CheckweighersInspectionPage() {
  const [selectedModel, setSelectedModel] = useState('icw-600');
  const title = 'Checkweighers & Inspection Systems';
  const description =
    'Comprehensive range of dynamic checkweighers and advanced vision inspection systems for precise quality control across all industrial applications.';

  return (
    <PageContainer title={title} subtitle="" hideTitle={true}>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(45deg, ${categoryColors.accent}15 25%, transparent 25%), linear-gradient(-45deg, ${categoryColors.accent}15 25%, transparent 25%)`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center mb-6">
            <div
              className="inline-flex items-center px-6 py-2 rounded-full text-sm font-semibold tracking-wide"
              style={{
                backgroundColor: categoryColors.light,
                color: categoryColors.accent,
                border: `1px solid ${categoryColors.accent}20`
              }}
            >
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: categoryColors.accent }}></span>
              QUALITY CONTROL SERIES
            </div>
          </div>

          <div className="text-center mb-8 sm:mb-10 px-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              <span style={{ color: categoryColors.accent }}>Checkweighers</span> & Inspection Systems
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mt-3 sm:mt-4 px-2">
              {description}
            </p>
          </div>

          {/* Common Video Section */}
          <div className="mx-auto max-w-4xl mb-12 sm:mb-16 px-4">
            <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/AcGw5jiQwa4?autoplay=1&mute=1"
                title="Checkweighers & Inspection Systems Overview"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 px-1 gap-2">
              <h2 className="text-2xl font-bold text-gray-900">All Models Catalog</h2>
              <span className="text-sm text-gray-500">Complete range overview. Click for technical specs.</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {allModels.map((model, index) => (
                <button
                  key={model.key}
                  className="group relative rounded-2xl border bg-white transition-all duration-300 hover:shadow-lg cursor-pointer text-left w-full p-0"
                  style={{ borderColor: `${categoryColors.accent}15` }}
                  onClick={() => setSelectedModel(model.key)}
                  aria-label={`Select ${model.name} for technical specifications`}
                >
                  <div className="aspect-[4/3] bg-white rounded-t-2xl overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">{model.name}</h3>
                    </div>
                    <p className="text-sm font-medium text-gray-700" style={{ color: categoryColors.accent }}>
                      {model.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {model.description}
                    </p>
                    {/* Show key specs based on model type */}
                    {'weighingRange' in model ? (
                      <div className="text-xs text-gray-500 space-y-1">
                        <div><strong>Range:</strong> {model.weighingRange}</div>
                        <div><strong>Accuracy:</strong> {model.accuracy}</div>
                        <div><strong>Speed:</strong> {model.speed}</div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500 space-y-1">
                        <div><strong>Resolution:</strong> {model.resolution}</div>
                        <div><strong>Speed:</strong> {model.speed}</div>
                        <div><strong>Accuracy:</strong> {model.accuracy}</div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Technical Specifications Section */}
            <div className="mt-16">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 px-1 gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Technical Specifications</h2>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer min-w-[200px]"
                    style={{ borderColor: `${categoryColors.accent}30` }}
                  >
                    {allModels.map((model) => (
                      <option key={model.key} value={model.key}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border p-8" style={{ borderColor: `${categoryColors.accent}15` }}>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {technicalSpecifications[selectedModel]?.name}
                </h3>

                {/* Specifications */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h4>
                    <div className="space-y-3">
                      {technicalSpecifications[selectedModel]?.specifications.map((spec, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 gap-2">
                          <span className="font-medium text-gray-700 text-sm sm:text-base">{spec.label}</span>
                          <span className="text-gray-900 text-sm sm:text-base break-words">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Data */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Technical Data</h4>
                    {technicalSpecifications[selectedModel]?.technicalData && (
                      <div className="space-y-6">
                        {Object.entries(technicalSpecifications[selectedModel].technicalData).map(([category, data]) => (
                          <div key={category}>
                            <h5 className="text-md font-medium text-gray-800 mb-3 capitalize">
                              {category}
                            </h5>
                            <div className="space-y-2">
                              {data.map((item, index) => (
                                <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-1 gap-1">
                                  <span className="text-gray-600 text-sm sm:text-base">{item.label}</span>
                                  <span className="font-medium text-gray-900 text-sm sm:text-base">
                                    {item.value} {item.unit}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border bg-white p-4 sm:p-6" style={{ borderColor: `${categoryColors.accent}15` }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-900">Need help choosing the right model?</h3>
                  <p className="text-sm text-gray-600 mt-1">Talk to our experts for guidance on capacity, accuracy, and integration requirements.</p>
                </div>
                <a
                  href="/contact?subject=Checkweighers%20%26%20Inspection%20Systems"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl text-white font-semibold w-full sm:w-auto"
                  style={{ backgroundColor: categoryColors.accent }}
                >
                  Get Expert Advice
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
