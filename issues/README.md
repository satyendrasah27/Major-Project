# PolitiView India — Political Issues

Responsive political-issues dashboard based on the supplied reference image.

## Run locally
1. Extract the ZIP.
2. Open `index.html`, or run:
   ```bash
   python3 -m http.server 8000
   ```
3. Visit `http://localhost:8000`.

## Included interactions
- Political issue cards with priority badges, metadata and topic tags
- Tabs for All Issues, Latest, Most Important, Trending, and In My Region
- Search, location/category/source/time filters and priority filter
- Apply Filters and Reset controls
- Save/unsave issue buttons
- Load example saved searches
- Responsive sidebar, filters and cards for smaller screens

## Prototype limitations
- Headlines and issue counts are sample/demo data, not live or independently verified reporting.
- The filtering, tabs and saved-search controls work locally in the browser.
- Saving bookmarks and searches does not persist after a refresh.
- Photos load from Unsplash and require an internet connection.
- Connect a backend and reliable Indian news/government sources for production use.
