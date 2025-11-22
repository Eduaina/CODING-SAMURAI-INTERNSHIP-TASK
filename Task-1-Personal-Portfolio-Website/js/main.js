document.addEventListener("DOMContentLoaded", () => {
  // --- Smooth Scrolling for Navigation Links ---
  document
    .querySelectorAll('a[href^="#"], a[href^="index.html#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        // Only prevent default if it's an internal hash link on the current page
        if (
          this.pathname === window.location.pathname ||
          this.pathname === "/index.html" ||
          this.pathname === "" ||
          this.getAttribute("href").startsWith("#")
        ) {
          e.preventDefault();

          // If on full projects page, navigate to index first, then scroll.
          if (this.getAttribute("href").startsWith("index.html#")) {
            window.location.href = this.getAttribute("href");
            return;
          }

          const targetId = this.getAttribute("href").replace("index.html", ""); // Clean hash if index.html is prepended
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            const headerOffset = document.querySelector(".header").offsetHeight;
            const elementPosition =
              targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }

        // Close mobile nav after clicking
        if (navMenu.classList.contains("active")) {
          navToggle.classList.remove("active");
          navMenu.classList.remove("active");
          document.body.classList.remove("nav-open");
        }
      });
    });

  // --- Mobile Navigation Toggle ---
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("nav-open");
  });

  // --- Highlight Active Nav Link on Scroll ---
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll(".nav-menu a");

  const highlightNavLink = () => {
    if (window.location.pathname.includes("projects-full.html")) return; // Skip on full projects page

    let current = "";
    sections.forEach((section) => {
      const sectionTop =
        section.offsetTop - document.querySelector(".header").offsetHeight - 20; // Added extra buffer
      const sectionHeight = section.clientHeight;
      if (
        pageYOffset >= sectionTop &&
        pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      // Check link href against current section ID
      if (
        link.getAttribute("href").includes(current) &&
        link.getAttribute("href").includes("#")
      ) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", highlightNavLink);
  highlightNavLink();

  // --- Intersection Observer for Scroll Animations (Fade-in/Slide-up) ---
  const applyScrollAnimations = (elements) => {
    if (!elements) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    elements.forEach((element) => {
      // Exclude hero content if it has animate-fade-in, as it's visible by default
      if (
        !element.closest("#hero") ||
        !element.classList.contains("animate-fade-in")
      ) {
        observer.observe(element);
      }
    });
  };

  applyScrollAnimations(
    document.querySelectorAll(".animate-slide-up, .animate-fade-in")
  );

  // Ensure hero content starts visible
  const heroContent = document.querySelector("#hero .animate-fade-in");
  if (heroContent) {
    heroContent.classList.add("is-visible");
  }

  // --- Dark/Light Theme Toggle ---
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // 1. Check LocalStorage for saved preference (defaults to light if none saved)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.replace("light-theme", savedTheme);
  }

  // Set icon based on current theme
  const updateThemeIcon = () => {
    if (body.classList.contains("dark-theme")) {
      themeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
    } else {
      themeToggle.querySelector("i").classList.replace("fa-sun", "fa-moon");
    }
  };
  updateThemeIcon();

  // 2. Add event listener for toggle
  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("light-theme")) {
      body.classList.replace("light-theme", "dark-theme");
      localStorage.setItem("theme", "dark-theme");
    } else {
      body.classList.replace("dark-theme", "light-theme");
      localStorage.setItem("theme", "light-theme");
    }
    updateThemeIcon();
  });
});
