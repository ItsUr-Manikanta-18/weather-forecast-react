# 🌤️ Weather App

A simple and responsive weather application built using **HTML, CSS, and JavaScript**.  
This app uses the **[Open-Meteo API](https://open-meteo.com/)** to fetch real-time weather data and forecasts based on the user’s searched location.

---

## 🚀 Features

- 🔍 Search weather by city name.
- 🌡️ Displays current temperature, humidity, wind speed, and weather condition.
- 🖼️ Dynamic weather icons (day/night supported).
- 📅 7-day daily forecast with min/max temperatures.
- ⚡ Error handling for invalid or empty location input.
- 🎨 Simple, clean, and responsive design.

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **API:** [Open-Meteo API](https://open-meteo.com/)  
- **Icons:** Custom SVG icons stored in `assets/`

---

## 📂 Project Structure

📦 Weather-App
├── index.html # Main HTML file
├── style.css # Stylesheet
├── script.js # App logic
├── assets/ # Weather icons
└── README.md # Project documentation

---

## ⚙️ How It Works

1. Enter a city name in the search box.
2. The app fetches **latitude & longitude** from the Open-Meteo **Geocoding API**.
3. Weather details (current + daily forecast) are fetched using the Open-Meteo **Forecast API**.
4. Data is displayed dynamically with corresponding icons and values.

---

## 📸 Screenshots

### Home (Before Search)
*(Insert Screenshot here)*

### Weather Details (After Search)
*(Insert Screenshot here)*

---

## 🔑 API Endpoints Used

- **Geocoding API:**  
https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1&language=en&format=json


- **Forecast API:**  


https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min