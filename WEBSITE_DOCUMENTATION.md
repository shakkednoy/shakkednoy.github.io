# Website Documentation

## Overview

This is a personal academic website for Shakked Noy, built using a hybrid approach combining Jekyll configuration with modern HTML/CSS/JavaScript. The site displays research papers, publications, and personal information in a clean, academic format.

## Site Architecture

### Core Files

- **`index.html`** - Main page containing the complete website layout
- **`_config.yml`** - Jekyll configuration file controlling navigation and site metadata
- **`css/main.css`** - Primary stylesheet with responsive design
- **`js/loadContent.js`** - JavaScript for dynamic content loading from JSON files

### Content Management

All research content is managed through JSON data files in the `data/` directory:

- **`data/working-papers.json`** - Working papers (unpublished research)
- **`data/publications.json`** - Published papers
- **`data/other-research.json`** - Policy papers, theses, and other research
- **`data/config.json`** - Personal information and contact details

### Navigation

Navigation is controlled by the `navigation` section in `_config.yml`:
```yaml
navigation:
  - {url: "/cv.pdf", title: "CV"}
```

## How to Update Different Parts of the Website

### 1. Adding/Editing Working Papers

**File:** `data/working-papers.json`

**Structure:**
```json
{
  "title": "Paper Title",
  "authors": [
    {"name": "Author Name", "link": "https://author-website.com/"}
  ],
  "date": "Month Year",
  "pdf": "filename.pdf",
  "abstract": "Abstract text here...",
  "extraLinks": [
    {"text": "Link Text", "url": "https://example.com/"}
  ]
}
```

### 2. Adding/Editing Publications

**File:** `data/publications.json`

Same structure as working papers, but typically includes journal information in the `date` field:
```json
"date": "Journal Name, Year, Volume(Issue), p.Page-Range"
```

### 3. Adding/Editing Other Research

**File:** `data/other-research.json`

Same structure as above. Can include an `appendedText` field for additional information:
```json
"appendedText": "Special issue information or additional notes"
```

### 4. Updating Personal Information

**File:** `data/config.json`

Contains bio, contact information, and social links.

### 5. Adding Navigation Items

**File:** `_config.yml`

Add items to the `navigation` array:
```yaml
navigation:
  - {file: "page.md", title: "Page Title"}
  - {url: "/file.pdf", title: "Link Title"}
```

### 6. Styling Changes

**File:** `css/main.css`

- Uses Inter font for body text and Merriweather for headings
- Responsive two-column layout (left sidebar, right content)
- Custom styles for links, abstracts, and icons

## File Organization

### Static Assets
- **PDF files** - Research papers stored in root directory
- **Images** - Profile photos (`shakkednoy.jpg`, etc.)
- **`cv.pdf`** - Current CV

### Jekyll Structure
- **`_includes/`** - Reusable HTML components (menu, sidebar, etc.)
- **`_layouts/`** - Page templates
- **`_sass/`** - Sass stylesheets
- **`assets/`** - Additional assets (fonts, icons)

## Dynamic Content Loading

The website uses JavaScript (`js/loadContent.js`) to:

1. Load research data from JSON files
2. Generate HTML for each paper with:
   - Title and author links
   - Publication information with automatic journal name italicization
   - Expandable abstracts with toggle functionality
   - Extra links with custom icons (replication packages, appendices, etc.)
3. Provide fallback content if JSON loading fails

## Key Features

### Abstract Toggle System
- Abstracts are hidden by default with `+` icon
- Click to expand/collapse with `−` icon
- Unique IDs generated for each abstract

### Link Icons
- Document icon for general links
- Terminal icon for replication archives
- User icon for survey instruments

### Responsive Design
- Two-column layout on desktop
- Single column on mobile
- Flexible image sizing

## Troubleshooting

### Content Not Updating
1. Check JSON syntax in data files
2. Verify PDF files exist in root directory
3. Clear browser cache
4. Check browser console for JavaScript errors

### Navigation Issues
1. Verify `_config.yml` syntax
2. Check file paths in navigation entries
3. Ensure referenced files exist

### Styling Problems
1. Check CSS syntax in `css/main.css`
2. Verify font imports are loading
3. Test responsive breakpoints

## Deployment

The site is hosted on GitHub Pages. Changes are automatically deployed when pushed to the `master` branch.

### Important Files for GitHub Pages
- **`CNAME`** - Custom domain configuration
- **`_config.yml`** - Jekyll configuration
- **`index.html`** - Entry point (takes precedence over Jekyll defaults)