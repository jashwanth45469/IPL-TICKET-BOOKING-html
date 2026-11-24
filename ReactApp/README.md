# IPL Ticket Booking (React)

A Vite + React demo that rebuilds the IPL ticket booking UI with reusable JSX
components, props, and state.

## Run locally

In Windows PowerShell:

```bash
npm.cmd install
npm.cmd run dev
```

In other shells, use `npm install` and `npm run dev`. Open the local URL printed
by Vite. To create a production build, run `npm.cmd run build` in PowerShell or
`npm run build` in other shells.

## Project structure

- `src/components/Navbar.jsx` — responsive navigation
- `src/components/Hero.jsx` — landing hero section
- `src/components/MatchCard.jsx` — reusable match card, receiving match data
  and a booking callback through props
- `src/components/BookingForm.jsx` — controlled booking form and live summary
- `src/App.jsx` — match data, mapped match-card list, filters, booking state,
  and local browser persistence

Bookings are a front-end demonstration stored in the browser's local storage;
there is no payment processing or server-side booking.
