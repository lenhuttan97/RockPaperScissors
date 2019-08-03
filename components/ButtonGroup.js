import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';



function ButtonGroup (props){
    return(
        <View>
            {CHOICES.map(item =>{
                return(
                   <TouchableOpacity style={styles.buttonStyle} key={item.name} onPress={()=> props.onButtonPress(item.name)}>
                        <Text style={styles.buttonText}>{item.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}
const styles=StyleSheet.create({
    buttonStyle: {
        width: 200,
        margin: 5,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#640D14',
      },
      buttonText: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
      },
})
export default ButtonGroup;
