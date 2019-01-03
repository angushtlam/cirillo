import {Icon} from 'expo'
import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Colors from '../../constants/Colors'

export default class ItemDetails extends React.Component {
  render() {
    const {
      canSell,
      description,
      name,
      onBack = () => {},
      onSell = () => {},
    } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.itemName}>{name}</Text>
        <ScrollView>
          <Text style={styles.itemDescription}>{description}</Text>
        </ScrollView>
        <View style={styles.itemControls}>
          <TouchableOpacity onPress={onBack}>
            <View style={styles.itemControl}>
              <Icon.Ionicons
                name={
                  Platform.OS === 'ios'
                    ? 'ios-arrow-round-back'
                    : 'md-arrow-round-back'
                }
                size={36}
                style={styles.itemControlIcon}
              />
              <Text style={styles.itemControlLabel}> Back</Text>
            </View>
          </TouchableOpacity>
          {!!canSell && (
            <TouchableOpacity onPress={onSell}>
              <View style={styles.itemControl}>
                <Icon.Ionicons
                  name={Platform.OS === 'ios' ? 'ios-cash' : 'md-cash'}
                  size={36}
                  style={styles.itemControlIcon}
                />
                <Text style={styles.itemControlLabel}> Sell</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayscale.shade80,
    borderRadius: 3,
    flex: 1,
    marginBottom: 15,
    padding: 15,
  },
  itemName: {
    color: Colors.grayscale.shade10,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  itemDescription: {
    color: Colors.grayscale.shade10,
    marginBottom: 15,
  },
  itemControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemControl: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemControlIcon: {
    color: Colors.grayscale.shade10,
    marginVertical: -10,
    padding: 5,
  },
  itemControlLabel: {
    color: Colors.grayscale.shade10,
  },
})
