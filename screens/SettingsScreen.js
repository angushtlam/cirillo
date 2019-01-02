import React from 'react'
import {Slider, StyleSheet} from 'react-native'
import BasicScreen from '../components/BasicScreen'
import InputFieldGroup from '../components/InputFieldGroup'
import Colors from '../constants/Colors'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor() {
    super()

    this.state = {
      fishingSessionInMinutes: 25,
      restSessionInMinutes: 5,
    }
  }

  render() {
    const {fishingSessionInMinutes, restSessionInMinutes} = this.state

    return (
      <BasicScreen title="Settings">
        <InputFieldGroup
          title="Fishing Session Duration"
          value={`${fishingSessionInMinutes} minutes`}
        >
          <Slider
            maximumValue={120}
            minimumValue={5}
            minimumTrackTintColor={Colors.accents.purple}
            step={5}
            onValueChange={value =>
              this.setState({fishingSessionInMinutes: value})
            }
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
            onValueChange={value =>
              this.setState({restSessionInMinutes: value})
            }
            value={restSessionInMinutes}
          />
        </InputFieldGroup>
      </BasicScreen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 15,
  },
  field: {
    marginBottom: 15,
  },
  fieldHeader: {flexDirection: 'row', flexWrap: 'wrap'},
  label: {fontWeight: '700'},
})
