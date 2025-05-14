# 🚗 Vehicle Booking Frontend

## 🧠 Thought Process Behind the Frontend

This frontend was built to provide a clean, minimal, and responsive user experience for booking a vehicle using a **step-by-step form flow**. The stack combines:

- **React (TypeScript)** for building component-based UI
- **Tailwind CSS** for utility-first styling
- **Material UI (MUI)** for pre-built form components and theming
- **Yup + Formik** for form validation and handling
- **Axios** for API communication

### Flow Overview

1. **Splash Screen**  
   Displays a basic text animation (placeholder for future enhancements) before loading the form interface.

2. **Single Page Form Logic**  
   All questions are stored as configuration in an object. Navigation between steps is handled internally, giving the illusion of page transitions while staying on the same route.

3. **Step-by-Step Breakdown**  
   - **Step 1:** User enters First Name and Last Name → `Next`
   - **Step 2:** Select Number of Wheels (2 or 4)  
     - Triggers a **300ms debounce** on selection  
     - Calls backend to fetch vehicle types
     - Uses **cleanup logic** to reset state if the wheel count changes before fetch completes  
   - **Step 3:** Vehicle Type selection (based on wheel count)  
     - On selection, triggers API call to fetch vehicles of that type  
     - Loader shown while data is being fetched  
   - **Step 4:** Vehicle selection → `Next`
   - **Step 5:** Select Start and End Dates  
     - Uses a basic **from-to date picker**  
     - On selection, applies a **400ms debounce** to allow last-minute changes  
     - Backend is called to **check availability**  
     - If not available, the Book button is disabled and a message is shown  
     - Cleans up and resets the check when dates are changed again  
   - **Step 6:** Final Booking  
     - If dates are valid and vehicle is available, send the data to backend to **create a booking**

---

## 🧱 Project Setup

### 📦 Install Dependencies

```bash
cd frontend
yarn
```

This installs all required dependencies including:
- React + Typescript
- Tailwind CSS
- Material UI
- React Hook Form
- Yup
- Axios
- Day.js (for date formatting and handling)

---

## 🚀 Running the App

To start the development server:

```bash
yarn dev
```

The app will be available at:

```
http://localhost:5173
```

Make sure your **backend is running** on the expected port (usually `http://localhost:5000`) so API requests can succeed.

---
