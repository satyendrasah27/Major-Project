# PolitiView Login Page

Responsive login UI with two sign-in methods:
- Email + password format validation
- Indian mobile number validation (`+91` prefix and 10 digits beginning 6–9)
- OTP entry UI and change-number control
- Show/hide password
- Responsive desktop/mobile layouts

## Run
Open `index.html` directly, or from this folder run:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## Important: production authentication
This project is a front-end prototype. It does **not** authenticate users, send email, send SMS, verify OTPs, or store accounts. It only validates input formats. The UI deliberately does not create or display a fake OTP.

To make login genuinely functional, implement a backend:
- Email/password: use a trusted identity provider or server-side password verification, hashed passwords (Argon2id/bcrypt), rate limiting, secure session cookies, CSRF protection, and password reset.
- Phone: use a verified SMS OTP provider (for example, Firebase Authentication, AWS Cognito, or Twilio Verify). Generate/verify OTP server-side, expire codes, rate-limit attempts, and never trust client-side validation alone.
- Redirect to the dashboard only after the backend returns a successful authenticated session.
- Do not put provider secrets in `app.js`.

Replace the demo submit handlers in `app.js` with calls to your backend/provider before using this with real users.
