import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Modal, TouchableWithoutFeedback, Button, TouchableOpacity, Text } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { GestureHandlerRootView, TapGestureHandler, State } from 'react-native-gesture-handler';

const TableComponent = () => {
  const [tableData, setTableData] = useState([
    ['Dha', 'Dhin', 'Dhin', 'Dha', 'Dha', 'Dhin', 'Dhin', 'Dha', 'Dha', 'Tin', 'Tin', 'Ta', 'Ta', 'Dhin', 'Din', 'Dha'],
    // Initial data rows here
  ]);
  
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ rowIndex: null, colIndex: null });
  const doubleTapRef = useRef(null);

  const handleDoubleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setIsFullScreen(!isFullScreen);
    }
  };

  const handleCellClick = (rowIndex, colIndex) => {
    setSelectedCell({ rowIndex, colIndex });
  };

  const handleCellChange = (text, rowIndex, cellIndex) => {
    const newData = [...tableData];
    newData[rowIndex][cellIndex] = text;
    setTableData(newData);
  };

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
                  </ScrollView>
                </ScrollView>
                <Button title="Add Row" onPress={addRow} />
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          {!isFullScreen && (
            <View style={styles.container}>
              <ScrollView horizontal>
                <ScrollView>
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
  row: { flexDirection: 'row', backgroundColor: '#FFF', minHeight: 40, width: 1000 },
  cell: { width: 62, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  selectedCell: { backgroundColor: '#D3D3D3' },
  text: { margin: 6, textAlign: 'center' },
});

export default TableComponent;
