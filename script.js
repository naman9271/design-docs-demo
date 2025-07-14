// Fetch and render markdown
fetch('readme.md')
  .then(res => res.text())
  .then(md => {
    const html = marked.parse(md);
    document.getElementById('markdown-content').innerHTML = html;
    generateTOC();
  });

// Generate Table of Contents from markdown headings
function generateTOC() {
  const content = document.getElementById('markdown-content');
  const tocList = document.getElementById('toc-list');
  tocList.innerHTML = '';
  const headings = content.querySelectorAll('h1, h2, h3');
  headings.forEach((heading, idx) => {
    // Add anchor for smooth scroll
    const id = 'heading-' + idx;
    heading.id = id;
    const li = document.createElement('li');
    li.textContent = heading.textContent;
    li.style.marginLeft = (parseInt(heading.tagName[1]) - 1) * 16 + 'px';
    li.onclick = () => {
      document.getElementById(id).scrollIntoView({behavior: 'smooth'});
      document.querySelectorAll('#toc-list li').forEach(i => i.classList.remove('selected'));
      li.classList.add('selected');
    };
    tocList.appendChild(li);
  });
  // Select first by default
  if (tocList.firstChild) tocList.firstChild.classList.add('selected');
}

// Sidebar selection
const sideNavItems = document.querySelectorAll('.side-nav li');
sideNavItems.forEach(item => {
  item.onclick = function() {
    sideNavItems.forEach(i => i.classList.remove('selected'));
    this.classList.add('selected');
  };
});

function toggleTheme() {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle i');
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
  }
}
// Set default theme on load
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('light-mode');
});
