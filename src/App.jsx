import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [value, setValues] = useState([]);
  const [topn, settopn] = useState(10);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaXZhYmFsYW4uY3MyM0BiaXRzYXRoeS5hYy5pbiIsImV4cCI6MTc3ODIzNDQ4MCwiaWF0IjoxNzc4MjMzNTgwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNjZhM2I5NTUtZjcwMC00M2NkLWJmYWEtNzE4NmU4ZDczYmI5IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2l2YWJhbGFuIHAiLCJzdWIiOiI1MTRhOTU0My1lNGViLTRiY2YtYmIzMy00NWYwOWQ2ZWE1ZmQifSwiZW1haWwiOiJzaXZhYmFsYW4uY3MyM0BiaXRzYXRoeS5hYy5pbiIsIm5hbWUiOiJzaXZhYmFsYW4gcCIsInJvbGxObyI6IjczNzYyMzFjczMxMCIsImFjY2Vzc0NvZGUiOiJ1S2FKZm0iLCJjbGllbnRJRCI6IjUxNGE5NTQzLWU0ZWItNGJjZi1iYjMzLTQ1ZjA5ZDZlYTVmZCIsImNsaWVudFNlY3JldCI6IkpicG1HVnVKaENqTnZiUUcifQ.UepwX7CvWXKBJTwbzcc87qorDjvFUp6j9KgwGDIYdE4";
  const get = async () => {
    try {
      const res = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications",
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        },
      );
      setValues(res.data.notifications);
    } catch (err) {
      throw err;
    }
  };

  const arrange = () => {
    setValues(
      value.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)),
    );

    let dummyarray = [];
    dummyarray = value.filter((u) => u.Type === "Placement");
    dummyarray = [...dummyarray, ...value.filter((u) => u.Type === "Event")];
    dummyarray = [...dummyarray, ...value.filter((u) => u.Type === "Result")];

    setValues(dummyarray.slice(0, topn));
  };


  useEffect(() => {
    get();
  }, []);

  return (
    <div className="main">
      <div style={{ width: "70%" }}>
        {value.length > 0 ? (
          value.slice(0, topn).map((val, i) => (
            <div key={i} className="bars">
              <div>{i + 1}</div>
              <div> {val.Message}</div>
              <div style={{ marginLeft: "50px" }}>{val.Type}</div>
              <div>{val.Timestamp}</div>
            </div>
          ))
        ) : (
          <>No Message Now</>
        )}
      </div>
      <div className="filter">
        <button onClick={arrange} className="button">
          Prioritize
        </button>
        <select
          name="Slect the N"
          id="topn"
          onChange={(e) => settopn(e.target.value)}
        >
          <option value="" hidden>
            Select the TOP
          </option>
          <option value="5">5</option>
          <option value="10">10 </option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
}

export default App;
