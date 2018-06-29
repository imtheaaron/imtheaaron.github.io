var mapboxKey = 'access_token=pk.eyJ1IjoiaW10aGVhYXJvbiIsImEiOiJjamlkdmxmZ3YwZnZzM3ZwaWlwcTlpbGlmIn0._Rrocc1JmeqRP7qkoB4m4Q'; 

// url for all earthquakes over the past 7 days:
var quakesUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

d3.json(quakesUrl, function(data) {
    makeMap(data)
});

function magColor(magData) {
    return  magData > 5 ? '#f06b6b' :
            magData > 4 ? '#f0a76b' :
            magData > 3 ? '#f3ba4d' :
            magData > 2 ? '#f3db4d' :
            magData > 1 ? '#e1f34d' :
            magData > 0 ? '#b7f34d' :
                    '#cad2d3'; 
};

function makeMap(data) {

    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + "Magnitude: " + feature.properties.mag + "<br>" + feature.properties.place +
          "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      }
    
      // Create a GeoJSON layer containing the features array on the earthquakeData object
      // Run the onEachFeature function once for each piece of data in the array

    var faults = new L.LayerGroup();

    var quakes = L.geoJson(data, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: feature.properties.mag * 5,
                fillColor: magColor(feature.properties.mag),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
    });

    // Define map layers
    var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
    mapboxKey);

    var outdoorMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?" +
    mapboxKey);

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Outdoors Map": outdoorMap,
        "Light Map": lightMap,
    };

    var overlayMaps = {
        Earthquakes: quakes,
        "Tectonic Plates": faults
    };
    
    var myMap = L.map("map", {
        center: [30.3429959, -5.8608298],
        zoom: 3,
        layers: [outdoorMap, quakes, faults]
    });

    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(myMap);

    d3.json(platesUrl, function(response) {
       console.log(response);
        L.geoJson(response, {
            color: "red",
            weight: 2
        }).addTo(faults)
    });

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