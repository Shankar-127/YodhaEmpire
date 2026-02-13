// Route map used by navbar search and homepage search.
const languageRoutes = {
  "python": "python.html",
  "c": "c.html",
  "c++": "cpp.html",
  "java": "java.html",
  "javascript": "javascript.html",
  "html": "html.html",
  "css": "css.html",
  "react": "react.html",
  "node.js": "nodejs.html",
  "nodejs": "nodejs.html",
  "data structures": "data-structures.html",
  "algorithms": "algorithms.html",
  "dsa": "dsa.html",
  "oop": "oop.html",
  "dbms": "dbms.html",
  "operating systems": "operating-systems.html",
  "computer networks": "computer-networks.html",
  "computer organization": "computer-organization.html",
  "compiler design": "compiler-design.html",
  "theory of computation": "theory-of-computation.html",
  "discrete mathematics": "discrete-mathematics.html",
  "engineering mathematics": "engineering-mathematics.html",
  "digital logic": "digital-logic.html",
  "microprocessors": "microprocessors.html",
  "software engineering": "software-engineering.html",
  "machine learning": "machine-learning.html",
  "artificial intelligence": "artificial-intelligence.html",
  "deep learning": "deep-learning.html",
  "data science": "data-science.html",
  "cloud computing": "cloud-computing.html",
  "devops": "devops.html",
  "cybersecurity": "cybersecurity.html",
  "iot": "iot.html",
  "blockchain": "blockchain.html",
  "mobile development": "mobile-development.html",
  "system design": "system-design.html",
  "linux": "linux.html",
  "git and github": "git-and-github.html",
  "git & github": "git-and-github.html",
  "aptitude and reasoning": "aptitude-and-reasoning.html",
  "interview preparation": "interview-preparation.html",
  "php": "php.html",
  "sql": "sql.html"
};

const searchForm = document.getElementById("siteSearchForm");
const searchInput = document.getElementById("globalSearch");
const languagesGrid = document.getElementById("languagesGrid");
const languageCards = languagesGrid
  ? [...languagesGrid.querySelectorAll(".language-card")]
  : [];
const noResults = document.getElementById("searchEmptyState");

function normalize(value) {
  return value.trim().toLowerCase();
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 768px)").matches;
}

// Homepage live filtering for language cards.
function filterCards(query) {
  let visibleCount = 0;
  languageCards.forEach((card) => {
    const name = normalize(card.dataset.language || "");
    const match = name.includes(query);
    card.style.display = match ? "block" : "none";
    if (match) visibleCount += 1;
  });
  if (noResults) noResults.hidden = visibleCount > 0;
}

function navigateByQuery(query) {
  const route = languageRoutes[query];
  if (route) {
    window.location.href = route;
  }
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    if (isMobileViewport()) return;
    const query = normalize(searchInput.value);
    if (languagesGrid) filterCards(query);
  });
}

if (searchForm) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!searchInput) return;
    if (isMobileViewport() && !searchForm.classList.contains("open")) {
      searchForm.classList.add("open");
      searchInput.focus();
      return;
    }

    const query = normalize(searchInput.value || "");

    if (languagesGrid) {
      filterCards(query);
      const cardsSection = document.querySelector(".home-languages");
      if (cardsSection) {
        cardsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    navigateByQuery(query);
  });
}

if (searchForm && searchInput) {
  document.addEventListener("click", (event) => {
    const clickedInside = searchForm.contains(event.target);
    if (!clickedInside && searchForm.classList.contains("open")) {
      searchForm.classList.remove("open");
    }
  });
}

function setCurrentYear() {
  const yearElements = document.querySelectorAll(".current-year");
  const year = new Date().getFullYear();
  yearElements.forEach((el) => {
    el.textContent = year;
  });
}

setCurrentYear();

