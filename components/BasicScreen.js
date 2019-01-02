import React from 'react'
import {SafeAreaView, StyleSheet, Text, View} from 'react-native'
import Colors from '../constants/Colors'

const BasicScreen = ({children, color = Colors.accents.aqua, title}) => (
  <SafeAreaView style={styles.background}>
    <View style={styles.container}>
      <Text style={{...styles.header, color}}>{title}</Text>
      <View style={styles.children}>{children}</View>
    </View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.grayscale.shade70,
  },
  container: {
    padding: 15,
    height: '100%',
  },
  children: {
    bottom: 15,
    left: 15,
    position: 'absolute',
    width: '100%',
  },
  header: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 15,
  },
})

export default BasicScreen
