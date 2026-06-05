import Card from 'react-bootstrap/Card';

function Forecast({ forecastData }) {
    return (
        <Card className="mx-auto mt-4 shadow" style={{ maxWidth: '900px' }}>
            <Card.Body>
                <Card.Title className="text-center mb-4">5-Day Forecast</Card.Title>
                <div className="row g-3">
                    {forecastData.map((day, index) => {
                        const date = new Date(day.dt * 1000);
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

                        return (
                            <div key={index} className="col-md-2 col-6 text-center">
                                <p className="fw-bold mb-1">{dayName}</p>
                                <img 
                                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
                                    alt=""
                                    style={{ width: '60px' }}
                                />
                                <h5 className="mt-2">{Math.round(day.main.temp)}°C</h5>
                                <small className="text-capitalize">{day.weather[0].description}</small>
                            </div>
                        );
                    })}
                </div>
            </Card.Body>
        </Card>
    );
}

export default Forecast;