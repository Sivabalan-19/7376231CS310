import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [value, setValues] = useState([]);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaXZhYmFsYW4uY3MyM0BiaXRzYXRoeS5hYy5pbiIsImV4cCI6MTc3ODIzMzU1NiwiaWF0IjoxNzc4MjMyNjU2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzA3NjA4OGItNjQ0My00YTk4LTliNGEtNWU0NTgzMDU3ZjJjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2l2YWJhbGFuIHAiLCJzdWIiOiI1MTRhOTU0My1lNGViLTRiY2YtYmIzMy00NWYwOWQ2ZWE1ZmQifSwiZW1haWwiOiJzaXZhYmFsYW4uY3MyM0BiaXRzYXRoeS5hYy5pbiIsIm5hbWUiOiJzaXZhYmFsYW4gcCIsInJvbGxObyI6IjczNzYyMzFjczMxMCIsImFjY2Vzc0NvZGUiOiJ1S2FKZm0iLCJjbGllbnRJRCI6IjUxNGE5NTQzLWU0ZWItNGJjZi1iYjMzLTQ1ZjA5ZDZlYTVmZCIsImNsaWVudFNlY3JldCI6IkpicG1HVnVKaENqTnZiUUcifQ.eVDLeVfCX9oj0GMKM4C616VmiDk4ASaoEJl03MPucnk"
   const get = async () => {
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
    console.log(res.data.notifications);
  };

  const arrange = () => {
    setValues(
      value.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)),
    );

    let dummyarray = [];
    dummyarray = value.filter((u) => u.Type === "Placement");
    dummyarray = [...dummyarray, ...value.filter((u) => u.Type === "Event")];
    dummyarray = [...dummyarray, ...value.filter((u) => u.Type === "Result")];

    setValues(dummyarray.slice(0,10));
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <div>
      {value.length > 0 ? (
        value.map((val, i) => (
          <div key={i} className="bars">
            <div>{i + 1}</div>
            <div> {val.Message}</div>
            <div style={{marginLeft : "50px"}}>{val.Type}</div>
            <div>{val.Timestamp.split(' ')[1]}</div>
          </div>
        ))
      ) : (
        <>No Message Now</>
      )}

      <button onClick={arrange}>Prioritize</button>
    </div>
  );
}

export default App;
