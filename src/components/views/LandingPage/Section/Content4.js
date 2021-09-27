import React from "react";

function Content4() {
  return (
    <section className="content-section" id="content-section-4">
      <h1>백신 접종 현황</h1>
      <div className="two-content">
        <div className="coronaboard">
          <div className="data2">
            <div id="onebox2">
              <p align="center">1차 접종</p>
              <span t></span>
              <span id="datenum">+</span>
            </div>
          </div>
          <div className="data2">
            <div id="twobox2">
              <p align="center">접종 완료</p>
              <span></span>
            </div>
          </div>
        </div>

        <div className="vaccineCovidStatus">
          <canvas
            id="vaccineCovidChart"
            // style="
            //   line-height: 1.2;
            //   word-wrap: break-word;
            //   font-family: Noto Sans KR, sans-serif;
            //   font-size: 14px;
            //   -webkit-font-smoothing: antialiased;
            //   color: rgb(29, 29, 31);
            //   letter-spacing: -0.05em;
            //   aspect-ratio: auto 367 / 183;
            //   margin: 0;
            //   margin-top: 3vw;
            //   padding: 20px;
            //   border: 0;
            //   display: block;
            //   box-sizing: border-box;
            //   height: 183px;
            //   width: 367px;
            // "
          ></canvas>
          {/* <script>
            const vaccinelabels = [
              "5월 23일",
              "5월 24일",
              "5월 25일",
              "5월 26일",
              "5월 27일",
              "5월 28일",
              "5월 29일",
            ];
            const vaccinedata = {
              labels: vaccinelabels,
              datasets: [
                {
                  label: "백신 접종자 현황",
                  backgroundColor: "rgb(25, 99, 102)",
                  borderColor: "rgb(255, 99, 132)",
                  data: [
                    2926, 173169, 169070, 87165, 657192, 542227, 171989,
                  ],
                },
              ],
            };
            const vaccineconfig = {
              type: "bar",
              data: vaccinedata,
              options: {},
            };

            var myChart = new Chart(
              document.getElementById("vaccineCovidChart"),
              vaccineconfig
            );
          </script> */}
        </div>
      </div>
    </section>
  );
}

export default Content4;
