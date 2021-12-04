import React, { Component } from "react";

export class React_learning extends Component {
  // static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      flag: false,
    }
    this.getData = this.getData.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  getData(e, type) {
    this.setState({
      [type] : e.target.value
    })
  }

  submitForm() {
    const { email, password } = this.state;
    if(email && password) {
      this.setState({
        flag: true
      });
    } else {
      this.setState({
        flag: false
      });
    }
  }


  render() {
    const { email, password, flag } = this.state;
    return (
      <div>
        <input
          type="email"
          name="email"
          id="email"
          className="rdr_input"
          placeholder="Enter your email"
          onChange= {(e)=>this.getData(e, 'email')}
        />
        <input
          type="password"
          name="password"
          id="pwd"
          className="rdr_input"
          placeholder="Enter password"
          onChange= {(e)=>this.getData(e, 'password')}
        />
        <button className="rdr_btn" onClick={this.submitForm}>Submit</button>
      {
        flag ?
        <div>
          <p>{`The email is: ${email}`}</p>
          <p>{`The password is: ${password.replace(password.slice(-5),'xxxxx')}`}</p>
        </div> : null
      }
      </div>
    );
  }
}

export default React_learning;
