import React, { Component } from "react";
import If from "../helper/conditional";
import "./css/grid.css";

// const style = {
//   container: {
//     display: "grid",
//     /* grid-template-columns: 33.33% 33.33% 33.33%; */
//     gridTemplateColumns: "repeat(2, 1fr)",
//     gridGap: "1rem",
//     gridAutoRows: "minmax(100px, auto)",
//   },
// };

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        gtc: {
          gridTemplateColumns: "repeat(2, 1fr)",
          gtcChecked: false,
        },
        gridEnabled: props.enabled,
      },
      style :{
        container: {
          display: "grid",
          /* grid-template-columns: 33.33% 33.33% 33.33%; */
          gridTemplateColumns: "repeat(2, 1fr)",
          gridGap: "1rem",
          gridAutoRows: "minmax(100px, auto)",
        },
      }
    };
    this.butify = this.butify.bind(this);
  }

  butify(content) {
    let str = "";
    if(content && typeof content === "string") {
      for(let s of content) {
        console.log("...", s);
        str += s;
        if(s === '{' || s === '}') {
          str += '\n';
        }
      }
    }
    console.log("--", str);
    return str;
  }

  optionSelector(e) {
    const { options } = this.state;
    options["gtc"]["gtcChecked"] = e.target.checked;
    this.setState({
      ...options,
    });
  }

  setContent(e) {
    console.log("---", e.target.value);
    this.setState({
      style: {...JSON.parse(e.target.value)},
    })
  }
  render() {
    const { gridEnabled } = this.state.options;
    const { style } = this.state;
    return (
      /* Container 1 */
      <div>
        <If condition={gridEnabled}>
        <div className="options-selector">
        <textarea
          value= {this.butify(JSON.stringify(style))}
          onChange={(e) => this.setContent(e)}
          spellCheck="false"
        />
        </div>
        </If>
        <div className="grid-wrapper" style={style.container}>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In, sed
            vitae voluptates possimus dolor perspiciatis veniam explicabo. Vero
            quo quisquam, odio ipsa, sint et dicta eaque, aliquid eligendi non
            repudiandae. Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. In, sed vitae voluptates possimus dolor perspiciatis veniam
            explicabo. Vero quo quisquam, odio ipsa, sint et dicta eaque,
            aliquid eligendi non repudiandae. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. In, sed vitae voluptates possimus
            dolor perspiciatis veniam explicabo. Vero quo quisquam, odio ipsa,
            sint et dicta eaque, aliquid eligendi non repudiandae.
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In, sed
            vitae voluptates possimus dolor perspiciatis veniam explicabo. Vero
            quo quisquam, odio ipsa, sint et dicta eaque, aliquid eligendi non
            repudiandae.
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In, sed
            vitae voluptates possimus dolor perspiciatis veniam explicabo. Vero
            quo quisquam, odio ipsa, sint et dicta eaque, aliquid eligendi non
            repudiandae.
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In, sed
            vitae voluptates possimus dolor perspiciatis veniam explicabo. Vero
            quo quisquam, odio ipsa, sint et dicta eaque, aliquid eligendi non
            repudiandae.
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In, sed
            vitae voluptates possimus dolor perspiciatis veniam explicabo. Vero
            quo quisquam, odio ipsa, sint et dicta eaque, aliquid eligendi non
            repudiandae.
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In, sed
            vitae voluptates possimus dolor perspiciatis veniam explicabo. Vero
            quo quisquam, odio ipsa, sint et dicta eaque, aliquid eligendi non
            repudiandae.
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;
