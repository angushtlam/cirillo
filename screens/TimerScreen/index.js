import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {Image, SafeAreaView, StyleSheet, View} from 'react-native'
import Timer from './Timer'
import Colors from '../../constants/Colors'
import {addItem} from '../../store/actions/inventory'
import {getRandomFish} from '../../game/fish'

class TimerScreen extends React.Component {
  static defaultProps = {
    onAddItem: () => {},
    settings: {
      fishingSessionInMinutes: 0,
      restSessionInMinutes: 0,
    },
  }

  static propTypes = {
    onAddItem: PropTypes.func,
    settings: PropTypes.shape({
      fishingSessionInMinutes: PropTypes.number,
      restSessionInMinutes: PropTypes.number,
    }),
  }

  static navigationOptions = {
    header: null,
  }

  render() {
    const {onAddItem, settings} = this.props
    const {fishingSessionInMinutes, restSessionInMinutes} = settings

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
              onPress={() => {
                onAddItem(getRandomFish(Math.floor(Math.random() * 5)))
              }}
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

const mapDispatchToProps = dispatch => ({
  onAddItem: item => {
    dispatch(addItem(item))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerScreen)
