import { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '0',
    };
  }

  makeCalculate = (previousNumber, mathSign, currentNumber) => {
    if (mathSign === '/') {
      previousNumber /= currentNumber;
    } else if (mathSign === 'X') {
      previousNumber *= currentNumber;
    } else if (mathSign === '-') {
      previousNumber -= currentNumber;
    } else if (mathSign === '+') {
      previousNumber += currentNumber;
    }
    return previousNumber;
  };

  makeSolution = () => {
    let previousNumber = 0;
    let continuedNumber = '';
    let currentNumber = 0;
    let mathSign = '';
    let result = 0;
    let i = 0;
    let length = this.state.number.length;
    let nowNumber = this.state.number;
    const basicMathSigns = ['/', 'X', '-', '+'];

    for (i = 0; i < length; i++) {
      if (basicMathSigns.includes(nowNumber[i])) {
        if (previousNumber) {
          currentNumber = parseInt(continuedNumber);
          continuedNumber = '';
          previousNumber = this.makeCalculate(
            previousNumber,
            mathSign,
            currentNumber
          );
        } else {
          previousNumber = parseInt(continuedNumber);
          continuedNumber = '';
          mathSign = nowNumber[i];
        }
      } else {
        continuedNumber += nowNumber[i];
      }

      if (i === length - 1) {
        currentNumber = parseInt(continuedNumber);
        result = this.makeCalculate(previousNumber, mathSign, currentNumber);
      }
    }
    this.setState({
      number: result.toString(),
    });
  };

  checkPastDots = () => {
    let length = this.state.number.length;
    let nowNumber = this.state.number;
    let index = length - 1;
    const pastMathSigns = [')', '%', '/', 'X', '-', '+'];
    while (1) {
      // 이전에 .이 한번도 없었다면
      if (index === -1 || pastMathSigns.includes(nowNumber[index])) {
        this.setState({
          number: nowNumber + '.',
        });
        return;
      } else if (nowNumber[index] === '.') {
        return;
      }
      index--;
    }
  };

  makeNumbers = (val) => {
    let length = this.state.number.length;
    const dotNextPositionSigns = ['.', '(', ')', '%', '/', 'X', '-', '+'];
    const basicMathSigns = ['/', 'X', '-', '+'];
    let nowNumber = this.state.number;
    if (val === '.') {
      if (dotNextPositionSigns.includes(nowNumber[length - 1])) {
        return;
      } else if (nowNumber === '0') {
        this.setState({
          number: '0.',
        });
      } else {
        this.checkPastDots();
      }
    } else if (val === '0') {
      if (nowNumber === '0') {
        return;
      } else {
        this.setState({
          number: nowNumber + '0',
        });
      }
    } else if (!isNaN(parseInt(val))) {
      if (nowNumber === '0') {
        this.setState({
          number: val,
        });
        return;
      } else {
        this.setState({
          number: nowNumber + val,
        });
      }
    } else if (basicMathSigns.includes(val)) {
      if (nowNumber[length - 1] === '(' || nowNumber[length - 1] === '.') {
        return;
      } else if (basicMathSigns.includes(nowNumber[length - 1])) {
        let newSentence = nowNumber.substring(0, length - 1);
        newSentence += val;
        this.setState({
          number: newSentence,
        });
      } else {
        this.setState({
          number: nowNumber + val,
        });
      }
    } else if (val === 'AC') {
      this.setState({
        number: '0',
      });
    } else if (val === '%') {
      if (!isNaN(parseInt(nowNumber[length - 1]))) {
        this.setState({
          number: nowNumber + val,
        });
      } else if (dotNextPositionSigns.includes(nowNumber[length - 1])) {
      }
    }
  };

  allButton = ({ title }) => {
    const mathSigns = ['()', '%', '/', 'X', '-', '+'];
    if (title === '=') {
      return (
        <TouchableOpacity
          style={styles.roundButtonEqual}
          onPress={this.makeSolution}>
          <Text style={styles.textButtons}>{title}</Text>
        </TouchableOpacity>
      );
    } else if (mathSigns.includes(title)) {
      return (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => {
            this.makeNumbers(title);
          }}>
          <Text style={styles.textButtonSign}>{title}</Text>
        </TouchableOpacity>
      );
    } else if (title === 'AC') {
      return (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => {
            this.makeNumbers(title);
          }}>
          <Text style={styles.textButtonAC}>{title}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => this.makeNumbers(title)}>
          <Text style={styles.textButtons}>{title}</Text>
        </TouchableOpacity>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperPlace}>
          <Text style={styles.calculatedNumber}>{this.state.number}</Text>
        </View>
        <View style={styles.downPlace}>
          <View style={styles.buttons}>
            <this.allButton title="AC"></this.allButton>
            <this.allButton title="()"></this.allButton>

            <this.allButton title="%"></this.allButton>
            <this.allButton title="/"></this.allButton>
          </View>
          <View style={styles.buttons2}>
            <this.allButton title="7"></this.allButton>
            <this.allButton title="8"></this.allButton>
            <this.allButton title="9"></this.allButton>
            <this.allButton title="X"></this.allButton>
          </View>
          <View style={styles.buttons3}>
            <this.allButton title="4"></this.allButton>
            <this.allButton title="5"></this.allButton>
            <this.allButton title="6"></this.allButton>
            <this.allButton title="-"></this.allButton>
          </View>
          <View style={styles.buttons4}>
            <this.allButton title="1"></this.allButton>
            <this.allButton title="2"></this.allButton>
            <this.allButton title="3"></this.allButton>
            <this.allButton title="+"></this.allButton>
          </View>
          <View style={styles.buttons5}>
            <this.allButton title="+/-"></this.allButton>
            <this.allButton title="0"></this.allButton>
            <this.allButton title="."></this.allButton>
            <this.allButton title="="></this.allButton>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperPlace: {
    flex: 0.3,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  downPlace: {
    flex: 0.8,
    backgroundColor: 'black',
  },
  buttons: {
    flex: 0.1,
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 23,
  },
  buttons2: {
    flex: 0.1,
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 23,
  },
  buttons3: {
    flex: 0.1,
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 23,
  },
  buttons4: {
    flex: 0.1,
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 23,
  },
  buttons5: {
    flex: 0.1,
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 23,
  },
  calculatedNumber: {
    fontSize: 50,
  },
  roundButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#292929',
  },
  roundButtonEqual: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'green',
  },
  textButtons: {
    color: 'white',
    fontSize: 30,
  },
  textButtonSign: {
    color: 'green',
    fontSize: 30,
  },
  textButtonAC: {
    color: 'red',
    fontSize: 30,
  },
});

export default App;
