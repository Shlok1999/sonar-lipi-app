import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Keyboard from '../../utils/Keyboard';
import TableComponent from './TableComponent';

export default function DocumentScreen() {
  const route = useRoute();
  const { filename } = route.params; // Ensure 'filename' is destructured correctly
  const decodedFilename = decodeURIComponent(filename);
  const [selectedSwar, setSelectedSwar] = useState([])

  const handleSwarPress = (swar)=>{
    setSelectedSwar([...selectedSwar, swar]);
    if(swar == 'x'){
      selectedSwar.splice()
    }
    console.log(swar)
  }

  return (
    <View style={style.container}>
      <View style={style.headerContainer}>
        <Text style={style.textStyle}>{decodedFilename}</Text>
      </View>

      <View style= {style.tableContainer}>
      {/* <FlatList
      data={selectedSwar}
      horizontal
      renderItem={({ item }) => <Text style={style.tableText}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
      /> */}
        <TableComponent/>
      </View>
      <View style={style.bottomContainer}>
        <Keyboard onSwarPress={handleSwarPress}/>
        {/* <View style={style.joyStick}>
        </View> */}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container:{
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
  },
  headerContainer: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 5,
    marginTop: 20
  },
  textStyle: {
    fontSize: 20
  },
  tableContainer:{
    marginTop: 30,
    borderColor: 'black',
    borderWidth: 2,
    width: '95%',
    height: '50%',
    margin: 5,
    overflow: 'hidden'
  },
  bottomContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
    marginTop: 40,
    padding: 20
  },
  joyStick:{
    width: '40%',
    height: '40%',
    borderColor: 'black',
    borderWidth: 2
  },
  tableText:{
    color: 'black',
    fontSize: 20
  }

})
