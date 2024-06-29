import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal, Button, TextInput
} from "react-native";
import { useRouter } from "expo-router";

import { Link } from "expo-router";

export default function Dashboard() {
  const taals = ["Tintaal", "Jhaptaal", "Dadra", "Kaherwa"];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaal, setSelectedTaal] = useState('');
  const [name, setName] = useState('');
  const [desc,setDesc] = useState('');
  const router = useRouter();

  const openModal = (taal: string) => {
    setSelectedTaal(taal);
    setModalVisible(true);
  };

  const closeModal = ()=>{
    setModalVisible(false)
  }

  const handleSubmit = () => {
    setModalVisible(false);
    router.push({
      pathname: `./composition/${name}`,
      params: {name, desc: desc}
    })
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={style.container}>
        <View style={style.upper_view}>
          <View>
            <Text>Create New File</Text>
          </View>
          <View style={style.create_file_container}>
            {taals.map((taal: string, index: number) => (
              <TouchableOpacity key={index} style={style.taal_container} onPress={()=>openModal(taal)}>
                <Text>{taal}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={style.lower_view}>
          <Text style={style.text}>Recent Files</Text>
          <Link href={`/composition/${name}`}>
            <Text>Go to file</Text>
          </Link>
        </View>
        <Modal 
        animationType="slide"
        transparent={true}
        visible = {modalVisible}
        onRequestClose={()=>{
          setModalVisible(!modalVisible)
        }}
        >
          <View style={style.modalOverlay}>
            <View style={style.modalView}>
              <Text style={style.modalText}>{selectedTaal}</Text>
              <View style={style.formContainer}>
                <Text>Name:</Text>
                <TextInput
                  style={style.input}
                  value={name}
                  onChangeText={setName}
                />
                <Text>Description:</Text>
                <TextInput
                  style={style.input}
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

const style = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  container: {
    flex: 1,
  },
  upper_view: {
    backgroundColor: "grey",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingVertical: 20, // Adjusted to add space at the top and bottom
  },
  create_file_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Centering the items
    paddingHorizontal: 10,
    width: "100%", // Ensuring it takes full width
    marginTop: 20,
    gap: 20
  },
  lower_view: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  taal_container: {
    width: 150, // Fixed width
    height: 210, // Fixed height to maintain A4 aspect ratio (approximately)
    backgroundColor: "white",
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
});
