import { Image, StyleSheet, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useState,useEffect } from 'react';
import { Link } from 'expo-router';
import Dashboard from './Dashboard';

const SplashScreen = ()=>{
  return(
    <View style={styles.container}>
      <Image source={require('@/assets/images/sonar-lipi-logo.png')}/>
    </View>
  )
}

export default function HomeScreen() {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(()=>{
  //   const timer = setTimeout(()=>{
  //     setIsLoading(false);
  //   }, 3000)
  // })

  return (
    <Dashboard/>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  text:{
    fontSize: 40
  }
});
