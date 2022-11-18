// import "./App.css";
import AddItem from "./Components/addItem";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signin from "./Pages/SignIn/signIn";
import SignUp from "./Pages/SignUp/signUp";
import Protected from "./Components/protected";

window.addEventListener("storage", () => {
  localStorage.clear();
  window.location.reload();
});

function App() {
  const [flag, setFlag] = useState(
    JSON.parse(localStorage.getItem("status")) || false
  );
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Signin setFlag={setFlag} flag={flag} />}
            />
            <Route
              path="/*"
              element={
                <Protected flag={flag}>
                  <AddItem />
                </Protected>
              }
            />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
