import { BookingProvider } from "./context/BookingContext";
import Login from "./pages/Login";
import BrowseSpaces from "./pages/BrowseSpaces";
import BookSpace from "./pages/BookSpace";


function App() {
  return (
    <BookingProvider>
      <div>
        <h1>Co-working Space Booking (Prototype 1)</h1>
        <Login />
        <hr />
        <BrowseSpaces />
        <hr />
        <BookSpace />
      </div>
    </BookingProvider>
  );
}

export default App;
