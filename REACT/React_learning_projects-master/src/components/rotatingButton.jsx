import React, { Component } from 'react';

export default class RotateButton extends Component {
    constructor() {
        super();
        this.state ={
            fixedNum: [1,2,3,4,5,6,7,8,9],
            rotateNum: [1,2,3,6,9,8,7,4],
            rotateIndex: [0,1,2,5,8,7,6,3],
        }
    }

    clickRotate() {
        const { fixedNum, rotateNum, rotateIndex } = this.state;
        rotateNum.unshift(rotateNum.pop());
        rotateIndex.forEach((item, index) => {
            fixedNum[item] = rotateNum[index];
        });
        this.setState({
            fixedNum,
            rotateNum,
        });
    }

    renderButton() {
        const { fixedNum: arr } = this.state;
        return arr.map(item => {
            return item === 5 ? <button id={`btn${item}`} key={item} className="rotate-button" onClick={()=> this.clickRotate()}>{item}</button> : 
            <button id={`btn${item}`} key={item} className="rotate-button">{item}</button>
        })
    }

    render() {
        return (
            <div className="rotate-main">
                <h1>Rotating Button</h1>
                <div className="rotate-div">
                    {this.renderButton()}
                </div>
            </div>
        )
    }
}