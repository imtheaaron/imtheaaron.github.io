var tbody = document.querySelector("tbody");
var dateInput = document.querySelector("#date-search");
var cityInput = document.querySelector("#city-search");
var searchBtn = document.querySelector("#search");

searchBtn.addEventListener("click", handleSearchButtonClick);

var filteredSightings = dataSet;

function handleSearchButtonClick() {
 
    var filterSearch = dateInput.value.trim();
    // Set filteredAddresses to an array of all addresses whose "state" matches the filter
    filteredSightings = dataSet.filter(function(sighting) {
      var dates = sighting.datetime;
      // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
      return dates === filterSearch;
    });
  // if (cityInput != null){ 
  //   var filterSearch = cityInput.value.trim().toLowerCase();
  //   // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  //   filteredSightings = filteredSightings.filter(function(sighting) {
  //     var cities = sighting.city;
  //     // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
  //     return cities === filterSearch;
  //   });

  renderTable();
}

function renderTable() {
    tbody.innerHTML = "";
    for (var i = 0; i < filteredSightings.length; i++) {
      // Get get the current sighting object and its fields
      var sighting = filteredSightings[i];
      var fields = Object.keys(sighting);
      // Create a new row in the tbody, set the index to be i
      var row = tbody.insertRow(i);
      for (var j = 0; j < fields.length; j++) {
        // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
        var field = fields[j];
        var cell = row.insertCell(j);
        cell.innerText = sighting[field];
      }
    }
  };

renderTable();
