# Product Page Standardization Log

## Reference Structure (IBP-120)
All individual product pages should follow this structure:

### Required Props:
- `id`: Product identifier (kebab-case)
- `title`: Product name
- `subtitle`: Short description
- `description`: Detailed product description
- `features`: Array of feature objects with title, description, icon
- `keyFeatures`: Array of string features for overview
- `models`: Array of model objects with specifications
- `applications`: Array of application strings
- `category`: Category in kebab-case (e.g., "bundling-wrapping", "case-packers", "checkweighers", "conveying", "cartoning", "pouch-baler", "inspection")
- `image`: Cloudinary URL for product image
- `slug`: Full path with "products/" prefix
- `videoId`: YouTube video ID (optional)
- `specifications`: Array of specification objects
- `technicalData`: Object with performance, dimensions, power arrays
- `certifications`: Array of certification strings

### Required Data Structure:

```typescript
const features = [
  { title: 'Feature Name', description: 'Feature description', icon: 'emoji' }
];

const keyFeatures = [
  'Key feature 1',
  'Key feature 2'
];

const technicalData = {
  performance: [
    { label: 'Metric', value: 'Value', unit: 'Unit' }
  ],
  dimensions: [
    { label: 'Dimension', value: 'Value', unit: 'Unit' }
  ],
  power: [
    { label: 'Power Spec', value: 'Value', unit: 'Unit' }
  ]
};

const specifications = [
  { label: 'Spec Name', value: 'Spec Value' }
];

const certifications = [
  'ISO 9001:2015',
  'FDA Compatible Materials'
];
```

## Updated Pages:

### ✅ Completed:
1. **IBP-120** - Reference page (already complete)
2. **ICW-600** - Complete structure with all elements
3. **IBL-500** - Complete structure with all elements  
4. **ACM-40** - Complete structure with all elements
5. **Flat Belt Conveyor** - Complete structure with all elements
6. **Vision Systems** - Complete structure with all elements
7. **ACM-100** - Updated with complete structure
8. **ICW-1200** - Updated with complete structure
9. **ICS-200** - Updated with complete structure
10. **IBG-8** - Updated with complete structure

### 🔄 Still Need Updates:
- All remaining individual product pages need:
  - Category name in kebab-case
  - Slug path with "products/" prefix
  - Complete keyFeatures array
  - Complete technicalData object
  - Complete specifications array
  - Complete certifications array

### Key Categories:
- **bundling-wrapping**: 6 models
- **cartoning**: 2 models  
- **case-packers**: 5 models
- **pouch-baler**: 3 models
- **checkweighers**: 6 models
- **conveying**: 8 models
- **inspection**: 1 model

## Common Issues Fixed:
1. Category naming: "Case Packers" → "case-packers"
2. Slug paths: "icw-1200" → "products/checkweighers/icw-1200"
3. Missing keyFeatures arrays
4. Missing technicalData objects
5. Missing specifications arrays
6. Missing certifications arrays

## Notes:
- All category overview pages have been updated to use ProductCategoryPage component
- All individual product pages use ProductDetailPage component
- Consistent tab structure: Overview, Specifications, Features, Applications, Models Catalog
- Consistent image layout without frames
- Single static images (no rotation) 