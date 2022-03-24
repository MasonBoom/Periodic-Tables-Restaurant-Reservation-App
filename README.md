# Periodic Tables

The periodic tables restaurant reservation app is a full-stack web application that allows users to view availble tables, schedule a reservation, create tables, and search reservations by phone number. When a reservation is made, it gets stored into a PostgreSQL database.

Live version of the app: https://evening-lowlands-63794.herokuapp.com/dashboard

A full-stack app built using:
- HTML
- CSS
- JavaScript
- React
- Express
- Knex
- PostgreSQL

## Available API Endpoints

| URL | Method | Description |
| ---------------- | ----- | ---------------------------------------------------------------- |
| `/reservations?date=YYYY-MM-DD` | GET | Lists all reservations for the date specified |
| `/reservations?mobile_number=999-999-9999` | GET | Lists all reservations for the phone number specified |
| `/reservations` | POST | Creates a new reservation |
| `/reservations/:reservationId` | GET | Reads a reservation by reservation_id |
| `/reservations/:reservationId` | PUT | Updates a reservation by reservation_id |
| `/reservations/:reservationId/status` | PUT | Updates the status of a reservation by reservation_id  |
| `/tables` | GET | Lists all tables |
| `/tables` | POST | Creates a new table |
| `/tables/:table_id/seat` | PUT | Seats a reservation at a table |
| `/tables/:table_id/seat` | DELETE | Finishes an occupied table |

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. Include your backend connection within `./front-end/.env` (defaults to `http://localhost:5000`).
1. Run `npm install` to install project dependencies.
1. Run `npm run start` to start the server.

## App Functionality

### Dashboard

- Defaults to displaying a list of booked (or seated) reservations for the current date.  
- Navigation buttons: `Previous Day`, `Today`, & `Next Day` are available for changing the date displayed by the dashboard.
- All tables (free or occupied) are also diplayed here.

![dashboard](https://github.com/MasonBoom/Periodic-Tables-Restaurant-Reservation-App/blob/5a5a86cbaa9c71fdca982dd5b77033bd04819bba/screenshots/Periodic%20Tables%20Restaurant%20Reservation%20System%20-%20Google%20Chrome%203_24_2022%203_33_37%20PM.png)

---

### Menu

The menu provides options to:
1. Search for a reservation
2. Create a new reservation 
3. Create a new table

![menu](https://github.com/MasonBoom/Periodic-Tables-Restaurant-Reservation-App/blob/a5baf343aa8359092e56a51e07e848d8407a6124/screenshots/Periodic%20Tables%20Restaurant%20Reservation%20System%20-%20Google%20Chrome%203_24_2022%203_33_58%20PM.png)

---

### Search

1. Enter the phone number for the reservation.
1. Click `find`.

This will display any matching results.

![searched](https://github.com/MasonBoom/Periodic-Tables-Restaurant-Reservation-App/blob/a5baf343aa8359092e56a51e07e848d8407a6124/screenshots/Periodic%20Tables%20Restaurant%20Reservation%20System%20-%20Google%20Chrome%203_24_2022%203_35_05%20PM.png)

---

### New Reservation

1. Fill out the form with the reservation information.
1. Click `submit`.

![newReservation](https://github.com/MasonBoom/Periodic-Tables-Restaurant-Reservation-App/blob/a5baf343aa8359092e56a51e07e848d8407a6124/screenshots/Periodic%20Tables%20Restaurant%20Reservation%20System%20-%20Google%20Chrome%203_24_2022%203_35_54%20PM.png)

---

### New Table

1. Fill out the form with the table information.
1. Click `submit`.

![newTable](https://github.com/MasonBoom/Periodic-Tables-Restaurant-Reservation-App/blob/a5baf343aa8359092e56a51e07e848d8407a6124/screenshots/Periodic%20Tables%20Restaurant%20Reservation%20System%20-%20Google%20Chrome%203_24_2022%203_36_19%20PM.png)

---

### Seating a Reservation

1. Click `seat` on the reservation you'd like to seat.
1. Select a table from the drop-down menu.
1. Click `submit` to seat the reservation at the selected table.

![seat](https://github.com/MasonBoom/Periodic-Tables-Restaurant-Reservation-App/blob/a5baf343aa8359092e56a51e07e848d8407a6124/screenshots/Periodic%20Tables%20Restaurant%20Reservation%20System%20-%20Google%20Chrome%203_24_2022%203_36_38%20PM.png)

Once a reservation is seated, the reservation status will change from `booked` to `seated`.

![seated](https://github.com/MasonBoom/Periodic-Tables-Restaurant-Reservation-App/blob/a5baf343aa8359092e56a51e07e848d8407a6124/screenshots/Periodic%20Tables%20Restaurant%20Reservation%20System%20-%20Google%20Chrome%203_24_2022%203_36_51%20PM.png)

---

### Finishing a Reservation

1. Click `finish` on the table that has finished.
1. Click `OK` on the confirmation window that pops-up.

![finishing](https://github.com/MasonBoom/Periodic-Tables-Restaurant-Reservation-App/blob/a5baf343aa8359092e56a51e07e848d8407a6124/screenshots/Periodic%20Tables%20Restaurant%20Reservation%20System%20-%20Google%20Chrome%203_24_2022%203_37_17%20PM.png)

Note: finished reservations no longer display in the dashboard.

---

### Editing a Reservation

1. Click `edit` on the reservation you'd like to edit.
1. Edit any of the reservation information as needed.
1. Click `submit` to save the updated reservation information.

![editing](https://github.com/MasonBoom/Periodic-Tables-Restaurant-Reservation-App/blob/a5baf343aa8359092e56a51e07e848d8407a6124/screenshots/Periodic%20Tables%20Restaurant%20Reservation%20System%20-%20Google%20Chrome%203_24_2022%203_37_40%20PM.png)

---

### Cancelling a Reservation

1. Click `cancel` on the reservation you'd like to cancel.
1. Click `OK` on the confirmation window that pops-up.

![cancelling](https://github.com/MasonBoom/Periodic-Tables-Restaurant-Reservation-App/blob/a5baf343aa8359092e56a51e07e848d8407a6124/screenshots/Periodic%20Tables%20Restaurant%20Reservation%20System%20-%20Google%20Chrome%203_24_2022%203_38_03%20PM.png)

Note: cancelled reservations no longer display in the dashboard.

---
