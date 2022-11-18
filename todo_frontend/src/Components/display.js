import { useEffect, useState } from "react";
import "./display.css";

function Display({
  inputElement,
  setDispFlag,
  flagForDisp,
  getValue,
  input,
  setFlagUpdate,
}) {
  const [flag, setFlag] = useState(false);
  const [backendData, setBackendData] = useState([]);
  const [itemIndex, setItemIndex] = useState(0);
  const uid = JSON.parse(localStorage.getItem("user_id"));

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/users/getUser/" + uid, {
        headers: { accept: "application/json" },
      });
      const res = await response.json();
      setBackendData(res);
    };
    fetchData();
  }, [flagForDisp]);

  const remove = async (item) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "/list/deleteList/" + item.list_id,
      requestOptions
    );
    const res = await response.json();
    setDispFlag(!flagForDisp);
  };
  function edit(item, index) {
    getValue(item.list);
    setItemIndex(item.list_id);
    setFlag(true);
    setFlagUpdate(false);
  }
  const update = async (itemIndex) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ list: input }),
    };
    const response = await fetch("/list/editList/" + itemIndex, requestOptions);
    const res = await response.json();
    setDispFlag(!flagForDisp);
    getValue("");
    setFlag(false);
    setFlagUpdate(true);
  };

  return (
    <>
      {flag && (
        <button className="update_btn" onClick={(e) => update(itemIndex)}>
          Update
        </button>
      )}
      <div className="display_outer_container">
        {backendData.map((item, index) => (
          <div className="display_items" key={item.user_id}>
            <div>
              {index + 1} {item.list}
            </div>
            <div className="rem_edit_btn">
              <button className="edit_btn" onClick={() => edit(item, index)}>
                Edit
              </button>
              <button className="remove_btn" onClick={() => remove(item)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Display;
