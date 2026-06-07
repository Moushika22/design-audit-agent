import { useState } from "react";
import axios from "axios";

function Level2Comparison() {

  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);

  const [comparisonLoading, setComparisonLoading] =
    useState(false);

  const [comparisonReport, setComparisonReport] =
    useState(null);

  const handleCompare = async () => {

    if (!beforeFile || !afterFile) {

      alert("Upload both screenshots");
      return;

    }

    try {

      setComparisonLoading(true);

      const formData = new FormData();

      formData.append(
        "before",
        beforeFile
      );

      formData.append(
        "after",
        afterFile
      );

      const response =
        await axios.post(

          "http://127.0.0.1:8000/compare",

          formData

        );

      setComparisonReport(
        response.data
      );

    }

    catch (error) {

      console.error(error);

      alert(
        "Comparison Failed"
      );

    }

    finally {

      setComparisonLoading(false);

    }

  };

  return (

    <>

      <div className="card">

        <h2>
          Before Screenshot
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setBeforeFile(
              e.target.files[0]
            )
          }
        />

      </div>

      <div className="card">

        <h2>
          After Screenshot
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setAfterFile(
              e.target.files[0]
            )
          }
        />

      </div>

      <div className="export-section">

        <button
          onClick={handleCompare}
        >
          Compare Designs
        </button>

      </div>

      {comparisonLoading && (

        <div className="loading">

          Running Visual Comparison...

        </div>

      )}

      {comparisonReport && (

        <>

          <div className="card">

            <h2>
              Executive Verdict
            </h2>

            <p>

              <strong>

                {
                  comparisonReport
                    ?.overall_verdict
                }

              </strong>

            </p>

            <div className="confidence-bar">

              <div
                className="confidence-fill"
                style={{
                  width:
                  `${comparisonReport?.confidence || 0}%`
                }}
              />

            </div>

            <p>

              Confidence:

              {
                comparisonReport
                  ?.confidence
              }%

            </p>

          </div>

          <div className="card">

            <h2>
              Expected UX Gain
            </h2>

            <div
              style={{
                fontSize: "48px",
                fontWeight: "800",
                color: "#16a34a"
              }}
            >

              {
                comparisonReport
                  ?.estimated_ux_gain
              }

            </div>

            <p>

              Estimated user experience improvement after implementing recommendations.

            </p>

          </div>

          <div className="card">

            <h2>
              Recommended First Fix
            </h2>

            <p>

              <strong>

                {
                  comparisonReport
                    ?.where_should_i_start
                    ?.focus_area
                }

              </strong>

            </p>

            <p>

              {
                comparisonReport
                  ?.where_should_i_start
                  ?.reason
              }

            </p>

            <p>

              Expected Benefit:

              {
                comparisonReport
                  ?.where_should_i_start
                  ?.expected_benefit
              }

            </p>

            <p>

              Estimated Effort:

              {
                comparisonReport
                  ?.where_should_i_start
                  ?.estimated_effort
              }

            </p>

          </div>

          

          <div className="card">

            <h2>
              Stakeholder Summary
            </h2>

            <p>

              {
                comparisonReport
                  ?.stakeholder_summary
              }

            </p>

          </div>

          <div className="card">
<div className="card">

  <h2>
    Product Summary
  </h2>

  <p>

    {
      comparisonReport
      ?.product_summary
    }

  </p>

</div>
<h2>Tradeoff Analysis</h2>

<p>

{
comparisonReport
.tradeoff_analysis
}

</p>

</div>
<div className="card">

<h2>Comparison Evidence</h2>

<p>

Improvements:
{
comparisonReport
.comparison_evidence
?.improvements
}

</p>

<p>

Regressions:
{
comparisonReport
.comparison_evidence
?.regressions
}

</p>

<p>

Neutral:
{
comparisonReport
.comparison_evidence
?.neutral
}

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
      comparisonReport
      ?.verification_status
    }

  </p>

  <h3>
    Validation Notes
  </h3>

  <ul>

    {
      comparisonReport
      ?.validation_notes
      ?.map(

        (item,index)=>(

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
      comparisonReport
      ?.known_limitations
      ?.map(

        (item,index)=>(

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
      comparisonReport
      ?.responsible_ai_notice
    }

  </p>

</div>
          


    
        </>

      )}

    </>

  );
}

export default Level2Comparison;
