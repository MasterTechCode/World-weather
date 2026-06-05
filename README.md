
# 🌍 World Weather Dashboard

A beautiful, responsive weather application built with **React** and **Bootstrap** that displays real-time weather conditions and a 5-day forecast, featuring a dynamic UI that adapts to the current weather condition.

---

## ✨ Features

* **Global Search:** Instant weather data for any city worldwide.
* **Geolocation Support:** One-click "My Location" detection using native browser APIs.
* **Dynamic Backgrounds:** Context-aware UI changes colors and imagery based on current local weather (e.g., snow, rain, clear sky).
* **Extended Forecast:** Comprehensive 5-day weather breakdown.
* **Detailed Metrics:** Real-time tracking of "Feels Like" temperature, humidity, wind speed, and atmospheric pressure.
* **Fully Responsive:** Fluid design that scales beautifully from mobile screens to desktop monitors.
* **Robust Error Handling:** Smooth loading indicators and graceful error alerts for invalid city searches.

---

## 🛠️ Technologies Used

* **Frontend Framework:** React (Functional Components & Hooks)
* **Styling & UI:** React Bootstrap & Custom CSS3
* **Weather Data API:** [OpenWeatherMap API](https://openweathermap.org/)
* **Icons:** Weather-specific icon packs

---

## 📁 Project Structure

```text
world-weather/
├── public/
│   └── img/                  # Assets for dynamic weather backgrounds
├── src/
│   ├── components/
│   │   ├── WeatherCard.jsx   # Current weather conditions & details
│   │   └── Forecast.jsx      # 5-day extended forecast grid
│   ├── App.jsx               # State management & API integration logic
│   └── main.jsx              # Application entry point
└── README.md

```

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v16.0.0 or higher recommended).

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/world-weather.git
cd world-weather

```

### 3. Install Dependencies

```bash
npm install

```

### 4. Get your OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/) and create a free account.
2. Navigate to your API Keys tab and generate a new key.
3. Open `src/App.jsx` and replace the placeholder string with your actual API key:
```javascript
const API_KEY = "YOUR_API_KEY_HERE";

```



```

### 5. Run the Application
```bash
npm start

```

The app will automatically launch in your default browser at `http://localhost:3000`.

---

## 🌤️ Supported Weather Environments

The application dynamically updates its background assets to match the following weather states:

| Weather Condition | Visual State Triggered | Recommended Test City |
| --- | --- | --- |
| **Clear Sky** | Sunny / Clear Day theme | Dubai |
| **Clouds** | Scattered / Broken cloud layers | Tashkent |
| **Rain / Drizzle** | Rainy overlay theme | London / Mumbai |
| **Thunderstorm** | High-contrast storm theme | New York (during storms) |
| **Snow** | Winter / Snowy theme | Moscow |
| **Mist / Fog / Haze** | Low-visibility atmospheric blur | Seattle |

---