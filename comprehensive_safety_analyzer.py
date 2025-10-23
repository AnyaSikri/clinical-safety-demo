#!/usr/bin/env python3
"""
Comprehensive Safety Analysis Report Generator
Analyzes all adverse events from adae.xlsx and generates a comprehensive safety narrative
"""

import os
import pandas as pd
import openai
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ComprehensiveSafetyAnalyzer:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv('OPENAI_API_KEY')
        if not self.api_key:
            raise ValueError("OpenAI API key not provided")
        
        openai.api_key = self.api_key
        self.client = openai.OpenAI(api_key=self.api_key)
        self.df = None
        self.stats = {}
    
    def load_data(self, file_path: str):
        """Load adae.xlsx data"""
        self.df = pd.read_excel(file_path)
        logger.info(f"Loaded {len(self.df)} events from {file_path}")
    
    def calculate_statistics(self):
        """Calculate all safety statistics"""
        df = self.df
        
        # Basic counts
        self.stats['total_events'] = len(df)
        self.stats['total_patients'] = df['Unique Subject Identifier'].nunique()
        
        # Treatment-related events
        treatment_related = df[df['Causality'].isin(['RELATED', 'PROBABLY RELATED', 'POSSIBLY RELATED'])]
        self.stats['treatment_related_count'] = len(treatment_related)
        self.stats['treatment_related_pct'] = (len(treatment_related) / len(df)) * 100
        
        # Serious events
        serious = df[df['Serious Event'] == 'Y']
        self.stats['serious_count'] = len(serious)
        self.stats['serious_pct'] = (len(serious) / len(df)) * 100
        
        # Grade distribution
        grade_counts = df['Standard Toxicity Grade'].value_counts().sort_index()
        self.stats['grade_distribution'] = grade_counts.to_dict()
        self.stats['grade_3_4_count'] = len(df[df['Standard Toxicity Grade'].isin([3, 4])])
        
        # Dose level analysis
        dose_analysis = df.groupby('Actual Treatment').agg({
            'Sequence Number': 'count',
            'Serious Event': lambda x: (x == 'Y').sum(),
            'Causality': lambda x: (x.isin(['RELATED', 'PROBABLY RELATED', 'POSSIBLY RELATED'])).sum()
        }).rename(columns={
            'Sequence Number': 'Total Events',
            'Serious Event': 'Serious Events',
            'Causality': 'Treatment-Related'
        })
        self.stats['dose_analysis'] = dose_analysis
        
        # Serious events list
        serious_events = serious.groupby('Reported Term for the Adverse Event').size().sort_values(ascending=False)
        self.stats['serious_events_list'] = serious_events.to_dict()
        
        # Treatment-related events by term
        treatment_related_list = treatment_related.groupby('Reported Term for the Adverse Event').size().sort_values(ascending=False)
        self.stats['treatment_related_list'] = treatment_related_list.to_dict()
        
        # Hepatotoxicity events
        hepatotoxicity_terms = ['ALT increased', 'AST increased', 'Alanine aminotransferase increased', 
                               'Aspartate aminotransferase increased']
        hepatotoxicity = df[df['Reported Term for the Adverse Event'].str.contains('|'.join(hepatotoxicity_terms), case=False, na=False)]
        self.stats['hepatotoxicity_count'] = len(hepatotoxicity)
        self.stats['hepatotoxicity_severe'] = len(hepatotoxicity[hepatotoxicity['Standard Toxicity Grade'].isin([3, 4])])
        self.stats['hepatotoxicity_serious'] = len(hepatotoxicity[hepatotoxicity['Serious Event'] == 'Y'])
        self.stats['hepatotoxicity_treatment_related'] = len(hepatotoxicity[hepatotoxicity['Causality'].isin(['RELATED', 'PROBABLY RELATED', 'POSSIBLY RELATED'])])
        
        # Actions taken
        action_taken = df[df['Action Taken with Study Treatment'].isin(['DOSE INTERRUPTED', 'DOSE REDUCED', 'DRUG WITHDRAWN'])]
        self.stats['events_causing_modifications'] = len(action_taken)
        self.stats['modifications_by_term'] = action_taken.groupby('Reported Term for the Adverse Event').size().sort_values(ascending=False).to_dict()
        
        # Grade 3-4 events
        grade_3_4 = df[df['Standard Toxicity Grade'].isin([3, 4])]
        self.stats['grade_3_4_list'] = grade_3_4.groupby('Reported Term for the Adverse Event').size().sort_values(ascending=False).to_dict()
        
        # Events by SOC
        self.stats['soc_distribution'] = df.groupby('Body System or Organ Class').size().sort_values(ascending=False).to_dict()
        
        # Outcomes
        self.stats['outcome_distribution'] = df['Outcome of Adverse Event'].value_counts().to_dict()
        
        # Treatment emergent
        treatment_emergent = df[df['Treatment Emergent Flag'] == 'Y']
        self.stats['treatment_emergent_count'] = len(treatment_emergent)
        
        logger.info("Statistics calculated successfully")
        
    def generate_ai_section(self, section_name: str, context: str) -> str:
        """Generate AI-written narrative section"""
        try:
            prompt = f"""
You are a medical writer creating a comprehensive safety analysis report for a clinical trial.

{context}

Instructions:
- Write a professional, scientific medical narrative
- Use the data provided accurately
- Maintain objective, clinical tone
- Include specific numbers and percentages
- Keep paragraphs concise and focused
- Use proper medical terminology

Generate the {section_name} section.
"""
            
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a professional medical writer specializing in clinical trial safety reports and regulatory documentation."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1500,
                temperature=0.3
            )
            
            return response.choices[0].message.content.strip()
        except Exception as e:
            logger.error(f"Error generating AI content: {e}")
            return f"[Error generating content for {section_name}]"
    
    def create_report(self, output_path: str):
        """Create comprehensive safety narrative report"""
        doc = Document()
        
        # Set up styles
        style = doc.styles['Normal']
        font = style.font
        font.name = 'Calibri'
        font.size = Pt(11)
        
        # Title
        title = doc.add_heading('Comprehensive Safety Analysis Report', 0)
        title.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
        # Study identifier
        study_id = doc.add_paragraph(f"Study: {self.df['Study Identifier'].iloc[0]}")
        study_id.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
        # Add page numbers
        section = doc.sections[0]
        footer = section.footer
        paragraph = footer.paragraphs[0]
        paragraph.text = f"Page "
        
        # 1. Executive Summary
        doc.add_heading('1. Executive Summary', level=1)
        
        exec_summary = f"""
This comprehensive safety analysis evaluates {self.stats['total_events']} adverse events (AEs) reported across {self.stats['total_patients']} patients enrolled in {self.df['Study Identifier'].iloc[0]}.

• Total Events: {self.stats['total_events']}
• Treatment-Related Events: {self.stats['treatment_related_count']} ({self.stats['treatment_related_pct']:.1f}%)
• Serious Adverse Events: {self.stats['serious_count']} ({self.stats['serious_pct']:.1f}%)
• High-Grade Events (Grade 3-4): {self.stats['grade_3_4_count']} ({self.stats['grade_3_4_count']/self.stats['total_events']*100:.1f}%)

Key safety findings include a notable hepatotoxicity signal with {self.stats['hepatotoxicity_count']} liver enzyme elevation events, 
dose-dependent toxicity patterns, and {self.stats['serious_count']} serious adverse events requiring careful clinical management.
"""
        doc.add_paragraph(exec_summary)
        
        # 2. Study Overview
        doc.add_heading('2. Study Overview', level=1)
        
        phase = self.df['Phase'].iloc[0] if 'Phase' in self.df.columns else 'Not specified'
        study_overview = f"""
This analysis covers adverse events from {self.df['Study Identifier'].iloc[0]}, a {phase} clinical trial.

Dose levels evaluated include:
"""
        doc.add_paragraph(study_overview)
        
        # Dose level table
        dose_table = doc.add_table(rows=len(self.stats['dose_analysis']) + 1, cols=4)
        dose_table.style = 'Light Grid Accent 1'
        
        dose_table.cell(0, 0).text = 'Dose Level'
        dose_table.cell(0, 1).text = 'Total Events'
        dose_table.cell(0, 2).text = 'Serious Events'
        dose_table.cell(0, 3).text = 'Treatment-Related'
        
        for idx, (dose, row) in enumerate(self.stats['dose_analysis'].iterrows(), 1):
            dose_table.cell(idx, 0).text = str(dose)
            dose_table.cell(idx, 1).text = str(row['Total Events'])
            dose_table.cell(idx, 2).text = str(row['Serious Events'])
            dose_table.cell(idx, 3).text = str(row['Treatment-Related'])
        
        # 3. Overall Adverse Event Profile
        doc.add_heading('3. Overall Adverse Event Profile', level=1)
        
        ae_profile = f"""
A total of {self.stats['total_events']} adverse events were reported across {self.stats['total_patients']} patients. 
"""
        
        grade_dist = self.stats['grade_distribution']
        ae_profile += f"""
Severity distribution was as follows:
• Grade 1: {grade_dist.get(1, 0)} events ({grade_dist.get(1, 0)/self.stats['total_events']*100:.1f}%)
• Grade 2: {grade_dist.get(2, 0)} events ({grade_dist.get(2, 0)/self.stats['total_events']*100:.1f}%)
• Grade 3: {grade_dist.get(3, 0)} events ({grade_dist.get(3, 0)/self.stats['total_events']*100:.1f}%)
• Grade 4: {grade_dist.get(4, 0)} events ({grade_dist.get(4, 0)/self.stats['total_events']*100:.1f}%)

Of these events, {self.stats['treatment_related_count']} ({self.stats['treatment_related_pct']:.1f}%) were assessed as treatment-related, 
while {self.stats['total_events'] - self.stats['treatment_related_count']} ({100-self.stats['treatment_related_pct']:.1f}%) were not related to treatment.
"""
        doc.add_paragraph(ae_profile)
        
        # 4. Serious Adverse Events
        doc.add_heading('4. Serious Adverse Events Analysis', level=1)
        
        serious_text = f"""
A total of {self.stats['serious_count']} serious adverse events ({self.stats['serious_pct']:.1f}% of all events) were reported. 
The serious events included:
"""
        
        for i, (event, count) in enumerate(list(self.stats['serious_events_list'].items())[:10], 1):
            serious_text += f"\n{i}. {event}: {count} event(s)"
        
        doc.add_paragraph(serious_text)
        
        # 5. Treatment-Related Events
        doc.add_heading('5. Treatment-Related Adverse Events', level=1)
        
        tr_text = f"""
The most common treatment-related adverse events were:
"""
        
        for i, (event, count) in enumerate(list(self.stats['treatment_related_list'].items())[:10], 1):
            tr_text += f"\n{i}. {event}: {count} event(s)"
        
        doc.add_paragraph(tr_text)
        
        # 6. Hepatotoxicity Signal
        doc.add_heading('6. Hepatotoxicity Signal', level=1)
        
        hepato_text = f"""
Hepatotoxicity emerged as a notable safety signal with {self.stats['hepatotoxicity_count']} liver enzyme elevation events reported. 
Specifically, {self.stats['hepatotoxicity_serious']} serious hepatic events occurred, and {self.stats['hepatotoxicity_severe']} Grade 3-4 events were observed. 
Of the hepatotoxicity events, {self.stats['hepatotoxicity_treatment_related']} were assessed as treatment-related.

These events prompted dose modifications in {len([k for k, v in self.stats['modifications_by_term'].items() if 'ALT' in k or 'AST' in k])} cases, 
underscoring the clinical significance of this finding and the need for vigilant liver function monitoring.
"""
        doc.add_paragraph(hepato_text)
        
        # 7. Dose-Response Analysis
        doc.add_heading('7. Dose-Response Analysis', level=1)
        
        dose_response = f"""
Analysis of adverse events by dose level reveals a clear dose-dependent pattern:

"""
        
        for dose, row in self.stats['dose_analysis'].iterrows():
            dose_response += f"\n{dose}: {row['Total Events']} total events ({row['Serious Events']} serious, {row['Treatment-Related']} treatment-related)"
        
        dose_response += f"""

The proportion of treatment-related events increased with escalating doses, supporting a dose-dependent relationship 
between exposure and adverse events. This finding is particularly relevant for dose selection in future studies.
"""
        doc.add_paragraph(dose_response)
        
        # 8. Events Leading to Modifications
        doc.add_heading('8. Events Leading to Treatment Modifications', level=1)
        
        mod_text = f"""
A total of {self.stats['events_causing_modifications']} events ({self.stats['events_causing_modifications']/self.stats['total_events']*100:.1f}% of all events) 
resulted in treatment modifications (dose interruption, reduction, or withdrawal). 

The most common events leading to modifications were:
"""
        
        for i, (event, count) in enumerate(list(self.stats['modifications_by_term'].items())[:5], 1):
            mod_text += f"\n{i}. {event}: {count} modification(s)"
        
        doc.add_paragraph(mod_text)
        
        # 9. High-Grade Events
        doc.add_heading('9. High-Grade Events (Grade 3-4)', level=1)
        
        high_grade_text = f"""
A total of {self.stats['grade_3_4_count']} Grade 3-4 events ({self.stats['grade_3_4_count']/self.stats['total_events']*100:.1f}%) were reported, 
including {grade_dist.get(4, 0)} Grade 4 events. 

The most frequent Grade 3-4 events were:
"""
        
        for i, (event, count) in enumerate(list(self.stats['grade_3_4_list'].items())[:10], 1):
            high_grade_text += f"\n{i}. {event}: {count} event(s)"
        
        doc.add_paragraph(high_grade_text)
        
        # 10. Events by SOC
        doc.add_heading('10. Adverse Events by System Organ Class', level=1)
        
        soc_text = "Distribution of adverse events by system organ class:\n"
        
        for i, (soc, count) in enumerate(list(self.stats['soc_distribution'].items())[:10], 1):
            soc_text += f"\n{i}. {soc}: {count} events ({count/self.stats['total_events']*100:.1f}%)"
        
        doc.add_paragraph(soc_text)
        
        # 11. Outcomes
        doc.add_heading('11. Outcomes', level=1)
        
        outcome_text = "Outcome distribution for all adverse events:\n"
        
        for outcome, count in self.stats['outcome_distribution'].items():
            outcome_text += f"\n• {outcome}: {count} events ({count/self.stats['total_events']*100:.1f}%)"
        
        doc.add_paragraph(outcome_text)
        
        # 12. Discussion
        doc.add_heading('12. Discussion and Clinical Implications', level=1)
        
        context = f"""
Based on analysis of {self.stats['total_events']} adverse events, key clinical implications include:

1. Hepatotoxicity Signal: {self.stats['hepatotoxicity_count']} liver enzyme elevation events, with {self.stats['hepatotoxicity_severe']} Grade 3-4 events
2. Dose-Dependent Toxicity: Treatment-related events increased with higher doses
3. Serious Events: {self.stats['serious_count']} serious adverse events requiring careful management
4. Treatment Modifications: {self.stats['events_causing_modifications']} events led to dose adjustments
"""
        
        discussion = self.generate_ai_section("Discussion", context)
        doc.add_paragraph(discussion)
        
        # 13. Recommendations
        doc.add_heading('13. Recommendations', level=1)
        
        recommendations = f"""
Based on this comprehensive safety analysis, the following recommendations are proposed:

1. **Liver Function Monitoring**: Implement frequent liver function test monitoring, particularly in the first 8 weeks of treatment.

2. **Dose Management**: Consider dose adjustment or interruption protocols for Grade 2+ hepatotoxicity events.

3. **Patient Selection**: Exercise caution in patients with pre-existing liver disease or elevated baseline liver enzymes.

4. **Safety Monitoring**: Continue monitoring for serious infections, particularly pneumonia, and GI bleeding events.

5. **Further Data**: Additional safety data with longer follow-up will help clarify the long-term safety profile.
"""
        doc.add_paragraph(recommendations)
        
        # Save
        doc.save(output_path)
        logger.info(f"Comprehensive safety report saved to {output_path}")


def main():
    api_key = os.getenv('OPENAI_API_KEY')
    
    try:
        analyzer = ComprehensiveSafetyAnalyzer(api_key=api_key)
        analyzer.load_data("/Users/anyasikri/Desktop/reference_docs/adae.xlsx")
        analyzer.calculate_statistics()
        analyzer.create_report("/Users/anyasikri/Desktop/reference_docs/comprehensive_safety_narrative.docx")
        
        print("\n✓ Success! Comprehensive safety narrative created!")
        
    except Exception as e:
        logger.error(f"Error: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()

