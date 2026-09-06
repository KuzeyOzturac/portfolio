const tabs = document.querySelectorAll("[data-record]");
const panels = document.querySelectorAll("[data-record-panel]");

function showRecord(name) {
  tabs.forEach((tab) => {
    const active = tab.dataset.record === name;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  panels.forEach((panel) => {
    const active = panel.dataset.recordPanel === name;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
}

tabs.forEach((tab) => tab.addEventListener("click", () => showRecord(tab.dataset.record)));
