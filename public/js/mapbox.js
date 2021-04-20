export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidGFtZXJ3YWdpaCIsImEiOiJja2ZjbjF1cGMxOWt5MnVvNTBwaDVjbmt1In0.IQ8u3kqg3-0cWemqxYuDoA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tamerwagih/cknoo79123s7t17m9k8dbdlke',
    scrollZoom: false,
    center: [-118.113491, 34.111745],
    zoom: 4,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // create marker
    const el = document.createElement('div');
    el.className = 'marker';
    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    //  extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
