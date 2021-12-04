import React, { Component } from 'react';

export default class TickingClock extends Component {
    constructor() {
        super();
        this.state = {
            timeVal: new Date().toLocaleTimeString(),
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.updateClock();
        }, 1000);
    }

    updateClock() {
        let t = new Date().toLocaleTimeString();
        if(t.substr(0,2) >= 12) {
            t = t.concat(' PM');
        } else {
            t = t.concat(' AM');
        }
        this.setState({
            timeVal: t,
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { timeVal } = this.state;
        return (
            <div className="Time">
                <p>{timeVal}</p>
            </div>
        )
    }
}