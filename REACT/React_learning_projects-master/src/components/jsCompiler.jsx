import React, { Component } from "react";

export default class Compiler extends Component {
  constructor() {
    super();
    this.state = {
      userFlag: true,
      userName: "",
      codetoCompile: "",
      preTextCode: "Enter your code here \n \n",
      preTextCompile: "// Output Window \n",
      output: "",
    };
  }

  getUserName(e) {
    this.setState({ userName: e.target.value });
  }

  displayCompiler(e) {
    if (e.keyCode === 13) {
      // Cancel the default action, if needed
      e.preventDefault();
      // Trigger the button element with a click
      this.setState({
        userFlag: false,
      });
    }
  }

  compileCode() {
    
  }

  getContent(e) {
    const { preTextCode } = this.state;
    console.log('this', e.target.value);
    if((e.target.value).includes(preTextCode)) {
      this.setState({
        codetoCompile: (e.target.value).replace(preTextCode, ""),
      });
    }
  }

  getResult() {
    const d = new Date().toLocaleTimeString();
    const { userName, preTextCompile } = this.state;
    const u = `${preTextCompile} \n ${d}: ${userName} > \n`;
    this.setState({
      currentUser: u,
    })
  }

  setCarretPosition(e) {
    const textarea = e.target;
    if(e.keyCode === 9) {
      // get caret position/selection
      const val = textarea.value;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // set textarea value to: text before caret + tab + text after caret
      // textarea.value = val.substring(0, start) + '  ' + val.substring(end);
      textarea.value = val.substr(0, start) + '  ' + val.substr(end);

      // put caret at right position again
      textarea.selectionStart = textarea.selectionEnd = start + 2;

      // prevent the focus lose
      e.preventDefault();
      // return false;
    }
  }

  render() {
    const { userFlag, codetoCompile, preTextCode } = this.state;
    const ctoc = preTextCode.concat(codetoCompile);
    return (
      <>
        <h1>Compile your js code</h1>
        {userFlag ? (
          <div className="modelBox">
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => this.getUserName(e)}
              onKeyUp={(e) => this.displayCompiler(e)}
            />
          </div>
        ) : (
          <div>
            <div className="codeBox">
              <textarea
                id="textArea_one"
                wrap="off"
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
                spellCheck="false"
                aria-autocomplete="both"
                className="codeArea"
                value={ctoc}
                onChange={(e) => this.getContent(e)}
                onKeyDown={(e) => this.setCarretPosition(e)}
              />
            </div>
            <div className="compileBox">
              <textarea
                id="textArea_two"
                className="compileArea"
                value={this.state.currentUser}
                readOnly 
              />
            </div>
            <button
              className="compile-btn"
              onClick={()=>this.getResult()}
            >
              Compile
            </button>
          </div>
        )}
      </>
    );
  }
}
