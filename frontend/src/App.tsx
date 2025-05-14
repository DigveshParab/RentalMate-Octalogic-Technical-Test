import { Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import BookingForm from "./components/BookingForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/form" element={<BookingForm />} />
    </Routes>

  );
}

export default App;
