# PolitiView India Dashboard

Responsive dashboard prototype based on the supplied reference image, updated to focus on India and its states/union territories.

## Run
1. Extract the ZIP.
2. Open `index.html` in a browser, or serve the folder locally:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

## India-only region support
- Region dropdown includes all 28 states and 8 union territories.
- Selecting a state/UT updates the dashboard's regional labels.
- Interactive map uses Leaflet and India state-boundary GeoJSON.
- Clicking a state on the map selects that state when its name matches the region list.
- The map uses an external GeoJSON URL and therefore needs internet access. If the source URL changes, update `geoUrl` in `app.js`.

## Important limitations
- Headlines, scores, weather, timestamps, and progress indicators are demonstration content, not live reporting.
- To ship this as a real political intelligence product, integrate verified Indian news feeds, official Election Commission of India and government sources, real weather, a database, authentication, and location-level datasets.
- GeoJSON state names can vary between datasets. If a state does not select correctly, adjust `regionAliases` in `app.js`.
- This is a front-end prototype; search, notifications, save persistence, and article explainers are not connected to a backend.
