import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("status")) === true) {
      navigate("/cart");
    } else {
      localStorage.clear();
    }
  });
  const submit = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        email: email,
        password: password,
      }),
    };

    const fetchData = async () => {
      const response = await fetch("/users/addUser", requestOptions);
      const res = await response.json();
      if (res.errno === 1062) {
        alert("user already exist");
      } else if (res.errno === 200) {
        navigate("/");
      } else {
        alert("Sorry,Internal Error");
      }
    };
    fetchData();

    setUserName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="signup_container">
        <div className="card">
          <h2>Create Account</h2>
          <form className="form">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={submit}>Sign Up</button>
          </form>
          <footer>
            Existing Users, <Link to="/">Sign In</Link>
          </footer>
        </div>
      </div>
    </>
  );
};
export default SignUp;
