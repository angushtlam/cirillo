import React from 'react'
import {SafeAreaView, StyleSheet, Text, View} from 'react-native'
import Colors from '../constants/Colors'

const BasicScreen = ({children, color = Colors.accents.aqua, title}) => (
  <SafeAreaView style={styles.background}>
    <View style={styles.container}>
      <Text style={{...styles.title, color}}>{title}</Text>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.grayscale.shade70,
    flex: 1,
  },
  container: {
    padding: 15,
    flex: 1,
  },
  children: {
    flex: 1,
  },
  childrenContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 15,
  },
})

export default BasicScreen
