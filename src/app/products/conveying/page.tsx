import React from 'react';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';

const categoryColors = {
  accent: '#2563EB',
  light: '#EFF6FF',
  medium: '#DBEAFE'
};

const conveyingModels = [
  {
    key: 'flat-belt',
    name: 'Flat Belt Conveyor',
    subtitle: 'Versatile Product Transfer and Connection System',
    description:
      'Engineered for versatile product transfer applications, connecting primary production lines with downstream operations. Features ergonomic design, two-stage height adjustment, and variable speed control with batching capabilities.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098776/q3pwiyd6fgtpsmtfzk7x.png'
  },
  {
    key: 'modular-conveyor',
    name: 'Modular Conveyor',
    subtitle: 'High-Capacity Interlocked Plastic Segment Conveyor',
    description:
      'Conveys high loads at high speed using interlocked plastic segments that are easily replaceable. Available in multiple chain widths and styles with robust MS/SS construction.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098787/bavrvl5lxecse2d4nsl6.png'
  },
  {
    key: 'roller-conveyor',
    name: 'Roller Conveyor',
    subtitle: 'Power Roller Conveyor for High-End Automation',
    description:
      'Designed for product handling and interconnecting products during automation with ergonomic features, variable speed control, and durable construction.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098782/qxhnotoahwot8qbmshvi.png'
  },
  {
    key: 'compression-conveyor',
    name: 'Compression Conveyor',
    subtitle: 'Air Removal and Pouch Flattening System',
    description:
      'Removes excess air from packed pouches and flattens them for compact, uniform handling. Dual parallel conveyors with adjustable compression gap for consistent results.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098775/mujhcs3birsdowgnofjw.png'
  },
  {
    key: 'spiral-conveyor',
    name: 'Spiral Conveyor',
    subtitle: 'Space-Efficient Gravity-Driven Conveying Solution',
    description:
      'Space-saving vertical conveying with gravity-driven continuous flow for cartons, cases, trays, and packaged goods. Faster and more reliable than lifts.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098782/yzhxpcgteq0sl0rc6ugd.png'
  },
  {
    key: 'z-bucket-elevator',
    name: 'Z Type Bucket Elevator',
    subtitle: 'Silent Operation Vertical Conveying Solution',
    description:
      'Versatile vertical conveying for grains, snacks, and crystalline non-sticky materials with VFD control and food-grade construction options.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098783/ca3y8dxlglvf3wrivxlz.png'
  },
  {
    key: 'crate-lifter',
    name: 'Crate/Box Lifter',
    subtitle: 'Vertical Material Transfer Solution',
    description:
      'Efficient lifting of cartons or crates to specified height for loading into palletizers. VFD-controlled operation with robust construction.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755178597/hgmojw4whm9xyqvuqjao.png'
  },
  {
    key: 'box-lifter',
    name: 'Box Lifter',
    subtitle: 'High-Speed Vertical Material Transfer Solution',
    description:
      'Automatic up-and-down movement of boxes with throughput up to 50 crates per minute and discharge heights up to 12 meters.',
    image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755178596/lofywz27dqkb595tfhkd.png'
  }
];

export default function ConveyingPage() {
  const title = 'Conveying Solutions';
  const description =
    'Our conveying solutions are designed for seamless, efficient product movement across your production line, supporting a wide range of industries and applications.';

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
              CONVEYING SERIES
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              <span style={{ color: categoryColors.accent }}>Conveying</span> Solutions
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              {description}
            </p>
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-2xl font-bold text-gray-900">All Conveying Models</h2>
              <span className="text-sm text-gray-500">Compact overview. No technical specs.</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conveyingModels.map((m, index) => (
                <div
                  key={m.key}
                  className="group relative rounded-2xl border bg-white transition-all duration-300 hover:shadow-lg"
                  style={{ borderColor: `${categoryColors.accent}15` }}
                >
                  <div className="aspect-[4/3] bg-white rounded-t-2xl overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">{m.name}</h3>
                    </div>
                    <p className="text-sm font-medium text-gray-700" style={{ color: categoryColors.accent }}>
                      {m.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border bg-white p-6" style={{ borderColor: `${categoryColors.accent}15` }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Need help choosing a conveying model?</h3>
                  <p className="text-sm text-gray-600">Talk to our experts for guidance on throughput, layout, and integration.</p>
                </div>
                <a
                  href="/contact?subject=Conveying%20Solutions"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl text-white font-semibold"
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