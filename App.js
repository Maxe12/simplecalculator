import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {

  constructor(){
    super();
    this.state = {
      resultText: "", 
    };
  }

  opButtonHandler(buttonText){
    switch(buttonText){
      case 'C':
        const term = this.state.resultText.split('')
        console.log(term)
        term.pop()
        this.setState({
          resultText: term.join('')
        }) 
    }
  }

  numButtonHandler(buttonText){
    console.log(this.state.resultText)
    if(this.state.resultText === "NaN"){
      this.setState({
        resultText : buttonText.toString()
      })
      return 
    }
    else if(buttonText === '='){
      return this.calcRst()
    }else {
      const sum = this.state.resultText + buttonText 
      this.setState({
        resultText : sum
      })
    }
  }

  calcRst(){
    const input = this.state.resultText 
    this.setState({
      resultText: "NaN"
    }) 
    /**@todo split input and calc result */
  }

  render(){

    let numElems = []  //init html elements to print the button grid
    let items = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [',', 0, '=']]
    for(let i = 0; i < 4; i++){
      let row = []
      for(let j = 0; j < 3; j++){
        row.push(<TouchableOpacity style={styles.touchable} onPress={() => this.numButtonHandler(items[i][j])}><Text style={styles.btnText}>{items[i][j]}
        </Text></TouchableOpacity>)
      }
      numElems.push(<View style={styles.row}>{row}</View>)
    }

    let operators = ['C', '+', '-', '*', '/']
    let opElems = [];
    for(let i = 0; i < 5; i++){
      opElems.push(<TouchableOpacity style={styles.touchable} onPress={() => this.opButtonHandler(operators[i])}><Text style={styles.btnText}>{operators[i]}</Text></TouchableOpacity>)
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.inputs}><Text style={styles.rstText}>
        {this.state.resultText}
        </Text>
        </View>
        <View style={styles.result}>
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
    backgroundColor: 'red', 
    justifyContent: 'center', 
    alignItems: 'flex-end', 
  }, 
  result: {
    flex: 1, 
    backgroundColor: 'green', 
  },
  buttons: {
    flex: 7, 
    flexDirection: 'row', 
  }, 
  numberButtons: {
    flex: 6, 
    backgroundColor: 'yellow', 
  }, 
  operatorButtons: {
    flex: 2, 
    backgroundColor: 'white', 
    alignItems: 'center', 
    justifyContent: 'space-around',
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
    fontSize: 30
  }, 
  rstText: {
    fontSize: 75
  }
});
