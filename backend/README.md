## 🔧 Backend Setup

### 1. Clone the Repository

```bash
git clone "https://github.com/DigveshParab/RentalMate-Octalogic-Technical-Test.git"
cd RentalMate-Octalogic-Technical-Test/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root of the `backend` directory and add your database URL:

```env
DATABASE_URL="your-neon-console-database-url"
```

> 💡 The project uses [Neon](https://neon.tech/) for the PostgreSQL database.

### 4. Run Migrations

Generate the schema and apply it to your database:

```bash
npx prisma migrate dev --name init
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Verify Tables

Check your [Neon Console](https://console.neon.tech/) to verify that the tables were created successfully.

### 7. Seed the Database

Run the seeding script to populate initial data:

```bash
npx ts-node src/seed.ts
```

Confirm that the data appears in your DB.

### 8. Build the Project

Compile TypeScript to JavaScript:

```bash
tsc -b
```

### 9. Start the Server

```bash
node dist/index.js
```

Your backend server should now be running at:

```
http://localhost:5000
```

---

## 📦 API Endpoints

These endpoints are used by the frontend to interact with the backend system for vehicle booking:

### 📌 POST `/book/create`
- **Purpose:** Create and store a new booking in the database.
- **Body:** Should contain user's name, vehicle ID, and booking dates.

---

### 📌 POST `/book/check_availability`
- **Purpose:** Check if the selected vehicle is available for the given date range (i.e., no overlapping bookings).
- **Body:** Should contain vehicle ID and start & end dates.

---

### 📌 GET `/book/getTypes/:wheels`
- **Purpose:** Fetch vehicle types based on the number of wheels selected (e.g., 2 or 4).
- **Params:**
  - `:wheels` – Number of wheels (2 or 4)

---

### 📌 GET `/book/getRide/:vehicleType`
- **Purpose:** Fetch vehicles that belong to a specific vehicle type.
- **Params:**
  - `:vehicleType` – ID of the vehicle type selected by the user

---
