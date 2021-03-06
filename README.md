# Clinc Mangament System

CMS is a web-based application for managing multiple clinic’s data along with
providing common access clinic’s doctors and receptionists.
Clinic required a system to manage all the back-office team activities for their
patient’s appointment & their follow-ups. It provides doctors with their daily
schedule also allows the patient to make the
payment through Cash, Credit Card. User can generate receipts for Insurance Company and also for the patient.

## Main features

- Register Appointments according to the doctor working hours and available appointment schedule
- Enabling the patient to choose their appointments time from available options eliminating the unnecessary long waiting hours
- Preventing the overcrowding in most of clinics due to waiting for appointments long queues
- Enabling the patients to choose their prefered payment method
- Enabling doctors to track their patients' medical history including _their past diseases, current diseases, chronic diseases, and the medicines they take currently_. thus doctors are able to make the best decisions regarding their patients' case

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

## Request body exapmles

### Create appointment request body

```
{
    "doctor":"62d3a4a18735635fcbb44bec",
    "patientId":"62d28f4e16737c64f882c2f0",
    "date":"2022-07-17T10:10:18.930Z",
    "appointmentNumber":5,
    "invoice":{
        "description":"Examination",
        "price":150
    },
    "prescription":[]
}
```

### Create doctor request body

```
{
    "profile":{
        "name":"Ahmed Hassan",
        "email":"test@gmail.com",
        "dateOfBirth":"2000/05/05",
        "phone":"0102022022",
        "gender":"male",
        "address":"Damietta"
    },
    "specialzation":"ophthalmologist",
    "workingHours":{
        "from":{"h":6},
        "to":{"h":6,"m":40}
    },
    "appointmentDuration":15
}
```

### Create patient request body

```
{
    "profile":{
        "name":"Sara Ahmed",
        "email":"patient2@gmail.com",
        "dateOfBirth":"2000/05/05",
        "phone":"0102332033",
        "gender":"female",
        "address":"Cairo, Nasr City"
    },
    "medicalHistory":{
        "previousDiseases": [
            {"name":"", "description":""},
            {"name":"", "description":""},
        ],
        "chronicDiseases": [
            {"name":"", "description":""},
            {"name":"", "description":""},
        ],
        "currnetMedicines": [
            "62d3a4a18735635fcbb44bec",
            "62d28f4e16737c64f882c2f0",
        ],
        "isPregnantOrBreastfeeding": true;
    }
}
```

### Create medicine request body

```
{
    "name":"Panadol",
    "description":"Some medical description",
    "formulation":{
        "form":"tablets",
        "concentrations":["12","15"]
    }
}
```

### Create employee request body

```
{
    "profile":{
        "name":"Ahemd Mahmoud",
        "email":"test@gmail.com",
        "dateOfBirth":"2000/05/05",
        "phone":"0133442023",
        "gender":"male",
        "address":"Damietta"
    },
    "password":"123123123@Aa",
    "passwordConfirm":"123123123@Aa",
    "role":"user",
    "department":"assistant"

}
```

### Update prescription request body

```
[
    {
        "medicine":"62d3a4a18735635fcasd44bec"
        "frequency": {
            "dose":2,
            "timeUnit":"DAY",
            "timeUnitCount":2
        },
        "duration": 3,
        "foodRelationship": "after launch"
    },
    {
        "medicine":"62d3a4a1873asd35fcbb44bec"
        "frequency": {
            "dose":2,
            "timeUnit":"WEEK",
            "timeUnitCount":2
        },
        "duration": 4,
        "foodRelationship": "before any meal"
    },
]
```
