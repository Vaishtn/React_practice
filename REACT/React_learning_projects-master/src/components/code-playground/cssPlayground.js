import React, { Component } from "react";
import FlexBox from "./flexbox/flex.jsx";
import Grid from "./gridBox/grid";
import If from "./helper/conditional.jsx";

export class CssPlayground extends Component {

    constructor() {
        super();
        this.state = {
            flexProps: {
                showFlex: false
            },
            gridProps: {
                showGrid: false
            }
        }
    }

  toggleCheckBox(e) {
    console.log(e.target.checked);
    const {flexProps, gridProps} = this.state;
    if(e.target.value === 'flex') {
        flexProps['showFlex'] = e.target.checked;
        gridProps['showGrid'] = false;

    }
    if(e.target.value === 'grid') {
        flexProps['showFlex'] = false;
        gridProps['showGrid'] = e.target.checked;
    }
    this.setState({
        ...flexProps,
        ...gridProps,
    })
  }

  render() {
      const {
          flexProps,
          gridProps,
      } = this.state;
    return (
      <div>
        <h1>Hello</h1>
        <div className="cp-wrap">
          <input
            type="checkbox"
            id="flex"
            name="flex"
            value="flex"
            checked={flexProps.showFlex}
            onChange={(e) => this.toggleCheckBox(e)}
          />
          <label htmlFor="flex">FlexBox</label>
        </div>
        <div className="cp-wrap">
          <input
            type="checkbox"
            id="grid"
            name="grid"
            value="grid"
            checked={gridProps.showGrid}
            onChange={(e) => this.toggleCheckBox(e)}
          />
          <label htmlFor="grid">Grid</label>
        </div>
        <If condition={flexProps.showFlex}>
            <FlexBox />
        </If>
        <If condition={gridProps.showGrid}>
            <Grid enabled={gridProps.showGrid} />
        </If>
      </div>
    );
  }
}

export default CssPlayground;
