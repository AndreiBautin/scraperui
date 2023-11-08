import React, { useState, useEffect } from "react";
import "./App.css";
import { PieChart, Pie } from "recharts";

function App() {
  const [data, setData] = useState([]);
  const [javaPercent, setJavaPercent] = useState([]);
  const [cPlusPlusPercent, setCPlusPlusPercent] = useState([]);
  const [goLangPercent, setGoLangPercent] = useState([]);
  const [otherPercent, setOtherPercent] = useState([]);
  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
        var javaCount = 0;
        var cPlusPlusCount = 0;
        var goLangCount = 0;
        var otherCount = 0;
        myJson.forEach((row) => {
          if (row.jobtitle && row.jobtitle.toLowerCase().includes("java")) {
            javaCount++;
          } else if (
            row.jobtitle &&
            row.jobtitle.toLowerCase().includes("c++")
          ) {
            cPlusPlusCount++;
          } else if (
            row.jobtitle &&
            row.jobtitle.toLowerCase().includes("golang")
          ) {
            goLangCount++;
          } else {
            otherCount++;
          }
        });
        setJavaPercent(javaCount);
        setCPlusPlusPercent(cPlusPlusCount);
        setGoLangPercent(goLangCount);
        setOtherPercent(otherCount);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {/* <h1>Java</h1>
      <h2>{javaCount}</h2> of <h2>{data.length}</h2>
      <h1>C++</h1>
      <h2>{cPlusPlusCount}</h2> of <h2>{data.length}</h2>
      <h1>Go</h1>
      <h2>{goLangCount}</h2> of <h2>{data.length}</h2>
      <h1>Other</h1>
      <h2>{otherCount}</h2> of <h2>{data.length}</h2> */}
      {/* <table className="App">
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <tr key={index}>
              <td>{item.company}</td>
              <td>{item.jobtitle}</td>
              <td>{item.level}</td>
            </tr>
          ))}
      </table> */}
      <PieChart width={730} height={250}>
        <Pie
          data={[
            { name: "Java", value: javaPercent },
            { name: "C Plus Plus", value: cPlusPlusPercent },
            { name: "Go", value: goLangPercent },
            { name: "Other", value: otherPercent },
          ]}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
        />
        <Pie
          data={[
            { name: "Java", value: javaPercent },
            { name: "C Plus Plus", value: cPlusPlusPercent },
            { name: "Go", value: goLangPercent },
            { name: "Other", value: otherPercent },
          ]}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          label
          labelLine
        />
      </PieChart>
    </div>
  );
}

export default App;
