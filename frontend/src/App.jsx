import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import {AuthProvider,useAuth} from "./context/AuthContext";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import Home from "./shared/pages/Home";import Login from "./shared/pages/Login";import Register from "./shared/pages/Register";import NotFound from "./shared/pages/NotFound";
import PatientRoutes from "./portals/patient/routes/PatientRoutes";import DoctorRoutes from "./portals/doctor/routes/DoctorRoutes";import AdminRoutes from "./portals/admin/routes/AdminRoutes";
import "./App.css";
function App(){return <AuthProvider><BrowserRouter><Routes><Route path="/" element={<Home/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/patient/*" element={<ProtectedRoute role="patient"><PatientRoutes/></ProtectedRoute>}/><Route path="/doctor/*" element={<ProtectedRoute role="doctor"><DoctorRoutes/></ProtectedRoute>}/><Route path="/admin/*" element={<ProtectedRoute role="admin"><AdminRoutes/></ProtectedRoute>}/><Route path="*" element={<NotFound/>}/></Routes></BrowserRouter></AuthProvider>}
export default App;
