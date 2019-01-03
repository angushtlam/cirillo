import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import Item from './Item'
import ItemDetails from './ItemDetails'
import BasicScreen from '../../components/BasicScreen'
import Colors from '../../constants/Colors'
import {removeItemByIndex, setCurrency} from '../../store/actions/inventory'

const NO_SELECTION = -1
const VIEW_CURRENCY = -2

class InventoryScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    selectedItem: NO_SELECTION,
  }

  render() {
    const {inventory, onRemoveItemByIndex, onSetCurrency} = this.props
    const {selectedItem} = this.state
    const {currency, items} = inventory

    return (
      <BasicScreen title="Inventory">
        <View style={styles.container}>
          {selectedItem !== NO_SELECTION && (
            <ItemDetails
              canSell={selectedItem > -1}
              description={
                selectedItem === VIEW_CURRENCY
                  ? `You own ${currency}.`
                  : `${items[selectedItem].description} (Valued at ${
                      items[selectedItem].value
                    } gold coins)`
              }
              name={
                selectedItem === VIEW_CURRENCY
                  ? 'Gold Coins'
                  : items[selectedItem].name
              }
              onBack={() => {
                this.setState({selectedItem: NO_SELECTION})
              }}
              onSell={() => {
                onSetCurrency(inventory.currency + items[selectedItem].value)
                onRemoveItemByIndex(selectedItem)
                this.setState({selectedItem: VIEW_CURRENCY})
              }}
            />
          )}
          <ScrollView
            style={styles.inventory}
            contentContainerStyle={styles.inventoryContentContainer}
          >
            <Item
              description={currency}
              key="currency"
              name="Gold Coins"
              onPress={() => {
                this.setState({selectedItem: VIEW_CURRENCY})
              }}
            />
            {items.map((item, index) => (
              <Item
                description={`Worth $${item.value}`}
                key={index}
                name={item.name}
                onPress={() => {
                  this.setState({selectedItem: index})
                }}
              />
            ))}
          </ScrollView>
        </View>
      </BasicScreen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inventory: {
    borderColor: Colors.grayscale.shade40,
    borderRadius: 12,
    borderWidth: 1,
    height: 100,
  },
  inventoryContentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 50,
  },
  item: {
    flexGrow: 0,
    flexBasis: '33.33%',
    padding: 5,
  },
  itemContent: {
    backgroundColor: Colors.grayscale.shade20,
    borderRadius: 8,
    height: 77,
    padding: 5,
  },
})

const mapStateToProps = state => ({inventory: state.inventory})

const mapDispatchToProps = dispatch => ({
  onRemoveItemByIndex: index => {
    dispatch(removeItemByIndex(index))
  },
  onSetCurrency: value => {
    dispatch(setCurrency(value))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryScreen)
