import { useEffect, useState } from "react";
import CreateRide from "./Pages/CreateRide";
import Dashboard from "./Pages/Dashboard";
import LandingPage from "./Pages/Landing";
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
import axios from "axios";
import { getTokenFromCookie } from "./Components/FunctionsHelper";
import Loading from "./Components/Loading";

const URL = "http://localhost:4000/v1/api";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const token = getTokenFromCookie();
    if (token) {
      // Make a request to backend endpoint with token in headers
      axios
        .post(
          `${URL}/auth/islogin`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setIsLoading(false);
          setIsLogin(response.data.isAuthenticated);
          setUser(response.data.user)
        })
        .catch((error) => {
          console.error("Error verifying login:", error);
          setIsLoading(false);
          setIsLogin(false);
        });
    } else {
      setIsLogin(false);
      setIsLoading(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/signup"} element={isLoading ? <Loading /> : isLogin ? <Dashboard/> : <Signup URL={URL} />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/search"} element={<SearchRide URL={URL}/>} />
        <Route path={"/ride/:id"} element={<RideDetails URL={URL}/>} />
        <Route path={"/requestHistory"} element={<RequestHistory />} />
        <Route path={"/payment"} element={<Payment />} />
        <Route path={"/createRide"} element={isLoading ? <Loading /> : isLogin ? <CreateRide URL={URL} USER={user}/> : <Signup URL={URL} />}  />
      </Routes>
    </Router>
  );
}

export default App;
