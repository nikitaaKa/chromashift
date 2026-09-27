const STORAGE_KEY = "enabledHosts";
const hostLabel = document.querySelector("#host-label");
const toggle = document.querySelector("#site-toggle");
const toggleLabel = document.querySelector("#toggle-label");
const statusLabel = document.querySelector("#status-label");
const statusDot = document.querySelector("#status-dot");
const statusBadge = document.querySelector("#status-badge");
const helpText = document.querySelector("#help-text");

let currentHost = "";
let currentTabId;

function render(enabled) {
  toggle.setAttribute("aria-checked", String(enabled));
  toggle.classList.toggle("btn-disabled", !enabled);
  toggleLabel.textContent = enabled ? "ОТКЛЮЧИТЬ ИНВЕРСИЮ" : "ВКЛЮЧИТЬ ИНВЕРСИЮ";
  statusLabel.textContent = enabled ? "Инверсия включена" : "Инверсия выключена";
  statusDot.classList.toggle("is-active", enabled);
  statusBadge.textContent = enabled ? "АКТИВНО" : "ВЫКЛЮЧЕНО";
  statusBadge.classList.toggle("disabled", !enabled);
}

async function getEnabledHosts() {
  const stored = await chrome.storage.local.get(STORAGE_KEY);
  return Array.isArray(stored[STORAGE_KEY]) ? stored[STORAGE_KEY] : [];
}

async function initialize() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  try {
    const url = new URL(tab?.url ?? "");
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("Unsupported page");
    }
    currentHost = url.hostname.toLowerCase();
    currentTabId = tab.id;
  } catch {
    hostLabel.textContent = "Недоступная страница";
    statusLabel.textContent = "Откройте обычный сайт";
    statusBadge.textContent = "НЕДОСТУПНО";
    statusBadge.classList.add("disabled");
    helpText.textContent = "На внутренних страницах браузера расширения не работают.";
    return;
  }

  hostLabel.textContent = currentHost;
  const enabledHosts = await getEnabledHosts();
  render(enabledHosts.includes(currentHost));
  toggle.disabled = false;
}

toggle.addEventListener("click", async () => {
  if (!currentHost) return;

  toggle.disabled = true;
  try {
    const enabledHosts = await getEnabledHosts();
    const isEnabled = enabledHosts.includes(currentHost);
    const updatedHosts = isEnabled
      ? enabledHosts.filter((host) => host !== currentHost)
      : [...enabledHosts, currentHost];

    await chrome.storage.local.set({ [STORAGE_KEY]: updatedHosts });
    await chrome.scripting.executeScript({
      target: { tabId: currentTabId },
      args: [!isEnabled],
      func: (enabled) => {
        const className = "chroma-shift-active";
        const styleId = "chroma-shift-styles";
        if (!document.getElementById(styleId)) {
          const style = document.createElement("style");
          style.id = styleId;
          style.textContent = `
            html.${className} { filter: invert(1) hue-rotate(180deg) !important; }
            html.${className} img,
            html.${className} video,
            html.${className} canvas {
              filter: invert(1) hue-rotate(180deg) !important;
            }
          `;
          document.documentElement.append(style);
        }
        document.documentElement.classList.toggle(className, enabled);
      },
    });
    render(!isEnabled);
  } catch {
    statusLabel.textContent = "Не удалось сохранить настройку";
  } finally {
    toggle.disabled = false;
  }
});

initialize().catch(() => {
  hostLabel.textContent = "Не удалось загрузить сайт";
  statusLabel.textContent = "Попробуйте открыть popup ещё раз";
  statusBadge.textContent = "ОШИБКА";
  statusBadge.classList.add("disabled");
});