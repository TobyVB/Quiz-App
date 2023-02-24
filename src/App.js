import { useState } from "react";
import Homescreen from "./Components/Homescreen.js";
import Quiz from "./Components/Quiz.js";

export default function App() {
  const [homescreen, setHomescreen] = useState(true);

  function start() {
    setHomescreen(false);
  }

  const categories = [
    {
      id: "",
      name: "Any Category",
    },
    {
      id: "&category=9",
      name: "General Knowledge",
    },
    {
      id: "&category=10",
      name: "Entertainment: Books",
    },
    {
      id: "&category=11",
      name: "Entertainment: Film",
    },
    {
      id: "&category=12",
      name: "Entertainment: Music",
    },
    {
      id: "&category=13",
      name: "Entertainment: Musicals & Theatres",
    },
    {
      id: "&category=14",
      name: "Entertainment: Television",
    },
    {
      id: "&category=15",
      name: "Entertainment: Video Games",
    },
    {
      id: "&category=16",
      name: "Entertainment: Board Games",
    },
    {
      id: "&category=17",
      name: "Science & Nature",
    },
    {
      id: "&category=18",
      name: "Science: Computers",
    },
    {
      id: "&category=19",
      name: "Science: Mathematics",
    },
    {
      id: "&category=20",
      name: "Mythology",
    },
    {
      id: "&category=21",
      name: "Sports",
    },
    {
      id: "&category=22",
      name: "Geography",
    },
    {
      id: "&category=23",
      name: "History",
    },
    {
      id: "&category=24",
      name: "Politics",
    },
    {
      id: "&category=25",
      name: "Art",
    },
    {
      id: "&category=26",
      name: "Celebrities",
    },
    {
      id: "&category=27",
      name: "Animals",
    },
    {
      id: "&category=28",
      name: "Vehicles",
    },
    {
      id: "&category=29",
      name: "Entertainment: Comics",
    },
    {
      id: "&category=30",
      name: "Science: Gadgets",
    },
    {
      id: "&category=31",
      name: "Entertainment: Japanese Anime & Manga",
    },
    {
      id: "&category=32",
      name: "Entertainment: Cartoon & Animations",
    },
  ];

  const difficulty = [
    { name: "Any Difficulty", value: "" },
    { name: "easy", value: "&difficulty=easy" },
    { name: "medium", value: "&difficulty=medium" },
    { name: "hard", value: "&difficulty=hard" },
  ];

  const type = [
    { name: "Any Type", value: "" },
    { name: "mulitple", value: "&type=multiple" },
    { name: "true or false", value: "&type=boolean" },
  ];
  const nQuestions = [];
  for (let i = 1; i <= 50; i++) {
    nQuestions.push(i.toString);
  }

  const [category, setCategory] = useState("");
  const [difLev, setDifLev] = useState("");
  const [chosenType, setChosenType] = useState("");
  const [numQuestions, setNumQuestions] = useState("5");

  return (
    <main>
      <img className="blobL" src="images/blobL.png" />
      <img className="blobR" src="images/blobR.png" />

      {homescreen && (
        <div
          className="homepage-content"
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <Homescreen start={start} />
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
            }}
          >
            <label>
              # of questions:{" "}
              <span style={{ color: "coral", fontWeight: "bold" }}>
                {numQuestions}
              </span>
            </label>
            <select onChange={(e) => setNumQuestions(e.target.value)}>
              {Array.apply(null, { length: 46 }).map((e, i) => (
                <option value={i + 5}>{i + 5}</option>
              ))}
            </select>
            <label>Type</label>
            <select onChange={(e) => setChosenType(e.target.value)}>
              {type.map((elem) => (
                <option value={elem.value}>{elem.name}</option>
              ))}
            </select>
            <label>Categories</label>
            <select onChange={(e) => setCategory(e.target.value)}>
              {categories.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
            </select>
            <label>Difficulty</label>
            <select onChange={(e) => setDifLev(e.target.value)}>
              {difficulty.map((dif) => (
                <option value={dif.value}>{dif.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      {!homescreen && (
        <Quiz
          setHomescreen={setHomescreen}
          category={category}
          difLev={difLev}
          chosenType={chosenType}
          numQuestions={numQuestions}
        />
      )}
    </main>
  );
}
