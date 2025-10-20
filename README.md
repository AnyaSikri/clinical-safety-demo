# AI Template Populator POC

A proof-of-concept AI tool that takes patient data files and populates Word document templates using OpenAI's GPT API. Built for Rigel's patient safety narrative generation workflow.

## Overview
This system demonstrates how AI can automatically populate medical document templates with patient data, reducing manual work for safety specialists and medical writers.

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Setup
```bash
# Install dependencies
python setup.py

# Set your OpenAI API key
export OPENAI_API_KEY='your-api-key-here'
```

### 3. Run Demo
```bash
# Create sample template
python create_template.py

# Test the system
python test_populator.py
```

## Files Created

### Core System
- `ai_template_populator.py` - Main AI template population system
- `test_populator.py` - Test script to run the system
- `setup.py` - Install required dependencies

### Sample Data & Templates  
- `sample_patient_data.csv` - Sample patient data for testing
- `create_template.py` - Creates sample Word template with placeholders

## How to Use

### 1. Setup
```bash
# Install dependencies
python setup.py

# Set your OpenAI API key
export OPENAI_API_KEY='your-api-key-here'
```

### 2. Create Template
```bash
python create_template.py
```
This creates `sample_template.docx` with placeholders like `{{patient_id}}`, `{{medical_history_summary}}`, etc.

### 3. Test the System
```bash
python test_populator.py
```
This processes the first patient from `sample_patient_data.csv` and creates `test_output.docx`

## Template Placeholders
The system looks for placeholders in format `{{placeholder_name}}` and uses AI to generate appropriate content:

- `{{patient_id}}` - Patient identifier
- `{{age}}` - Patient age  
- `{{gender}}` - Patient gender
- `{{medical_history_summary}}` - AI-generated medical history summary
- `{{current_medications}}` - AI-formatted medication list
- `{{adverse_event}}` - Adverse event type
- `{{event_date}}` - Event date
- `{{severity}}` - Event severity
- `{{event_description}}` - AI-generated event description
- `{{clinical_assessment}}` - AI-generated clinical assessment
- `{{outcome_description}}` - AI-generated outcome description
- `{{safety_analysis}}` - AI-generated safety analysis
- `{{recommendations}}` - AI-generated recommendations

## Key Features
- **File Input**: Supports CSV and Excel files
- **AI Generation**: Uses GPT-4 to generate medical content
- **Template System**: Word documents with placeholder replacement
- **Error Handling**: Comprehensive logging and error management
- **Flexible**: Easy to add new placeholders and data fields

## Next Steps
This POC validates the core AI template population capability. Next phases would add:
- Database integration
- Multiple patient processing
- Custom template creation
- Quality validation
- Integration with existing systems
