import React from "react";
import icon1 from "../../../../images/icon1.png";
import icon2 from "../../../../images/icon2.png";
import icon3 from "../../../../images/icon3.png";
import icon4 from "../../../../images/icon4.png";

function Content5() {
  return (
    <section className="content-section" id="content-section-5">
      <header className="major">
        <h2>Service</h2>
      </header>
      <div className="features">
        <article>
          <span className="icon fa-diamond">
            <img
              src={icon1}
              className="icon-image"
              width="46%"
              alt=""
              // style="margin-top: 33px; margin-left: 5px"
            />
          </span>
          <div className="content">
            <h3>코로나 확진자 정보</h3>
            <p>
              저희 서비스는 일일 코로나 확진자 정보뿐만 아니라, 시도별 확진자
              정보, 국외 확진자 정보를 모두 숫자와 차트를 이용해 사용자들이 보기
              쉽도록 정보를 제공합니다.
            </p>
          </div>
        </article>
        <article>
          <span className="icon fa-paper-plane">
            <img
              src={icon2}
              className="icon-image"
              width="46%"
              alt=""
              // style="margin-top: 33px; margin-left: 5px"
            />
          </span>
          <div className="content">
            <h3>코로나 백신 정보</h3>
            <p>
              현재 백신 접종자 213만명. 백신을 어디서 맞아야하는지 그리고 누가
              맞을 수 있는지 궁금하신 사용자들을 위해 저희 서비스는 코로나
              백신에 대한 정보를 한번에 제공합니다.
            </p>
          </div>
        </article>
        <article>
          <span className="icon fa-rocket">
            <img
              src={icon3}
              className="icon-image"
              width="46%"
              // style="margin-top: 33px; margin-left: 5px"
              alt=""
            />
          </span>
          <div className="content">
            <h3>커뮤니티 서비스 제공</h3>
            <p>
              저희 서비스는 단방향성으로 정보를 제공하는 것이 아니라
              사용자들간의 소통이 원활할 수 있도록 사용자 커뮤니티 서비스를
              제공합니다.
            </p>
          </div>
        </article>
        <article>
          <span className="icon fa-signal">
            <img
              src={icon4}
              className="icon-image"
              width="46%"
              alt=""
              // style="margin-top: 33px; margin-left: 5px"
            />
          </span>
          <div className="content">
            <h3>실시간 정보 반영</h3>
            <p>
              저희 서비스는 질병관리본부의 정보를 바탕으로 하루에 2번,
              실시간으로 모든 정보를 업데이트 하여서 사용자들에게 새로운 정보를
              제공합니다.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Content5;
