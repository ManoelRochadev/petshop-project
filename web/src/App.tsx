import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { CreateUser } from "./components/CreateUser";
import { CreateGroomer } from "./components/CreateGroomer";
import { CreateDoctor } from "./components/CreateDoctor";
import { Home } from "./components/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/register/user" element={<CreateUser/>}/>
      <Route path='/register/groomer' element={<CreateGroomer />} />
      <Route path='/register/doctor' element={<CreateDoctor />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}
