import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Createuser from "./Components/Createuser";
import Next from "./Components/Next";
import Verify from "./Components/Verify";
function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/" element={<Signup />} />
            <Route path="/createuser" element={<Createuser />} />
            <Route path="/next" element={<Next />} />
            <Route path="/verify" element={<Verify />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
