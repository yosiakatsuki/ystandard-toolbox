# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**yStandard Toolbox** is a commercial WordPress plugin that extends the free yStandard theme with custom Gutenberg blocks, design settings, and utility features. Current version: 2.0.0-alpha.

## Common Development Commands

### Environment Management
```bash
npm run start                # Start wp-env + import data + open browser (http://localhost:10020)
npm run watch                # Development mode with file watching for all assets
npm run build                # Production build of all assets
npm run stop                 # Export data and stop environment
```

### Code Quality
```bash
npm run lint                 # Lint all code (JS, CSS, PHP)
npm run test                 # Run all tests (PHPUnit + Jest)
npm run format               # Format code with Prettier
```

### Build Distribution
```bash
npm run zip                  # Create plugin distribution zip
```

## Architecture Overview

### Dual Build System
- **Legacy blocks** (`/blocks/`) - Traditional WordPress blocks with classic JS/SCSS
- **Modern components** (`/src/`) - TypeScript/React components using aktk framework
- **Plugin settings** (`/src/plugin-settings/`) - React-based admin interface
- **Core PHP** (`/inc/`) - Backend functionality with `ystandard_toolbox` namespace

### Key Directories
```
src/
├── block-library/          # Modern TypeScript blocks  
├── plugin-settings/        # React admin interface
├── blocks/                 # Shared block utilities
└── js/                    # Legacy JavaScript

blocks/                     # Legacy block implementations
inc/                       # PHP backend classes
build/ & dist/             # Compiled assets
css/ & js/                 # Final compiled output
```

### Build Pipeline
- **4 separate webpack configs** for different asset types
- **SASS → PostCSS** pipeline with Tailwind CSS integration
- **TypeScript** with strict configuration and path aliases (`@aktk/*`, `@ystdtb/*`)
- **Babel** transpilation for legacy JavaScript

### TypeScript Path Aliases
```typescript
@aktk/function/*         → src/blocks/function/*
@aktk/components/*       → src/blocks/components/*  
@aktk/utils/*           → src/blocks/utils/*
@ystdtb/*               → src/js/*
```

## Development Patterns

### WordPress Integration
- Uses WordPress Scripts as primary build tool
- Follows WordPress coding standards (ESLint, PHPCS, Stylelint)
- Block development with `@wordpress/scripts` and Gutenberg API
- REST API endpoints in PHP with namespace `ystandard_toolbox`

### Component Architecture  
- **aktk-block-components** library for reusable React components
- Hook-based state management in modern blocks
- Config-based attribute management in legacy blocks
- Responsive design utilities integrated with theme system

### Testing Setup
- **PHPUnit** 8.5+ with WordPress test framework at `/phpunit/`
- **Jest** for JavaScript component testing at `/test/`
- Integration tests for block validation and full content

### CSS Architecture
- **Tailwind CSS** with custom design tokens (preflight disabled)
- **SMACSS** property ordering via CSS Declaration Sorter
- Theme-specific responsive breakpoints: `mobile`, `tablet`, `desktop`
- PostCSS with Autoprefixer and CSSnano optimization

## Development Environment

### WordPress Environment
- Runs on ports 10020 (dev) and 10021 (tests)  
- Japanese WordPress version with yStandard theme required
- Data persistence via `.wp-content/` directory
- Auto-imports yStandard Blocks plugin

### Code Quality Tools
- **ESLint** with WordPress + Tailwind CSS rules
- **Prettier** with WordPress configuration  
- **PHP CodeSniffer** with WordPress standards
- **Husky** git hooks for automated quality checks

## Plugin Requirements

- **WordPress**: 6.1+ (Japanese version preferred)
- **PHP**: 7.4+
- **yStandard Theme**: 4.36.0+
- **Node.js**: Compatible with @wordpress/scripts

## Key Features

### Block System
- 15+ custom Gutenberg blocks (Box, Slider, FAQ, Timeline, Posts, etc.)
- Block extensions for responsive visibility controls
- Block patterns and category management
- Live preview system for design changes

### Design System
- Header/subheader design customization with live preview
- Heading style editor with preset management
- Custom CSS editor with CodeMirror integration
- Font family management and web font loading

### Content Management
- Page-specific SEO settings (title, meta description)
- Archive layout controls with responsive options  
- Navigation enhancements and CTA management
- Copyright text customization with template variables