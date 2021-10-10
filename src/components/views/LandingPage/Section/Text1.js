import React, { useEffect, useState, PureComponent } from "react";
import { Row, Col } from "antd";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";

function Text1() {
  const [coronaToday, setCoronaToday] = useState([]);
  const [coronaWeek, setCoronaWeek] = useState([]);
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);

  const handlestep = (num) => {
    if (num === 1) {
      setOne(true);
      setTwo(false);
      setThree(false);
      setFour(false);
    } else if (num === 2) {
      setOne(false);
      setTwo(true);
      setThree(false);
      setFour(false);
    } else if (num === 3) {
      setOne(false);
      setTwo(false);
      setThree(true);
      setFour(false);
    } else {
      setOne(false);
      setTwo(false);
      setThree(false);
      setFour(true);
    }
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    Axios.get(`${USER_SERVER}/api/corona`, { headers }).then(
      (response, index) => {
        const day = new Date();
        const sunday = day.getTime() - 86400000 * 6;
        console.log(sunday);
        day.setTime(sunday);
        const result = [day.toISOString().slice(5, 10)];

        console.log(result);
        if (response.data !== null) {
          console.log("data check");
          console.log(response.data);

          response.data.coronaWeekDTOS.forEach((lists) => {
            day.setTime(day.getTime() + 86400000);

            setCoronaWeek((state) => [
              ...state,
              {
                incDec: lists.incDec,
                stdDay: day.toISOString().slice(5, 10),
              },
            ]);
          });

          setCoronaToday({
            defCnt: response.data.coronaTodayDTO.defCnt,
            isolClearCnt: response.data.coronaTodayDTO.isolClearCnt,
            isolIngCnt: response.data.coronaTodayDTO.isolIngCnt,
            deathCnt: response.data.coronaTodayDTO.deathCnt,
            incDec: response.data.coronaTodayDTO.incDec,
          });
        } else {
          alert("코로나정보를 가져오는데 실패했습니다.");
        }
      }
    );
  }, []);

  return (
    <section
      className="content-section"
      id="content-section-1"
      style={{ display: "block", justifyContent: "center" }}
    >
      <div className="two-content" style={{ padding: "10px", height: "430px" }}>
        <div
          className="coronaboard"
          style={{
            borderRadius: "0px",
            border: "none",
            backgroundColor: "#e1eef9",
          }}
        >
          <Row style={{ display: "flex" }}>
            {one ? (
              <Col
                className="pointerClick"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "rgb(190, 232, 255)",
                  opacity: "0.7",
                }}
                onClick={() => {
                  handlestep(1);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                  }}
                >
                  1단계
                </p>
              </Col>
            ) : (
              <Col
                className="pointerClick"
                span={6}
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => {
                  handlestep(1);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                  }}
                >
                  1단계
                </p>
              </Col>
            )}

            {two ? (
              <Col
                className="pointerClick"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "rgb(190, 232, 255)",
                  opacity: "0.7",
                }}
                onClick={() => {
                  handlestep(2);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                  }}
                >
                  2단계
                </p>
              </Col>
            ) : (
              <Col
                className="pointerClick"
                span={6}
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => {
                  handlestep(2);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                  }}
                >
                  2단계
                </p>
              </Col>
            )}
            {three ? (
              <Col
                className="pointerClick"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "rgb(190, 232, 255)",
                  opacity: "0.7",
                }}
                onClick={() => {
                  handlestep(3);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                  }}
                >
                  3단계
                </p>
              </Col>
            ) : (
              <Col
                className="pointerClick"
                span={6}
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => {
                  handlestep(3);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                  }}
                >
                  3단계
                </p>
              </Col>
            )}
            {four ? (
              <Col
                className="pointerClick"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "rgb(190, 232, 255)",
                  opacity: "0.7",
                }}
                onClick={() => {
                  handlestep(4);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                  }}
                >
                  4단계
                </p>
              </Col>
            ) : (
              <Col
                className="pointerClick"
                span={6}
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => {
                  handlestep(4);
                }}
              >
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "0",
                    cursor: "pointer",
                  }}
                >
                  4단계
                </p>
              </Col>
            )}
          </Row>
        </div>

        {one && (
          <div
            className="dailyCovidStatus"
            style={{
              width: "100%",
              height: "300px",
              paddingLeft: "30px",
              fontFamily: "Droid Sans",
              fontSize: "1rem",
            }}
          >
            <strong>기준 </strong> <br />
            인구 10만명 당 1명 미만 (주간 평균)
            <br /> *서울 96명 미만 / 경기 135명 미만 / 부산 34명 미만 <br />
            <strong>모임 </strong> <br />
            방역수칙을 준수하면서 사적모임 가능 <br />
            <strong>스포츠 관람 </strong>
            <br /> 실내: 수용인원의 50% <br />
            실외: 수용인원의 70%
            <br /> <strong>행사 </strong>
            <br /> 참여인원 500명 이상시 관할 지자체에 사전신고 필요
            <br /> <strong>집회</strong>
            <br /> 500명 이상 금지
          </div>
        )}
        {two && (
          <div
            className="dailyCovidStatus"
            style={{
              width: "100%",
              height: "300px",
              paddingLeft: "30px",
              fontFamily: "Droid Sans",
              fontSize: "1rem",
            }}
          >
            <strong>기준 </strong> <br />
            인구 10만명 당 1명 이상 (주간 평균이 3일 이상 기준 초과)
            <br /> *서울 96명 이상 / 경기 135명 이상 / 부산 34명 이상 <br />
            <strong>모임 </strong> <br />
            8명까지 사적모임 가능 (9인 이상 금지) <br />
            <strong>스포츠 관람 </strong>
            <br /> 실내: 수용인원의 30% <br />
            실외: 수용인원의 50%
            <br /> <strong>행사 </strong>
            <br /> 100명 이상 금지
            <br /> <strong>집회</strong>
            <br /> 100명 이상 금지
          </div>
        )}
        {three && (
          <div
            className="dailyCovidStatus"
            style={{
              width: "100%",
              height: "300px",
              paddingLeft: "30px",
              fontFamily: "Droid Sans",
              fontSize: "1rem",
            }}
          >
            <strong>기준 </strong> <br />
            인구 10만명 당 2명 이상 (주간 평균이 3일 이상 기준 초과)
            <br /> *서울 192명 이상 / 경기 270명 이상 / 부산 67명 이상 <br />
            <strong>모임 </strong> <br />
            4명까지 사적모임 가능 (5인 이상 금지) <br />
            <strong>스포츠 관람 </strong>
            <br /> 실내: 수용인원의 20% <br />
            실외: 수용인원의 30%
            <br /> <strong>행사 </strong>
            <br /> 50명 이상 금지
            <br /> <strong>집회</strong>
            <br /> 50명 이상 금지
          </div>
        )}
        {four && (
          <div
            className="dailyCovidStatus"
            style={{
              width: "100%",
              height: "300px",
              paddingLeft: "30px",
              fontFamily: "Droid Sans",
              fontSize: "1rem",
            }}
          >
            <strong>기준 </strong> <br />
            인구 10만명 당 4명 이상 (주간 평균이 3일 이상 기준 초과)
            <br /> *서울 384명 이상 / 경기 539명 이상 / 부산 135명 이상 <br />
            <strong>모임 </strong> <br />
            18시 이전: 4명까지 사적모임 가능 (5인 이상 금지) <br />
            18시 이후: 2명까지 사적모임 가능 (3인 이상 금지) <br />
            <strong>스포츠 관람 </strong>
            <br /> 무관중 경기
            <br /> <strong>행사 </strong>
            <br /> 행사 금지
            <br /> <strong>집회</strong>
            <br /> 1인 시위 외 집회 금지
          </div>
        )}
      </div>
    </section>
  );
}

export default Text1;
