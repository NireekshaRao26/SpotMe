export const SpotMe = (() => {
  const scrollTo = (container, direction = 1, amount = 300) => {
    container.scrollBy({
      left: direction * amount,
      behavior: "smooth"
    });
  };

  const formatDate = (dateLike) => {
    const date = typeof dateLike === "string" ? new Date(dateLike) : dateLike;
    return date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const createElement = (tag, props = {}, children = []) => {
    const el = document.createElement(tag);
    Object.entries(props).forEach(([key, value]) => {
      if (key === "class") {
        el.className = value;
      } else if (key.startsWith("data-")) {
        el.setAttribute(key, value);
      } else if (key === "html") {
        el.innerHTML = value;
      } else if (key === "text") {
        el.textContent = value;
      } else if (key === "on") {
        Object.entries(value).forEach(([event, handler]) => {
          el.addEventListener(event, handler);
        });
      } else {
        el.setAttribute(key, value);
      }
    });
    children.forEach((child) => {
      if (typeof child === "string") {
        el.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        el.appendChild(child);
      }
    });
    return el;
  };

  const initSwipeControls = (container, leftControl, rightControl) => {
    if (leftControl) {
      leftControl.addEventListener("click", () => scrollTo(container, -1));
    }
    if (rightControl) {
      rightControl.addEventListener("click", () => scrollTo(container, 1));
    }
    let startX = 0;
    let scrollStart = 0;
    container.addEventListener("pointerdown", (event) => {
      startX = event.clientX;
      scrollStart = container.scrollLeft;
      container.setPointerCapture(event.pointerId);
    });
    container.addEventListener("pointermove", (event) => {
      if (event.pressure === 0) return;
      const delta = event.clientX - startX;
      container.scrollLeft = scrollStart - delta;
    });
  };

  const handleDropzone = (selector, options = {}) => {
    const dropzone = typeof selector === "string" ? document.querySelector(selector) : selector;
    if (!dropzone) return;
    const { onDrop = () => {}, onBrowse = () => {}, inputSelector } = options;
    const input = inputSelector ? dropzone.querySelector(inputSelector) : dropzone.querySelector("input[type='file']");

    const activate = () => dropzone.classList.add("dragover");
    const deactivate = () => dropzone.classList.remove("dragover");

    ["dragenter", "dragover"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
        activate();
      });
    });
    ["dragleave", "drop"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
        deactivate();
      });
    });

    dropzone.addEventListener("drop", (event) => {
      const files = event.dataTransfer.files;
      if (files.length > 0) onDrop([...files]);
    });

    dropzone.addEventListener("click", () => {
      if (input) input.click();
      onBrowse();
    });

    if (input) {
      input.addEventListener("change", () => {
        if (input.files.length > 0) onDrop([...input.files]);
      });
    }
  };

  const simulateProgress = (element, cb) => {
    const bar = element.querySelector(".spotme-progress-bar");
    if (!bar) return;
    let progress = 0;
    const timer = setInterval(() => {
      progress += Math.random() * 18;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        if (cb) cb();
      }
      bar.style.width = `${progress}%`;
    }, 350);
  };

  const renderGallery = (container, items = [], format = (item) => item) => {
    if (!container) return;
    container.innerHTML = "";
    if (items.length === 0) {
      container.appendChild(
        createElement("div", { class: "spotme-empty-state" }, [
          "No media yet. Upload photos to get started."
        ])
      );
      return;
    }
    const grid = createElement("div", { class: "spotme-gallery-grid" });
    items.forEach((item) => {
      const { src, label, meta } = format(item);
      const figure = createElement(
        "figure",
        { class: "spotme-gallery-item", "data-label": label || "" },
        [
          createElement("img", { src, alt: label || "Event photo" }),
          meta
            ? createElement("figcaption", { class: "spotme-floating-badge" }, [meta])
            : null
        ].filter(Boolean)
      );
      grid.appendChild(figure);
    });
    container.appendChild(grid);
  };

  const renderMetrics = (container, data = []) => {
    if (!container) return;
    container.innerHTML = "";
    const grid = createElement("div", { class: "spotme-metric-grid" });
    data.forEach(({ label, value, trend }) => {
      const card = createElement("article", { class: "spotme-metric-card" }, [
        createElement("span", { class: "spotme-section-label" }, [label]),
        createElement("h2", {}, [value]),
        trend
          ? createElement("span", {}, [trend])
          : null
      ].filter(Boolean));
      grid.appendChild(card);
    });
    container.appendChild(grid);
  };

  // Toast Notification System
  const showToast = (message, type = "success", duration = 3000) => {
    const toast = createElement("div", { class: `spotme-toast spotme-toast-${type}` }, [
      createElement("span", {}, [message]),
      createElement("button", { 
        class: "spotme-toast-close",
        on: { click: () => toast.remove() }
      }, ["×"])
    ]);
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  // Navigation Router
  const router = {
    currentPage: "",
    navigate: (page, params = {}) => {
      const event = new CustomEvent("spotme-navigate", { detail: { page, params } });
      window.dispatchEvent(event);
      router.currentPage = page;
      if (window.history && window.history.pushState) {
        window.history.pushState({ page }, "", `#${page}`);
      }
    },
    init: () => {
      window.addEventListener("popstate", (e) => {
        const page = window.location.hash.slice(1) || "landing";
        router.navigate(page);
      });
      const initialPage = window.location.hash.slice(1) || "landing";
      router.navigate(initialPage);
    }
  };

  // Page Transition
  const transitionPage = (callback) => {
    document.body.classList.add("page-transitioning");
    setTimeout(() => {
      if (callback) callback();
      setTimeout(() => {
        document.body.classList.remove("page-transitioning");
      }, 50);
    }, 200);
  };

  return {
    scrollTo,
    formatDate,
    createElement,
    initSwipeControls,
    handleDropzone,
    simulateProgress,
    renderGallery,
    renderMetrics,
    showToast,
    router,
    transitionPage
  };
})();

