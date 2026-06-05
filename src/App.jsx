import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(null);
    
    const [backgroundImage, setBackgroundImage] = useState('/img/clear-sky.jpg');

    const fetchWeather = async (searchCity) => {
        if (!searchCity) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=739e75fa7ad7cfa4542b06a8977e3e88`
            );

            if (!response.ok) {
                throw new Error('City not found. Please check the spelling.');
            }

            const data = await response.json();
            setWeather(data);
            setCity(data.name);

            // Update background
            updateBackground(data.weather[0].description.toLowerCase());
        } catch (err) {
            setError(err.message);
            setWeather(null);
            setForecast([]);
        } finally {
            setLoading(false);
        }
    };

    const updateBackground = (description) => {
        let bg = '/img/clear-sky.jpg';

        if (description.includes('clear')) bg = '/img/clear-sky.jpg';
        else if (description.includes('few clouds')) bg = '/img/few-clouds.jpg';
        else if (description.includes('scattered clouds')) bg = '/img/ScatteredClouds.jpg';
        else if (description.includes('broken clouds') || description.includes('overcast')) bg = '/img/BrokenClouds.jpg';
        else if (description.includes('drizzle')) bg = '/img/Drizzle.jpg';
        else if (description.includes('rain')) bg = '/img/rain.jpg';
        else if (description.includes('thunderstorm')) bg = '/img/Thunderstorm.jpg';
        else if (description.includes('snow')) bg = '/img/Snow.jpg';
        else if (description.includes('mist')) bg = '/img/Mist.jpg';
        else if (description.includes('fog')) bg = '/img/Fog.jpg';
        else if (description.includes('haze')) bg = '/img/Haze.jpg';

        setBackgroundImage(bg);
    };

    const handleSearch = () => {
        if (!city || city.trim() === '') return;
        fetchWeather(city);
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=739e75fa7ad7cfa4542b06a8977e3e88`
                    );
                    if (!response.ok) throw new Error("Failed to get weather for your location");

                    const data = await response.json();
                    setWeather(data);
                    setCity(data.name);
                    updateBackground(data.weather[0].description.toLowerCase());

                    const forecastRes = await fetch(
                        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=739e75fa7ad7cfa4542b06a8977e3e88`
                    );
                    const forecastData = await forecastRes.json();

                    const dailyForecast = forecastData.list.filter((item, index) => index % 8 === 0);
                    setForecast(dailyForecast);
                } catch (err) {
                    setError("Could not fetch weather for your location");
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                setError("Unable to get your location. Please allow location access.");
                setLoading(false);
                fetchWeather("Tashkent");
            }
        );
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    return (
        <div
            className="min-vh-100"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                minHeight: '100vh',
                padding: '2rem 0'
            }}>
                <div className="container mt-4">
                    <FloatingLabel
                        controlId="floatingCity"
                        label="City Name"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Enter city name"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />
                    </FloatingLabel>

                    <Button variant="primary" onClick={handleSearch} disabled={loading}>
                        {loading ? "Searching..." : "Search"}
                    </Button>

                    {error && <div className="text-danger mt-3">{error}</div>}
                </div>

                {weather && !loading && <WeatherCard weatherData={weather} />}
                {forecast.length > 0 && <Forecast forecastData={forecast} />}
            </div>
        </div>
    );
}

export default App;