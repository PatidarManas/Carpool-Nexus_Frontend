import CreateRide from "./Pages/CreateRide";
import Dashboard from "./Pages/Dashboard";
import Payment from "./Pages/Payment";
import RequestHistory from "./Pages/RequestHistory";
import RideDetails from "./Pages/RideDetails";
import SearchRide from "./Pages/SearchRide";
import Signup from "./Pages/Signup";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/search"} element={<SearchRide />} />
        <Route path={"/ride"} element={<RideDetails />} />
        <Route path={"/requestHistory"} element={<RequestHistory />} />
        <Route path={"/payment"} element={<Payment/>} />
        <Route path={"/createRide"} element={<CreateRide/>} />
      </Routes>
    </Router>
  );
}

export default App;
