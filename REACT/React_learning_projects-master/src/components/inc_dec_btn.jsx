import React, { Component } from 'react';

export default class IncDecButton extends Component {
    constructor() {
        super();
        this.state ={
            num: 0,
            temp: 0,
        }
    }

    updateCount() {
        let { num, temp } = this.state;
        if(temp === 0) {
            num += 1;
            if(num === 10) {
                temp = 10;
            }
        } else if(temp === 10) {
            num -= 1;
            if(num === 0) {
                temp = 0;
            }
        }
        this.setState({
            num,
            temp,
        });
    }

    render(){
        const { num } = this.state;
        return (
            <div>
                <h1>
                    Increase Decrease Button
                </h1>
                <p>{num}</p>
                <button 
                    id="incerase_decrease_one" 
                    className="rotate-button div-click"
                    onClick={()=> this.updateCount()}
                >
                    Click Me!
                </button>
            </div>
        )
    }
}   