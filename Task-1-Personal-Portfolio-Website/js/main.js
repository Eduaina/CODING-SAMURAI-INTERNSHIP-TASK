document.addEventListener("DOMContentLoaded", () => {
  //clean Scroll for Nav
  document
    .querySelectorAll('a[href^="#"], a[href^="index.html#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        if (
          this.pathname === window.location.pathname ||
          this.pathname === "/index.html" ||
          this.pathname === "" ||
          this.getAttribute("href").startsWith("#")
        ) {
          e.preventDefault();

          if (this.getAttribute("href").startsWith("index.html#")) {
            window.location.href = this.getAttribute("href");
            return; // Stop further execution here, as page reload will handle scroll
          }

          const targetId = this.getAttribute("href").replace("index.html", "");
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

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("nav-open");
    });
  }

  //Highlight Active Nav Link on Scroll
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll(".nav-menu a");

  const highlightNavLink = () => {
    if (
      window.location.pathname.includes("projects-full.html") ||
      !sections.length
    ) {
      return;
    }

    let current = "";
    const headerHeight = document.querySelector(".header")?.offsetHeight || 0;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 20;
      const sectionHeight = section.clientHeight;
      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (
        link.getAttribute("href").includes(current) &&
        link.getAttribute("href").includes("#")
      ) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", highlightNavLink);
  if (!window.location.pathname.includes("projects-full.html")) {
    highlightNavLink();
  }

  //Dynamic Role Typewriter Effect
  const dynamicRoleElement = document.getElementById("dynamic-role");
  if (dynamicRoleElement) {
    const roles = [
      "Front-End Developer",
      "UI/UX Designer",
      "UX Researcher",
      "Technical Writer",
      "Promising Future Fullstack Developer",
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 60; 
    const deletingSpeed = 80; 
    const delayBetweenRoles = 1900; 

    function typeWriter() {
      const currentRole = roles[roleIndex];
      let displayText = currentRole.substring(0, charIndex);

      dynamicRoleElement.textContent = displayText; // Update the element

      if (!isDeleting && charIndex < currentRole.length) {
        // Typing
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
      } else if (isDeleting && charIndex > 0) {
        // Deleting
        charIndex--;
        setTimeout(typeWriter, deletingSpeed);
      } else if (!isDeleting && charIndex === currentRole.length) {
        // Paused at end of typing, start deleting after a delay
        isDeleting = true;
        setTimeout(typeWriter, delayBetweenRoles);
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeWriter, typingSpeed); 
      }
    }
    typeWriter(); 
  }

  // --- Intersection Observer for Scroll Animations (Fade-in/Slide-up)
  window.applyScrollAnimations = (elements) => {
    if (!elements || elements.length === 0) return;

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
      if (
        !element.closest("#hero") ||
        !element.classList.contains("animate-fade-in")
      ) {
        observer.observe(element);
      }
    });
  };


  window.applyScrollAnimations(
    document.querySelectorAll(".animate-slide-up, .animate-fade-in")
  );

  const heroContent = document.querySelector("#hero .animate-fade-in");
  if (heroContent) {
    heroContent.classList.add("is-visible");
  }

  //toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  if (themeToggle) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      body.classList.replace("light-theme", savedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      body.classList.replace("light-theme", "dark-theme");
      localStorage.setItem("theme", "dark-theme"); 
    }

    // Setting icon for current theme
    const updateThemeIcon = () => {
      if (body.classList.contains("dark-theme")) {
        themeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
      } else {
        themeToggle.querySelector("i").classList.replace("fa-sun", "fa-moon");
      }
    };
    updateThemeIcon(); 

  
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
  }

  const footer = document.querySelector('.footer');
  const footerContent = footer.querySelector('.container');
  const footerText = footerContent.querySelector('p');
  const today = new Date();
  const currentYear = today.getFullYear();
  const copyrightSymbol = "\u00A9"
  const owner = "Eduaina Brenda Ighalo. All rights reserved."
  footerText.innerText = `${copyrightSymbol} ${currentYear} ${owner}`;
});
