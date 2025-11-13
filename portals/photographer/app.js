import { SpotMe } from "../shared/scripts/core.js";

const pendingImports = [
  {
    id: "sd-card-a",
    label: "SD Card A",
    footage: ["Ceremony RAW (27)", "Reception RAW (34)", "Afterparty MP4 (4)"],
    eta: "Ready"
  },
  {
    id: "drone-footage",
    label: "Drone Drive",
    footage: ["Sunset Aerials (12)", "Venue Sweep (8)"],
    eta: "2m remaining"
  },
  {
    id: "team-gallery-b",
    label: "Team Camera B",
    footage: ["Portraits (19)", "Behind the scenes (11)"],
    eta: "11m remaining"
  }
];

const faceGroups = [
  {
    id: "group-01",
    name: "Bride Squad",
    cover:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
    count: 42,
    samples: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1530023367847-a683933f4177?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "group-02",
    name: "Family Portraits",
    cover:
      "https://images.unsplash.com/photo-1542317854-0d6d3cd88cce?auto=format&fit=crop&w=400&q=80",
    count: 63,
    samples: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1466690672306-5f92132f7248?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "group-03",
    name: "Corporate VIPs",
    cover:
      "https://images.unsplash.com/photo-1521041149072-715740dcf091?auto=format&fit=crop&w=400&q=80",
    count: 28,
    samples: [
      "https://images.unsplash.com/photo-1521041149072-715740dcf091?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1521579971123-1192931a1452?auto=format&fit=crop&w=400&q=80"
    ]
  }
];

const hostVisibility = [
  {
    group: "Bride Squad",
    assets: "42",
    status: "Synced",
    host: "Kavya",
    updated: "2 mins ago"
  },
  {
    group: "Family Portraits",
    assets: "63",
    status: "Processing",
    host: "Karan",
    updated: "4 mins ago"
  },
  {
    group: "Corporate VIPs",
    assets: "28",
    status: "Awaiting tag",
    host: "Nishant",
    updated: "8 mins ago"
  }
];

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
    document.getElementById(pageId)?.scrollIntoView({ behavior: "smooth" });
  }
};

const initLogin = () => {
  const loginBtn = document.getElementById("photographer-login-btn");
  loginBtn?.addEventListener("click", () => {
    const eventId = document.getElementById("photographer-event-id")?.value.trim();
    const code = document.getElementById("photographer-code")?.value.trim();
    
    if (!eventId || !code) {
      SpotMe.showToast("Please enter both Event ID and Photographer Code", "error");
      return;
    }
    
    // Simulate login (in real app, validate with backend)
    SpotMe.showToast("Login successful! Redirecting...", "success");
    state.isLoggedIn = true;
    setTimeout(() => {
      showPage("capture-queue");
    }, 1000);
  });
};

const initLogout = () => {
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    SpotMe.showToast("Logged out successfully", "info");
    state.isLoggedIn = false;
    setTimeout(() => {
      showPage("login");
      document.getElementById("photographer-event-id").value = "";
      document.getElementById("photographer-code").value = "";
    }, 1000);
  });
};

const navBindings = () => {
  document.querySelectorAll(".spotme-nav button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".spotme-nav button.active")?.classList.remove("active");
      button.classList.add("active");
      const target = button.dataset.target;
      if (target) {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
};

const renderCaptureQueue = () => {
  const container = document.getElementById("capture-grid");
  if (!container) return;
  container.innerHTML = "";
  pendingImports.forEach((item) => {
    const card = SpotMe.createElement("article", { class: "capture-card", "data-badge": item.eta }, [
      SpotMe.createElement("h3", {}, [item.label]),
      SpotMe.createElement(
        "div",
        { class: "capture-assets" },
        item.footage?.map((asset) => SpotMe.createElement("span", {}, [asset])) || []
      ),
      SpotMe.createElement("button", { class: "spotme-button" }, ["Open Folder"])
    ]);
    container.appendChild(card);
  });
};

const renderUploads = () => {
  const gallery = document.getElementById("photographer-gallery");
  if (!gallery) return;
  SpotMe.renderGallery(gallery, faceGroups.flatMap((group) => group.samples.slice(0, 4).map((src) => ({
    src,
    label: group.name,
    meta: `${group.count} faces`
  }))));
};

const renderFaceGroups = () => {
  const container = document.getElementById("face-group-grid");
  if (!container) return;
  container.innerHTML = "";
  faceGroups.forEach((group) => {
    const card = SpotMe.createElement("article", { class: "group-card" }, [
      SpotMe.createElement("header", { class: "group-card-header" }, [
        SpotMe.createElement("img", { src: group.cover, alt: group.name }),
        SpotMe.createElement("div", {}, [
          SpotMe.createElement("h3", {}, [group.name]),
          SpotMe.createElement("span", { class: "spotme-card-date" }, [`${group.count} linked images`])
        ])
      ]),
      SpotMe.createElement(
        "div",
        { class: "group-card-gallery" },
        group.samples.map((src) => SpotMe.createElement("img", { src, alt: `${group.name} sample` }))
      )
    ]);
    container.appendChild(card);
  });
};

const renderHostTable = () => {
  const tbody = document.querySelector("#host-table tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  hostVisibility.forEach((row) => {
    const tr = SpotMe.createElement("tr", {}, [
      SpotMe.createElement("td", {}, [row.group]),
      SpotMe.createElement("td", {}, [row.assets]),
      SpotMe.createElement("td", {}, [
        SpotMe.createElement("span", { class: "spotme-chip" }, ["● ", row.status])
      ]),
      SpotMe.createElement("td", {}, [row.host]),
      SpotMe.createElement("td", {}, [row.updated])
    ]);
    tbody.appendChild(tr);
  });
};

const initDropzone = () => {
  const dropzone = document.getElementById("photographer-dropzone");
  SpotMe.handleDropzone(dropzone, {
    onDrop: (files) => {
      const info = dropzone.querySelector("p");
      info.textContent = `${files.length} asset(s) queued`;
      SpotMe.simulateProgress(dropzone.parentElement.querySelector(".spotme-progress"), () => {
        SpotMe.showToast("Uploads complete! Grouping faces...", "success");
        info.textContent = "Uploads complete! Grouping faces…";
        renderUploads();
      });
    }
  });
};

const init = () => {
  // Start with login page
  showPage("login");
  initLogin();
  initLogout();
  navBindings();
  renderCaptureQueue();
  renderUploads();
  renderFaceGroups();
  renderHostTable();
  initDropzone();
};

document.addEventListener("DOMContentLoaded", init);
