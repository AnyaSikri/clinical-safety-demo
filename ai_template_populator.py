#!/usr/bin/env python3
"""
AI Template Populator POC
Takes patient data files and populates templates using OpenAI API
"""

import os
import pandas as pd
import openai  # OpenAI version
from docx import Document
from docx.shared import Inches
import json
import re
from typing import Dict, List, Any
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AITemplatePopulator:
    def __init__(self, api_key: str = None):
        """
        Initialize the AI Template Populator
        
        Args:
            api_key: OpenAI API key. If None, will try to get from environment variable OPENAI_API_KEY
        """
        self.api_key = api_key or os.getenv('OPENAI_API_KEY')
        if not self.api_key:
            raise ValueError("OpenAI API key not provided. Set OPENAI_API_KEY environment variable or pass api_key parameter")
        
        # OpenAI version:
        openai.api_key = self.api_key
        self.client = openai.OpenAI(api_key=self.api_key)
        
    def load_patient_data(self, file_path: str) -> pd.DataFrame:
        """
        Load patient data from CSV or Excel file
        
        Args:
            file_path: Path to the data file
            
        Returns:
            DataFrame with patient data
        """
        try:
            if file_path.endswith('.csv'):
                df = pd.read_csv(file_path)
            elif file_path.endswith(('.xlsx', '.xls')):
                df = pd.read_excel(file_path)
            else:
                raise ValueError("Unsupported file format. Use CSV or Excel files.")
            
            logger.info(f"Loaded {len(df)} patient records from {file_path}")
            return df
            
        except Exception as e:
            logger.error(f"Error loading patient data: {e}")
            raise
    
    def load_template(self, template_path: str) -> str:
        """
        Load template from Word document
        
        Args:
            template_path: Path to the Word template
            
        Returns:
            Template text with placeholders
        """
        try:
            doc = Document(template_path)
            template_text = ""
            
            for paragraph in doc.paragraphs:
                template_text += paragraph.text + "\n"
            
            logger.info(f"Loaded template from {template_path}")
            return template_text
            
        except Exception as e:
            logger.error(f"Error loading template: {e}")
            raise
    
    def extract_placeholders(self, template_text: str) -> List[str]:
        """
        Extract placeholders from template text
        Placeholders are in format: {{placeholder_name}}
        
        Args:
            template_text: Template text
            
        Returns:
            List of placeholder names
        """
        placeholders = re.findall(r'\{\{([^}]+)\}\}', template_text)
        logger.info(f"Found {len(placeholders)} placeholders: {placeholders}")
        return placeholders
    
    def prepare_patient_context(self, patient_row: pd.Series) -> str:
        """
        Convert patient data row to context string for AI
        
        Args:
            patient_row: Single row from patient DataFrame
            
        Returns:
            Formatted context string
        """
        context_parts = []
        
        for column, value in patient_row.items():
            if pd.notna(value):
                context_parts.append(f"{column}: {value}")
        
        return "\n".join(context_parts)
    
    def generate_ai_content(self, placeholder: str, patient_context: str, template_context: str = "") -> str:
        """
        Use OpenAI to generate content for a specific placeholder
        
        Args:
            placeholder: The placeholder name
            patient_context: Patient data context
            template_context: Additional template context
            
        Returns:
            Generated content
        """
        try:
            prompt = f"""
You are a medical writer creating patient safety narratives. Based on the patient data provided, generate appropriate content for the placeholder: {placeholder}

Patient Data:
{patient_context}

Template Context:
{template_context}

Instructions:
- Generate professional, accurate medical content
- Use the patient data provided
- Maintain consistency with medical writing standards
- Keep content concise but comprehensive
- If information is missing, indicate "Not available" or "Not specified"

Generate content for: {placeholder}
"""

            # OpenAI version:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a professional medical writer specializing in patient safety narratives and regulatory documentation."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1000,
                temperature=0.3
            )
            generated_content = response.choices[0].message.content.strip()
            
            logger.info(f"Generated content for {placeholder}: {generated_content[:100]}...")
            return generated_content
            
        except Exception as e:
            logger.error(f"Error generating AI content for {placeholder}: {e}")
            return f"[Error generating content for {placeholder}]"
    
    def generate_multiple_content(self, placeholders: List[str], patient_context: str) -> Dict[str, str]:
        """
        Generate content for multiple placeholders in a single API call
        
        Args:
            placeholders: List of placeholder names
            patient_context: Patient data context
            
        Returns:
            Dictionary mapping placeholder names to generated content
        """
        try:
            placeholder_list = ", ".join(placeholders)
            prompt = f"""
You are a medical writer creating patient safety narratives. Based on the patient data provided, generate appropriate content for each of these placeholders: {placeholder_list}

Patient Data:
{patient_context}

Instructions:
- Generate professional, accurate medical content for each placeholder
- Use the patient data provided
- Maintain consistency with medical writing standards
- Keep content concise but comprehensive
- If information is missing, indicate "Not available" or "Not specified"

Please provide the content in this exact format:
PLACEHOLDER_NAME: [generated content here]

For example:
patient_id: P001
medical_history_summary: [generated summary]
clinical_assessment: [generated assessment]
"""

            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a professional medical writer specializing in patient safety narratives and regulatory documentation."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1000,  # Increased for multiple placeholders
                temperature=0.3
            )
            
            generated_text = response.choices[0].message.content.strip()
            
            # Parse the response to extract individual placeholder content
            content_dict = {}
            lines = generated_text.split('\n')
            current_placeholder = None
            current_content = []
            
            for line in lines:
                if ':' in line and any(ph in line for ph in placeholders):
                    # Save previous placeholder if exists
                    if current_placeholder and current_content:
                        content_dict[current_placeholder] = ' '.join(current_content).strip()
                    
                    # Start new placeholder
                    parts = line.split(':', 1)
                    current_placeholder = parts[0].strip()
                    current_content = [parts[1].strip()] if len(parts) > 1 else []
                elif current_placeholder and line.strip():
                    current_content.append(line.strip())
            
            # Save last placeholder
            if current_placeholder and current_content:
                content_dict[current_placeholder] = ' '.join(current_content).strip()
            
            logger.info(f"Generated content for {len(content_dict)} placeholders in single API call")
            return content_dict
            
        except Exception as e:
            logger.error(f"Error generating multiple AI content: {e}")
            return {placeholder: f"[Error generating content for {placeholder}]" for placeholder in placeholders}

    def populate_template(self, template_text: str, patient_data: pd.DataFrame, patient_index: int = 0) -> str:
        """
        Populate template with AI-generated content for a specific patient
        
        Args:
            template_text: Template text with placeholders
            patient_data: DataFrame with patient data
            patient_index: Index of patient to process
            
        Returns:
            Populated template text
        """
        if patient_index >= len(patient_data):
            raise ValueError(f"Patient index {patient_index} out of range. DataFrame has {len(patient_data)} rows.")
        
        patient_row = patient_data.iloc[patient_index]
        patient_context = self.prepare_patient_context(patient_row)
        placeholders = self.extract_placeholders(template_text)
        
        populated_template = template_text
        
        # Generate all content in a single API call
        logger.info(f"Generating content for {len(placeholders)} placeholders in single API call")
        generated_content = self.generate_multiple_content(placeholders, patient_context)
        
        # Replace all placeholders with generated content
        for placeholder in placeholders:
            content = generated_content.get(placeholder, f"[Error generating content for {placeholder}]")
            populated_template = populated_template.replace(f"{{{{{placeholder}}}}}", content)
        
        return populated_template
    
    def save_populated_template(self, populated_text: str, output_path: str):
        """
        Save populated template to Word document
        
        Args:
            populated_text: Populated template text
            output_path: Output file path
        """
        try:
            doc = Document()
            
            # Split text into paragraphs and add to document
            paragraphs = populated_text.split('\n')
            for para_text in paragraphs:
                if para_text.strip():
                    doc.add_paragraph(para_text)
            
            doc.save(output_path)
            logger.info(f"Saved populated template to {output_path}")
            
        except Exception as e:
            logger.error(f"Error saving populated template: {e}")
            raise
    
    def process_patient(self, data_file: str, template_file: str, output_file: str, patient_index: int = 0):
        """
        Complete workflow: load data, load template, populate, and save
        
        Args:
            data_file: Path to patient data file
            template_file: Path to template file
            output_file: Path for output file
            patient_index: Index of patient to process
        """
        logger.info(f"Processing patient {patient_index} from {data_file}")
        
        # Load data and template
        patient_data = self.load_patient_data(data_file)
        template_text = self.load_template(template_file)
        
        # Populate template
        populated_text = self.populate_template(template_text, patient_data, patient_index)
        
        # Save result
        self.save_populated_template(populated_text, output_file)
        
        logger.info(f"Successfully processed patient {patient_index}. Output saved to {output_file}")


def main():
    """
    Example usage of the AI Template Populator
    """
    # Initialize with API key (replace with your actual key or set OPENAI_API_KEY environment variable)
    api_key = #replace with key  
    try:
        populator = AITemplatePopulator(api_key=api_key)
        
        # Example file paths (replace with your actual files)
        data_file = "patient_data.csv"
        template_file = "template.docx"
        output_file = "populated_narrative.docx"
        
        # Process first patient
        populator.process_patient(
            data_file=data_file,
            template_file=template_file,
            output_file=output_file,
            patient_index=0
        )
        
        print("Template population completed successfully!")
        
    except Exception as e:
        logger.error(f"Error in main execution: {e}")
        print(f"Error: {e}")


if __name__ == "__main__":
    main()
