# PolitiView — Explore by Geography

Responsive India-only geography dashboard using HTML, CSS, JavaScript, Leaflet, OpenStreetMap tiles, and Indian state-boundary GeoJSON.

## Run
1. Extract the ZIP.
2. Open `index.html` in a browser or run `xdg-open index.html` from this folder on Ubuntu.
3. Internet access is required for map tiles, boundary data, fonts, and thumbnail images.

## Files
- `index.html` — dashboard structure
- `styles.css` — layout and responsive styling
- `app.js` — interactive map, Indian city search, view toggles, bookmarks, and demo controls

## Map and data
- Uses Leaflet and OpenStreetMap tiles with state boundaries loaded from the public `geohacker/india` GeoJSON repository.
- Maharashtra is highlighted; the map starts near Pune and can pan/zoom across India.
- City search supports common Indian locations. It is a preset search, not a full address geocoder.
- Issue counts, headlines, wards, constituency names, and statistics are sample UI data, not verified live political facts.
- For production use, verify boundary data provenance/licensing and connect official Election Commission of India, state election commission, municipal corporation, and government open-data sources.
