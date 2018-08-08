const config = {
  mapOptions: {
    center: [86.404994246, 42.0246267579],
    zoom: 11,
    baseLayer: {
      urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c', 'd'],
      attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    }
  }
}
export default config