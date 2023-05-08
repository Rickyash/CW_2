var loc_Id;
var Hotel_info;

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");

function Duration(startDate, endDate) {
    document.getElementById('checkin').value = startDate;
    document.getElementById('checkout').value = endDate;
    getAllHotel();
  }

function getAllHotel() {
	const city = document.getElementById("city").value.replace(/"/g, "");
	const checkin = new Date(document.getElementById("checkin").value).toISOString().slice(0, 10);
	const checkout = new Date(document.getElementById("checkout").value).toISOString().slice(0, 10);
  
	fetch(`https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${city}&locale=en-gb`, {
	  method: 'GET',
	  headers: {
		'X-RapidAPI-Key': '86e0dca430mshdedeb54ebd6dfc6p1f452ejsne25c96957a91',
		'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
	  }
	})
	.then(response => response.json())
	.then(response => {
	  const loc_Id = response[0].dest_id;
	  return fetch(`https://booking-com.p.rapidapi.com/v2/hotels/search?order_by=popularity&adults_number=2&checkin_date=${checkin}&filter_by_currency=AED&dest_id=${loc_Id}&locale=en-gb&checkout_date=${checkout}&units=metric&room_number=1&dest_type=city&include_adjacency=true&children_number=2&page_number=0&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1`, {
		method: 'GET',
		headers: {
		  'X-RapidAPI-Key': '86e0dca430mshdedeb54ebd6dfc6p1f452ejsne25c96957a91',
		  'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
		}
	  });
	})
	.then(response => response.json())
	.then(response => {
	  let hotelList = '';
	  for (let hotel of response.results) {
		hotelList += 'Hotel Name: ' + hotel.name + '<br>';
		hotelList += 'Price: ' + hotel.priceBreakdown.grossPrice.currency + ' ' + hotel.priceBreakdown.grossPrice.value.toFixed(2) + '<br>';
		hotelList += 'Review Score: ' + hotel.reviewScore + ' (' + hotel.reviewScoreWord + ')<br>';
		hotelList += 'Check-in: ' + hotel.checkin.fromTime + ' - ' + hotel.checkin.untilTime + '<br>';
		hotelList += 'Check-out: ' + hotel.checkout.fromTime + ' - ' + hotel.checkout.untilTime + '<br>';
		hotelList += '<br>';
	  }
	  document.getElementById("hotellist").innerHTML = "Hotel List:<br>" + hotelList;
	})
	.catch(error => console.error(error));
  }
  