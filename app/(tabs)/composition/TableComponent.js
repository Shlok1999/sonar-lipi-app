import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Modal, TouchableWithoutFeedback, Button, TouchableOpacity, Text, Alert } from 'react-native';
import { Table, TableWrapper, Cell } from 'react-native-table-component';
import { GestureHandlerRootView, TapGestureHandler, State } from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

const TableComponent = ({ selectedSwar, setSelectedSwar, insertSeparator, taal }) => {
  const initialTableData = {
    Tintaal: [['Dha','Dhin','Dhin','Dha','Dha',"Dhin",'Dhin',"Dha","Dha","Tin","Tin","Ta","Ta","Dhin","Dhin","Dha"]],
    Jhaptaal: [['Dhi','Na','Ti','Na','Ti','Ti']],
    Dadra: [['Dha','Dhi','Na','Dha','Ti','Na']],
    Rupak: [['Ti','Ti','Na','Dhi','Na','Dhi']]
  };

  const [tableData, setTableData] = useState(initialTableData[taal] || []);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ rowIndex: null, colIndex: null });
  const doubleTapRef = useRef(null);
  const viewShotRef = useRef(null);

  const handleDoubleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setIsFullScreen(!isFullScreen);
    }
  };

  const handleCellClick = (rowIndex, colIndex) => {
    setSelectedCell({ rowIndex, colIndex });
  };

  useEffect(()=>{
    setTableData(initialTableData[taal] || []);
  },[taal])
  useEffect(() => {
    if (selectedSwar && selectedCell.rowIndex !== null && selectedCell.colIndex !== null) {
      const newData = [...tableData];
      newData[selectedCell.rowIndex][selectedCell.colIndex] += selectedSwar;
      setTableData(newData);
      setSelectedSwar(null); // Reset the selected swar after updating
    }
  }, [selectedSwar, selectedCell, tableData, setSelectedSwar]);

  useEffect(() => {
    if (insertSeparator && selectedCell.rowIndex !== null && selectedCell.colIndex !== null) {
      const newData = [...tableData];
      newData[selectedCell.rowIndex][selectedCell.colIndex] += ' ';
      setTableData(newData);
    }
  }, [insertSeparator]);

  const addRow = () => {
    const newRow = new Array(tableData[0].length).fill('');
    setTableData([...tableData, newRow]);
  };

  const renderCell = (cellData, rowIndex, cellIndex) => (
    <TouchableOpacity
      key={cellIndex}
      onPress={() => handleCellClick(rowIndex, cellIndex)}
      style={[styles.cell, selectedCell.rowIndex === rowIndex && selectedCell.colIndex === cellIndex && styles.selectedCell]}
    >
      <Text style={styles.text}>{cellData}</Text>
    </TouchableOpacity>
  );

  const captureScreenshot = async () => {
    const uri = await viewShotRef.current.capture()
    await MediaLibrary.saveToLibraryAsync(uri).then(()=>{
      Alert.alert("Composition saved to your gallery")
    })
    await Sharing.shareAsync(uri)
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TapGestureHandler
        ref={doubleTapRef}
        onHandlerStateChange={handleDoubleTap}
        numberOfTaps={2}
      >
        <View style={{ flex: 1 }}>
          <Modal
            visible={isFullScreen}
            animationType="slide"
            onRequestClose={() => setIsFullScreen(false)}
          >
            <TouchableWithoutFeedback onPress={() => setIsFullScreen(false)}>
              <View style={styles.fullScreenContainer}>
                <ScrollView horizontal>
                  <ScrollView>
                    <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
                      <Table borderStyle={{ borderColor: 'black', borderWidth: 1 }}>
                        <TableWrapper style={styles.row}>
                          {tableData[0].map((cellData, cellIndex) => (
                            <Cell key={cellIndex} data={cellData} textStyle={styles.text} style={styles.headCell} />
                          ))}
                        </TableWrapper>
                        {
                          tableData.slice(1).map((rowData, rowIndex) => (
                            <TableWrapper key={rowIndex} style={styles.row}>
                              {
                                rowData.map((cellData, cellIndex) => renderCell(cellData, rowIndex + 1, cellIndex))
                              }
                            </TableWrapper>
                          ))
                        }
                      </Table>
                    </ViewShot>
                  </ScrollView>
                </ScrollView>
                <Button title="Capture Table Screenshot" onPress={captureScreenshot} />
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          {!isFullScreen && (
            <View style={styles.container}>
              <ScrollView horizontal>
                <ScrollView>
                  <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
                    <Table borderStyle={{ borderColor: 'black', borderWidth: 1 }}>
                      <TableWrapper style={styles.row}>
                        {tableData[0].map((cellData, cellIndex) => (
                          <Cell key={cellIndex} data={cellData} textStyle={styles.text} style={styles.headCell} />
                        ))}
                      </TableWrapper>
                      {
                        tableData.slice(1).map((rowData, rowIndex) => (
                          <TableWrapper key={rowIndex} style={styles.row}>
                            {
                              rowData.map((cellData, cellIndex) => renderCell(cellData, rowIndex + 1, cellIndex))
                            }
                          </TableWrapper>
                        ))
                      }
                    </Table>
                  </ViewShot>
                </ScrollView>
              </ScrollView>
              <Button title="Add Row" onPress={addRow} />
            </View>
          )}
        </View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  fullScreenContainer: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  headCell: { width: 62, backgroundColor: '#f1f8ff' },
  row: { flexDirection: 'row', backgroundColor: '#FFF', minHeight: 40, },
  cell: { width: 62, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  selectedCell: { backgroundColor: '#D3D3D3' },
  text: { margin: 6, textAlign: 'center' },
});

export default TableComponent;
