import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {Image, SafeAreaView, StyleSheet, View} from 'react-native'
import Timer from '../components/Timer'
import Colors from '../constants/Colors'

class TimerScreen extends React.Component {
  static defaultProps = {
    fishingSessionInMinutes: 0,
    restSessionInMinutes: 0,
  }

  static propTypes = {
    settings: PropTypes.shape({
      fishingSessionInMinutes: PropTypes.number,
      restSessionInMinutes: PropTypes.number,
    }),
  }

  static navigationOptions = {
    header: null,
  }

  render() {
    const {settings} = this.props
    const {fishingSessionInMinutes, restSessionInMinutes} = settings

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.contentContainer}>
          <Image
            source={require('../assets/images/daddy.png')}
            style={styles.daddyImage}
          />
          <View style={styles.timerControls}>
            <Timer
              fishingSessionInMinutes={fishingSessionInMinutes}
              restSessionInMinutes={restSessionInMinutes}
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

const mapStateToProps = state => ({settings: state.settings})

export default connect(mapStateToProps)(TimerScreen)
