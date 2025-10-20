#!/usr/bin/env python3
"""
Setup script to install required dependencies
"""

import subprocess
import sys

def install_requirements():
    """
    Install required Python packages
    """
    packages = [
        "openai",  # OpenAI API
        # "anthropic",  # Anthropic version (commented out)
        "pandas", 
        "python-docx",
        "openpyxl"  # For Excel support
    ]
    
    print("Installing required packages...")
    
    for package in packages:
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
            print(f"✓ Installed {package}")
        except subprocess.CalledProcessError as e:
            print(f"✗ Failed to install {package}: {e}")

if __name__ == "__main__":
    install_requirements()
    print("\nSetup complete! Next steps:")
    print("1. Set your OpenAI API key: export OPENAI_API_KEY='your-key-here'")
    print("2. Run: python create_template.py")
    print("3. Run: python test_populator.py")
