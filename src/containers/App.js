import React, { Component } from 'react';
import 'Assets/css/app.css';
import Blink from "Components/Blink";

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue
}

class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
			value: null,
			displayValue: '0',
			operator: null,
			waitingForOperand: false,
			typed: "",
    };
	}

	clearAll() {
    this.setState({
			typed: "",
      value: null,
      displayValue: '0',
      operator: null,
			waitingForOperand: false,
			equal: false
    })
	}
	clearDisplay() {
    this.setState({
      displayValue: '0'
    })
  }
  
  clearLastChar() {
    const { displayValue } = this.state
    
    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
    })
  }

	toggleSign() {
    const { displayValue } = this.state
    const newValue = parseFloat(displayValue) * -1
    
    this.setState({
      displayValue: String(newValue)
    })
	}

	inputDot() {
    const { displayValue } = this.state
    
    if (!(/\./).test(displayValue)) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false
      })
    }
	}
	
	performOperation(nextOperator) {    
		const { equal, typed, value, displayValue, operator } = this.state
    const inputValue = parseFloat(displayValue)
		if(nextOperator === "=") this.setState({ equal: true })
    if (value == null) {
      this.setState({
        value: inputValue
      })
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)
      
      this.setState({
        value: newValue,
        displayValue: String(newValue)
      })
    }
    if(equal){
			this.setState({
				typed: displayValue + " " + nextOperator + " ",
				equal: false
			})
		}else{
			this.setState({
				typed: nextOperator !== "=" ? typed + inputValue + " " + nextOperator + " " : typed + inputValue,
			})
		}
		this.setState({
			waitingForOperand: true,
			operator: nextOperator
		})
    
	}

	inputPercent() {
    const { displayValue } = this.state
    const currentValue = parseFloat(displayValue)
    
    if (currentValue === 0)
      return
    
    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(displayValue) / 100
    
    this.setState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2))
    })
	}
	
	inputDigit(digit) {
		const { displayValue, waitingForOperand } = this.state
    
    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
  }
  render() {
		const { displayValue } = this.state
		const clearDisplay = displayValue !== '0'
    const clearText = clearDisplay ? 'C' : 'AC'
	return (
		<div className="calc-body">
			<div className="calc-screen">
				<div className="calc-operation">{ this.state.typed }</div>
				<div className="calc-typed">{ displayValue }<Blink label="_"/></div>
			</div>
			<div className="calc-button">
				<div className="calc-button-row">
					<div className="button c" onClick={() => clearDisplay ? this.clearDisplay() : this.clearAll()} >{clearText}</div>
					<div className="button l" onClick={() => this.toggleSign()}>±</div>
					<div className="button l" onClick={() => this.inputPercent()}>%</div>
					<div className="button l" onClick={() => this.performOperation("/")} >/</div>
				</div>
				<div className="calc-button-row">
					<div className="button" onClick={() => this.inputDigit(7)} >7</div>
					<div className="button" onClick={() => this.inputDigit(8)} >8</div>
					<div className="button" onClick={() => this.inputDigit(9)} >9</div>
					<div className="button l" onClick={() => this.performOperation("*")}>x</div>
				</div>
				<div className="calc-button-row">
					<div className="button" onClick={() => this.inputDigit(4)} >4</div>
					<div className="button" onClick={() => this.inputDigit(5)} >5</div>
					<div className="button" onClick={() => this.inputDigit(6)} >6</div>
					<div className="button l" onClick={() => this.performOperation("-")}>−</div>
				</div>
				<div className="calc-button-row">
					<div className="button" onClick={() => this.inputDigit(1)} >1</div>
					<div className="button" onClick={() => this.inputDigit(2)} >2</div>
					<div className="button" onClick={() => this.inputDigit(3)} >3</div>
					<div className="button l" onClick={() => this.performOperation("+")} >+</div>
				</div>
				<div className="calc-button-row">
					<div className="button" onClick={() => this.inputDot()}>.</div>
					<div className="button" onClick={() => this.inputDigit(0)} >0</div>
					<div className="button" onClick={() => this.clearLastChar()} >{"<"}</div>
					<div className="button l" onClick={() => this.performOperation('=')} >{"="}</div>
				</div>
			</div>
		</div>
	);
  }
}

export default App;

