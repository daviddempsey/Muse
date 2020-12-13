import React, { useEffect, useState } from "react";

import Canvas from "./canvasjs.react";
import ScaleLoader from "react-spinners/ScaleLoader";

import "./index.css";

const HarmonizeModal = ({ email, otherEmail, setShow }) => {
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState({
    colorSet: "museColorSet",
    animationEnabled: true,
    animationDuration: 500,
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        showInLegend: true,
        legendText: "{label}",
        dataPoints: [
          {
            y: 100,
            label:
              "OOPSIE WHOOPSIE!!! uwu looks like we made a wittle ducky wucky!! a wittle ducko boingo! The code monkeys at our headquawters are working VEWY HAWD to fix this!",
          },
        ],
      },
    ],
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (!document.getElementById("modalChart").contains(e.target)) {
      setShow(false);
    }
  };

  // retrieve harmony score data
  const compareTwoUsers = async (myEmail, otherUserEmail) => {
    const url =
      "http://localhost:5001/muse-eec76/us-central1/app/api/in_harmony/compareFriends/" +
      myEmail +
      "/" +
      otherUserEmail;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    if (loading) {
      compareTwoUsers(email, otherEmail).then((data) => {
        setScore((data["score"] * 100).toFixed(2));
        const displayedScore = (s) =>
          data[s] && data[s] > 0 ? ((data[s] * 100) / 3).toFixed(2) : 0.0;
        const aScore = displayedScore("artist"),
          gScore = displayedScore("genres"),
          fScore = displayedScore("audio_features");
        const chartData = [
          { y: aScore, label: "Artist Score" },
          { y: gScore, label: "Genre Score" },
          { y: fScore, label: "Audio Features Score" },
        ];
        setOptions({
          colorSet: "museColorSet",
          animationEnabled: true,
          animationDuration: 500,
          data: [
            {
              type: "pie",
              indexLabel: "{label}: {y}%",
              startAngle: -90,
              showInLegend: true,
              legendText: "{label}",
              dataPoints: chartData,
            },
          ],
        });
        setLoading(false);
      });
    }
  });

  // chart color scheme
  Canvas.CanvasJS.addColorSet("museColorSet", [
    "#f9d342", // yellow   artist score
    "#ff6666", // red      genre score
    "#4bc6b9", // teal     audio features score
  ]);

  return (
    <div className="HarmonizeModal" id="HarmonizeModal" onClick={handleClick}>
      <div className="content" id="modalChart">
        {loading ? (
          <ScaleLoader
            className="harmonizeModalLoader"
            color={"#ff6666"}
            loading={loading}
          />
        ) : (
          <div className="chart">
            <h2>Harmony Score: {score}</h2>
            <Canvas.CanvasJSChart options={options} />
          </div>
        )}
      </div>
    </div>
  );
};
export default HarmonizeModal;
