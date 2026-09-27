# Chroma Shift

Расширение для Chromium-браузеров, которое переключает цветовую тему сайта инверсией цветов. Настройка сохраняется отдельно для каждого домена. Изображения, видео и canvas сохраняют исходные цвета.

## Возможности

- Переключение светлого и тёмного оформления страницы.
- Настройка отдельно для каждого домена.
- Немедленное применение к текущей вкладке.
- Исключение изображений, видео и canvas из инверсии.
- Бирюзовый интерфейс popup в тёмной теме.

## Установка

1. Скачайте ZIP-архив репозитория с GitHub и распакуйте его либо клонируйте репозиторий.
2. Откройте страницу расширений Chromium-браузера: `chrome://extensions/` в Chrome, Edge и большинстве Chromium-браузеров.
3. Включите режим разработчика.
4. Нажмите «Загрузить распакованное расширение» и выберите папку проекта, в которой находится `manifest.json`.

## Использование

Откройте сайт, нажмите значок Chroma Shift на панели браузера и включите инверсию. Настройка будет сохранена для домена и автоматически применится при следующих загрузках сайта.

## Доступ и конфиденциальность

Расширению нужны разрешения `storage` для сохранения настроек, `scripting` для немедленного изменения текущей вкладки и доступ к сайтам для применения настройки при загрузке страниц. Данные не отправляются на внешние серверы.

---

# Chroma Shift

A Chromium browser extension that switches a website's color theme by inverting its colors. Settings are saved separately for each domain. Images, video, and canvas content keep their original colors.

## Features

- Switch between light and dark page appearances.
- Save the setting separately for each domain.
- Apply the change immediately to the current tab.
- Exclude images, video, and canvas content from inversion.
- Dark popup interface with teal accents.

## Installation

1. Download and extract the repository ZIP from GitHub, or clone the repository.
2. Open your Chromium browser's extensions page. Use `chrome://extensions/` in Chrome, Edge, and most Chromium-based browsers.
3. Enable Developer mode.
4. Select **Load unpacked** and choose the project folder containing `manifest.json`.

## Usage

Open a website, select the Chroma Shift icon in the browser toolbar, and enable inversion. The setting is saved for that domain and applied automatically on future page loads.

## Permissions and privacy

The extension uses the `storage` permission to save settings, `scripting` to update the current tab immediately, and website access to apply saved settings when pages load. No data is sent to external servers.