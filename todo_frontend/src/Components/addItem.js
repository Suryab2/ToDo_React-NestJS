import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Display from "./display";
import "./display.css";

const AddItem = () => {
  const [input, getValue] = useState("");
  const [flagForDisp, setDispFlag] = useState(false);
  const inputElement = useRef("");
  const navigate = useNavigate();
  const [flagForUpdate, setFlagUpdate] = useState(true);
  const uid = JSON.parse(localStorage.getItem("user_id"));

  const submitInput = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ list: input, userId: uid }),
    };

    const fetchData = async () => {
      const response = await fetch("/list/addList", requestOptions);
      const res = await response.json();
      console.log(res);
      setDispFlag(!flagForDisp);
    };
    fetchData();

    getValue("");
  };

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <div className="main-container">
        <div className="form-container">
          <input
            type="text"
            value={input}
            // ref={inputElement}
            placeholder="Add item"
            onChange={(e) => getValue(e.target.value)}
          ></input>
          <div className="sub_log_div">
            {flagForUpdate && (
              <button className="submit_btn" onClick={submitInput}>
                Submit
              </button>
            )}

            <button className="logout_btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        <Display
          inputElement={inputElement}
          setDispFlag={setDispFlag}
          flagForDisp={flagForDisp}
          getValue={getValue}
          setFlagUpdate={setFlagUpdate}
          input={input}
        />
      </div>
    </>
  );
};

export default AddItem;
