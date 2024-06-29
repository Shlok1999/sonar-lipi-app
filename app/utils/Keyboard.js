import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

const Keyboard = ({onSwarPress}) => {
  const swars = [
    "सा", "रे॒", "रे", "ग॒", "ग", "म", "मे", "प", "ध॒", "ध", "नि॒", "नि", ".", "`"
  ]
  return (
    <View style={style.keyboardContainer}>
      {
        swars.map((swar, index) => (
          <TouchableOpacity onPress={
            () => {
              onSwarPress(swar)
            }
          }
            style={style.swarButton} key={index}>
            <Text style={style.swarButtonText}>{swar}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

const { height, width } = Dimensions.get('window');

const style = StyleSheet.create({
  keyboardContainer: {
    width: '90%',
    height: 'fit-content',
    borderColor: 'black',
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  swarButton: {
    height: 40,
    width: '20%',
    backgroundColor: 'brown',
    color: 'white',
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  swarButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'light'
  }

})

export default Keyboard