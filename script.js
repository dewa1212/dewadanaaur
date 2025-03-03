document.addEventListener("DOMContentLoaded", function () {
  // Animasi Sidebar Mobile
  const hamburger = document.querySelector(".hamburger");
  const sidebar = document.querySelector(".sidebar");
  const closeSidebar = document.querySelector(".close-sidebar");
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      sidebar.classList.add("active");
    });
  }

  if (closeSidebar) {
    closeSidebar.addEventListener("click", function () {
      sidebar.classList.remove("active");
    });
  }

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function () {
      sidebar.classList.remove("active");
    });
  });

  // Animasi Elemen Muncul saat Scroll dan Page Load
  const animateElements = document.querySelectorAll(".animate-element");

  function checkAnimate() {
    animateElements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      if (elementTop < viewportHeight) {
        setTimeout(() => {
          element.classList.add("animate");
        }, 100 * index);
      }
    });
  }

  checkAnimate();
  window.addEventListener("scroll", checkAnimate);

  // Animasi Scroll Header
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("shadow-on-scroll", window.scrollY > 50);
  });

  // Highlight Active Nav Link saat Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("header nav ul li a");

  function setActiveNavLink() {
    let currentSectionId = "";

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - section.offsetHeight / 4) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href").substring(1) === currentSectionId);
    });
  }

  window.addEventListener("scroll", setActiveNavLink);
  setActiveNavLink();

  // Smooth Scroll Navigation
  document.querySelectorAll("header nav ul li a, .sidebar-nav a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetElement = document.getElementById(this.getAttribute("href").substring(1));
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop - header.offsetHeight, behavior: "smooth" });
      }
      sidebar.classList.remove("active");
    });
  });
});
