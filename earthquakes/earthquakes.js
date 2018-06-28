var mapboxKey = 'access_token=pk.eyJ1IjoiaW10aGVhYXJvbiIsImEiOiJjamlkdmxmZ3YwZnZzM3ZwaWlwcTlpbGlmIn0._Rrocc1JmeqRP7qkoB4m4Q'; 

// url for all earthquakes over the past 7 days:
var quakesUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(quakesUrl, function(data) {
    console.log(data);
    makeMap(data);
});

function makeMap(data) {

    //need to use this quakes variable to set the dot size and dot color
    //maybe I'll need to map some color range thing based on the feature.properties.mag
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
          "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      }
    
      // Create a GeoJSON layer containing the features array on the earthquakeData object
      // Run the onEachFeature function once for each piece of data in the array

    var quakes = L.geoJson(data);
    //  {
        
        // pointToLayer: function (feature, latlng) {
        //     return L.circleMarker(latlng);
        // },
    //     style: function(feature) {
    //         return {
    //             radius: feature.properties.mag,
    //             color: "black",
    //             // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
    //             fillColor: "red",
    //             fillOpacity: 0.5,
    //             weight: 1.5
    //         };
    //     },
    //     onEachFeature: onEachFeature,
    // });

    // Define map layers
    var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
    mapboxKey);

    var outdoorMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?" +
    mapboxKey);

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
    "Light Map": lightMap,
    "Outdoors Map": outdoorMap
    };

    var overlayMaps = {
        Earthquakes: quakes
    };
    
    var myMap = L.map("map", {
        center: [37.6533476, -121.0236725],
        zoom: 3,
        layers: [lightMap, quakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(myMap);

//legend stuff (not completed yet)
    // var legend = L.control({ position: "bottomright" });
    // legend.onAdd = function() {
    //   var div = L.DomUtil.create("div", "info legend");
    //   var limits = geojson.options.limits;
    //   var colors = geojson.options.colors;
    //   var labels = [];
  
    //   // Add min & max
    //   var legendInfo = "<h1>Median Income</h1>" +
    //     "<div class=\"labels\">" +
    //       "<div class=\"min\">" + limits[0] + "</div>" +
    //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    //     "</div>";
  
    //   div.innerHTML = legendInfo;
  
    //   limits.forEach(function(limit, index) {
    //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    //   });
  
    //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    //   return div;
    // };

    // legend.addTo(myMap);
};