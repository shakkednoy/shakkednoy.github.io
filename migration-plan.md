# Website Migration Plan: Shakked Noy → Charlie Rafkin Aesthetic

## Overview
This plan outlines the migration of shakkednoy.com from its current Jekyll-based minimal theme to adopt the aesthetic and layout of Charlie Rafkin's website, while preserving all existing content and maintaining the ability to rollback safely.

## Current State Analysis

### Shakked's Current Website (Jekyll-based)
- **Framework**: Jekyll with custom theme based on minimal template
- **Layout**: Single column, centered content with header navigation
- **Content Structure**: 
  - Home page with photo, bio, and inline research listings
  - Separate research page
  - CV linked as PDF
- **Styling**: Clean, minimal design using Sass
- **Content Management**: Markdown files with Jekyll frontmatter

### Charlie Rafkin's Website (Static HTML)
- **Framework**: Pure HTML/CSS/JavaScript (no Jekyll)
- **Layout**: Two-column fixed layout (left sidebar + right content area)
- **Content Structure**:
  - Fixed left sidebar with photo, bio, contact info
  - Right content area with dynamic paper listings
  - JSON-driven content for papers and publications
- **Styling**: Modern fonts (Inter, Merriweather), sophisticated CSS with hover effects
- **Content Management**: JSON files for dynamic content loading

## Key Differences to Address

1. **Architecture**: Jekyll-based vs. Static HTML
2. **Layout**: Single column vs. Two-column fixed layout
3. **Content Loading**: Static Markdown vs. Dynamic JSON
4. **Typography**: PT Sans vs. Inter/Merriweather font stack
5. **Interaction**: Minimal hover effects vs. Rich interactive elements
6. **Paper Display**: Inline HTML vs. JavaScript-generated from JSON

## Migration Strategy

### Phase 1: Safe Branch Creation and Backup
1. **Create backup branch**: `git checkout -b pre-migration-backup`
2. **Create development branch**: `git checkout -b rafkin-aesthetic-migration`
3. **Document current state**: Export current site structure and content

### Phase 2: Content Preservation and Conversion
1. **Extract Shakked's content**:
   - Bio text from `index.md`
   - Working papers list (1 paper: "Lost in Transmission")
   - Publications list (4 papers)
   - Contact information and social links
   
2. **Create JSON data files**:
   - `working-papers.json` - Convert Shakked's working papers
   - `publications.json` - Convert Shakked's publications
   - `config.json` - Store personal info, contact details

3. **Prepare assets**:
   - Optimize `shakkednoy.jpg` for sidebar display
   - Ensure CV and paper PDFs are accessible

### Phase 3: Template Migration
1. **Replace Jekyll structure with static HTML**:
   - Convert `_layouts/default.html` → `index.html` (Rafkin-style)
   - Remove Jekyll dependencies (`_config.yml`, `Gemfile`, `_sass/`, `_includes/`)
   
2. **Implement Rafkin's layout structure**:
   - Left sidebar (fixed, 20% width) with photo and bio
   - Right content area (65% width) with research sections
   - Responsive design for mobile screens

3. **Adapt CSS styling**:
   - Copy and customize `main.css` from Rafkin's site
   - Preserve Shakked's color preferences where appropriate
   - Ensure proper font loading (Inter, Merriweather)

### Phase 4: Dynamic Content Integration
1. **Implement JavaScript functionality**:
   - Copy and adapt `loadWP.js` for paper loading
   - Modify JSON structure to match Shakked's content
   - Implement abstract toggle functionality
   
2. **Create content files**:
   - `working-papers.json` with Shakked's working paper
   - `publications.json` with Shakked's 4 publications
   - Ensure proper author linking and PDF paths

### Phase 5: Navigation and Features
1. **Implement navigation**:
   - Keep Research/CV navigation structure
   - Adapt contact links (email, GitHub, Twitter)
   - Ensure proper CV PDF linking

2. **Add missing features**:
   - Favicon and meta tags
   - Google Analytics (optional)
   - Social media icons matching Shakked's preferences

### Phase 6: Testing and Refinement
1. **Local testing**:
   - Test all paper links and PDF downloads
   - Verify responsive design on different screen sizes
   - Check abstract toggle functionality
   - Validate all external links

2. **Content verification**:
   - Ensure all research papers are properly displayed
   - Verify author information and affiliations
   - Check publication dates and venue information

### Phase 7: Deployment Strategy

#### Safe Deployment Options:

**Option A: Gradual Rollout**
1. Deploy to a testing subdomain first
2. Test thoroughly with stakeholders
3. Switch main domain once confirmed

**Option B: Branch-based Deploy**
1. Keep current site on `master` branch
2. Deploy new site from `rafkin-aesthetic-migration` branch
3. Switch branches only after testing

**Option C: Backup-first Deploy**
1. Tag current version: `git tag v1.0-original`
2. Merge migration branch to master
3. Deploy new version
4. Keep tagged version for instant rollback

## Rollback Strategy

### Immediate Rollback (if issues detected)
1. **Git-based rollback**: 
   ```bash
   git checkout pre-migration-backup
   git push origin pre-migration-backup:master --force
   ```

2. **Tagged version rollback**:
   ```bash
   git checkout v1.0-original
   git push origin HEAD:master --force
   ```

### Partial Rollback Options
- Rollback specific files (CSS, JS) while keeping content updates
- Revert to Jekyll while maintaining updated content
- Switch between branches for A/B testing

## File Structure Changes

### Current Structure (Jekyll)
```
├── _config.yml
├── _layouts/default.html
├── _sass/*.sass
├── assets/css/*.sass
├── index.md
├── research.md
├── cv.pdf
└── [paper PDFs]
```

### New Structure (Static HTML)
```
├── index.html
├── css/main.css
├── js/loadWP.js
├── data/
│   ├── working-papers.json
│   └── publications.json
├── assets/
│   ├── shakkednoy-photo.jpg
│   ├── cv.pdf
│   └── papers/[PDFs]
└── [supporting files]
```

## Risk Mitigation

### Technical Risks
- **Jekyll removal**: Loss of build system - *Mitigated by static HTML approach*
- **Link breakage**: URL structure changes - *Mitigated by maintaining same paths*
- **Mobile compatibility**: Layout issues - *Mitigated by responsive CSS*

### Content Risks
- **Data loss**: Research content missing - *Mitigated by comprehensive content audit*
- **PDF access**: Broken document links - *Mitigated by path verification*
- **SEO impact**: Changed meta structure - *Mitigated by proper meta tag implementation*

### Rollback Risks
- **Git conflicts**: Branch merge issues - *Mitigated by clean branching strategy*
- **Deployment delays**: Slow rollback process - *Mitigated by tagged versions*

## Timeline Estimate

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Backup & Branch | 0.5 hours | None |
| Phase 2: Content Extraction | 1-2 hours | Content audit complete |
| Phase 3: Template Migration | 3-4 hours | Phase 2 complete |
| Phase 4: Dynamic Content | 2-3 hours | Phase 3 complete |
| Phase 5: Navigation & Features | 1-2 hours | Phase 4 complete |
| Phase 6: Testing | 2-3 hours | Phase 5 complete |
| Phase 7: Deployment | 1 hour | All testing complete |

**Total Estimated Time**: 10-15 hours over 2-3 days

## Success Criteria

### Functional Requirements
- ✅ All existing content preserved and accessible
- ✅ Research papers display correctly with abstracts
- ✅ CV and external links work properly
- ✅ Mobile-responsive design
- ✅ Fast loading times

### Aesthetic Requirements
- ✅ Two-column layout matching Rafkin's design
- ✅ Inter/Merriweather font stack implemented
- ✅ Hover effects and interactive elements working
- ✅ Clean, professional appearance
- ✅ Consistent spacing and typography

### Safety Requirements
- ✅ Ability to rollback within 5 minutes if needed
- ✅ No data loss during migration
- ✅ All URLs continue to work
- ✅ SEO ranking maintained

## Post-Migration Monitoring

### Week 1: Immediate monitoring
- Monitor for broken links or display issues
- Check mobile compatibility across devices
- Verify search engine indexing
- Monitor site performance metrics

### Month 1: Extended monitoring
- Track user engagement and bounce rates
- Monitor for any missing content reports
- Verify all paper downloads working
- Check for any accessibility issues

This migration plan provides a comprehensive, safe approach to transforming Shakked's website aesthetic while preserving all content and maintaining the ability to quickly rollback if any issues arise.