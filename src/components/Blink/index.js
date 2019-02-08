import React, { Component } from 'react'

export default class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showlabel: true,
      label: this.props.label
    };
    this.blinker = this.blinker.bind(this);
  }
  blinker(){
    var sLb = ! (this.state.showlabel);
    this.setState({showlabel: sLb});
  }
	componentDidMount() {
    setInterval(this.blinker, 250)
 	}
  render() {
    var spanStyle = this.state.showlabel ? {opacity: 1} : {opacity: 0};
    return (
      <span className="blink-me" style={spanStyle}>{ this.state.label }</span>
    )
  }
}
