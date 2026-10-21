# PolitiView India — Impact & Insights

Responsive HTML/CSS/JavaScript dashboard with an interactive India geography panel.

## Run locally
1. Extract the ZIP.
2. Open `index.html`, or run:
   ```bash
   python3 -m http.server 8000
   ```
3. Visit `http://localhost:8000`.

## Updates in this version
- Replaced the hand-drawn India silhouette with an interactive Leaflet map.
- Loads Indian state boundaries from public GeoJSON sources (with a fallback source).
- Adds state and union-territory selection, clickable state polygons, zoom-to-state, map tooltips, and a state impact choropleth.
- Adds all Indian states and union territories to the region selector.
- Adds clear map loading/failure messages and attribution.
- District, constituency and ward tabs do not invent boundary shapes: they zoom the map contextually and clearly report that verified boundaries for those levels still need to be connected.
- Retains responsive charts, issue rankings, topic impact bars, trend charts and dashboard tabs.

## Important data notes
All issue counts, impact scores, rankings, and trend values remain illustrative demo data and are not live or verified political analytics. The state boundary layer depends on internet access and the linked public GeoJSON source. For a production system, use a maintained, versioned administrative-boundary dataset with a documented license and add verified district, Lok Sabha/Vidhan Sabha constituency, and municipal ward boundaries separately. Do not treat the illustrative impact metrics as factual reporting.

## External resources
- Leaflet for the interactive map (loaded from unpkg CDN).
- OpenStreetMap tiles and attribution.
- Public GeoJSON state boundary data (primary and fallback sources are defined in `app.js`).
