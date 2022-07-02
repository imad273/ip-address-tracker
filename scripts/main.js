const API_KEY = "2096d0679237446db5b07f990f7bb7ee";
const accessToken = "pk.eyJ1IjoiZW1hZDI3MyIsImEiOiJja3hmdzVqaXYzamJ3MnJvNW53MWc3a3IwIn0.hxBxt4FUMsFkD8mmeFYhbA";

const IP = document.getElementById("search");
const errorMsg = document.getElementById("error");

// Initialize the map
var map = L.map('map', {
   center: [-33.89185, 151.19356],
   zoom: 13
});

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

L.marker([-33.89185, 151.19356]).addTo(map);

// Display the Error Message to users
const showError = (error) => {
   if(error != undefined) {
      errorMsg.innerHTML = error;
      errorMsg.classList.add("py-1.5")
   } else {
      // Delete any previous errors
      errorMsg.innerHTML = "";
      errorMsg.classList.remove("py-1.5")
   }
}

async function getAddress() {
   var data;
   
   // Check if the user enter value or not
   if(IP.value != "") {
      await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${IP.value}`, {
         headers: {
         "Content-Type": "application/json",
         }
      }).then(async (response)=> {
         // Check if the fetch success
         if(response.status === 200) {
            let result = await response.json();
            // Delete any previous errors
            showError();
            data = result;
         } else {
            showError("Invalid ip address!");
         }
      });
   } else {
      showError("Enter ip address, Please");
   }

   return data;
}

var btn = document.getElementById("btn");
var ip = document.getElementById("ip-Address");
var city = document.getElementById("location");
var time = document.getElementById("time");
var company = document.getElementById("company");

btn.addEventListener("click", async () => {
  const result = await getAddress();
  if(result != undefined) {
     console.log(result);
     L.marker([result.latitude, result.longitude]).addTo(map);
     map.setView(new L.LatLng(result.latitude, result.longitude), 13);
     ip.innerHTML = result.ip;
     city.innerHTML = `${result.city}, ${result.country_code3}`;
     time.innerHTML = `UTC ${result.time_zone.offset}:00`;
     company.innerHTML = result.isp;
  }
});