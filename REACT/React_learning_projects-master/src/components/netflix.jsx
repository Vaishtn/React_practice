import React from "react";
import Data from "../netflix.json";

export default () => {
  function renderpage() {
    return Data.sdata.map((item) => {
      return (
        <div key={`div_${item.key}`} className="netflixDiv">
          <a key={`imagelink_${item.key}`} target="blank" href={item.link}>
            <img key={`image_${item.key}`} src={item.imgsrc} alt="default" />
          </a>
          <p key={`title_${item.key}`}>{item.title}</p>
          <p key={`sname_${item.key}`}>{item.sname}</p>
          <a key={`link_${item.key}`} target="blank" href={item.link}>
            Open in Netflix
          </a>
        </div>
      );
    });
  }
  return (
    <div>
      <h1 style={{marginTop: '20px'}}>Browse Netflix tv series!</h1>
      {renderpage()}
    </div>
  );
};
