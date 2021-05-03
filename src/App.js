import "./App.css";

/* Import Axios */
import axios from "axios";

/* Import useState() & useEffect() from React */
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <header>
        <img src="" alt="Deliveroo logo." />
      </header>
    </div>
  );
}

export default App;
