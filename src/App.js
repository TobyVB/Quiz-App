// import React from "react";
// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   const [data, setData] = React.useState(null);

// React.useEffect(() => {
//   fetch("/api")
//     .then((res) => res.json())
//     .then((data) => setData(data.message));
// }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>{!data ? "Loading..." : data}</p>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import Homescreen from "./Components/Homescreen.js";
import Quiz from "./Components/Quiz.js";

export default function App() {
  const [homescreen, setHomescreen] = React.useState(true);

  function start() {
    setHomescreen(false);
  }

  return (
    <main>
      <img className="blobL" src="images/blobL.png" />
      <img className="blobR" src="images/blobR.png" />

      {homescreen && <Homescreen start={start} />}
      {!homescreen && <Quiz />}
    </main>
  );
}
