import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {Animated, Image, SafeAreaView, StyleSheet, View} from 'react-native'
import Timer from './Timer'
import Colors from '../../constants/Colors'
import {addItem} from '../../store/actions/inventory'
import {
  clearSession,
  setEndTimestamp,
  setStartTimestamp,
  setTimerState,
  timerStates,
} from '../../store/actions/timer'
import {getRandomFish} from '../../game/fish'

const colorByTimerState = {
  [timerStates.NOT_STARTED_FISHING]: {
    accent: Colors.accents.purple,
    muted: Colors.muted.purple,
  },
  [timerStates.IN_FISHING]: {
    accent: Colors.accents.blue,
    muted: Colors.muted.blue,
  },
  [timerStates.COMPLETED_FISHING]: {
    accent: Colors.accents.aqua,
    muted: Colors.muted.aqua,
  },
  [timerStates.IN_REST]: {
    accent: Colors.accents.pink,
    muted: Colors.muted.pink,
  },
  [timerStates.COMPLETED_REST]: {
    accent: Colors.accents.purple,
    muted: Colors.muted.purple,
  },
}

class TimerScreen extends React.Component {
  static defaultProps = {
    onAddItem: () => {},
    onClearSession: () => {},
    onSetEndTimestamp: () => {},
    onSetStartTimestamp: () => {},
    onSetTimerState: () => {},
    settings: {
      fishingSessionInMinutes: 0,
      restSessionInMinutes: 0,
    },
    timer: {
      endTimestamp: -1,
      startTimestamp: -1,
      timerState: timerStates.NOT_STARTED_FISHING,
    },
  }

  static propTypes = {
    onAddItem: PropTypes.func,
    onClearSession: PropTypes.func,
    onSetEndTimestamp: PropTypes.func,
    onSetStartTimestamp: PropTypes.func,
    onSetTimerState: PropTypes.func,
    settings: PropTypes.shape({
      fishingSessionInMinutes: PropTypes.number,
      restSessionInMinutes: PropTypes.number,
    }),
    timer: PropTypes.shape({
      endTimestamp: PropTypes.number,
      startTimestamp: PropTypes.number,
      timerState: PropTypes.string,
    }),
  }

  static navigationOptions = {
    header: null,
  }

  intervalId = 0
  state = {
    animColor: new Animated.Value(100),
    timerDurationInMs: -1,
    prevTimerState: timerStates.NOT_STARTED_FISHING,
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (!!this.props) {
        const {onSetTimerState, timer} = this.props
        const {prevTimerState} = this.state
        const {endTimestamp, timerState} = timer

        const timerDurationInMs = endTimestamp - Date.now()

        if (prevTimerState !== timerState) {
          this.setState(
            {
              animColor: new Animated.Value(0),
              prevTimerState: timerState,
            },
            () => {
              Animated.timing(this.state.animColor, {
                duration: 1000,
                toValue: 100,
              }).start()
            }
          )
        }

        // Update the timer state if enough time has passed.
        if (timerDurationInMs < 0) {
          if (
            timerState === timerStates.COMPLETED_FISHING ||
            timerState === timerStates.COMPLETED_REST
          ) {
            return
          } else if (timerState === timerStates.IN_FISHING) {
            onSetTimerState(timerStates.COMPLETED_FISHING)
          } else if (timerState === timerStates.IN_REST) {
            onSetTimerState(timerStates.COMPLETED_REST)
          }
        } else {
          // Timer duration is calculated here for the timer to render
          this.setState({timerDurationInMs})
        }
      }
    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  handleTimerPress = () => {
    const {
      onAddItem,
      onClearSession,
      onSetEndTimestamp,
      onSetStartTimestamp,
      onSetTimerState,
      settings,
      timer,
    } = this.props
    const {fishingSessionInMinutes, restSessionInMinutes} = settings
    const {timerState} = timer
    const ms = Date.now()

    switch (timerState) {
      case timerStates.NOT_STARTED_FISHING:
        onSetEndTimestamp(ms + 60000 * fishingSessionInMinutes)
        onSetStartTimestamp(ms)
        onSetTimerState(timerStates.IN_FISHING)
        break
      case timerStates.IN_FISHING:
        onClearSession()
        break
      case timerStates.COMPLETED_FISHING:
        onAddItem(getRandomFish(1 + Math.floor(Math.random() * 5)))
        onSetEndTimestamp(ms + 60000 * restSessionInMinutes)
        onSetStartTimestamp(ms)
        onSetTimerState(timerStates.IN_REST)
        break
      case timerStates.IN_REST:
        onClearSession()
        break

      case timerStates.COMPLETED_REST:
        onAddItem(getRandomFish(1 + Math.floor(Math.random() * 5)))
        onSetTimerState(timerStates.NOT_STARTED_FISHING)
        break
    }
  }

  render() {
    const {settings, timer} = this.props
    const {animColor, prevTimerState, timerDurationInMs} = this.state
    const {fishingSessionInMinutes, restSessionInMinutes} = settings
    const {timerState} = timer

    return (
      <Animated.View
        style={{
          ...styles.container,
          backgroundColor: animColor.interpolate({
            inputRange: [0, 100],
            outputRange: [
              colorByTimerState[prevTimerState].accent,
              colorByTimerState[timerState].accent,
            ],
          }),
        }}
      >
        <SafeAreaView style={styles.contentContainer}>
          <Image
            source={require('../../assets/images/daddy.png')}
            style={styles.daddyImage}
          />
          <View style={styles.timerControls}>
            <Timer
              fishingSessionInMinutes={fishingSessionInMinutes}
              onPress={this.handleTimerPress}
              restSessionInMinutes={restSessionInMinutes}
              timerDurationInMs={timerDurationInMs}
              timerState={timerState}
            />
          </View>
        </SafeAreaView>
        <Animated.View
          style={{
            ...styles.accentView,
            backgroundColor: animColor.interpolate({
              inputRange: [0, 100],
              outputRange: [
                colorByTimerState[prevTimerState].muted,
                colorByTimerState[timerState].muted,
              ],
            }),
          }}
        />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  accentView: {
    height: '100%',
    marginTop: 250,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    position: 'absolute',
    height: '100%',
    flex: 1,
    width: '100%',
    zIndex: 100,
  },
  daddyImage: {
    tintColor: Colors.grayscale.shade20,
    height: 160,
    marginTop: 115,
    resizeMode: 'contain',
    width: '100%',
  },
  timerControls: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 50,
    width: '100%',
  },
})

const mapStateToProps = state => ({
  settings: state.settings,
  timer: state.timer,
})

const mapDispatchToProps = dispatch => ({
  onAddItem: item => {
    dispatch(addItem(item))
  },
  onClearSession: () => {
    dispatch(clearSession())
  },
  onSetEndTimestamp: ms => {
    dispatch(setEndTimestamp(ms))
  },
  onSetStartTimestamp: ms => {
    dispatch(setStartTimestamp(ms))
  },
  onSetTimerState: state => {
    dispatch(setTimerState(state))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerScreen)
