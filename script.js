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

  if (sidebarLinks) {
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", function () {
        sidebar.classList.remove("active");
      });
    });
  }

  // Animasi Elemen Muncul saat Scroll dan Page Load
  const animateElements = document.querySelectorAll(".animate-element");

  function checkAnimate() {
    animateElements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      if (elementTop < viewportHeight && elementBottom >= 0) {
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
    if (window.scrollY > 50) {
      header.classList.add("shadow-on-scroll");
    } else {
      header.classList.remove("shadow-on-scroll");
    }
  });

  // Highlight Active Nav Link saat Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("header nav ul li a");

  function setActiveNavLink() {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 4) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href").substring(1) === currentSectionId) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNavLink);
  setActiveNavLink();

  // Smooth Scroll Navigation
  const allNavLinks = document.querySelectorAll(
    "header nav ul li a, .sidebar-nav a"
  );

  allNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - header.offsetHeight,
          behavior: "smooth",
        });
      }

      if (sidebar && sidebar.classList.contains("active")) {
        sidebar.classList.remove("active");
      }
    });
  });

  // ULASAN SCRIPT
  // Modal Detail Gambar Functions
  const modal = document.getElementById("gambarModal");
  const modalImg = document.getElementById("modalGambar"); // Pastikan modalImg dideklarasikan lagi
  const captionText = document.getElementById("modalCaption");

  function openModal(imgElement) {
    console.log("openModal function called"); // Debugging log

    if (!modal || !captionText) {
      console.error("Error: Modal elements not found!");
      return; // Hentikan fungsi jika elemen modal tidak ditemukan
    }

    // **MODIFIED: Display image and caption on all devices - NOW FOR MOBILE TOO!**
    console.log("Modal mode: Displaying image and caption for ALL devices (including mobile)"); // Debugging log - Clarified message
    modalImg.src = imgElement.src; // Tampilkan gambar
    modalImg.style.display = "block"; // Ensure image is displayed - IMPORTANT for mobile too!
    captionText.innerHTML = imgElement.dataset.caption;


    // Tampilkan modal (tanpa animasi untuk contoh sederhana)
    modal.style.display = "flex";
    modal.style.opacity = "1";
    modal.style.visibility = "visible";

    console.log("Modal display style set to flex:", modal.style.display); // DEBUG: Check modal display
    console.log("Modal opacity set to 1:", modal.style.opacity);       // DEBUG: Check modal opacity
    console.log("Modal visibility set to visible:", modal.style.visibility); // DEBUG: Check modal visibility

    document.body.style.overflow = "hidden";
    console.log("Modal should be shown now - WITH IMAGE ON MOBILE TOO!"); // Debugging log - Clarified message
  }

  function closeModal() {
    console.log("closeModal function called"); // Debugging log

    if (!modal) {
      console.error("Error: Modal element not found!");
      return; // Hentikan fungsi jika elemen modal tidak ditemukan
    }

    // Animasi modal - Sembunyikan modal tanpa animasi untuk testing
    modal.style.display = "none";
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";

    document.body.style.overflow = "auto";
    console.log("Modal should be hidden now"); // Debugging log
  }

  // Close modal when clicking outside of modal-content
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      closeModal();
    }
  });

  const slider = document.querySelector(".list-ulasan");
  const cards = document.querySelectorAll(".card-ulasan");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const pagination = document.querySelector(".pagination");

  // Clone first and last slides for infinite loop (tetap ada)
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);
  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, cards[0]);

  let isDragging = false;
  let startPos = 0;
  let currentTranslate = -cards[0].offsetWidth;
  let prevTranslate = currentTranslate;
  let currentIndex = 0;
  let animationID = 0;

  // Set initial position (tetap ada)
  slider.style.transform = `translateX(${currentTranslate}px)`;

  // Create pagination dots (tetap ada)
  cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    pagination.appendChild(dot);
  });

  function goToSlide(index) {
    currentIndex = index;
    currentTranslate = -(currentIndex + 1) * cards[0].offsetWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
    updateDots();
  }

  function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Touch events (tetap ada)
  slider.addEventListener("touchstart", touchStart);
  slider.addEventListener("touchmove", touchMove);
  slider.addEventListener("touchend", touchEnd);

  // Mouse events (tetap ada)
  slider.addEventListener("mousedown", touchStart);
  slider.addEventListener("mousemove", touchMove);
  slider.addEventListener("mouseup", touchEnd);
  slider.addEventListener("mouseleave", touchEnd);

  function touchStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    slider.style.cursor = "grabbing";
  }

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }

  function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    slider.style.cursor = "grab";

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100) {
      currentIndex++;
    }
    if (movedBy > 100) {
      currentIndex--;
    }

    if (currentIndex < -1) {
      currentIndex = cards.length - 1;
    } else if (currentIndex >= cards.length) {
      currentIndex = 0;
    }

    setPositionByIndex();
  }

  function getPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }

  function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  }

  function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  function setPositionByIndex() {
    currentTranslate = -(currentIndex + 1) * cards[0].offsetWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
    updateDots();

    // Handle infinite scroll transition (tetap ada)
    if (currentIndex === -1) {
      setTimeout(() => {
        slider.style.transition = "none";
        currentIndex = cards.length - 1;
        currentTranslate = -(currentIndex + 1) * cards[0].offsetWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
        setTimeout(() => {
          slider.style.transition = "transform 0.5s ease";
        }, 10);
      }, 500);
    } else if (currentIndex === cards.length) {
      setTimeout(() => {
        slider.style.transition = "none";
        currentIndex = 0;
        currentTranslate = -(currentIndex + 1) * cards[0].offsetWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
        setTimeout(() => {
          slider.style.transition = "transform 0.5s ease";
        }, 10);
      }, 500);
    }
  }

  // Button controls (tetap ada)
  prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < -1) {
      currentIndex = cards.length - 1;
    }
    setPositionByIndex();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= cards.length) {
      currentIndex = 0;
    }
    setPositionByIndex();
  });

  // Prevent context menu on long press (tetap ada)
  window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  // Handle window resize (tetap ada)
  window.addEventListener("resize", () => {
    setPositionByIndex();
  });
});
