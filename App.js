import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'

const App = () => {
  const translation = useRef(new Animated.Value(0)).current
  const colorArray = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red']

  useEffect(() => {
    Animated.timing(translation, {
      toValue: 200,
      duration: 2000,
      useNativeDriver: true
    }).start()
  }, [])

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center'
    }}>
      <StatusBar style="auto" />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column' }}>
          {colorArray.map((color) => AnimatedBox(color, 20, 10, translation))}
        </View>
        <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
          {colorArray.reverse().map((color) => AnimatedBox(color, 5, 10, translation))}
        </View>
      </View>
    </View>
  )
}

const AnimatedBox = (backgroundColor, width, height, translation) =>
  <Animated.View style={{
    backgroundColor,
    width,
    height,
    opacity: translation.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1]
    }),
    marginTop: 10,
    transform: [
      { translateX: translation },
      {
        rotate: translation.interpolate({
          inputRange: [0, 50, 100],
          outputRange: ['0deg', '360deg', '180deg']
        })
      },
      {
        scale: translation.interpolate({
          inputRange: [0, 100, 200],
          outputRange: [0, 1, 5]
        })
      }
    ]
  }} />

export default App
