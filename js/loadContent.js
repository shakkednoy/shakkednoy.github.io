function populatePapers(jsonList, containerID, addPeriodBeforeDate) {
  if (addPeriodBeforeDate === undefined) {
    addPeriodBeforeDate = true;
  }
  
  const papersList = document.getElementById(containerID);
  if (!papersList) {
    console.error(`Container with ID ${containerID} not found`);
    return;
  }
  
  papersList.innerHTML = '';

  // SVG Document Icon
  const documentIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
      style="vertical-align: middle; position: relative; top: -1.5px;"
      xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2H14L20 8V22H6V2Z"></path>
        <path d="M14 2V8H20"></path>
        <line x1="10" y1="12" x2="16" y2="12"></line>
        <line x1="10" y1="16" x2="16" y2="16"></line>
  </svg>`;
  
  // Plus icon (default state - collapsed)
  const plusIcon = `<span style="vertical-align: middle; position: relative; top: -1.5px; left:1px; font-weight: bold; font-size: 14px;" class="toggle-icon">+</span>`;
  
  // Replication archive icon (terminal icon)
  const replicationArchiveIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="14" height="14" style="vertical-align: middle; position: relative; top: -1.5px;">
    <rect x="0" y="0" width="100" height="100" rx="16" ry="16" fill="#708090"/>
    <path d="M25 30 L45 40 L25 50" fill="none" stroke="white" stroke-width="6" stroke-linecap="round"/>
    <rect x="55" y="45" width="20" height="4" fill="white" rx="2" ry="2"/>
  </svg>`;
  
  // Survey instruments icon
  const surveyInstrumentsIcon = `<svg width="14" height="14" viewBox="0 0 24 24" style="vertical-align: middle; position: relative; top: -1.5px;" fill="slategray" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>`;
  
  jsonList.forEach((paper) => {
    let extraLinksHTML = '';
    if (paper.extraLinks) {
      paper.extraLinks.forEach(link => {
        const cleanedText = link.text.replace(/\\|"/g, '').trim();
        
        const isReplicationArchive = cleanedText.toLowerCase().includes("replication archive");
        const isSurveyInstruments = cleanedText.toLowerCase().includes("survey");
        const icon = isReplicationArchive ? replicationArchiveIcon : 
                     isSurveyInstruments ? surveyInstrumentsIcon : 
                     documentIcon;
        
        extraLinksHTML += `<a href="${link.url}" class="graylinks">${icon} ${isReplicationArchive ? '&nbsp;' : ''}${link.text}</a>`;
      });
    }
    
    function formatAuthor(author) {
      const suffix = author.suffix || '';
      return '<a href="' + author.link + '">' + author.name + '</a>' + suffix;
    }

    let authorsHTML = '';
    if (paper.authors && paper.authors.length > 0) {
      if (paper.authors.length === 1) {
        authorsHTML = formatAuthor(paper.authors[0]);
      } else if (paper.authors.length === 2) {
        authorsHTML = paper.authors.map(formatAuthor).join(' and ');
      } else {
        authorsHTML = paper.authors.slice(0, -1).map(formatAuthor).join(', ') +
                      ', and ' +
                      formatAuthor(paper.authors[paper.authors.length - 1]);
      }
    }
    
    let html = `<a href="${paper.pdf}">${paper.title}</a>`;
    
    if (authorsHTML) {
      html += `, with ${authorsHTML}`;
    }
    
    // Parse the date to italicize only journal names
    let dateWithItalics = paper.date;
    
    // Only italicize if it contains a journal name (not just years or "Working Paper" etc)
    if (!dateWithItalics.includes('Working Paper') && 
        !dateWithItalics.includes('Thesis') && 
        !dateWithItalics.match(/^\w+ \d{4}$/)) { // Not just "Month Year"
      
      // Common journal patterns to italicize
      dateWithItalics = dateWithItalics.replace(
        /(Science|Nature|Cell|PNAS|American Economic Review|Quarterly Journal of Economics|Review of Economic Studies|ILR Review|Economic Journal|European Economic Review|Journal of [^,]+|Frontiers in [^,]+|CESifo Working Paper|Essays on Longtermism)/,
        '<em>$1</em>'
      );
    }
    
    // Also handle "In [book title]" format
    if (dateWithItalics.startsWith('In ')) {
      dateWithItalics = dateWithItalics.replace(/In ([^,]+),/, 'In <em>$1</em>,');
    }
    
    html += `<br>${dateWithItalics}`;
    
    if (paper.appendedText) {
      html += ` ${paper.appendedText}`;
    }
    
    const abstractId = `ab-${paper.title.replace(/\s+/g, '-').replace(/[^\w-]/g, '').toLowerCase()}`;
    
    html += `
      <ul style="position: relative; left: -40px;">
        <a onclick="toggleAbstract('${abstractId}')" class="graylinks abstract-toggle">${plusIcon} Abstract</a>
        ${extraLinksHTML}
        <p id="${abstractId}" class="abstract-hide">
          ${paper.abstract}
        </p>
      </ul>
      <br/>
    `;
    
    papersList.innerHTML += html;
  });
}

function toggleAbstract(id) {
  const abstract = document.getElementById(id);
  if (!abstract) return;
  
  const toggleIcon = event.currentTarget.querySelector('.toggle-icon');
  
  if (abstract.classList.contains('abstract-hide')) {
    abstract.classList.remove('abstract-hide');
    abstract.classList.add('abstract-show');
    if (toggleIcon) toggleIcon.textContent = '−';
  } else {
    abstract.classList.remove('abstract-show');
    abstract.classList.add('abstract-hide');
    if (toggleIcon) toggleIcon.textContent = '+';
  }
}

// Load content when page loads
document.addEventListener("DOMContentLoaded", function() {
  // Load working papers and publications into one research section.
  Promise.all([
    fetch('data/working-papers.json'),
    fetch('data/publications.json')
  ])
    .then(responses => {
      const failedResponse = responses.find(response => !response.ok);
      if (failedResponse) {
        throw new Error('Network response was not ok ' + failedResponse.statusText);
      }
      return Promise.all(responses.map(response => response.json()));
    })
    .then(([workingPapers, publications]) => {
      populatePapers([...workingPapers, ...publications], 'researchList');
    })
    .catch(error => {
      console.error("Fetch error for research data:", error);
      // Keep the static HTML fallback if either JSON file fails to load.
    });

  // Load other research (if container exists)
  const otherResearchContainer = document.getElementById('otherResearchList');
  if (otherResearchContainer) {
    fetch('data/other-research.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(papers => {
        populatePapers(papers, 'otherResearchList', true);
      })
      .catch(error => {
        console.error("Fetch error for other-research.json:", error);
        // Keep the static HTML fallback if JSON fails
      });
  }
});
