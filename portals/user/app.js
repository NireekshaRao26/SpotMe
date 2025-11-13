import { SpotMe } from "../shared/scripts/core.js";

const events = [
  {
    id: "wedding-rs",
    name: "Riya & Shaan Wedding",
    date: "2025-12-19",
    location: "Jaipur, India",
    cover:
      "https://images.unsplash.com/photo-1530023367847-a683933f4177?auto=format&fit=crop&w=900&q=80",
    lock: "8732"
  },
  {
    id: "fest-nr",
    name: "NeonRush College Fest",
    date: "2025-11-28",
    location: "IIT Bombay",
    cover:
      "https://images.unsplash.com/photo-1545156521-77bd85671d79?auto=format&fit=crop&w=900&q=80",
    lock: "2045"
  },
  {
    id: "marathon-cc",
    name: "Coastal Charge Marathon",
    date: "2026-01-07",
    location: "Chennai Marina",
    cover:
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=900&q=80",
    lock: "5519"
  },
  {
    id: "corp-xp",
    name: "XPlore Annual Summit",
    date: "2025-12-05",
    location: "Bengaluru Convention Center",
    cover:
      "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=900&q=80",
    lock: "9180"
  }
];

const gallerySeed = [
  {
    src: "https://images.unsplash.com/photo-1542317854-0d6d3cd88cce?auto=format&fit=crop&w=600&q=80",
    label: "Reception entrance",
    meta: "4 matches"
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    label: "Sangeet moments",
    meta: "2 matches"
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    label: "Haldi celebrations",
    meta: "1 new"
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    label: "Couple portraits",
    meta: "8 matches"
  },
  {
    src: "https://images.unsplash.com/photo-1511288599420-5146b5481294?auto=format&fit=crop&w=600&q=80",
    label: "Dance floor",
    meta: "3 matches"
  }
];

const state = {
  activeEvent: null,
  currentPage: "landing"
};

const byId = (id) => document.getElementById(id);

// Navigation system
const showPage = (pageId) => {
  // Hide all sections first
  document.querySelectorAll(".portal-section").forEach((section) => {
    section.classList.add("hidden");
  });
  
  const target = byId(pageId);
  if (target) {
    // Use transition for smooth effect
    SpotMe.transitionPage(() => {
      target.classList.remove("hidden");
      // Only scroll if not already visible
      if (target.offsetParent === null || !target.getBoundingClientRect().top) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
  state.currentPage = pageId;
  
  // Update nav buttons
  document.querySelectorAll(".spotme-nav button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.target === pageId);
  });
};

const initTimeline = () => {
  const track = byId("timeline-track");
  events.forEach((event) => {
    const card = SpotMe.createElement("article", { class: "timeline-card" }, [
      SpotMe.createElement("img", { src: event.cover, alt: event.name }),
      SpotMe.createElement("div", { class: "timeline-card-content" }, [
        SpotMe.createElement("span", { class: "spotme-card-date" }, [
          SpotMe.formatDate(event.date)
        ]),
        SpotMe.createElement("h3", {}, [event.name]),
        SpotMe.createElement("div", { class: "timeline-card-meta" }, [
          "📍",
          event.location
        ]),
        SpotMe.createElement(
          "button",
          {
            class: "spotme-button",
            on: {
              click: () => {
                state.activeEvent = event;
                const input = byId("event-password-input");
                if (input) {
                  input.value = "";
                  input.setAttribute("placeholder", `Password: ${event.lock}`);
                }
                showPage("event-access");
                SpotMe.showToast(`Selected: ${event.name}`, "info");
              }
            }
          },
          ["Access Event"]
        )
      ])
    ]);
    track.appendChild(card);
  });

  SpotMe.initSwipeControls(
    track,
    document.getElementById("timeline-prev"),
    document.getElementById("timeline-next")
  );
};

const bindNav = () => {
  document.querySelectorAll(".spotme-nav button").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.target;
      if (target) showPage(target);
    });
  });
};

const initEventAccess = () => {
  const unlockBtn = byId("unlock-event");
  const passwordInput = byId("event-password-input");
  
  unlockBtn?.addEventListener("click", () => {
    const password = passwordInput?.value.trim();
    if (!password) {
      SpotMe.showToast("Please enter an access code", "error");
      return;
    }
    
    // Check if password matches any event
    const matchedEvent = events.find(e => e.lock === password);
    if (matchedEvent) {
      state.activeEvent = matchedEvent;
      SpotMe.showToast(`Access granted! Welcome to ${matchedEvent.name}`, "success");
      setTimeout(() => {
        showPage("dashboard");
      }, 1000);
    } else {
      SpotMe.showToast("Invalid access code. Please try again.", "error");
    }
  });

  // QR Scanner button
  document.querySelector('[data-modal]')?.addEventListener("click", () => {
    SpotMe.showToast("QR Scanner feature coming soon!", "info");
  });
};

const initDashboard = () => {
  byId("go-to-upload")?.addEventListener("click", () => {
    showPage("upload");
  });
  
  byId("go-to-find")?.addEventListener("click", () => {
    showPage("find");
  });
};

const initUploadPage = () => {
  byId("back-to-dashboard")?.addEventListener("click", () => {
    showPage("dashboard");
  });

  const dropzone = byId("upload-dropzone-page");
  const input = byId("upload-input-page");
  
  SpotMe.handleDropzone(dropzone, {
    onDrop: (files) => {
      if (files.length > 15) {
        SpotMe.showToast("Maximum 15 files allowed", "error");
        return;
      }
      const info = dropzone.querySelector("p");
      info.textContent = `${files.length} file(s) ready to upload`;
      const progressContainer = dropzone.parentElement.querySelector(".spotme-progress");
      SpotMe.simulateProgress(progressContainer, () => {
        SpotMe.showToast("Upload successful! Photos found.", "success");
        info.textContent = "Uploaded successfully!";
        setTimeout(() => {
          showPage("results");
          renderGallery();
        }, 1500);
      });
    }
  });
};

const initFindPage = () => {
  byId("back-to-dashboard-find")?.addEventListener("click", () => {
    showPage("dashboard");
  });

  const captureBtn = byId("capture-selfie-page");
  const uploadBtn = byId("upload-selfie-page");
  const fileInput = byId("selfie-input-page");

  captureBtn?.addEventListener("click", () => {
    SpotMe.showToast("Searching for your photos...", "info");
    setTimeout(() => {
      SpotMe.showToast("Photos found! Showing results.", "success");
      showPage("results");
      renderGallery();
    }, 2000);
  });

  uploadBtn?.addEventListener("click", () => fileInput?.click());
  fileInput?.addEventListener("change", () => {
    if (fileInput.files.length) {
      SpotMe.showToast("Searching for your photos...", "info");
      setTimeout(() => {
        SpotMe.showToast("Photos found! Showing results.", "success");
        showPage("results");
        renderGallery();
      }, 2000);
    }
  });
};

const initResults = () => {
  byId("back-to-dashboard-results")?.addEventListener("click", () => {
    showPage("dashboard");
  });
};

const toggleModal = (id, show = true) => {
  const modal = byId(id);
  if (!modal) return;
  modal.classList.toggle("hidden", !show);
  document.body.style.overflow = show ? "hidden" : "";
};

const initModals = () => {
  document.querySelectorAll("[data-modal]").forEach((trigger) => {
    trigger.addEventListener("click", () => toggleModal(trigger.dataset.modal, true));
  });
  document.querySelectorAll(".spotme-modal [data-close]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const modal = event.currentTarget.closest(".spotme-modal");
      toggleModal(modal.id, false);
    });
  });
  document.querySelectorAll(".spotme-modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) toggleModal(modal.id, false);
    });
  });
};

const initUploadFlow = () => {
  const dropzone = byId("upload-dropzone");
  SpotMe.handleDropzone(dropzone, {
    onDrop: (files) => {
      if (files.length > 15) {
        SpotMe.showToast("Maximum 15 files allowed", "error");
        return;
      }
      const info = dropzone.querySelector("p");
      info.textContent = `${files.length} file(s) ready to upload`;
      SpotMe.simulateProgress(dropzone.parentElement.querySelector(".spotme-progress"), () => {
        SpotMe.showToast("Upload successful!", "success");
        info.textContent = "Uploaded successfully! View them in results.";
        dropzone.classList.add("spotme-pulsing");
        setTimeout(() => {
          dropzone.classList.remove("spotme-pulsing");
          toggleModal("upload-modal", false);
          showPage("results");
          renderGallery();
        }, 1500);
      });
    }
  });
};

const initSelfieFlow = () => {
  const captureButton = byId("capture-selfie");
  const uploadButton = byId("upload-selfie");
  const fileInput = byId("selfie-input");

  captureButton?.addEventListener("click", () => {
    SpotMe.showToast("Searching for your photos...", "info");
    setTimeout(() => {
      SpotMe.showToast("Photos found!", "success");
      toggleModal("selfie-modal", false);
      showPage("results");
      renderGallery();
    }, 2000);
  });

  uploadButton?.addEventListener("click", () => fileInput?.click());
  fileInput?.addEventListener("change", () => {
    if (fileInput.files.length) {
      SpotMe.showToast("Searching for your photos...", "info");
      setTimeout(() => {
        SpotMe.showToast("Photos found!", "success");
        toggleModal("selfie-modal", false);
        showPage("results");
        renderGallery();
      }, 2000);
    }
  });
};

const renderGallery = () => {
  const gallery = byId("user-gallery");
  SpotMe.renderGallery(gallery, gallerySeed, (item) => item);
};

const initLogout = () => {
  byId("logout-btn")?.addEventListener("click", () => {
    SpotMe.showToast("Logged out successfully", "info");
    setTimeout(() => {
      showPage("landing");
      state.activeEvent = null;
    }, 1000);
  });
};

// Handle hash navigation
const initHashNav = () => {
  window.addEventListener("hashchange", () => {
    const page = window.location.hash.slice(1) || "landing";
    showPage(page);
  });
  
  const initialPage = window.location.hash.slice(1) || "landing";
  showPage(initialPage);
};

const init = () => {
  initHashNav();
  initTimeline();
  bindNav();
  initModals();
  initEventAccess();
  initDashboard();
  initUploadPage();
  initFindPage();
  initResults();
  initUploadFlow();
  initSelfieFlow();
  renderGallery();
  initLogout();
};

document.addEventListener("DOMContentLoaded", init);
