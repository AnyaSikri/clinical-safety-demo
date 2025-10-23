# 🚀 START HERE - Complete Workflow Guide

## What This Tool Does

This is an **AI-powered Clinical Safety Analyzer** that automatically generates comprehensive safety reports from clinical trial data. It analyzes adverse events and creates FDA/EMA-compliant narratives.

---

## 📋 Complete Workflow (Start to End)

### **Step 1: Install Dependencies**

Open Terminal and run:

```bash
pip install pandas openpyxl python-docx openai
```

Or:

```bash
pip install -r requirements.txt
```

### **Step 2: Get Your OpenAI API Key**

1. Go to: https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)

### **Step 3: Set Your API Key**

In Terminal:

```bash
export OPENAI_API_KEY='sk-your-actual-key-here'
```

### **Step 4: Navigate to Project Folder**

```bash
cd /Users/anyasikri/Downloads/demo_rigel
```

### **Step 5: Verify Input File Exists**

Make sure this file exists:
```
/Users/anyasikri/Desktop/reference_docs/adae.xlsx
```

If it doesn't exist, you'll need to:
- Place your Excel file at that location, OR
- Edit the script to point to your file location

### **Step 6: Run the Tool**

```bash
python comprehensive_safety_analyzer.py
```

### **Step 7: Wait for Processing**

You'll see output like:
```
INFO: Loaded 162 events from adae.xlsx
INFO: Statistics calculated successfully
INFO: Comprehensive safety report saved to...
✓ Success! Comprehensive safety narrative created!
```

**Processing time**: ~15-30 seconds

### **Step 8: Open Your Report**

The report is saved at:
```
/Users/anyasikri/Desktop/reference_docs/comprehensive_safety_narrative.docx
```

Open it manually or run:
```bash
open "/Users/anyasikri/Desktop/reference_docs/comprehensive_safety_narrative.docx"
```

---

## 🎯 What You Get

A comprehensive Word document with **13 sections**:

1. ✅ Executive Summary
2. ✅ Study Overview
3. ✅ Overall Adverse Event Profile
4. ✅ Serious Adverse Events
5. ✅ Treatment-Related Events
6. ✅ Hepatotoxicity Signal Detection
7. ✅ Dose-Response Analysis
8. ✅ Events Leading to Dose Modifications
9. ✅ High-Grade Events (Grade 3+)
10. ✅ Events by System Organ Class
11. ✅ Outcomes
12. ✅ AI-Generated Discussion
13. ✅ Recommendations

---

## 🔄 Alternative: Process Individual Patient

If you want to generate a narrative for a single patient instead:

```bash
python enhanced_ai_populator.py
```

This creates individual patient narratives with 35+ populated fields.

---

## ⚙️ Customization

### Change Input File Location

Edit `comprehensive_safety_analyzer.py` line 378:
```python
analyzer.load_data("/path/to/your/file.xlsx")
```

### Change Output Location

Edit `comprehensive_safety_analyzer.py` line 380:
```python
analyzer.create_report("/path/to/output.docx")
```

---

## 🐛 Troubleshooting

### Problem: "OpenAI API key not found"

**Solution**: 
```bash
export OPENAI_API_KEY='your-key-here'
```

### Problem: "No module named 'pandas'"

**Solution**: 
```bash
pip install pandas openpyxl python-docx openai
```

### Problem: "File not found"

**Solution**: Check that `adae.xlsx` exists at:
```
/Users/anyasikri/Desktop/reference_docs/adae.xlsx
```

Or create the folder:
```bash
mkdir -p ~/Desktop/reference_docs
```

### Problem: "Permission denied"

**Solution**: 
```bash
chmod 755 ~/Desktop/reference_docs
```

---

## 📊 Visual Workflow

```
┌─────────────────────────────────────────┐
│  1. Install dependencies                │
│     pip install -r requirements.txt     │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  2. Set API key                         │
│     export OPENAI_API_KEY='sk-...'     │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  3. Navigate to project                 │
│     cd demo_rigel                       │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  4. Run the script                      │
│     python comprehensive_safety_        │
│     analyzer.py                         │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  5. Wait ~15-30 seconds                 │
│     Processing in progress...           │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  6. Get your report!                    │
│     comprehensive_safety_narrative.docx │
└─────────────────────────────────────────┘
```

---

## 💡 Pro Tips

1. **Save API key permanently**: Add to `~/.zshrc`:
   ```bash
   echo 'export OPENAI_API_KEY="sk-your-key"' >> ~/.zshrc
   source ~/.zshrc
   ```

2. **Process different studies**: Change the input file path to analyze different data

3. **Re-run anytime**: Just run the script again to regenerate with latest data

4. **Check output folder**: Make sure the output directory exists before running

---

## 📚 Additional Documentation

- **`HOW_TO_RUN.md`**: Detailed step-by-step instructions
- **`README.md`**: Project overview and features
- **`INFRASTRUCTURE_OVERVIEW.md`**: Architecture details
- **`GITHUB_UPLOAD.md`**: Complete guide including GitHub deployment

---

## ✅ Quick Checklist

Before running, make sure:

- [ ] Python 3.9+ installed
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] OpenAI API key set (`export OPENAI_API_KEY='...'`)
- [ ] Input file exists (`adae.xlsx` at expected location)
- [ ] Output folder exists (`~/Desktop/reference_docs/`)
- [ ] You're in the project directory (`cd demo_rigel`)

**Ready to go?** Run: `python comprehensive_safety_analyzer.py`

