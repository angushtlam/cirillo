import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Svg} from 'expo'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

const width = Layout.window.width
const {Circle} = Svg

export default class Timer extends React.Component {
  render() {
    const {...otherProps} = this.props

    return (
      <TouchableOpacity style={styles.container} {...otherProps}>
        <View style={styles.timerContent}>
          <Text style={styles.timerText}>Go Fish</Text>
          <Text style={styles.timerDescription}>25 min : 5 min</Text>
        </View>
        <View>
          <Svg height={width * 0.75} width={width * 0.75} viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r="45"
              stroke={Colors.grayscale.shade90}
              strokeWidth="1"
              fillOpacity="0"
            />
          </Svg>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  timerContent: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: width * 0.75,
    zIndex: 1,
  },
  timerText: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 10,
  },
  timerDescription: {
    fontSize: 18,
  },
})
