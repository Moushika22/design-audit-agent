
import { useState } from "react";

import "./App.css";

import Level1Audit from "./components/Level1Audit";
import Level2Comparison from "./components/Level2Comparison";
import Level3Regression from "./components/Level3Regression";

function App() {

  const [activeTab, setActiveTab] =
    useState("level1");

  return (

    <div className="app">

      <div className="hero">

        <h1>
          Design Audit Agent
        </h1>

        <p>
          AI Powered UX Review Platform
        </p>

        <div className="tab-buttons">

          <button
            onClick={() =>
              setActiveTab("level1")
            }
            className={
              activeTab === "level1"
                ? "active-tab"
                : ""
            }
          >
            Level 1 Audit
          </button>

          <button
            onClick={() =>
              setActiveTab("level2")
            }
            className={
              activeTab === "level2"
                ? "active-tab"
                : ""
            }
          >
            Level 2 Comparison
          </button>

          <button
            onClick={() =>
              setActiveTab("level3")
            }
            className={
              activeTab === "level3"
                ? "active-tab"
                : ""
            }
          >
            Level 3 Regression Agent
          </button>

        </div>

      </div>

      {activeTab === "level1" && (
        <Level1Audit />
      )}

      {activeTab === "level2" && (
        <Level2Comparison />
      )}

      {activeTab === "level3" && (
        <Level3Regression />
      )}

    </div>

  );
}

export default App;
