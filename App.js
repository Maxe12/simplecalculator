import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      resultText: "",
      result: "",
      commaIsSet: false,
    };
    this.operators = ['C', 'CE', '+', '-', '*', '/'];
  }

  opButtonHandler(buttonText) {
    const term = this.state.resultText.split('')
    const lastIndex = term[term.length - 1]
    switch (buttonText) {
      case 'C':
        const commaStateDecider = this.getCommaDecider(lastIndex)
        term.pop()
        this.setState({
          resultText: term.join(''),
          commaIsSet: commaStateDecider,
        })
        break
      case 'CE': 
        this.setState({
          resultText: "", 
          result: "", 
          commaIsSet: false
        })
        break
      default: //for +, -, *, /
        if (!this.isOperator(lastIndex)) { //when the last insert index isnt an operator or comma... 
          this.setState({
            resultText: this.state.resultText + buttonText,
            commaIsSet: false, //after an operator a new comma is allowed
          })
        }
        break
    }
  }

  isOperator(index) {
    if (index === '+' || index === '-' || index === '*' || index === '/' || index === '.') {
      return true
    } else {
      return false
    }
  }

  getCommaDecider(lastIndex) {
    if (lastIndex === ".") {
      return false;
    } else if (this.state.commaIsSet) {
      return true
    } else {
      return false
    }
  }

  numButtonHandler(buttonText) {
    const temp = this.state.resultText
    switch (buttonText.toString()) {
      case "=":
        return this.calcRst()
      case ".":
        if (temp.charAt(temp.length - 1) === '.' || this.state.commaIsSet || temp.length === 0) {
          return
        } else {
          this.setState({
            resultText: temp + '.',
            commaIsSet: true,
          })
          return
        }
      default: //for every numberinput
        this.setState({
          resultText: this.state.resultText + buttonText,
          commaIsSet: this.state.commaIsSet,
        })
        return
    }
  }

  calcRst() {
    const term = this.state.resultText
    const lastIndex = term.charAt(term.length - 1)
    if (!this.isOperator(lastIndex)) {
      const temp = eval(term) //calculate the result 
      this.setState({
        resultText: "",
        result: temp,
        commaIsSet: false,
      })
    } 
  }

  render() {

    let numElems = []  //init html elements to print the button grid
    let items = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
    for (let i = 0; i < 4; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        row.push(<TouchableOpacity key={items[i][j]} style={styles.touchable} onPress={() => this.numButtonHandler(items[i][j])}><Text style={styles.btnText}>{items[i][j]}
        </Text></TouchableOpacity>)
      }
      numElems.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let opElems = [];
    for (let i = 0; i < 6; i++) {
      opElems.push(<TouchableOpacity key={this.operators[i]} style={styles.touchable} onPress={() => this.opButtonHandler(this.operators[i])}><Text style={styles.btnText}>{this.operators[i]}</Text></TouchableOpacity>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.inputs}><Text style={styles.rstText}>
          {this.state.resultText}
        </Text>
        </View>
        <View style={styles.result}>
          <Text style={styles.sum}>{this.state.result}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numberButtons}>
            {numElems}
          </View>
          <View style={styles.operatorButtons}>
            {opElems}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputs: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  result: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "flex-end",
    justifyContent: "center",
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  numberButtons: {
    flex: 6,
    backgroundColor: 'rgb(68, 68, 68)',
  },
  operatorButtons: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgb(99, 99, 99)'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 30, 
    color: 'white'
  },
  rstText: {
    fontSize: 75,
    marginRight: 20, 
    color: 'black'
  },
  sum: {
    fontSize: 40,
    marginRight: 20, 
    color: 'black'
  }
});