import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [value, setValues] = useState([]);
  const [topn, settopn] = useState(10);
  const [offset, setoffset] = useState(0);
  const [type, settype] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaXZhYmFsYW4uY3MyM0BiaXRzYXRoeS5hYy5pbiIsImV4cCI6MTc3ODIzNTY1NiwiaWF0IjoxNzc4MjM0NzU2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMDI2OGVhYTEtOTY5YS00MDc1LTgwMTQtMWU2OWJiNWNjMjQxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2l2YWJhbGFuIHAiLCJzdWIiOiI1MTRhOTU0My1lNGViLTRiY2YtYmIzMy00NWYwOWQ2ZWE1ZmQifSwiZW1haWwiOiJzaXZhYmFsYW4uY3MyM0BiaXRzYXRoeS5hYy5pbiIsIm5hbWUiOiJzaXZhYmFsYW4gcCIsInJvbGxObyI6IjczNzYyMzFjczMxMCIsImFjY2Vzc0NvZGUiOiJ1S2FKZm0iLCJjbGllbnRJRCI6IjUxNGE5NTQzLWU0ZWItNGJjZi1iYjMzLTQ1ZjA5ZDZlYTVmZCIsImNsaWVudFNlY3JldCI6IkpicG1HVnVKaENqTnZiUUcifQ.JArCcztsDTRzCNsSoVL2nxpuoQmhZXbMo1Fl2qC2UvU";
  const get = async () => {
    try {
      const res = await axios.get(
        `http://4.224.186.213/evaluation-service/notifications?limit=${topn}&page=${offset}&notification_type=${type}`,
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

  const changetopn = (e) => {
    settopn(e.target.value);
  };
  const changeoffset = (e) => {
    setoffset(e.target.value);
  };
  const changetype = (e) => {
    settype(e.target.value);
  };

  useEffect(() => {
    get();
  }, [type, offset, topn]);

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
          <>Unauthorzied</>
        )}
      </div>
      <div className="filter">
        <button onClick={arrange} className="button">
          Prioritize
        </button>
        <select name="Select the N" id="topn" onChange={(e) => changetopn(e)}>
          <option value="" hidden>
            Select the TOP N
          </option>
          <option value="5">5</option>
          <option value="10">10 </option>
        </select>
        <select
          name="Select the Page"
          id="page"
          onChange={(e) => changeoffset(e)}
        >
          <option value="" hidden>
            Select the Page
          </option>
          <option value="0">0</option>
          <option value="1">1 </option>
          <option value="2">2 </option>
          <option value="3">3 </option>
        </select>
        <select name="Select type" id="type" onChange={(e) => changetype(e)}>
          <option value="" hidden>
            Select the type
          </option>
          <option value="Event">Event</option>
          <option value="Result">Result </option>
          <option value="Placement">Placement</option>
        </select>
      </div>
    </div>
  );
}

export default App;
