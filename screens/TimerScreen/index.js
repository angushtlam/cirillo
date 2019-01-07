import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {Image, SafeAreaView, StyleSheet, View} from 'react-native'
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
    timerDurationInMs: -1,
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (!!this.props) {
        const {onSetTimerState, timer} = this.props
        const {endTimestamp, timerState} = timer

        const timerDurationInMs = endTimestamp - Date.now()

        // Update the timer state if enough time has passed.
        if (timerDurationInMs < 0) {
          if (
            timerState === timerStates.COMPLETED_FISHING ||
            timerState === timerStates.COMPLETED_REST
          ) {
            return
          } else if (timerState === timerStates.IN_FISHING) {
            console.log(timerDurationInMs)
            onSetTimerState(timerStates.COMPLETED_FISHING)
          } else if (timerState === timerStates.IN_REST) {
            console.log(timerDurationInMs)
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
        return
      case timerStates.IN_FISHING:
        onClearSession()
        return
      case timerStates.COMPLETED_FISHING:
        onAddItem(getRandomFish(1 + Math.floor(Math.random() * 5)))
        onSetEndTimestamp(ms + 60000 * restSessionInMinutes)
        onSetStartTimestamp(ms)
        onSetTimerState(timerStates.IN_REST)
        return
      case timerStates.IN_REST:
        onClearSession()
        return
      case timerStates.COMPLETED_REST:
        onAddItem(getRandomFish(1 + Math.floor(Math.random() * 5)))
        onSetTimerState(timerStates.NOT_STARTED_FISHING)
        return
    }
  }

  render() {
    const {settings, timer} = this.props
    const {timerDurationInMs} = this.state
    const {fishingSessionInMinutes, restSessionInMinutes} = settings
    const {timerState} = timer

    return (
      <View style={styles.container}>
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
        <View style={styles.accentView} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  accentView: {
    backgroundColor: Colors.muted.purple,
    height: '100%',
    marginTop: 250,
  },
  container: {
    backgroundColor: Colors.accents.purple,
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
