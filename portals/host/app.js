import { SpotMe } from "../shared/scripts/core.js";

const metrics = [
  { label: "Total Media", value: "1,482", trend: "+312 today" },
  { label: "Unique Guests", value: "673", trend: "84% identified" },
  { label: "Photographer Uploads", value: "912", trend: "4 active shooters" },
  { label: "Attendee Uploads", value: "570", trend: "+28 in last hour" }
];

const activityFeed = [
  { actor: "Neha Sharma", action: "uploaded 4 photos", time: "2m ago" },
  { actor: "Team Lenscraft", action: "synced 18 RAWs", time: "5m ago" },
  { actor: "Aman S.", action: "requested download", time: "11m ago" },
  { actor: "Auto Tagger", action: "flagged 2 duplicates", time: "16m ago" }
];

const contributors = [
  { name: "Lenscraft Studio", count: "312 assets" },
  { name: "Neha Sharma", count: "54 assets" },
  { name: "Vikas Arora", count: "38 assets" },
  { name: "Guest uploads", count: "570 assets" }
];

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    label: "Photographer",
    meta: "Lenscraft"
  },
  {
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    label: "Attendee",
    meta: "Neha S."
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    label: "Photographer",
    meta: "Team B"
  },
  {
    src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    label: "Attendee",
    meta: "Vikas"
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    label: "Photographer",
    meta: "Lenscraft"
  }
];

const downloadBundles = [
  { name: "Ceremony Highlights", size: "2.3 GB", status: "Ready", owner: "You" },
  { name: "Guest Candids", size: "4.8 GB", status: "Processing", owner: "Automation" },
  { name: "Sponsor Reel", size: "1.1 GB", status: "Ready", owner: "Team Lenscraft" }
];

const bindNav = () => {
  document.querySelectorAll(".spotme-nav button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".spotme-nav button.active")?.classList.remove("active");
      button.classList.add("active");
      document.getElementById(button.dataset.target)?.scrollIntoView({ behavior: "smooth" });
    });
  });
};

const renderMetrics = () => {
  const container = document.getElementById("host-metrics");
  SpotMe.renderMetrics(container, metrics);
};

const renderActivity = () => {
  const activityList = document.getElementById("activity-list");
  activityFeed.forEach((item) => {
    const row = SpotMe.createElement("li", {}, [
      SpotMe.createElement("span", {}, [`${item.actor}`]),
      SpotMe.createElement("span", { class: "spotme-card-date" }, [`${item.action} · ${item.time}`])
    ]);
    activityList.appendChild(row);
  });

  const contributorList = document.getElementById("contributor-list");
  contributors.forEach((item) => {
    const row = SpotMe.createElement("li", {}, [
      SpotMe.createElement("span", {}, [item.name]),
      SpotMe.createElement("span", { class: "spotme-card-date" }, [item.count])
    ]);
    contributorList.appendChild(row);
  });
};

const bindFilters = () => {
  document.querySelectorAll(".upload-filters .spotme-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".upload-filters .spotme-button.active")?.classList.remove("active");
      button.classList.add("active");
      const filter = button.dataset.filter;
      const filtered = filter === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.label.toLowerCase() === filter);
      SpotMe.renderGallery(
        document.getElementById("host-gallery"),
        filtered,
        (item) => item
      );
    });
  });
};

const renderGallery = () => {
  SpotMe.renderGallery(
    document.getElementById("host-gallery"),
    galleryItems,
    (item) => item
  );
};

const renderDownloads = () => {
  const container = document.getElementById("download-grid");
  downloadBundles.forEach((bundle) => {
    const card = SpotMe.createElement("article", { class: "download-card", "data-size": bundle.size }, [
      SpotMe.createElement("h4", {}, [bundle.name]),
      SpotMe.createElement("span", { class: "spotme-card-date" }, [
        `Prepared by ${bundle.owner}`
      ]),
      SpotMe.createElement("div", { class: "download-card-footer" }, [
        SpotMe.createElement("span", { class: "spotme-card-date" }, [bundle.status]),
        SpotMe.createElement("button", { class: "spotme-button primary" }, ["Download"])
      ])
    ]);
    container.appendChild(card);
  });
};

const state = {
  isLoggedIn: false
};

const showPage = (pageId) => {
  const loginPage = document.getElementById("login-page");
  const mainApp = document.getElementById("main-app");
  const navbar = document.querySelector(".spotme-navbar");
  const footer = document.querySelector(".spotme-footer");
  
  if (pageId === "login") {
    loginPage?.classList.remove("hidden");
    mainApp?.classList.add("hidden");
    navbar?.classList.add("hidden");
    footer?.classList.add("hidden");
  } else {
    loginPage?.classList.add("hidden");
    mainApp?.classList.remove("hidden");
    navbar?.classList.remove("hidden");
    footer?.classList.remove("hidden");
    if (pageId !== "login") {
      document.getElementById(pageId)?.scrollIntoView({ behavior: "smooth" });
    }
  }
};

const initLogin = () => {
  const loginBtn = document.getElementById("host-login-btn");
  loginBtn?.addEventListener("click", () => {
    const eventId = document.getElementById("host-event-id")?.value.trim();
    const password = document.getElementById("host-password")?.value.trim();
    
    if (!eventId || !password) {
      SpotMe.showToast("Please enter both Event ID and Password", "error");
      return;
    }
    
    SpotMe.showToast("Login successful! Redirecting...", "success");
    state.isLoggedIn = true;
    setTimeout(() => {
      showPage("overview");
    }, 1000);
  });
};

const initLogout = () => {
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    SpotMe.showToast("Logged out successfully", "info");
    state.isLoggedIn = false;
    setTimeout(() => {
      showPage("login");
      document.getElementById("host-event-id").value = "";
      document.getElementById("host-password").value = "";
    }, 1000);
  });
};

const init = () => {
  showPage("login");
  initLogin();
  initLogout();
  bindNav();
  renderMetrics();
  renderActivity();
  renderGallery();
  renderDownloads();
  bindFilters();
};

document.addEventListener("DOMContentLoaded", init);

