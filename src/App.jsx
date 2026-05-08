import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [value, setVales] = useState([]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaXZhYmFsYW4uY3MyM0BiaXRzYXRoeS5hYy5pbiIsImV4cCI6MTc3ODIzMjUxOSwiaWF0IjoxNzc4MjMxNjE5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYjZkODE0NDMtNDQ3Zi00ZWJmLWE3MGQtZTVlOTE5OTM4NGYxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2l2YWJhbGFuIHAiLCJzdWIiOiI1MTRhOTU0My1lNGViLTRiY2YtYmIzMy00NWYwOWQ2ZWE1ZmQifSwiZW1haWwiOiJzaXZhYmFsYW4uY3MyM0BiaXRzYXRoeS5hYy5pbiIsIm5hbWUiOiJzaXZhYmFsYW4gcCIsInJvbGxObyI6IjczNzYyMzFjczMxMCIsImFjY2Vzc0NvZGUiOiJ1S2FKZm0iLCJjbGllbnRJRCI6IjUxNGE5NTQzLWU0ZWItNGJjZi1iYjMzLTQ1ZjA5ZDZlYTVmZCIsImNsaWVudFNlY3JldCI6IkpicG1HVnVKaENqTnZiUUcifQ.A-cF21P1Hdq3llSkEZbdXGjqtynYjMt5kgWNtWjeZas";
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
    setVales(res.data.notifications);
    console.log(res.data.notifications);
  };

  const arrange = () => {
    let dummyarray = [];
    dummyarray = value.filter((u) => u.Type === "Placement");
    dummyarray = [...dummyarray, ...value.filter((u) => u.Type === "Event")];
    dummyarray = [...dummyarray, ...value.filter((u) => u.Type === "Result")];
    console.log(dummyarray);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <div>
      {value.length > 0 ? (
        value.map((val, i) => <div>{val.Message}</div>)
      ) : (
        <>No Message Now</>
      )}

      <button onClick={arrange}>Prioritize</button>
    </div>
  );
}

export default App;
