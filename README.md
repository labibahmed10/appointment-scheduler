# React Appointment Scheduler Application

This project implements an Appointment Scheduler application system that uses react and firebase and other techs. User can login or register using username and password, and s/he will be able to see other users to make an appointment, decline or accept an appointment depending on date. Also s/he will be able to filter appointments based on date(upcoming or past). All the appointments are stored in firebase firestore for dynamic access. Typescript is being used for type safety in the application.

# How It Works

1. Remember if you are logged in you will only be able to see other users, except you.
2. A modal will appear to schedule the meeting with title, description, date and time.
3. If you have set an appointment with other users, you can only cancel the appointment.
4. If some other user schedule an appointment with you, you can both accept or decline the appointment.
5. If you once accept the appointment, you wont be able to accept again as it will be disable.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 12.0 or higher recommended)
- pnpm/npm (usually comes with Node.js)
- A modern web browser

## Installation

To install the project, follow these steps:

1. Clone the repository: https://github.com/labibahmed10/appointment-scheduler
2. Navigate to the project directory: `cd appointment-scheduler/`
3. Install the dependencies: `npm install | pnpm install`

## Usage

To run the project locally:

1. Start the development server: `npm run dev | pnpm run dev`
2. Open your web browser and navigate to `http://localhost:3000 | http://localhost:5137`
3. sign up as a new user, then make appointment.

## Dependencies

- React
- Typescript
- Firebase
- Shadcn
- Tailwind CSS
- React-hook-form
- React-router-dom
- Sonner
- Vite
