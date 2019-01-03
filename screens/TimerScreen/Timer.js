import PropTypes from 'prop-types'
import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Svg} from 'expo'
import {getReadableTime, getTimerState, timerStates} from './utils'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'

const width = Layout.window.width
const {Circle} = Svg

export default class Timer extends React.Component {
  static defaultProps = {
    fishingSessionEndTimestamp: 0,
    fishingSessionInMinutes: 0,
    restSessionEndTimestamp: 0,
    restSessionInMinutes: 0,
  }

  static propTypes = {
    fishingSessionEndTimestamp: PropTypes.number,
    fishingSessionInMinutes: PropTypes.number,
    restSessionEndTimestamp: PropTypes.number,
    restSessionInMinutes: PropTypes.number,
  }

  intervalId = 0

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (!!this.props) {
        const {fishingSessionEndTimestamp, restSessionEndTimestamp} = this.props

        if (
          getTimerState(fishingSessionEndTimestamp, restSessionEndTimestamp) !==
          timerStates.NOT_STARTED_FISHING
        ) {
          this.forceUpdate()
        }
      }
    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  getTimerText = () => {
    const {fishingSessionEndTimestamp, restSessionEndTimestamp} = this.props

    switch (
      getTimerState(fishingSessionEndTimestamp, restSessionEndTimestamp)
    ) {
      case timerStates.NOT_STARTED_FISHING:
        return 'Go Fishing'
      case timerStates.IN_FISHING:
        return 'Fishing...'
      case timerStates.IN_REST:
        return 'Resting...'
    }

    return 'Go Fishing'
  }

  getTimerDescription = () => {
    const {
      fishingSessionEndTimestamp,
      fishingSessionInMinutes,
      restSessionEndTimestamp,
      restSessionInMinutes,
    } = this.props

    switch (
      getTimerState(fishingSessionEndTimestamp, restSessionEndTimestamp)
    ) {
      case timerStates.NOT_STARTED_FISHING:
        return `${fishingSessionInMinutes} min : ${restSessionInMinutes} min`
      case timerStates.IN_FISHING:
        return `${getReadableTime(fishingSessionEndTimestamp - Date.now())}`
      case timerStates.IN_REST:
        return `${getReadableTime(restSessionEndTimestamp - Date.now())}`
    }

    return `${fishingSessionInMinutes} min : ${restSessionInMinutes} min`
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
          <Text style={styles.timerText}>{this.getTimerText()}</Text>
          <Text style={styles.timerDescription}>
            {this.getTimerDescription()}
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
  timerDescription: {
    color: Colors.grayscale.shade20,
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 10,
  },
  timerText: {
    color: Colors.grayscale.shade20,
    fontSize: 36,
    fontWeight: '700',
  },
})
