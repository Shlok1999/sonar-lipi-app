import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import { Link } from "expo-router";
import LinearGradient from 'react-native-linear-gradient';


export default function Dashboard() {
  const taals = ["Tintaal"];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaal, setSelectedTaal] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const router = useRouter();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = () => {
    setModalVisible(false);
    router.push({
      pathname: `./composition/${name}`,
      params: { name, desc, selectedTaal }
    });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.upper_view}>
          <Text style={styles.text}>Recent Files</Text>
          <Link href={`/composition/${name}`}>
            <Text>Go to file</Text>
          </Link>
        </View>
        <TouchableOpacity style={styles.floatingButton} onPress={openModal}>
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Create New Composition</Text>
              <View style={styles.formContainer}>
                <Text>Select Taal:</Text>
                <Picker
                  selectedValue={selectedTaal}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => setSelectedTaal(itemValue)}
                >
                  {taals.map((taal, index) => (
                    <Picker.Item label={taal} value={taal} key={index} />
                  ))}
                </Picker>
                <Text>Name:</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
                <Text>Description:</Text>
                <TextInput
                  style={styles.input}
                  value={desc}
                  onChangeText={setDesc}
                />
                <Button title="Submit" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upper_view: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 20,
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: 'blue',
    borderRadius: 30,
    elevation: 8,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 24,
    marginBottom: 15,
  },
  formContainer: {
    width: "100%",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
});
