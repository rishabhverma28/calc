import React, { Component } from "react";
import math from "mathjs";
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

        this.baseState = this.state;
        this.handleClick = this.handleClick.bind(this);
    }
    resetDisplay() {
        this.setState(this.baseState);
    }
    shouldComponentUpdate = (prevProps, prevState) => {
        if (
            prevState &&
            prevState.display[0] === "0" &&
            prevState.display.length === 2
        ) {
            const ff = prevState.display.substr(1);
            this.setState({
                display: ff
            });
        }
        return true;
    };

    componentDidMount() {
        // this.myDiv.addEventListener("keydown", this.handleKey)
        // this.myDiv.focus()
        const checkLS = localStorage.getItem("finalResult");
        if (checkLS) {
            this.setState({
                display: checkLS,
                lastPressed: ""
            });
        }
    }
    // componentWillUnmount() {
    //     this.myDiv.removeEventListener('keydown', this.handleKey);
    // }

    // handleKey = e => {
    //     console.log(e.keyCode);
    // }
    handleClick(e) {
        const clickedElement = e.target.innerHTML;
        switch (clickedElement) {
            case "C":
                this.setState({
                    display: "0",
                    lastPressed: clickedElement
                });
                break;
            case "+/-":
                let disp = ""
                try {
                    disp = math.multiply(-1, this.state.display)
                }
                catch (e) {
                    disp = this.state.display
                    let sym =  disp.substr(-1)
                    disp = disp.substr(0,disp.length-1)
                    disp = math.multiply(-1, disp)
                    disp += sym
                }
                this.setState(state => ({
                    display: disp,
                    lastPressed: clickedElement
                }));
                break;
            case "=":
                let finalResult = math.eval(this.state.display);
                finalResult = math.format(finalResult, { precision: 14 });
                this.setState({
                    display: finalResult,
                    lastPressed: clickedElement
                });
                localStorage.setItem("finalResult", finalResult);
                break;
            default:
                let result = "";
                result = this.state.display + clickedElement;
                this.setState({
                    display: result,
                    lastPressed: clickedElement
                });
                break;
        }
    }
    render() {
        return (
            <div className="calc-app">
                {/* <div className="calc-app-display" tabIndex = "1" ref={ref => this.myDiv = ref}>{this.state.display}</div> */}
                <div className="calc-app-display" tabIndex = "1" ref={ref => this.myDiv = ref}>{this.state.display}</div>

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
        return <Layout />;
    }
}

export default App;
