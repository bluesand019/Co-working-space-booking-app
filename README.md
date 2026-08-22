# Co-working Space Booking System

A lightweight MVP for booking desks, private offices, and meeting rooms in a co-working space — built as part of CSE 3206 (Software Engineering Sessional), RUET.

Built using the **Prototype software process model**, developed across three iterative cycles (see below).

## Tech Stack

- **Frontend:** React (Vite)
- **Routing:** React Router
- **State Management:** React Context API
- **Persistence:** Browser localStorage (no backend/database — by design, for MVP scope)

## Features

- Simple role-based login (Member / Admin)
- Browse available spaces with type filtering (Hot Desk, Private Office, Meeting Room)
- Book a space with date/time selection
- Real-time conflict detection (prevents double-booking the same resource)
- View and cancel your own bookings
- Admin dashboard showing all bookings across all users
- Admin resource management (add, edit, delete desks/rooms)

## Setup

```bash
npm install
npm run dev
```


## Demo Flow

1. Log in as a **Member** (any name, select "Member")
2. Browse spaces, filter by type
3. Book a space — try booking the same resource/time twice to see conflict detection in action
4. Go to **My Bookings** to view or cancel your reservation
5. Log out, log back in as **Admin**
6. View all bookings in the **Admin Dashboard**
7. Add, edit, or delete resources in **Manage Resources**

## Project Structure

```
src/
├── context/
│   └── BookingContext.jsx   # Shared state: resources, bookings, auth, CRUD logic
├── pages/
│   ├── Login.jsx
│   ├── BrowseSpaces.jsx
│   ├── BookSpace.jsx
│   ├── MyBookings.jsx
│   ├── AdminDashboard.jsx
│   └── ManageResources.jsx
├── components/
│   ├── Navbar.jsx
│   ├── ResourceCard.jsx
│   └── ProtectedRoute.jsx
├── data/
│   └── mockData.js          # Seed resource data
├── App.jsx
└── main.jsx
```

## Development Approach — Prototype Model

This project was built using the **Prototype process model**, chosen because the core challenge is UX-driven (how the booking flow feels) rather than complex backend logic, and requirements benefit from iterative refinement rather than an upfront rigid spec.

| Cycle | Focus |
|---|---|
| **Cycle 1** | Rough, unstyled proof-of-concept — validate booking flow and conflict-check logic |
| **Cycle 2** | Feature-complete — full routing, all pages, admin CRUD, localStorage persistence, inline error handling |
| **Cycle 3** | Visual design pass, resource editing, filters, empty states, final polish |

## What's Out of Scope for This MVP

- Payment processing
- Email/SMS notifications
- Real backend/database (all data is in-browser via localStorage)
- Multi-location support
- Password-based authentication

These are noted as future work beyond this milestone.

## Team

Group #07 — Section C (2nd 30)
CSE 3206 – Software Engineering Sessional, RUET

## License

Academic project — for coursework purposes only.
