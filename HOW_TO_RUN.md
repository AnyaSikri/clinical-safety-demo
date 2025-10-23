ok # How to Run the Comprehensive Safety Analyzer

## 🚀 Quick Start (3 Steps)

### **Step 1: Set Your OpenAI API Key**

Open terminal and run:
```bash
export OPENAI_API_KEY='your-api-key-here'
```

### **Step 2: Navigate to Project Folder**

```bash
cd /Users/anyasikri/Downloads/demo_rigel
```

### **Step 3: Run the Script**

```bash
python comprehensive_safety_analyzer.py
```

**That's it!** The report will be generated at:
`/Users/anyasikri/Desktop/reference_docs/comprehensive_safety_narrative.docx`

---

## 📋 Detailed Steps

### **Step 1: Open Terminal**
- Press `Cmd + Space` and type "Terminal"
- Click on Terminal app

### **Step 2: Set API Key**
```bash
export OPENAI_API_KEY='your-api-key-here'
```

### **Step 3: Navigate to Project**
```bash
cd /Users/anyasikri/Downloads/demo_rigel
```

### **Step 4: Run Script**
```bash
python comprehensive_safety_analyzer.py
```

### **Step 5: Wait for Processing**
You'll see output like:
```
INFO: Loaded 162 events from adae.xlsx
INFO: Statistics calculated successfully
INFO: Comprehensive safety report saved to...
✓ Success! Comprehensive safety narrative created!
```

### **Step 6: Open Report**
The report is automatically saved at:
`/Users/anyasikri/Desktop/reference_docs/comprehensive_safety_narrative.docx`

You can open it manually or run:
```bash
open "/Users/anyasikri/Desktop/reference_docs/comprehensive_safety_narrative.docx"
```

---

## 🔄 Complete Command (One-Liner)

If you want to do everything in one command:

```bash
cd /Users/anyasikri/Downloads/demo_rigel && export OPENAI_API_KEY='your-api-key-here' && python comprehensive_safety_analyzer.py
```

---

## ⚙️ Customization

### **Change Input File**
Edit line 380 in `comprehensive_safety_analyzer.py`:
```python
analyzer.load_data("/path/to/your/file.xlsx")
```

### **Change Output Location**
Edit line 382 in `comprehensive_safety_analyzer.py`:
```python
analyzer.create_report("/path/to/output.docx")
```

### **Process Different Study**
Replace `adae.xlsx` with your Excel file (must have same column structure)

---

## 🐛 Troubleshooting

### **Problem: "OpenAI API key not found"**
**Solution**: Make sure you set the API key:
```bash
export OPENAI_API_KEY='your-key-here'
```

### **Problem: "No module named 'pandas'"**
**Solution**: Install dependencies:
```bash
pip install pandas openpyxl python-docx openai
```

### **Problem: "File not found"**
**Solution**: Check that adae.xlsx exists at:
`/Users/anyasikri/Desktop/reference_docs/adae.xlsx`

### **Problem: "Permission denied"**
**Solution**: Make sure you have write permissions for the output folder

---

## 📝 What Happens Behind the Scenes

1. **Loads** adae.xlsx (162 events)
2. **Calculates** statistics (counts, percentages, distributions)
3. **Groups** events by dose, severity, seriousness
4. **Generates** 13 sections of the report
5. **Calls** AI for discussion section
6. **Saves** Word document

---

## 🎯 Expected Output

You'll get a Word document with:
- Executive Summary
- Study Overview
- Overall Adverse Event Profile
- Serious Adverse Events
- Treatment-Related Events
- Hepatotoxicity Signal
- Dose-Response Analysis
- Events Leading to Modifications
- High-Grade Events
- Events by System Organ Class
- Outcomes
- Discussion
- Recommendations

---

## 💡 Pro Tips

1. **Check output folder**: Make sure `/Users/anyasikri/Desktop/reference_docs/` exists
2. **API key in shell**: The API key only lasts for that terminal session
3. **Re-run anytime**: Just run the script again to regenerate
4. **Different data**: Update the input file path to use different data

