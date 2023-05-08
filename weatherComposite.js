const w_key = 'a1b4fe61681615d304f2548f0e419f82';
const w_url = 'https://api.openweathermap.org/data/2.5/forecast';

function getweather() {
  const city = document.getElementById('city').value;
  const checkIn = new Date(document.getElementById('checkin').value);
  const checkOut = new Date(document.getElementById('checkout').value);
  const duration = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

  if (duration > 16) {
    alert('Weather forecast is only available for 16 days. Please choose a shorter period.');
    return;
  }

  fetch(`${w_url}?q=${city}&appid=${w_key}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const weatherList = document.getElementById('weatherlist');
      weatherList.innerHTML = '';

      for (let i = 0; i < duration; i++) {
        const currentDate = new Date(checkIn.getTime() + i * 24 * 60 * 60 * 1000);
        const dayData = data.list.filter(day => new Date(day.dt_txt).toDateString() === currentDate.toDateString());

        if (dayData.length) {
          const minTemp = Math.min(...dayData.map(day => day.main.temp_min));
          const maxTemp = Math.max(...dayData.map(day => day.main.temp_max));
          const condition = dayData[0].weather[0].description;
          const icon = `https://openweathermap.org/img/wn/${dayData[0].weather[0].icon}.png`;

          const weatherItem = document.createElement('p');
          weatherItem.innerHTML = `Weather in ${city} on ${currentDate.toISOString().substring(0, 10)}: ${condition} <img src="${icon}">, Temperature: ${minTemp.toFixed(1)}°C - ${maxTemp.toFixed(1)}°C`;
          weatherList.appendChild(weatherItem);
        }
      }
    })
    .catch(error => console.error(error));
}
