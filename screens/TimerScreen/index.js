import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {Image, SafeAreaView, StyleSheet, View} from 'react-native'
import Timer from './Timer'
import {timerStates, getTimerState} from './utils'
import Colors from '../../constants/Colors'
import {addItem} from '../../store/actions/inventory'
import {
  clearFishingSession,
  clearRestSession,
  setFishingSessionEndTimestamp,
  setRestSessionEndTimestamp,
} from '../../store/actions/timer'
import {getRandomFish} from '../../game/fish'

class TimerScreen extends React.Component {
  static defaultProps = {
    onAddItem: () => {},
    settings: {
      fishingSessionInMinutes: 0,
      restSessionInMinutes: 0,
    },
    timer: {
      fishingSessionEndTimestamp: -1,
      restSessionEndTimestamp: -1,
    },
  }

  static propTypes = {
    onAddItem: PropTypes.func,
    settings: PropTypes.shape({
      fishingSessionInMinutes: PropTypes.number,
      restSessionInMinutes: PropTypes.number,
    }),
    timer: PropTypes.shape({
      fishingSessionEndTimestamp: PropTypes.number,
      restSessionEndTimestamp: PropTypes.number,
    }),
  }

  static navigationOptions = {
    header: null,
  }

  handleTimerPress = () => {
    const {
      onAddItem,
      onClearFishingSession,
      onClearRestSession,
      onSetFishingSessionEndTimestamp,
      onSetRestSessionEndTimestamp,
      settings,
      timer,
    } = this.props
    const {fishingSessionInMinutes, restSessionInMinutes} = settings
    const {fishingSessionEndTimestamp, restSessionEndTimestamp} = timer

    switch (
      getTimerState(fishingSessionEndTimestamp, restSessionEndTimestamp)
    ) {
      case timerStates.NOT_STARTED_FISHING:
        onClearRestSession()
        onSetFishingSessionEndTimestamp(
          Date.now() + 60000 * fishingSessionInMinutes
        )
        return
      case timerStates.IN_FISHING:
        if (Date.now() > fishingSessionEndTimestamp) {
          onAddItem(getRandomFish(1 + Math.floor(Math.random() * 5)))
          onClearFishingSession()
          onSetRestSessionEndTimestamp(
            Date.now() + 60000 * restSessionInMinutes
          )
        } else {
          onClearFishingSession()
          onClearRestSession()
        }
        return
      case timerStates.IN_REST:
        if (Date.now() > restSessionEndTimestamp) {
          onAddItem(getRandomFish(1 + Math.floor(Math.random() * 5)))
        }
        onClearFishingSession()
        onClearRestSession()
        return
    }
  }

  render() {
    const {settings, timer} = this.props
    const {fishingSessionInMinutes, restSessionInMinutes} = settings
    const {fishingSessionEndTimestamp, restSessionEndTimestamp} = timer

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
              fishingSessionEndTimestamp={fishingSessionEndTimestamp}
              onPress={this.handleTimerPress}
              restSessionInMinutes={restSessionInMinutes}
              restSessionEndTimestamp={restSessionEndTimestamp}
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
  onClearFishingSession: () => {
    dispatch(clearFishingSession())
  },
  onClearRestSession: () => {
    dispatch(clearRestSession())
  },
  onSetFishingSessionEndTimestamp: ms => {
    dispatch(setFishingSessionEndTimestamp(ms))
  },
  onSetRestSessionEndTimestamp: ms => {
    dispatch(setRestSessionEndTimestamp(ms))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerScreen)
