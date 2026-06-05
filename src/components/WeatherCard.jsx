import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function WeatherCard({ weatherData, fetchWeather }) {
  if (!weatherData) return null;

  const { name, sys, main, weather, wind } = weatherData;
  const iconCode = weather[0].icon;``
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  return (
    <Card className="mx-auto shadow" style={{ maxWidth: '420px' }}>
      <Card.Body className="text-center">
        <Card.Title className="fs-3 mb-3">
          {name}, {sys.country}
        </Card.Title>

        <div className="mb-3">
          <img
            src={iconUrl}
            alt={weather[0].description}
            style={{ width: '120px', height: '120px' }}
          />
        </div>


        <h1 className="display-1 fw-bold mb-1">
          {Math.round(main.temp)}°C
        </h1>

        <p className="text-capitalize fs-4 mb-4">
          {weather[0].description}
        </p>

        <div className="row text-start mt-4">
          <div className="col-6">
            <p><strong>Feels like:</strong> {Math.round(main.feels_like)}°C</p>
            <p><strong>Humidity:</strong> {main.humidity}%</p>
          </div>
          <div className="col-6">
            <p><strong>Wind:</strong> {wind.speed} m/s</p>
            <p><strong>Pressure:</strong> {main.pressure} hPa</p>
          </div>
        </div>

        <Button
          variant="outline-primary"
          className="mt-4"
          onClick={() => fetchWeather(name)}
        >
          🔄 Refresh Weather
        </Button>
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;