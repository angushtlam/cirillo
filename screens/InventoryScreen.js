import React from 'react'
import {StyleSheet, Text} from 'react-native'
import BasicScreen from '../components/BasicScreen'

export default class InventoryScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor() {
    super()

    this.state = {
      fishOwned: ['Fish 1', 'Fish 2', 'Fish 3'],
    }
  }

  render() {
    const {fishOwned} = this.state

    return (
      <BasicScreen title="Inventory">
        {fishOwned.map((fish, i) => (
          <Text key={i}>{fish}</Text>
        ))}
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
