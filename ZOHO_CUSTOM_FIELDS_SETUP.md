# 🔧 Zoho CRM Custom Fields Setup Guide

## 🎯 Issue: Missing Product/Machine Details in CRM

Your quote forms are sending comprehensive data, but Zoho CRM is only showing basic fields because the custom fields don't exist yet.

## ✅ Solution: Create Custom Fields

### **Step 1: Access Zoho CRM Settings**

1. **Go to**: [Zoho CRM India](https://crm.zoho.in/)
2. **Navigate to**: Settings → Customization → Modules → **Leads**
3. **Click**: "Add Field" to create new custom fields

### **Step 2: Create These Custom Fields**

Create each field exactly as specified:

#### **1. Product Interest**
- **Field Label**: `Product Interest`
- **API Name**: `Product_Interest` 
- **Data Type**: `Pick List`
- **Options**:
  ```
  Cartoning Machines
  Case Packers  
  Bundling & Wrapping
  Checkweighers
  Conveying Systems
  Pouch Balers
  Vision Inspection
  Complete Line Solution
  Other
  ```

#### **2. Machine Type** 
- **Field Label**: `Machine Type`
- **API Name**: `Machine_Type`
- **Data Type**: `Single Line Text`
- **Length**: 255

#### **3. Budget Range**
- **Field Label**: `Budget Range`
- **API Name**: `Budget_Range`
- **Data Type**: `Pick List`
- **Options**:
  ```
  Under ₹5 Lakhs
  ₹5-10 Lakhs
  ₹10-25 Lakhs
  ₹25-50 Lakhs
  ₹50 Lakhs - 1 Crore
  Above ₹1 Crore
  Prefer not to say
  ```

#### **4. Project Timeline**
- **Field Label**: `Project Timeline`
- **API Name**: `Timeline`
- **Data Type**: `Pick List`
- **Options**:
  ```
  Immediate (Within 1 month)
  1-3 months
  3-6 months
  6-12 months
  Beyond 12 months
  Just researching
  ```

#### **5. Inquiry Type**
- **Field Label**: `Inquiry Type`
- **API Name**: `Inquiry_Type`
- **Data Type**: `Pick List`
- **Options**:
  ```
  Quote Request
  Demo Request
  Service Request
  General Inquiry
  Technical Support
  Product Information
  ```

#### **6. Additional Requirements**
- **Field Label**: `Additional Requirements`
- **API Name**: `Additional_Requirements`
- **Data Type**: `Multi Line Text`
- **Length**: 2000

### **Step 3: Update Lead Layout**

1. **Go to**: Settings → Customization → Layouts → **Lead Layout**
2. **Drag the new fields** to appropriate sections:
   - **Product Interest** → Product Information section
   - **Machine Type** → Product Information section  
   - **Budget Range** → Lead Information section
   - **Timeline** → Lead Information section
   - **Inquiry Type** → Lead Information section
   - **Additional Requirements** → Description section

### **Step 4: Test the Integration**

After creating the fields:

1. **Submit a test quote** from: https://infinitysols.vercel.app/products/cartoning/acm-100/
2. **Check the lead in Zoho CRM**
3. **Verify all fields are populated**

## 📊 **What You'll See After Setup**

### **Before (Current)**
- ✅ Name, Email, Phone, Company
- ✅ Basic Description  
- ❌ Missing: Product details, budget, timeline

### **After (Enhanced)**
- ✅ All basic contact info
- ✅ **Product Interest**: ACM-100 Cartoning Machine
- ✅ **Machine Type**: ACM-100
- ✅ **Budget Range**: ₹10-25 Lakhs
- ✅ **Timeline**: 3-6 months
- ✅ **Inquiry Type**: Quote Request
- ✅ **Additional Requirements**: Custom specifications
- ✅ **Enhanced Description**: Formatted with all details

## 🎯 **Alternative: Check Existing Fields**

If you prefer to use existing Zoho fields instead of creating custom ones:

### **Standard Fields You Can Use:**
- **Industry** → Already mapped
- **Annual Revenue** → Can be used for budget
- **Lead Source** → Already set to "Website"
- **Lead Status** → Already set to "Quote Requested"
- **Rating** → Already set to "Hot"
- **Description** → Enhanced with all details

### **Map to Standard Fields:**
- Use **Annual Revenue** for budget range
- Use **Industry** for product category
- Use **Description** for all additional details (already enhanced)

## 🚀 **Immediate Visibility Boost**

Even without custom fields, you'll see more details in the **Description** field, which now includes:

```
Customer requirements text...

Product Interest: ACM-100 Cartoning Machine
Machine Type: ACM-100  
Budget Range: ₹10-25 Lakhs
Timeline: 3-6 months
Inquiry Type: Quote Request
Additional Requirements: Custom specifications...
```

## ✅ **Quick Test**

1. **Create at least the Product Interest field** (most important)
2. **Submit a test quote** 
3. **Check if the field appears** in the lead record
4. **Add remaining fields** as needed

The enhanced description will show immediately, and custom fields will appear once created! 🎉
