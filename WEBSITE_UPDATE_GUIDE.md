# Website Update Guide

This guide explains how to update your academic website's content and features.

## File Structure Overview

- **`index.html`** - Main homepage (this is the live version, not index.md)
- **`data/working-papers.json`** - Working papers content
- **`data/publications.json`** - Published papers content  
- **`data/other-research.json`** - Other research content
- **`js/loadContent.js`** - JavaScript that renders the JSON data
- **`css/main.css`** - Website styling
- **`_layouts/default.html`** - Template for Jekyll pages (like research.md)

## Adding/Updating Papers

### 1. Working Papers (`data/working-papers.json`)
```json
{
  "title": "Paper Title",
  "authors": [
    {"name": "Author Name", "link": "https://author-website.com/"}
  ],
  "date": "November 2024",
  "pdf": "filename.pdf",
  "abstract": "Paper abstract text...",
  "extraLinks": [
    {
      "text": "Online Appendix", 
      "url": "appendix.pdf"
    }
  ]
}
```

### 2. Publications (`data/publications.json`)
```json
{
  "title": "Paper Title",
  "authors": [
    {"name": "Author Name", "link": "https://author-website.com/"}
  ],
  "date": "Journal Name, 2023, 381(6654), p.187-192",
  "pdf": "filename.pdf",
  "abstract": "Paper abstract...",
  "extraLinks": [
    {
      "text": "Replication Package",
      "url": "https://osf.io/xyz123/"
    }
  ]
}
```

### 3. Other Research (`data/other-research.json`)
Same format as publications. Use `"appendedText"` field for additional notes that appear after the citation.

## Key Features

### Author Links
- Include full URLs with https://
- Leave `"link": ""` empty to display name without hyperlink
- Author names automatically formatted with proper conjunctions

### Journal Name Formatting
- JavaScript automatically italicizes journal names in citations
- Excludes "Working Paper", "Thesis", and date-only formats
- Handles common academic journals automatically

### Abstract Toggle
- Uses + (collapsed) and − (expanded) symbols
- Automatically generated unique IDs for each paper
- Smooth show/hide functionality

### Extra Links
- Support for replication packages, appendices, media coverage
- Custom icons for different link types (documents, archives, surveys)
- Flexible text and URL structure

## Styling Updates

### Image/Photo Changes
- Main photo: `css/main.css` → img selector
- Current: 182px mobile, 210px desktop
- Remove centering: delete `display: block; margin: 0 auto;`

### Color Scheme
- Primary links: `#0074D9` (blue)
- Secondary links: `slategray`
- Hover effects: 2px underline thickness

## Content Updates

### Homepage Bio
- Edit `index.html` directly (not index.md)
- Bio text in the left sidebar under `<h1>Shakked Noy</h1>`
- Contact links and CV button also in left sidebar

### Research Page
- Uses Jekyll template: `research.md`
- Powered by same JSON files as homepage
- Includes detailed abstracts and full publication lists

## Common Tasks

### Adding a New Paper
1. Add entry to appropriate JSON file (`working-papers.json`, `publications.json`, or `other-research.json`)
2. Upload PDF to root directory
3. Test locally, then commit and push to GitHub

### Updating Author Information
1. Find author entries across all JSON files
2. Update `"link"` field with new URL
3. Use find/replace for multiple occurrences

### Removing Papers
1. Delete entry from JSON file
2. Consider moving to different category instead of full removal
3. Update any static fallback content in `index.html` if applicable

### Changing Abstract Toggle Style
- Edit `js/loadContent.js` → `toggleAbstract()` function
- Current uses +/− symbols, previously used arrow SVGs
- Modify icon definitions and toggle logic together

## Deployment

1. Make changes to files
2. Commit via GitHub Desktop with descriptive message
3. Push to origin (GitHub automatically deploys via Pages)
4. Changes appear at shakkednoy.com within a few minutes

## Troubleshooting

### Content Not Appearing
- Check if JSON is valid (use JSON validator)
- Verify JavaScript console for errors
- Ensure PDF files are uploaded to repository
- Check that JSON file names match what JavaScript expects

### Styling Issues  
- Check `css/main.css` for conflicting rules
- Use browser dev tools to inspect elements
- Test both mobile and desktop responsive layouts

### JavaScript Errors
- Check browser console for error messages
- Verify JSON file syntax and structure
- Ensure all required fields are present in entries