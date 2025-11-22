// --- PROJECT DATA ARRAY (Easily Scalable) ---
const allProjects = [
  {
    id: 1,
    title: "Blooms E-commerce Platform",
    description:
      "Developed a responsive e-commerce front-end, integrating product display and a seamless user checkout flow using React and CSS Grid.",
    image:
      "https://images.unsplash.com/photo-1520038410233-7141be749572?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["React", "CSS Grid", "UX", "Responsive"],
    liveUrl: "https://your-blooms-project-url.com",
    category: "react-bootstrap",
    featured: true, // Show on index.html
  },
  {
    id: 2,
    title: "Interactive Task Manager",
    description:
      "Built an intuitive task management application with a focus on drag-and-drop functionality and local storage persistence, leveraging vanilla JavaScript.",
    image:
      "https://images.unsplash.com/photo-1528659850125-10336214ed7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["JavaScript", "HTML", "CSS", "Local Storage"],
    liveUrl: "https://your-task-manager-project-url.com",
    category: "html-css-js",
    featured: true,
  },
  {
    id: 3,
    title: "Data Visualization Dashboard",
    description:
      "Designed and prototyped an interactive data dashboard concept, focusing on clear information architecture and responsive charting components.",
    image:
      "https://images.unsplash.com/photo-1549692520-cb9604130638?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["UX/UI", "Prototyping", "Information Architecture", "Vue"],
    liveUrl: "https://your-dashboard-project-url.com",
    category: "vue",
    featured: true,
  },
  {
    id: 4,
    title: "NextGen Blog Platform",
    description:
      "Server-side rendered blog platform utilizing Next.js for improved performance and SEO, with dynamic routing and data fetching.",
    image:
      "https://images.unsplash.com/photo-1499912093739-166e4a2e58c7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Next.js", "React", "Serverless", "Tailwind"],
    liveUrl: "https://your-nextjs-blog.com",
    category: "nextjs",
    featured: true, // Showing four projects on index
  },
  {
    id: 5,
    title: "Vanilla CSS & HTML Site",
    description:
      "A clean, modern static brochure website built using only semantic HTML5 and custom CSS for a lightweight, performant result.",
    image:
      "https://images.unsplash.com/photo-1542831371-29b1f74f7133?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["HTML5", "CSS3", "Responsive", "Accessibility"],
    liveUrl: "https://your-html-css-site.com",
    category: "html-css",
    featured: false,
  },
  {
    id: 6,
    title: "Python Data Scraper",
    description:
      "A Python script using BeautifulSoup to scrape data from a specific public source and format it into a clean CSV file.",
    image:
      "https://images.unsplash.com/photo-1621360061556-91e0d29d3807?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Python", "BeautifulSoup", "Data Analysis", "Scripting"],
    liveUrl: "https://github.com/eduaina/python-scraper",
    category: "python",
    featured: false,
  },
  {
    id: 7,
    title: "React State Management Demo",
    description:
      "A complex form application demonstrating global state management using Zustand for high performance and clean separation of concerns.",
    image:
      "https://images.unsplash.com/photo-1596554523315-467f53f3162b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["React", "Zustand", "State Management", "ES6+"],
    liveUrl: "https://your-zustand-demo.com",
    category: "react-zustand",
    featured: false,
  },
  {
    id: 8,
    title: "Angular Component Library",
    description:
      "A reusable set of Angular UI components built using TypeScript and best practices, focusing on modularity and performance.",
    image:
      "https://images.unsplash.com/photo-1593720216127-0240d86b72a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Angular", "TypeScript", "RxJS", "SCSS"],
    liveUrl: "https://your-angular-library.com",
    category: "angular",
    featured: false,
  },
];

// --- PROJECT CARD TEMPLATE FUNCTION ---
const createProjectCard = (project) => {
  // Generates the HTML string for a single project card
  const tagsHtml = project.tags.map((tag) => `<span>${tag}</span>`).join("");

  return `
        <div class="project-card animate-slide-up" data-category="${project.category}">
            <div class="project-image-wrapper">
                <img src="${project.image}" alt="Project Thumbnail: ${project.title}">
                <div class="project-overlay">
                    <a href="${project.liveUrl}" target="_blank" class="btn btn-live-preview" aria-label="View Live Project: ${project.title}">
                        <i class="fas fa-external-link-alt"></i> View Live
                    </a>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">${tagsHtml}</div>
            </div>
        </div>
    `;
};

// --- INITIALIZATION FUNCTION ---
document.addEventListener("DOMContentLoaded", () => {
  const isFullProjectsPage = document.getElementById("full-projects-container");

  if (isFullProjectsPage) {
    // --- Logic for projects-full.html (All projects & filtering) ---
    const container = isFullProjectsPage;
    const categoryButtons = document.querySelectorAll(".category-btn");

    // Initial render: show all projects
    renderProjects(allProjects, container);
    setupCategoryFiltering(categoryButtons, container);
  } else {
    // --- Logic for index.html (Featured projects) ---
    const container = document.querySelector("#projects .projects-grid");
    if (container) {
      // Show top 4 featured projects
      const featuredProjects = allProjects
        .filter((p) => p.featured)
        .slice(0, 4);
      renderProjects(featuredProjects, container);
    }
  }
});

// --- RENDER AND FILTER FUNCTIONS ---

function renderProjects(projectsToRender, container) {
  container.innerHTML = projectsToRender.map(createProjectCard).join("");
  // Re-apply intersection observer to new elements
  applyScrollAnimations(container.querySelectorAll(".animate-slide-up"));
}

function setupCategoryFiltering(buttons, container) {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const category = e.target.dataset.category;

      // Update active button
      buttons.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");

      // Filter projects
      const filteredProjects =
        category === "all"
          ? allProjects
          : allProjects.filter((p) => p.category === category);

      // Render filtered projects
      renderProjects(filteredProjects, container);
    });
  });
}

// This is a helper function used on the full projects page to re-apply animations
const applyScrollAnimations = (elements) => {
  if (!elements.length) return;
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.1 }
  );
  elements.forEach((el) => observer.observe(el));
};
