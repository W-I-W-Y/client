import React, { useEffect, useState, PureComponent } from "react";
import { Row, Col } from "antd";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";

function Text2() {
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
            backgroundColor: "#ffeef9",
          }}
        >
          <Row style={{ display: "flex" }}>
            {one ? (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#fbaef5",
                  opacity: "0.7",
                  marginTop: "2px",
                  marginBottom: "2px",
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
                    fontSize: "1rem",
                  }}
                >
                  화이자
                </p>
              </Col>
            ) : (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2px",
                  marginBottom: "2px",
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
                    fontSize: "1rem",
                  }}
                >
                  화이자
                </p>
              </Col>
            )}

            {two ? (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#fbaef5",
                  opacity: "0.7",
                  marginTop: "2px",
                  marginBottom: "2px",
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
                    fontSize: "1rem",
                  }}
                >
                  모더나
                </p>
              </Col>
            ) : (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2px",
                  marginBottom: "2px",
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
                    fontSize: "1rem",
                  }}
                >
                  모더나
                </p>
              </Col>
            )}
            {three ? (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#fbaef5",
                  opacity: "0.7",
                  marginTop: "2px",
                  marginBottom: "2px",
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
                    fontSize: "0.9rem",
                  }}
                >
                  아스트라제네카
                </p>
              </Col>
            ) : (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2px",
                  marginBottom: "2px",
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
                    fontSize: "0.9rem",
                  }}
                >
                  아스트라제네카
                </p>
              </Col>
            )}
            {four ? (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#fbaef5",
                  opacity: "0.7",
                  marginTop: "2px",
                  marginBottom: "2px",
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
                    fontSize: "1rem",
                  }}
                >
                  얀센
                </p>
              </Col>
            ) : (
              <Col
                className="pointerClick2"
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2px",
                  marginBottom: "2px",
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
                    fontSize: "1rem",
                  }}
                >
                  얀센
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
              paddingTop: "30px",
              fontFamily: "Droid Sans",
              fontSize: "1.5rem",
              lineHeight: "40px",
            }}
          >
            <strong>개발국 </strong>
            미국
            <br />
            <strong>수량 </strong> 6,600만회 분 <br />
            <strong>접종횟수 </strong>
            2회
            <br /> <strong>접종간격 </strong>
            21일
            <br /> <strong>보관</strong>
            -75℃±15℃ (6개월)
            <br /> <strong>유통</strong>2∼8℃ (5일)
          </div>
        )}
        {two && (
          <div
            className="dailyCovidStatus"
            style={{
              width: "100%",
              height: "300px",
              paddingLeft: "30px",
              paddingTop: "30px",
              fontFamily: "Droid Sans",
              fontSize: "1.5rem",
              lineHeight: "40px",
            }}
          >
            <strong>개발국 </strong>
            영국
            <br />
            <strong>수량 </strong>
            2,000만회 분 <br />
            <strong>접종횟수 </strong>
            2회
            <br /> <strong>접종간격 </strong>
            8~12주
            <br /> <strong>보관</strong>
            2∼8℃ (6개월)
            <br /> <strong>유통</strong>
            2∼8℃ (6개월)
          </div>
        )}
        {three && (
          <div
            className="dailyCovidStatus"
            style={{
              width: "100%",
              height: "300px",
              paddingLeft: "30px",
              paddingTop: "30px",
              fontFamily: "Droid Sans",
              fontSize: "1.5rem",
              lineHeight: "40px",
            }}
          >
            <strong>개발국 </strong>
            미국
            <br />
            <strong>수량 </strong>
            701만회 분 <br />
            <strong>접종횟수 </strong>
            1회(임상결과에 따라 변경가능)
            <br /> <strong>접종간격 </strong>
            -
            <br /> <strong>보관</strong>
            -20℃ (24개월)
            <br /> <strong>유통</strong>2∼8℃ (4.5개월)
          </div>
        )}
        {four && (
          <div
            className="dailyCovidStatus"
            style={{
              width: "100%",
              height: "300px",
              paddingLeft: "30px",
              paddingTop: "30px",
              fontFamily: "Droid Sans",
              fontSize: "1.5rem",
              lineHeight: "40px",
            }}
          >
            <strong>개발국 </strong>
            미국/독일
            <br />
            <strong>수량 </strong> 6,600만회 분 <br />
            <strong>접종횟수 </strong>
            2회
            <br /> <strong>접종간격 </strong>
            21일
            <br /> <strong>보관</strong>
            -75℃±15℃ (6개월)
            <br /> <strong>유통</strong>2∼8℃ (5일)
          </div>
        )}
      </div>
    </section>
  );
}

export default Text2;
