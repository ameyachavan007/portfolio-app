import About from "./components/About";
import Experiences from "./components/Experiences";
import UserPage from "./components/UserPage";
import Login from "./components/Login";
import Projects from "./components/Projects";
import SignUp from "./components/SignUp";
import CareerDetails from "./components/CareerDetails";
import "./styles.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./utils/auth";
import { useAuth } from "./utils/auth";
import { useEffect } from "react";
import NotFound from "./components/NotFound";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const history = useNavigate();

    useEffect(() => {
      if (!user) {
        history("/");
      }
    }, [user, history]);

    return user ? children : null;
  };

  
  useEffect(()=>{
    document.title = "Portfolio App";
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route
            path="/career-details"
            element={
              <ProtectedRoute>
                <CareerDetails />
              </ProtectedRoute>
            }
          />

          <Route path=":userName" element={<UserPage />}>
            <Route index element={<About />} />
            <Route path="about" element={<About />} />
            <Route path="experience" element={<Experiences />} />
            <Route path="projects" element={<Projects />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
