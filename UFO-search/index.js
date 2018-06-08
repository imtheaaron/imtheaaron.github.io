var tbody = document.querySelector("tbody");
var dateInput = document.querySelector("#date-search");
var cityInput = document.querySelector("#city-search");
var stateInput = document.querySelector("#state-search");
var countryInput = document.querySelector("#country-search");
var shapeInput = document.querySelector("#shape-search");
var searchBtn = document.querySelector("#search");
var records_per_page = 30; //this is the number of results we will display per page with pagination
var current_page = 1;

searchBtn.addEventListener("click", handleSearchButtonClick);

var filteredSightings = dataSet;

function handleSearchButtonClick() {
    if (dateInput.value) {
    var filterSearch = dateInput.value.trim();
    // Set filteredAddresses to an array of all addresses whose "state" matches the filter
    filteredSightings = dataSet.filter(function(sighting) {
      var dates = sighting.datetime;
      // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
      return dates === filterSearch;
        });
    }
    if (cityInput.value) { 
    var filterSearch = cityInput.value.trim().toLowerCase();
    // Set filteredAddresses to an array of all addresses whose "state" matches the filter
    filteredSightings = filteredSightings.filter(function(sighting) {
      var cities = sighting.city;
      // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
      return cities === filterSearch;
        });
    }
    if (stateInput.value) { 
        var filterSearch = stateInput.value.trim().toLowerCase();
        // Set filteredAddresses to an array of all addresses whose "state" matches the filter
        filteredSightings = filteredSightings.filter(function(sighting) {
        var states = sighting.state;
        // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
        return states === filterSearch;
        });
    }
    if (countryInput.value) { 
        var filterSearch = countryInput.value.trim().toLowerCase();
        // Set filteredAddresses to an array of all addresses whose "state" matches the filter
        filteredSightings = filteredSightings.filter(function(sighting) {
        var countries = sighting.country;
        // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
        return countries === filterSearch;
        });
    }
    if (shapeInput.value) { 
        var filterSearch = shapeInput.value.trim().toLowerCase();
        // Set filteredAddresses to an array of all addresses whose "state" matches the filter
        filteredSightings = filteredSightings.filter(function(sighting) {
        var shapes = sighting.shape;
        // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
        return shapes === filterSearch;
        });
    }
  dateInput.value = '';
  cityInput.value = '';
  stateInput.value = '';
  countryInput.value = '';
  shapeInput.value = '';

  current_page = 1;
  changePage(1);
}

// function renderTable() {
//     tbody.innerHTML = "";
//     for (var i = 0; i < filteredSightings.length; i++) {
//       // Get get the current sighting object and its fields
//       var sighting = filteredSightings[i];
//       var fields = Object.keys(sighting);
//       // Create a new row in the tbody, set the index to be i
//       var row = tbody.insertRow(i);
//       for (var j = 0; j < fields.length; j++) {
//         // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
//         var field = fields[j];
//         var cell = row.insertCell(j);
//         cell.innerText = sighting[field];
//       }
//     }
//   };

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    tbody.innerHTML = "";

    for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
        var sighting = filteredSightings[i];
        var fields = Object.keys(sighting);
        var k = i - (page-1) * records_per_page
        var row = tbody.insertRow(k);
        for (var j = 0; j < fields.length; j++) {
        // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
        var field = fields[j];
        var cell = row.insertCell(j);
        cell.innerText = sighting[field];
      }
    }

    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages()
{
    return Math.ceil(filteredSightings.length / records_per_page);
}

window.onload = function() {
    changePage(1);
};

