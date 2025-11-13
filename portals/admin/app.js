import { SpotMe } from "../shared/scripts/core.js";

const metrics = [
  { label: "Total Users", value: "32,814", trend: "+412 today" },
  { label: "Hosts", value: "124", trend: "12 active now" },
  { label: "Photographers", value: "268", trend: "+8 provisioning" },
  { label: "Events", value: "486", trend: "31 in progress" },
  { label: "Photos Processed", value: "4.8M", trend: "78k last hour" },
  { label: "System Health", value: "99.98%", trend: "Latency 184ms avg" }
];

const healthSignals = [
  { signal: "Upload API", status: "Operational" },
  { signal: "Face Cluster", status: "Degraded" },
  { signal: "Database", status: "Operational" },
  { signal: "Search Index", status: "Operational" }
];

const alertFeed = [
  { title: "High queue depth", meta: "Face service · 12 mins ago" },
  { title: "New release deployed", meta: "Pipeline v2.3 · 35 mins ago" },
  { title: "Moderation flag", meta: "Event #XP-204 · 1 hr ago" }
];

const events = [
  {
    name: "Riya & Shaan Wedding",
    type: "Wedding",
    date: "19 Dec 2025",
    media: "6,843",
    status: "Live"
  },
  {
    name: "NeonRush College Fest",
    type: "College Fest",
    date: "28 Nov 2025",
    media: "4,273",
    status: "Processing"
  },
  {
    name: "Coastal Charge Marathon",
    type: "Marathon",
    date: "07 Jan 2026",
    media: "12,590",
    status: "Scheduled"
  },
  {
    name: "XPlore Annual Summit",
    type: "Corporate",
    date: "05 Dec 2025",
    media: "3,412",
    status: "Live"
  }
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
  SpotMe.renderMetrics(document.getElementById("admin-metrics"), metrics);
};

const renderHealth = () => {
  const signalsList = document.getElementById("health-signals");
  healthSignals.forEach((item) => {
    const row = SpotMe.createElement("li", {}, [
      SpotMe.createElement("span", {}, [item.signal]),
      SpotMe.createElement("span", { class: "spotme-card-date" }, [item.status])
    ]);
    signalsList.appendChild(row);
  });

  const alertsList = document.getElementById("alert-feed");
  alertFeed.forEach((item) => {
    const row = SpotMe.createElement("li", {}, [
      SpotMe.createElement("span", {}, [item.title]),
      SpotMe.createElement("span", { class: "spotme-card-date" }, [item.meta])
    ]);
    alertsList.appendChild(row);
  });
};

const renderEvents = () => {
  const tbody = document.querySelector("#event-table tbody");
  events.forEach((event) => {
    const tr = SpotMe.createElement("tr", {}, [
      SpotMe.createElement("td", {}, [event.name]),
      SpotMe.createElement("td", {}, [event.type]),
      SpotMe.createElement("td", {}, [event.date]),
      SpotMe.createElement("td", {}, [event.media]),
      SpotMe.createElement("td", {}, [
        SpotMe.createElement("span", { class: "spotme-chip" }, [event.status])
      ])
    ]);
    tbody.appendChild(tr);
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
  const loginBtn = document.getElementById("admin-login-btn");
  loginBtn?.addEventListener("click", () => {
    const username = document.getElementById("admin-username")?.value.trim();
    const password = document.getElementById("admin-password")?.value.trim();
    
    if (!username || !password) {
      SpotMe.showToast("Please enter both Username and Password", "error");
      return;
    }
    
    SpotMe.showToast("Login successful! Redirecting...", "success");
    state.isLoggedIn = true;
    setTimeout(() => {
      showPage("admin-overview");
    }, 1000);
  });
};

const initLogout = () => {
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    SpotMe.showToast("Logged out successfully", "info");
    state.isLoggedIn = false;
    setTimeout(() => {
      showPage("login");
      document.getElementById("admin-username").value = "";
      document.getElementById("admin-password").value = "";
    }, 1000);
  });
};

const init = () => {
  showPage("login");
  initLogin();
  initLogout();
  bindNav();
  renderMetrics();
  renderHealth();
  renderEvents();
};

document.addEventListener("DOMContentLoaded", init);

