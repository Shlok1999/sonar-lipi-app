import { Image, StyleSheet, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useState,useEffect } from 'react';
import { Link } from 'expo-router';

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
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <Link href={'/Dashboard'}>Go to dashboard</Link>
    </View>
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
