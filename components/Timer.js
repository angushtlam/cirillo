import PropTypes from 'prop-types'
import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Svg} from 'expo'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

const width = Layout.window.width
const {Circle} = Svg

export default class Timer extends React.Component {
  static defaultProps = {
    fishingSessionInMinutes: 0,
    restSessionInMinutes: 0,
  }

  static propTypes = {
    fishingSessionInMinutes: PropTypes.number,
    restSessionInMinutes: PropTypes.number,
  }

  render() {
    const {
      fishingSessionInMinutes,
      restSessionInMinutes,
      ...otherProps
    } = this.props

    return (
      <TouchableOpacity style={styles.container} {...otherProps}>
        <View style={styles.timerContent}>
          <Text style={styles.timerText}>Go Fish</Text>
          <Text style={styles.timerDescription}>
            {fishingSessionInMinutes} min : {restSessionInMinutes} min
          </Text>
        </View>
        <View>
          <Svg height={width * 0.75} width={width * 0.75} viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r="45"
              stroke={Colors.grayscale.shade20}
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
    color: Colors.grayscale.shade20,
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 10,
  },
  timerDescription: {
    color: Colors.grayscale.shade20,
    fontSize: 18,
  },
})
