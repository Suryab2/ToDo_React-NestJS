import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";

function Signin({ setFlag, flag }) {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  // flag=true;
  const [password, setPassword] = useState("");
  // const [flag,setFlag]=useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("status")) === true) {
      navigate("/cart");
    } else {
      localStorage.clear();
    }
  });

  async function submitlogin() {
    if (email === "" || password === "") {
      alert("Please Enter Credentials");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      };
      const response = await fetch("/users/getAllUser", requestOptions);
      const res = await response.json();
      setFlag(res.status);
      if (res.status) {
        JSON.stringify(localStorage.setItem("user_id", res.id));
        JSON.stringify(localStorage.setItem("status", res.status));
        navigate("/cart");
      } else {
        alert("Invalid Credentials");
      }
      console.log(res);
    }
  }
  function signup() {
    navigate("/signup");
  }

  return (
    // <>
    <div className="parentsignin_container">
      <div className="signin_container">
        <div className="login-form">
          <h2 id="signin_h2">Login</h2>
          <input
            className="signin_control"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            className="signin_control"
            type="text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            id="login_btn"
            className="signin_control"
            onClick={submitlogin}
          >
            Login
          </button>
          <footer>
            <button id="signup_btn" className="signin_control" onClick={signup}>
              SignUp
            </button>
          </footer>
        </div>
      </div>
    </div>

    // </>
  );
}

export default Signin;
