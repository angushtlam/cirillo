import PropTypes from 'prop-types'
import React from 'react'
import {Slider, View} from 'react-native'
import {connect} from 'react-redux'
import BasicScreen from '../components/BasicScreen'
import InputFieldGroup from '../components/InputFieldGroup'
import Colors from '../constants/Colors'
import {
  setFishingSessionInMinutes,
  setRestSessionInMinutes,
} from '../store/actions/settings'
class SettingsScreen extends React.Component {
  static defaultProps = {
    onSetFishingSessionInMinutes: () => {},
    onSetRestSessionInMinutes: () => {},
    settings: {
      fishingSessionInMinutes: 0,
      restSessionInMinutes: 0,
    },
  }

  static propTypes = {
    onSetFishingSessionInMinutes: PropTypes.func,
    onSetRestSessionInMinutes: PropTypes.func,
    settings: PropTypes.shape({
      fishingSessionInMinutes: PropTypes.number,
      restSessionInMinutes: PropTypes.number,
    }),
  }

  static navigationOptions = {
    header: null,
  }

  render() {
    const {
      onSetFishingSessionInMinutes,
      onSetRestSessionInMinutes,
      settings,
    } = this.props
    const {fishingSessionInMinutes, restSessionInMinutes} = settings

    return (
      <BasicScreen title="Settings">
        <View>
          <InputFieldGroup
            title="Fishing Session Duration"
            value={`${fishingSessionInMinutes} minutes`}
          >
            <Slider
              maximumValue={120}
              minimumValue={5}
              minimumTrackTintColor={Colors.accents.purple}
              step={5}
              onValueChange={value => {
                onSetFishingSessionInMinutes(value)
              }}
              value={fishingSessionInMinutes}
            />
          </InputFieldGroup>
          <InputFieldGroup
            title="Rest Session Duration"
            value={`${restSessionInMinutes} minutes`}
          >
            <Slider
              maximumValue={120}
              minimumValue={5}
              minimumTrackTintColor={Colors.accents.purple}
              step={5}
              onValueChange={value => {
                onSetRestSessionInMinutes(value)
              }}
              value={restSessionInMinutes}
            />
          </InputFieldGroup>
        </View>
      </BasicScreen>
    )
  }
}

const mapStateToProps = state => ({settings: state.settings})

const mapDispatchToProps = dispatch => {
  return {
    onSetFishingSessionInMinutes: mins => {
      dispatch(setFishingSessionInMinutes(mins))
    },
    onSetRestSessionInMinutes: mins => {
      dispatch(setRestSessionInMinutes(mins))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen)
