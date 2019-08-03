import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import GameStatus from './components/GameStatus';
import ButtonGroup from './components/ButtonGroup';
import PlayerCard from './components/PlayerCard';
import CHOICES from './choice';

const randomComputerChoice = () => CHOICES[Math.floor(Math.random() * CHOICES.length)];
const getRoundOutcome = (userChoice, computerChoice) => {
  let result;

  if (userChoice === 'rock') {
    result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === 'paper') {
    result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === 'scissors') {
    result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === computerChoice) result = 'Tie game!';
  return result;
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerChoice: {},
      computerChoice: {},
      result: 'make you choice',
      choicetotal: 0,
      choicewin: 0,
      choicefalse: 0,
      choiceTie: 0,
      ratioWin: 0,
      ratioFase: 0,
      ratioTie: 0,
      show: false,

    }
  }

  buttonOnClick = (choice) => {
    const userChoice = CHOICES.find(obj => obj.name === choice);
    const computerChoice = randomComputerChoice();
    let RoundOutcome = getRoundOutcome(userChoice.name, computerChoice.name);
    let choicetotal = this.state.choicetotal + 1;
    let choicewin = RoundOutcome === 'Victory!' ? this.state.choicewin + 1 : this.state.choicewin;
    let choicefalse = RoundOutcome === 'Defeat!' ? this.state.choicefalse + 1 : this.state.choicefalse;
    let choiceTie = RoundOutcome === 'Tie game!' ? this.state.choiceTie + 1 : this.state.choiceTie;
    let ratioWin = (Math.round((choicewin / choicetotal) * 100));
    let ratioFase = (Math.round((choicefalse / choicetotal) * 100));
    let ratioTie = 100 - ratioWin - ratioFase;


    this.setState({
      playerChoice: userChoice,
      computerChoice: computerChoice,
      result: RoundOutcome,
      choicetotal, choicewin, choicefalse, choiceTie,
      ratioWin, ratioFase, ratioTie
    })
  };

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.barHeader}>
          <Switch
            onValueChange={value => this.setState({ show: value })}
            value={this.state.show}
          />
        </View>
        {this.state.show ?
          (
            <View style={styles.alert}>
              <View style={styles.alertWapper}>
                <Text>            </Text>
                <Text>Count       </Text>
                <Text>Ratio</Text>
              </View>
              <View style={styles.alertWapper}>
                <Text>PLAYER WIN  </Text>
                <Text>{this.state.choicewin}</Text>
                <Text>{this.state.ratioWin} %</Text>
              </View>
              <View style={styles.alertWapper}>
                <Text>PLAYER FALSE</Text>
                <Text>{this.state.choicefalse}</Text>
                <Text>{this.state.ratioFase} %</Text>
              </View>
              <View style={styles.alertWapper}>
                <Text>PLAYER TIE  </Text>
                <Text>{this.state.choiceTie}</Text>
                <Text>{this.state.ratioTie} %</Text>
              </View>
              <View style={styles.alertWapper}>
                <Text>TOTAL COUNT </Text>
                <Text>{this.state.choicetotal}</Text>
              </View>

            </View>
          ) :
          (

            <View style={styles.containerGame}>
              <View style={styles.header} >
                <GameStatus
                  result={this.state.result}
                />
              </View>
              <View style={styles.choicesContainer}>
                <PlayerCard playerName="Player" choice={this.state.playerChoice}></PlayerCard>
                <PlayerCard playerName="Computer" choice={this.state.computerChoice}></PlayerCard>
              </View>
              <View style={styles.buttonContainer} hide={this.state.show}>
                <ButtonGroup onButtonPress={this.buttonOnClick}></ButtonGroup>
              </View>
            </View>
          )
        }
      </View>
    )
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ebee',
    marginTop: 20
  },
  buttonContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerGame: {
    flex: 0.95,
  },
  choicesContainer: {
    flex: 0.3,
    margin: 10,
    borderWidth: 2,
    paddingTop: 100,
    shadowRadius: 5,
    paddingBottom: 100,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },

  header: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: 'center'

  },
  barHeader: {
    flex: 0.05,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 20,
    paddingRight: 20,
  },
  alert: {
    flexDirection: 'column',
  },
  alertWapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
