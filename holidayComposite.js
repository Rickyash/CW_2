const h_key = '7ef5d14d1abadda51004012077ffe821367ace3a';
const h_url = 'https://calendarific.com/api/v2/holidays';

function getholiday() {
  const year = document.getElementById('year').value;
  const countryCode = document.getElementById('Countrycode').value;
  const url = `${h_url}?api_key=${h_key}&country=${countryCode}&year=${year}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const holidayList = document.getElementById('holiday-list');
      holidayList.innerHTML = '';

      data.response.holidays.forEach(holiday => {
        const name = holiday.name;
        const date = holiday.date.iso;

        const holidayItem = document.createElement('li');
        holidayItem.textContent = `${name} (${date})`;
        holidayItem.addEventListener('click', () => {
          document.getElementById('checkin').value = date;
          document.getElementById('checkout').value = new Date(new Date(date).getTime() + (24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
        });

        holidayList.appendChild(holidayItem);
      });
    })
    .catch(error => console.error(error));
}
