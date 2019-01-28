import React, { Component } from "react";
import "./App.css";

class Button extends Component {
    render() {
        return <button onClick={this.props.onClick}>{this.props.value}</button>;
    }
}

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "0",
            lastPressed: ""
        };
        this.baseState = this.state
        this.handleClick = this.handleClick.bind(this);
        // this.resetDisplay = this.resetDisplay.bind(this);
    }
    resetDisplay() {
        this.setState(this.baseState)
        // debugger
    }
    // componentDidUpdate(prevProps, prevState) {
    //     console.log("Updated");
    // }
    componentDidUpdate = (prevProps, prevState) => {
        // let width = ReactDOM.findDOMNode(this).parentNode.offsetWidth
        // if (prevState && prevState.width !== width) {
            // this.setState({ width })
        // }
        console.log(prevState.display[1])
        if(prevState && prevState.display[0]==="0"){
            console.log("hh")
            this.setState({
                display: prevState.display.substr(1)
            })
        }
        // if(prevState && prevState.lastPressed==="="){
        //     this.setState({
        //         display: prevState.display
        //     })
        // }
    }
    handleClick(e) {
        const clickedElement = e.target.innerHTML;
        // console.log(this.state);
        const operators = ["+", "-", "*", "/"]
        // if(this.state.display === "0"){
        //     debugger
        //     this.setState({
        //         display: ""
        //     })
        // }
        // if(this.state.lastPressed === "=" && !operators.includes(clickedElement)) {
        //     // debugger
        //     // let clearedResult = " "
        //     // this.setState({
        //     //     display: ""
        //     // })
        //     this.resetDisplay()
        //     console.log("Hahhahaha")
        // }
        switch (clickedElement) {
            
            case "C":
                // debugger
                this.setState({
                    display: "00",
                    lastPressed: clickedElement
                })
            break
            case "+/-":
                this.setState(state=>({
                    display: -1 * state.display,
                    lastPressed: clickedElement
                }))
            break
            case "=":
                try {
                    
                    let finalResult = eval(this.state.display)
                    this.setState({
                        display: finalResult,
                        lastPressed: clickedElement
                    })
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        this.setState({
                            display: "00",
                            lastPressed: ""
                        })
                    }
                }
                
            break
            default:
                // if(this.state.display[0]==="0") {
                //     // debugger
                //     // const ff = this.state.display.substr(1)
                //     // this.setState({
                //     //     display: ff,
                //     //     lastPressed: clickedElement
                //     // })
                //     this.setState((prevState, props) => {
                //         return {display: prevState.display.substr(1) };
                //     })
                // }
                let result = ""
                result = this.state.display + clickedElement
                // console.log(result)
                this.setState({
                    display: result,
                    lastPressed: clickedElement
                })
                // console.log("default")
            break
        }
    }
    render() {
        let numArray = [...Array(10).keys()];

        // for(let i of numArray ) {
        // <Button value = "1"/>
        // }
        return (
            // for(let i of numArray ) {
            <div className="calc-app">
                <div className="calc-app-display">{this.state.display}</div>

                <div className="row">
                    <Button value="C" onClick={this.handleClick} />
                    <Button value="+/-" onClick={this.handleClick} />
                    <Button value="%" onClick={this.handleClick} />
                    <Button value="/" onClick={this.handleClick} />
                </div>
                <div className="row">
                    <Button value="7" onClick={this.handleClick} />
                    <Button value="8" onClick={this.handleClick} />
                    <Button value="9" onClick={this.handleClick} />
                    <Button value="*" onClick={this.handleClick} />
                </div>
                <div className="row">
                    <Button value="4" onClick={this.handleClick} />
                    <Button value="5" onClick={this.handleClick} />
                    <Button value="6" onClick={this.handleClick} />
                    <Button value="-" onClick={this.handleClick} />
                </div>
                <div className="row">
                    <Button value="1" onClick={this.handleClick} />
                    <Button value="2" onClick={this.handleClick} />
                    <Button value="3" onClick={this.handleClick} />
                    <Button value="+" onClick={this.handleClick} />
                </div>
                <div className="row">
                    <Button value="0" onClick={this.handleClick} />
                    <Button value="." onClick={this.handleClick} />
                    <Button value="=" onClick={this.handleClick} />
                </div>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            // <div className="App">
            //     <header className="App-header">
            //         <img src={logo} className="App-logo" alt="logo" />
            //         <p>
            //             Edit <code>src/App.js</code> and save to reload.
            //         </p>
            //         <a
            //             className="App-link"
            //             href="https://reactjs.org"
            //             target="_blank"
            //             rel="noopener noreferrer"
            //         >
            //             Learn React
            //         </a>
            //     </header>
            // </div>
            <Layout />
        );
    }
}

export default App;
