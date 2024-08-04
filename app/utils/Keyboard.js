import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
// "सा", "रे॒", "रे", "ग॒", "ग", "म", "मे", "प", "ध॒", "ध", "नि॒", "नि",

const Keyboard = ({onSwarPress}) => {
  const swars = [
    "सा", "रे","ग", "म", "मे", "प","ध","नि",
    "ऱे","ग़","म़","में","प़","ध़","ऩि","सां","रें",
    "गं","मं","पं","धं","निं","X","_"
  ]
  return (
    <View style= {style.container}>
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
    </View>
  )
}

const { height, width } = Dimensions.get('window');

const style = StyleSheet.create({
  container:{
    flex: 1,
  },
  keyboardContainer: {
    width: '100%',
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
    height: 50,
    width: 50,
    backgroundColor: 'brown',
    color: 'white',
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  swarButtonText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'light'
  }

})

export default Keyboard