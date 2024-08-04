import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Keyboard from '../../utils/Keyboard';
import TableComponent from './TableComponent';

export default function DocumentScreen() {
  const route = useRoute();
  const { name, selectedTaal } = route.params || {}; // Ensure params are defined
  const decodedFilename = decodeURIComponent(name || ""); // Handle undefined name
  const [selectedSwar, setSelectedSwar] = useState(null);

  const handleSwarPress = (swar) => {
    setSelectedSwar(swar);
    if (swar == "X") {
      // Handle backspace
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.textStyle}>{decodedFilename}</Text>
      </View>
      <View style={styles.tableContainer}>
        <TableComponent selectedSwar={selectedSwar} setSelectedSwar={setSelectedSwar} taal={selectedTaal} />
      </View>
      <View style={styles.bottomContainer}>
        <Keyboard onSwarPress={handleSwarPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 5,
    marginTop: 20,
  },
  textStyle: {
    fontSize: 20,
  },
  tableContainer: {
    marginTop: 30,
    borderColor: 'black',
    borderWidth: 2,
    width: '95%',
    height: '50%',
    margin: 5,
    overflow: 'hidden',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
    marginTop: 40,
    padding: 20,
  },
});
