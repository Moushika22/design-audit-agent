import { useState } from "react";
import axios from "axios";

function Level3Regression() {

const [websiteUrl, setWebsiteUrl] =
useState("https://example.com");

const [loading, setLoading] =
useState(false);

const [report, setReport] =
useState(null);

const runRegression = async () => {
try {

  setLoading(true);

  const response =
    await axios.post(
      "http://127.0.0.1:8000/level3"
    );

  setReport(response.data);

}

catch (error) {

  console.error(error);

  alert(
    "Regression Run Failed"
  );

}

finally {

  setLoading(false);

}


};

return (

<>

  <div className="card">

    <h2>
      Autonomous UI Regression Agent
    </h2>

    <p>
      Runs end-to-end visual validation
      against approved baselines.
    </p>

    <input
      type="text"
      value={websiteUrl}
      onChange={(e) =>
        setWebsiteUrl(
          e.target.value
        )
      }
      placeholder="https://example.com"
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "15px",
        marginBottom: "15px",
        borderRadius: "10px",
        border: "1px solid #d1d5db"
      }}
    />

    <button
      onClick={runRegression}
    >
      Run Autonomous Audit
    </button>

  </div>

  {loading && (

    <div className="loading">

      Agent Navigating Pages...

    </div>

  )}

  {report && (

    <>

      <div className="hero-verdict">

        <h1>
          {report?.release_recommendation}
        </h1>

        <p>
          Final Release Decision
        </p>

        <h3>
          Confidence:
          {" "}
          {report?.confidence}%
        </h3>

      </div>

      <div className="stats-grid">

        <div className="stat-card">

          <h3>
            Pages Tested
          </h3>

          <div className="big-number">
            {report?.pages_tested}
          </div>

        </div>

        <div className="stat-card">

          <h3>
            Regressions
          </h3>

          <div className="big-number">
            {report?.regressions_found}
          </div>

        </div>

        <div className="stat-card">

          <h3>
            Confidence
          </h3>

          <div className="big-number">
            {report?.confidence}%
          </div>

        </div>

        <div className="stat-card">

          <h3>
            Baseline
          </h3>

          <div className="review-status">

            {
              report?.baseline_used
                ? "YES"
                : "NO"
            }

          </div>

        </div>

      </div>

      <div className="card">

        <h2>
          Audit Scope
        </h2>

        <p>

          <strong>
            Website:
          </strong>

          {" "}

          {websiteUrl}

        </p>

        <ul>

          {
            report?.audit_scope?.pages?.map(

              (page, index) => (

                <li key={index}>
                  ✓ {page}
                </li>

              )

            )
          }

        </ul>

      </div>

      <div className="card">

        <h2>
          Executive Summary
        </h2>

        <p>
          {report?.executive_summary}
        </p>

      </div>

      <div className="card">

        <h2>
          Why This Release Is Safe
        </h2>

        <p>
          {report?.release_explanation}
        </p>

      </div>

      <div className="card">

        <h2>
          Priority Fix Matrix
        </h2>

        {
          report?.priority_matrix?.map(

            (item, index) => (

              <div
                key={index}
                className="finding-card"
              >

                <h3>
                  {item.issue}
                </h3>

                <p>
                  Impact:
                  {" "}
                  {item.impact}
                </p>

                <p>
                  Effort:
                  {" "}
                  {item.effort}
                </p>

              </div>

            )

          )
        }

      </div>

      <div className="card">

        <h2>
          Tradeoff Analysis
        </h2>

        <p>
          {report?.tradeoff_analysis}
        </p>

      </div>

      <div className="card">

        <h2>
          Findings
        </h2>

        <div className="findings-grid">

          {
            report?.findings?.map(

              (finding, index) => (

                <div
                  key={index}
                  className="finding-card"
                >

                  <h3>
                    {finding.page}
                  </h3>

                  <p>

                    <strong>
                      Issue:
                    </strong>

                    {" "}

                    {finding.issue}

                  </p>

                  <p>

                    <strong>
                      Severity:
                    </strong>

                    {" "}

                    {finding.severity}

                  </p>

                  <p>

                    <strong>
                      Confidence:
                    </strong>

                    {" "}

                    {finding.confidence}%

                  </p>

                </div>

              )

            )
          }

        </div>

      </div>

      <div className="card">

        <h2>
          Human Review Recommendation
        </h2>

        <p>

          <strong>
            Recommended:
          </strong>

          {" "}

          {
            report?.human_review?.recommended
              ? "YES"
              : "NO"
          }

        </p>

        <p>
          {report?.human_review?.reason}
        </p>

      </div>

      <div className="card">

        <h2>
          Validation & Responsible AI
        </h2>

        <p>

          <strong>
            Status:
          </strong>

          {" "}

          {
            report?.verification_status
          }

        </p>

        <ul>

          {
            report?.validation_notes?.map(

              (item, index) => (

                <li key={index}>
                  ✓ {item}
                </li>

              )

            )
          }

        </ul>

        <h3>
          Known Limitations
        </h3>

        <ul>

          {
            report?.known_limitations?.map(

              (item, index) => (

                <li key={index}>
                  • {item}
                </li>

              )

            )
          }

        </ul>

        <p>

          <strong>
            Responsible AI:
          </strong>

          {" "}

          {
            report?.responsible_ai_notice
          }

        </p>

      </div>

    </>

  )}

</>


);

}

export default Level3Regression;


