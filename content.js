const STORAGE_KEY = "enabledHosts";
const ACTIVE_CLASS = "chroma-shift-active";

function applyInversion(enabledHosts = []) {
  document.documentElement.classList.toggle(
    ACTIVE_CLASS,
    enabledHosts.includes(location.hostname.toLowerCase()),
  );
}

chrome.storage.local.get(STORAGE_KEY).then(({ enabledHosts = [] }) => {
  applyInversion(Array.isArray(enabledHosts) ? enabledHosts : []);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local" || !changes[STORAGE_KEY]) return;

  const enabledHosts = changes[STORAGE_KEY].newValue;
  applyInversion(Array.isArray(enabledHosts) ? enabledHosts : []);
});

const style = document.createElement("style");
style.id = "chroma-shift-styles";
style.textContent = `
  html.${ACTIVE_CLASS} {
    filter: invert(1) hue-rotate(180deg) !important;
  }
  html.${ACTIVE_CLASS} img,
  html.${ACTIVE_CLASS} video,
  html.${ACTIVE_CLASS} canvas {
    filter: invert(1) hue-rotate(180deg) !important;
  }
`;
if (!document.getElementById(style.id)) {
  document.documentElement.append(style);
}