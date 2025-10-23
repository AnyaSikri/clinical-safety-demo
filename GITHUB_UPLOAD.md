# 🚀 Complete Start-to-End Guide

## Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
pip install pandas openpyxl python-docx openai
```

### Step 2: Set Your OpenAI API Key
```bash
export OPENAI_API_KEY='your-api-key-here'
```

### Step 3: Run the Tool
```bash
cd /Users/anyasikri/Downloads/demo_rigel
python comprehensive_safety_analyzer.py
```

**Output**: `/Users/anyasikri/Desktop/reference_docs/comprehensive_safety_narrative.docx`

---

## Two Main Use Cases

### Option A: Comprehensive Safety Analysis (Recommended)
**What it does**: Analyzes ALL 162 events and generates a population-level safety report

```bash
python comprehensive_safety_analyzer.py
```

**Output**: 13-section comprehensive safety narrative covering:
- Executive Summary
- Overall Adverse Event Profile
- Serious Adverse Events
- Treatment-Related Events
- Hepatotoxicity Signal
- Dose-Response Analysis
- Events Leading to Modifications
- High-Grade Events
- Events by System Organ Class
- Outcomes
- Discussion (AI-generated)
- Recommendations

### Option B: Individual Patient Narratives
**What it does**: Generates detailed narrative for a single patient

```bash
python enhanced_ai_populator.py
```

**Output**: Individual patient AE narrative with 35+ fields populated

---

## Detailed Setup Instructions

### 1. Prerequisites
- Python 3.9 or higher
- OpenAI API key (get from https://platform.openai.com/api-keys)
- Excel file with adverse event data (adae.xlsx)

### 2. Install Required Packages
```bash
pip install pandas openpyxl python-docx openai
```

Or install all at once:
```bash
pip install -r requirements.txt
```

### 3. Set Environment Variable
```bash
# For current terminal session
export OPENAI_API_KEY='your-api-key-here'

# Or add to your shell profile (~/.zshrc or ~/.bashrc) for permanent setup
echo 'export OPENAI_API_KEY="your-api-key-here"' >> ~/.zshrc
source ~/.zshrc
```

### 4. Verify Input Files
Make sure these files exist:
- **Input data**: `/Users/anyasikri/Desktop/reference_docs/adae.xlsx`
- **Output folder**: `/Users/anyasikri/Desktop/reference_docs/`

### 5. Run the Script
```bash
cd /Users/anyasikri/Downloads/demo_rigel
python comprehensive_safety_analyzer.py
```

---

## What Happens During Execution

1. **Loads Data** (2-3 seconds)
   - Reads adae.xlsx
   - Loads 162 adverse events into memory

2. **Calculates Statistics** (3-5 seconds)
   - Counts total events and patients
   - Calculates percentages and distributions
   - Groups by dose, severity, seriousness
   - Identifies patterns (hepatotoxicity signal)

3. **Generates Report** (10-20 seconds)
   - Creates Word document structure
   - Populates 13 sections with statistics
   - Calls AI for discussion section

4. **Saves Output** (1-2 seconds)
   - Saves to Desktop/reference_docs/
   - Logs success message

**Total Time**: ~15-30 seconds

---

## Customization Options

### Change Input File
Edit line 380 in `comprehensive_safety_analyzer.py`:
```python
analyzer.load_data("/path/to/your/file.xlsx")
```

### Change Output Location
Edit line 382 in `comprehensive_safety_analyzer.py`:
```python
analyzer.create_report("/path/to/output.docx")
```

### Process Different Study
Replace `adae.xlsx` with your Excel file (must have same column structure)

---

## Troubleshooting

### "OpenAI API key not found"
```bash
export OPENAI_API_KEY='your-key-here'
```

### "No module named 'pandas'"
```bash
pip install pandas openpyxl python-docx openai
```

### "File not found"
Check that adae.xlsx exists at:
`/Users/anyasikri/Desktop/reference_docs/adae.xlsx`

### "Permission denied"
Make sure you have write permissions for the output folder:
```bash
mkdir -p ~/Desktop/reference_docs
chmod 755 ~/Desktop/reference_docs
```

---

# Upload to GitHub - New Repository

## Steps to Create New Repository

### Option 1: Using GitHub Website (Recommended)

1. **Go to GitHub**: https://github.com/new
2. **Fill in details**:
   - Repository name: `clinical-safety-analyzer` (or your preferred name)
   - Description: "AI-powered comprehensive safety analysis tool for clinical trials"
   - Visibility: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license
3. **Click "Create repository"**

4. **Copy the repository URL** (e.g., `https://github.com/AnyaSikri/clinical-safety-analyzer.git`)

5. **Run these commands** (replace with your URL):

```bash
# Remove old remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/AnyaSikri/clinical-safety-analyzer.git

# Push to new repository
git branch -M main
git push -u origin main
```

### Option 2: Using GitHub CLI

If you have GitHub CLI installed:

```bash
# Create new repository
gh repo create clinical-safety-analyzer --public --source=. --remote=origin --push
```

---

## What You'll Push

✅ **Core Files**:
- `comprehensive_safety_analyzer.py` (main tool)
- `enhanced_ai_populator.py` (individual narratives)
- `create_improved_template.py` (template creator)

✅ **Documentation**:
- `HOW_TO_RUN.md` (usage instructions)
- `INFRASTRUCTURE_OVERVIEW.md` (architecture)
- `README.md` (project overview)
- `CLEANUP_GUIDE.md` (maintenance guide)

✅ **Configuration**:
- `.gitignore` (excludes unnecessary files)

---

## Security Note

⚠️ **Important**: Your API key is NOT in the repository. It's set as an environment variable when running the script.

Users will need to:
```bash
export OPENAI_API_KEY='their-key-here'
```

---

## After Uploading

Once pushed, your repository will be live at:
`https://github.com/AnyaSikri/your-repo-name`

Others can clone it with:
```bash
git clone https://github.com/AnyaSikri/your-repo-name.git
cd your-repo-name
```

