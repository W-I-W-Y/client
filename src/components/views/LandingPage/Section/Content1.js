import React from "react";

function Content1() {
  return (
    <section className="content-section" id="content-section-1">
      <h1>코로나 확진자 현황</h1>
      <div className="two-content">
        <div className="coronaboard">
          <div className="data">
            <div id="onebox">
              <p align="center">확진환자</p>
              <span className="coronaNum">123</span>
              <span id="datenum">+</span>
            </div>
            <div id="twobox">
              <p align="center">격리해제</p>
              <span className="coronaNum"></span>
            </div>
          </div>
          <div className="data">
            <div id="threebox">
              <p align="center">격리중</p>
              <span className="coronaNum"></span>
            </div>
            <div id="fourbox">
              <p align="center">사망</p>
              <span className="coronaNum"></span>
            </div>
          </div>
        </div>

        <div className="dailyCovidStatus">
          <canvas
            id="dailyCovidChart"
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
            //   margin-top: 6vw;
            //   padding: 20px;
            //   border: 0;
            //   display: block;
            //   box-sizing: border-box;
            //   height: 183px;
            //   width: 367px;
            // "
          ></canvas>
          {/* <script >
                        


                          const data = {
                            labels: labels,
                            datasets: [
                              {
                                label: "코로나 확진자 현황",
                                backgroundColor: "rgb(255, 99, 132)",
                                borderColor: "rgb(255, 99, 132)",
                                data: week,
                              },
                            ],
                          };
                          const config = {
                            type: "line",
                            data,
                            options: {},
                          };

                          var myChart = new Chart(
                            document.getElementById("dailyCovidChart"),
                            config
                          );
          </script> */}
        </div>
      </div>
    </section>
  );
}

export default Content1;
