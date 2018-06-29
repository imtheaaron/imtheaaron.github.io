var mapboxKey = 'access_token=pk.eyJ1IjoiaW10aGVhYXJvbiIsImEiOiJjamlkdmxmZ3YwZnZzM3ZwaWlwcTlpbGlmIn0._Rrocc1JmeqRP7qkoB4m4Q'; 

// url for all earthquakes over the past 7 days:
var quakesUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

d3.json(quakesUrl, function(data) {
    makeMap(data)
});

//function that will take in geojson info for the megnitude of the earthquake and return a color based on the magnitude
function magColor(magData) {
    return  magData > 5 ? '#f06b6b' :
            magData > 4 ? '#f0a76b' :
            magData > 3 ? '#f3ba4d' :
            magData > 2 ? '#f3db4d' :
            magData > 1 ? '#e1f34d' :
            magData > 0 ? '#b7f34d' :
                    '#cad2d3'; 
};

//this function will create our map layers (maps, markers & geojson objects, legend)
function makeMap(data) {

    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + "Magnitude: " + feature.properties.mag + "<br>" + feature.properties.place +
          "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      }

    //create a layer to hold fault lines (will be pulled in later from a d3.json call)
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
        "Geographic Map": outdoorMap,
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

    //perform the d3.json call to retrieve the geojson info for the tectonic plate lines and add to the faults layer
    d3.json(platesUrl, function(response) {
       console.log(response);
        L.geoJson(response, {
            color: "red",
            weight: 2
        }).addTo(faults)
    });

    //create a legend for the map
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend');
            limits = [
              0,
              1,
              2,
              3,
              4,
              5
            ],
            labels = [];
        div.innerHTML = "<h4>Earthquake<br>Magnitude</h4>";

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < limits.length; i++) {
            div.innerHTML +=
                '<i style="background:' + magColor(limits[i] + 1) + '"></i> ' +
                limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(myMap);
    
};