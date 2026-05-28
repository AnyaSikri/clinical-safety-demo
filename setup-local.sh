#!/bin/bash
set -e

echo "🚀 Setting up Listing Intelligence Brief on your local machine..."

# Find the user's home directory and create the Claude Code folder
USER_HOME="$HOME"
CLAUDE_CODE_DIR="$USER_HOME/Claude Code"
PROJECT_DIR="$CLAUDE_CODE_DIR/listing-brief"

echo "📁 Creating directory: $PROJECT_DIR"
mkdir -p "$CLAUDE_CODE_DIR"

# Clone or copy the project
if [ -d "$PROJECT_DIR" ]; then
    echo "⚠️  Directory exists. Cleaning it..."
    rm -rf "$PROJECT_DIR"
fi

echo "📦 Cloning the project..."
cd "$CLAUDE_CODE_DIR"
git clone https://github.com/AnyaSikri/clinical-safety-demo.git temp-clone
cd temp-clone
git checkout claude/session-011CUa1ySaXP2u2VhFZEGHMs

echo "📋 Copying listing-brief folder..."
cp -r listing-brief "$CLAUDE_CODE_DIR/"
cd "$CLAUDE_CODE_DIR"
rm -rf temp-clone

echo "📂 Moving into project directory..."
cd "$PROJECT_DIR"

echo "📦 Installing dependencies..."
npm install

echo "🔑 Setting up API key..."
if [ -n "$ANTHROPIC_API_KEY" ]; then
    echo "ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY" > .env.local
    echo "✓ Using API key from environment variable"
else
    echo "ANTHROPIC_API_KEY=your-api-key-here" > .env.local
    echo "⚠️  Please edit .env.local and add your Anthropic API key"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📍 Project location: $PROJECT_DIR"
echo ""
echo "🎯 Next steps:"
echo "   cd \"$PROJECT_DIR\""
echo "   npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser!"
