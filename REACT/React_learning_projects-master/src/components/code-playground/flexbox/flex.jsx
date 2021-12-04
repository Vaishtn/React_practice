import React, { Component } from "react";
import "./css/flex.css";

const style = {
  container: {
    display: "flex",
  },
  box1: {
    flex: 1,
    order: 1,
  },
  box2: {
    flex: 1,
    order: 2,
  },
  box3: {
    flex: 1,
    order: 3,
  },
};
class FlexBox extends Component {
  render() {
    return (
      /* Container 1 */
      <div className="flex-container" style={style.container}>
        <div className="box1" style={style.box1}>
          <h3>Box one</h3>
          <p>
            Tempore voluptates harum nam architecto laboriosam, placeat
            perspiciatis voluptas corporis possimus quaerat molestias esse enim
            voluptatibus id.
          </p>
        </div>
        <div className="box2" style={style.box2}>
          <h3>Box two</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic maiores
            voluptatum porro quas nesciunt assumenda ipsa, architecto inventore
            dolore placeat incidunt, ea molestias non. Adipisci illum nobis
            voluptatibus ad necessitatibus?
          </p>
        </div>
        <div className="box3" style={style.box3}>
          <h3>Box three</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iste
            quod doloremque eaque quas voluptatibus repellendus voluptas fugit.
            Autem ipsa ab veritatis itaque vel facere, obcaecati optio error
            consectetur neque!
          </p>
        </div>
      </div>
    );
  }
}

export default FlexBox;
