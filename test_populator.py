#!/usr/bin/env python3
"""
Test script for the AI Template Populator
"""

import os
from ai_template_populator import AITemplatePopulator

def test_ai_populator():
    """
    Test the AI Template Populator with sample data
    """
    print("Testing AI Template Populator...")
    
    # OpenAI API key - set via environment variable for security
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        print("ERROR: Please set your OpenAI API key as an environment variable:")
        print("export OPENAI_API_KEY='your-api-key-here'")
        return
    
    try:
        # Initialize the populator
        populator = AITemplatePopulator(api_key=api_key)
        
        # Test with sample data
        data_file = "sample_patient_data.csv"
        template_file = "sample_template.docx"
        output_file = "test_output.docx"
        
        # Check if files exist
        if not os.path.exists(data_file):
            print(f"ERROR: {data_file} not found. Please create sample data first.")
            return
            
        if not os.path.exists(template_file):
            print(f"ERROR: {template_file} not found. Please create template first.")
            return
        
        # Process first patient
        print(f"Processing patient from {data_file}...")
        populator.process_patient(
            data_file=data_file,
            template_file=template_file,
            output_file=output_file,
            patient_index=0
        )
        
        print(f"SUCCESS! Populated template saved to {output_file}")
        
        # Show what was processed
        import pandas as pd
        df = pd.read_csv(data_file)
        print(f"\nProcessed patient data:")
        print(df.iloc[0].to_string())
        
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    test_ai_populator()
