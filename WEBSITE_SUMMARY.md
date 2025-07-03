# Academic Website Summary: Shakked Noy

## Overview
This is the personal academic website for Shakked Noy, a third-year PhD student in Economics at MIT. The website is built using Jekyll and hosted on GitHub Pages at `shakkednoy.github.io`.

## Technical Architecture

### Framework & Hosting
- **Static Site Generator**: Jekyll
- **Hosting**: GitHub Pages
- **Domain**: Custom domain setup via CNAME file
- **Theme**: Custom academic theme with minimal, clean design

### File Structure
```
├── _config.yml           # Site configuration
├── _layouts/             # HTML templates
├── _includes/            # Reusable components
├── _sass/               # Sass stylesheets
├── assets/              # CSS, fonts, KaTeX math rendering
├── data/                # JSON data files for publications
├── js/                  # JavaScript for dynamic content
└── PDFs/                # Research papers and CV
```

## Key Features

### 1. **Responsive Design**
- Mobile-first approach with desktop optimizations
- Two-column layout on desktop (fixed sidebar + main content)
- Single-column layout on mobile devices
- Typography using Inter (body) and Merriweather (headings) fonts

### 2. **Dynamic Content Management**
- **JSON-driven research listings**: Publications, working papers, and other research are stored in separate JSON files
- **JavaScript-powered rendering**: `loadContent.js` dynamically populates research sections
- **Fallback content**: Static HTML fallbacks if JavaScript/JSON fails to load
- **Abstract toggling**: Collapsible abstracts with smooth animations

### 3. **Research Organization**
The website organizes research into three categories:
- **Working Papers** (`data/working-papers.json`)
- **Publications** (`data/publications.json`) 
- **Other Research** (`data/other-research.json`)

### 4. **Publication Features**
Each publication entry includes:
- Title, authors with links, publication venue/date
- PDF link to full paper
- Collapsible abstract with toggle functionality
- Additional links (replication packages, online appendices, media coverage)
- Custom icons for different link types (documents, replication archives, surveys)

### 5. **Professional Navigation**
- Clean header with site title and navigation menu
- **Research page**: Comprehensive publication list with detailed metadata
- **CV access**: Direct link to PDF CV
- **Contact information**: Email, GitHub, Twitter links in footer

### 6. **Mathematical Content Support**
- **KaTeX integration**: Full LaTeX math rendering support
- Font and styling optimized for academic content
- Auto-rendering of mathematical expressions

### 7. **Academic Aesthetic**
- **Color scheme**: Professional blue links (#0074D9), slate gray secondary links
- **Clean typography**: Optimized line spacing and font weights for readability
- **Minimal interface**: Focus on content over decoration
- **Academic conventions**: Proper citation formatting, co-author linking

## Content Areas

### Home Page (`index.md`)
- Professional headshot and bio
- Brief research interests description
- Abridged publication list with key papers
- Direct links to full research page and CV

### Research Page (`research.md`)
- Comprehensive publication list organized by category
- Detailed abstracts for each paper
- Links to replication materials and additional resources
- Co-author attribution with institutional links

### Data Structure
Research data is stored in structured JSON format with fields for:
- Title, authors (with links), publication details
- PDF links, abstracts, additional resources
- Flexible schema supporting various publication types

## Technical Highlights

### JavaScript Functionality
- **Dynamic loading**: Fetches JSON data and renders HTML
- **Error handling**: Graceful fallbacks for failed requests
- **Interactive elements**: Abstract toggles with SVG icons
- **Icon system**: Custom SVG icons for different resource types

### CSS Architecture
- **Modular stylesheets**: Separate files for different components
- **Responsive breakpoints**: Optimized for various screen sizes  
- **Custom classes**: Specialized styling for academic content
- **Hover effects**: Professional interaction feedback

### Jekyll Configuration
- **Clean URLs**: Permalink structure for SEO
- **Plugin support**: Jekyll-feed for RSS
- **Custom navigation**: Configurable menu system
- **Social links**: Structured external link management

## Current State
The website effectively serves as a professional academic portfolio with:
- 4+ major publications in top economics journals
- Interactive research presentation with detailed metadata
- Professional design suitable for academic job market
- Mobile-responsive layout for accessibility
- Structured data management for easy content updates

This architecture supports easy maintenance and updates while providing a professional platform for academic work presentation.