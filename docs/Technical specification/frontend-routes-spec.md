# Front-End Routes Specification

## Purpose

This document lists the main front-end routes of the application and their access level.

## Route Groups

### Public routes

These routes are accessible without authentication.

| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | User login page |
| `/register` | User registration page |
| `/forgot-password` | Password reset request page |
| `/reset-password` | Password reset page |

### Authenticated routes

These routes require the user to be authenticated.

| Route | Description |
|---|---|
| `/dashboard` | User dashboard |
| `/appointments/:id` | Appointment details page |
| `/appointments/:id/edit` | Appointment edit page |
| `/booking/formula` | Booking formula selection step |
| `/booking/vehicle` | Booking vehicle selection step |
| `/booking/slot` | Booking time slot selection step |
| `/booking/recap` | Booking summary step |
| `/payment` | Payment page |
| `/payment/success` | Payment success page |
| `/payment/failed` | Payment failure page |

## Notes

- `:id` is a dynamic route parameter used to identify a specific appointment.
- Authenticated routes should be protected by a route guard.
- Unauthenticated access to protected routes should redirect the user to `/login`.
