import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {

  constructor(){
    super();
    this.state = {
      show: true
    };
  }

  render(){
    
    let numElems = []  //init html elements to print the button grid
    let items = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [',', 0, '=']]
    for(let i = 0; i < 4; i++){
      let row = []
      for(let j = 0; j < 3; j++){
        row.push(<TouchableOpacity style={styles.touchable}><Text style={styles.btnText}>{items[i][j]}
        </Text></TouchableOpacity>)
      }
      numElems.push(<View style={styles.row}>{row}</View>)
    }

    let operators = ['+', '-', '*', '/']
    let opElems = [];
    for(let i = 0; i < 4; i++){
      opElems.push(<TouchableOpacity style={styles.touchable}><Text style={styles.btnText}>{operators[i]}</Text></TouchableOpacity>)
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.inputs}>
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
  }
});
