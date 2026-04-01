#!/usr/bin/env bash
# Protopack Template Setup Script
# Usage: ./scripts/setup.sh [react|lit]
# No argument = quick setup (React default)

set -e  # Exit on error

FRAMEWORK="${1:-react}"

echo "🚀 Protopack Template Setup"
echo ""

# Validate framework choice
if [[ "$FRAMEWORK" != "react" && "$FRAMEWORK" != "lit" ]]; then
  echo "❌ Error: Framework must be 'react' or 'lit'"
  echo "Usage: ./scripts/setup.sh [react|lit]"
  exit 1
fi

echo "📦 Framework: $FRAMEWORK"
echo ""

# Check if examples directory exists
if [ ! -d "examples/$FRAMEWORK" ]; then
  echo "❌ Error: examples/$FRAMEWORK/ directory not found"
  exit 1
fi

# Copy files from example to root using rsync
echo "📁 Copying files from examples/$FRAMEWORK/..."
rsync -a \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=pnpm-lock.yaml \
  --exclude=.auth \
  --exclude=.worktrees \
  "examples/$FRAMEWORK/" .

if [ $? -ne 0 ]; then
  echo "❌ Error: Failed to copy files"
  exit 1
fi

echo "✅ Files copied successfully"
echo ""

# Update CLAUDE.md configuration section
echo "📝 Updating CLAUDE.md..."
if [ -f CLAUDE.md ]; then
  # macOS sed requires -i with backup extension, Linux doesn't
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/\*\*Framework:\*\* .*/\*\*Framework:\*\* $FRAMEWORK/" CLAUDE.md
    sed -i '' "s/\*\*Status:\*\* .*/\*\*Status:\*\* ✅ Setup complete/" CLAUDE.md
  else
    sed -i "s/\*\*Framework:\*\* .*/\*\*Framework:\*\* $FRAMEWORK/" CLAUDE.md
    sed -i "s/\*\*Status:\*\* .*/\*\*Status:\*\* ✅ Setup complete/" CLAUDE.md
  fi
  echo "✅ CLAUDE.md updated"
else
  echo "⚠️  Warning: CLAUDE.md not found, skipping update"
fi
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

if [ $? -ne 0 ]; then
  echo "❌ Error: Failed to install dependencies"
  exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Validate with lint and build
echo "🔍 Running validation..."
echo "   → Type checking and linting..."
pnpm run lint

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Validation failed: Lint errors found"
  echo "Please fix the errors and run setup again."
  exit 1
fi

echo "   → Building..."
pnpm run build

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Validation failed: Build errors found"
  echo "Please fix the errors and run setup again."
  exit 1
fi

echo "✅ Validation passed"
echo ""

# Delete SETUP.md on success
if [ -f SETUP.md ]; then
  rm -f SETUP.md
  echo "🗑️  SETUP.md deleted"
fi

echo ""
echo "✨ Setup complete! Framework: $FRAMEWORK"
echo ""
echo "Next steps:"
echo "  1. Run 'pnpm dev' to start the development server"
echo "  2. Open https://localhost:5173 in your browser"
echo "  3. Set up Playwright auth if needed: 'pnpm playwright:auth'"
echo ""
