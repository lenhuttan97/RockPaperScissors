import React, { Component } from 'react';
import { View, Text } from 'react-native';


const getResultColor = (gamePrompt) => {
    if (gamePrompt === 'Victory!') return 'green';
    if (gamePrompt === 'Defeat!') return 'red';
    return null;
  };

function GameStatus (props) {
    return (
        <View style={{flexDirection: 'row'}}>
            <Text style={{
            fontSize: 35,
            color: getResultColor(props.result)
            }}>{props.result}</Text>
            
        </View>
    )
}
export default GameStatus;
