# Clinc Mangament System

CMS is a web-based application for managing multiple clinic’s data along with
providing common access clinic’s doctors and receptionists.
Clinic required a system to manage all the back-office team activities for their
patient’s appointment & their follow-ups. It provides doctors with their daily
schedule also allows the patient to make the
payment through Cash, Credit Card. User can generate receipts for Insurance Company and also for the patient.

## The systems goal is to manage the following entites:

- Patenits

  - Prescriptions
  - Medical History
  - Invoices

- Doctors

  - Daily Schedule
  - Working Hours

- Employees

  - Role Management

- Medicine

  - Formulations

- Appointments

## API Endpoints:

### Appointments:

- /appointments

  - `GET` Get all appointments
  - `POST` Create appointment

- /appointments/:id

  - `GET` Get appointment by `id`
  - `PUT` Update appointment by `id`
  - `DELETE` delete appointment by `id`

- /appointments/:id/prescription

  - `POST` Update an appointment prescription after the appointment is done

- /appointments/date/day/:day
  - `GET` Get appointment by `day` or defaults to the current day appointments

### Medicine:

- /medicines

  - `GET` Get all medicines
  - `POST` Create medicine

- /medicines/:id

  - `GET` Get medicine by `id`
  - `PUT` Update medicine by `id`
  - `DELETE` delete medicine by `id`

### Doctor:

- /doctors

  - `GET` Get all doctors
  - `POST` Create doctor

- /doctors/:id

  - `GET` Get doctor by `id`
  - `PUT` Update doctor by `id`
  - `DELETE` delete doctor by `id`

### Employees:

- /employees

  - `GET` Get all employees
  - `POST` Create employee

- /employees/:id

  - `GET` Get employee by `id`
  - `PUT` Update employee by `id`
  - `DELETE` delete employee by `id`

### Patients:

- /patients

  - `GET` Get all patients
  - `POST` Create patient

- /patients/:id

  - `GET` Get patient by `id`
  - `PUT` Update patient by `id`
  - `DELETE` delete patient by `id`

### Reports

- /reports/appointments/
  - `GET` Get reports about appointmets in certain duration

### Authentecation

- /auth/login
  - `POST` to login and get the JWT token

### Payments

- /create-checkout-session/:id
  - `GET` to checkout and preform payment

## Other Features

- Doctors will get notified by email when any appointment is registerd

- Doctors will get notified with thier daily schedule by mail

- Patient will be mailed with the appointment invoice details
