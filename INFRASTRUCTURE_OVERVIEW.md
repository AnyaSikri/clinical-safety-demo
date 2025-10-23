# Complete Infrastructure Overview

## 🏗️ Architecture Overview

This is a **Modular AI-Powered Safety Report Generation System** with two main use cases:
1. **Individual Patient Narratives** - Single AE case reports
2. **Comprehensive Safety Analysis** - Population-level safety reports

---

## 📁 File Structure & Roles

### **Core Scripts (Main Tools)**

#### 1. **`comprehensive_safety_analyzer.py`** ⭐ PRIMARY TOOL
- **Purpose**: Generate comprehensive safety analysis reports
- **Input**: adae.xlsx (162 events)
- **Output**: comprehensive_safety_narrative.docx
- **What it does**:
  - Loads ALL adverse events from Excel
  - Calculates statistics dynamically (counts, percentages, distributions)
  - Groups events by dose level, severity, seriousness, etc.
  - Generates 13-section comprehensive report
  - Uses AI for discussion section
- **When to use**: For population-level safety analysis

#### 2. **`enhanced_ai_populator.py`**
- **Purpose**: Generate individual patient AE narratives
- **Input**: adae.xlsx + improved_template.docx
- **Output**: Enhanced narrative for single patient
- **What it does**:
  - Maps SDTM columns to template placeholders
  - Populates 35 fields from data
  - Uses AI for clinical course and discussion
- **When to use**: For individual case narratives

#### 3. **`process_desktop_files.py`**
- **Purpose**: User-friendly interface for processing files
- **Input**: User provides folder path and filenames
- **Output**: Populated narrative
- **What it does**:
  - Prompts user for file locations
  - Handles file path resolution
  - Calls ai_template_populator.py
- **When to use**: For easy file processing

#### 4. **`ai_template_populator.py`** (Original)
- **Purpose**: Basic template population (original version)
- **Input**: CSV/Excel + template
- **Output**: Basic populated narrative
- **When to use**: Simple template population

### **Template Creation Scripts**

#### 5. **`create_improved_template.py`**
- **Purpose**: Generate the improved SDTM template
- **Output**: improved_template.docx (with 35 placeholders)
- **What it does**:
  - Creates Word document with tables
  - Adds SDTM-standard placeholders
  - Structures sections for regulatory compliance

#### 6. **`create_template.py`** (Original)
- **Purpose**: Generate basic template
- **Output**: sample_template.docx
- **When to use**: Simple template creation

### **Documentation & References**

- **`README.md`** - Project overview
- **`DESKTOP_USAGE.md`** - How to use process_desktop_files.py
- **`QUICK_REFERENCE.md`** - Quick guide for enhanced populator
- **`setup.py`** - Package setup configuration

### **Sample Data**

- **`sample_patient_data.csv`** - Original sample data
- **`Patient_Narrative_Sample_SDTM.xlsx`** - Original SDTM sample
- **`test_populator.py`** - Testing script
- **`test_output.docx`** - Test output

---

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    DATA SOURCES                         │
├─────────────────────────────────────────────────────────┤
│  adae.xlsx (162 events)                                 │
│  ae_raw.xlsx (Raw clinical data)                        │
│  ae_sdtm.xlsx (SDTM format)                            │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│              ANALYSIS & PROCESSING LAYER                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. comprehensive_safety_analyzer.py                     │
│     ├─ Load Excel → pandas DataFrame                   │
│     ├─ Calculate Statistics                             │
│     │   ├─ Counts, percentages                         │
│     │   ├─ Group by dose/severity/seriousness          │
│     │   ├─ Identify patterns (hepatotoxicity)         │
│     │   └─ Aggregate outcomes                          │
│     ├─ Generate Report                                  │
│     │   ├─ Executive Summary                            │
│     │   ├─ Sections 1-13                               │
│     │   └─ AI for Discussion                            │
│     └─ Output: comprehensive_safety_narrative.docx       │
│                                                          │
│  2. enhanced_ai_populator.py                            │
│     ├─ Load Excel + Template                           │
│     ├─ Extract Placeholders                            │
│     ├─ Map Columns to Placeholders                     │
│     ├─ Populate Direct Data Fields                     │
│     ├─ AI Generate Clinical Course                     │
│     ├─ AI Generate Discussion                          │
│     └─ Output: enhanced_narrative.docx                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│                   OUTPUT LAYER                          │
├─────────────────────────────────────────────────────────┤
│  comprehensive_safety_narrative.docx                    │
│  enhanced_narrative.docx                                │
│  populated_report.docx                                   │
└─────────────────────────────────────────────────────────┘
```

---

## 🧩 Key Components Explained

### **1. Data Loading Layer**
```python
pandas.read_excel()  # Loads Excel files
DataFrame operations  # Filters, groups, aggregates
```

### **2. Statistics Engine**
```python
calculate_statistics()  # Computes all metrics
- Counts
- Percentages
- Distributions
- Groupings
- Pattern detection
```

### **3. Template System**
```python
python-docx  # Creates Word documents
- Paragraphs
- Tables
- Headings
- Formatting
```

### **4. AI Integration**
```python
OpenAI API (GPT-3.5/GPT-4)
- Clinical narratives
- Discussion sections
- Professional medical writing
```

### **5. Column Mapping**
```python
self.column_mapping = {
    'placeholder': 'Excel Column Name'
}
# Maps template fields to data columns
```

---

## 💻 Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Data Processing** | pandas | Excel reading, data manipulation |
| **Word Documents** | python-docx | Create/populate Word docs |
| **AI Generation** | OpenAI API | GPT-3.5/GPT-4 for narratives |
| **Language** | Python 3.9+ | Core programming language |
| **Dependencies** | openpyxl | Excel file handling |

---

## 🔄 Two Main Workflows

### **Workflow 1: Individual Patient Narrative**
```
User → process_desktop_files.py
         ↓
    enhanced_ai_populator.py
         ↓
    Load adae.xlsx (1 patient)
         ↓
    Map 35 columns to placeholders
         ↓
    Populate template
         ↓
    AI generates clinical course
         ↓
    Save enhanced_narrative.docx
```

### **Workflow 2: Comprehensive Safety Analysis**
```
User → comprehensive_safety_analyzer.py
         ↓
    Load adae.xlsx (ALL 162 events)
         ↓
    Calculate statistics
         ↓
    Generate 13 sections
         ↓
    AI generates discussion
         ↓
    Save comprehensive_safety_narrative.docx
```

---

## 🎯 Key Design Principles

### **1. Modularity**
- Each script has a single, clear purpose
- Scripts can be used independently
- Easy to maintain and extend

### **2. Dynamic Data Processing**
- No hardcoded values
- All statistics calculated from data
- Adapts to any dataset structure

### **3. Separation of Concerns**
- Data loading → pandas
- Document creation → python-docx
- AI generation → OpenAI API
- Each layer handles its own responsibility

### **4. User Flexibility**
- Can process any Excel file
- Can use any template
- Can customize mappings
- Can adjust AI prompts

---

## 🔧 How Components Interact

### **Example: Comprehensive Safety Report**

1. **User runs**: `python comprehensive_safety_analyzer.py`

2. **Script loads data**:
   ```python
   analyzer.load_data("adae.xlsx")
   # Uses pandas to read Excel
   ```

3. **Calculates statistics**:
   ```python
   analyzer.calculate_statistics()
   # Filters, groups, counts data
   # Stores results in self.stats dictionary
   ```

4. **Generates report**:
   ```python
   analyzer.create_report("output.docx")
   # Uses python-docx to create Word doc
   # Populates sections with statistics
   # Calls AI for discussion section
   ```

5. **Output**: Completed Word document

---

## 🚀 Entry Points

### **For Users:**
1. **`comprehensive_safety_analyzer.py`** - Most comprehensive
2. **`enhanced_ai_populator.py`** - Individual narratives
3. **`process_desktop_files.py`** - Easy file processing

### **For Developers:**
- All scripts are modular and self-contained
- Can be imported and used as libraries
- Easy to extend with new features

---

## 📊 Data Transformation Pipeline

```
Raw Excel Data
    ↓
Load into pandas DataFrame
    ↓
Clean & Filter
    ↓
Calculate Statistics
    ↓
Group & Aggregate
    ↓
Populate Template
    ↓
AI Enhancement (where needed)
    ↓
Format & Style
    ↓
Output Word Document
```

---

## 🎓 Summary

**This is a tiered architecture:**
- **Data Layer**: Excel files (adae.xlsx, etc.)
- **Processing Layer**: Python scripts (pandas)
- **AI Layer**: OpenAI API (GPT models)
- **Output Layer**: Word documents (.docx)

**Key Features:**
- ✅ Modular design
- ✅ Dynamic data processing
- ✅ AI-powered narrative generation
- ✅ Regulatory-compliant outputs
- ✅ Flexible and extensible

**Main Use Cases:**
1. Individual patient AE narratives
2. Comprehensive population safety analysis
