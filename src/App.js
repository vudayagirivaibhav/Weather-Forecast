import logo from './logo.svg';
import './App.css';
import WeatherPage from './components/WeatherPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <i className="fa fa-sun"> Weather Forecast </i>
      </header>
      <div className="weather-container">
         <WeatherPage />
      </div>
    </div>
  );
}

export default App;
