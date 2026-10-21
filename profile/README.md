# PolitiView India — Profile & Preferences

Responsive profile/preferences dashboard recreation based on the supplied reference image.

## Run locally
1. Extract the ZIP.
2. Open `index.html`, or run:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000`.

## Included interactions
- Profile fields, save feedback, image preview
- India-only country selector with states and union territories
- District options for several major states, with fallback choices for other states
- Browser geolocation permission request (coordinates only; reverse geocoding is not connected)
- Selectable political interests and knowledge consumption modes
- Add/remove geographic interest chips
- Notification toggles and preference switches
- Privacy and account settings action feedback
- Responsive desktop/tablet/mobile layout

## Prototype limitations
This is front-end only. Profile saving, authentication, real district/constituency/ward boundary data, email delivery, saved topics persistence, connected accounts, password changes, and data deletion require a secure backend. The mini India map is illustrative and is not a geographically accurate boundary map. No user data is uploaded or persisted by this demo.
