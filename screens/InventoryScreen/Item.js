import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Colors from '../../constants/Colors'

export default class Item extends React.Component {
  render() {
    const {description, name, ...otherProps} = this.props

    return (
      <TouchableOpacity style={styles.item} {...otherProps}>
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{name}</Text>
          <Text>{description}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flexGrow: 0,
    flexBasis: '33.33%',
    padding: 3,
  },
  itemContent: {
    backgroundColor: Colors.grayscale.shade20,
    borderRadius: 8,
    height: 62,
    padding: 5,
  },
  itemName: {
    fontWeight: '700',
  },
})
