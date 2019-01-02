import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import Colors from '../constants/Colors'
import TabBarIcon from '../components/TabBarIcon'
import TimerScreen from '../screens/TimerScreen'
import InventoryScreen from '../screens/InventoryScreen'
import SettingsScreen from '../screens/SettingsScreen'

const TimerStack = createStackNavigator({
  Home: TimerScreen,
})

TimerStack.navigationOptions = {
  tabBarLabel: 'Timer',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-clock` : 'md-clock'}
    />
  ),
}

const InventoryStack = createStackNavigator({
  Inventory: InventoryScreen,
})

InventoryStack.navigationOptions = {
  tabBarLabel: 'Inventory',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-briefcase' : 'md-briefcase'}
    />
  ),
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-rainy' : 'md-rainy'}
    />
  ),
}

export default createBottomTabNavigator(
  {
    TimerStack,
    InventoryStack,
    SettingsStack,
  },
  {
    initialRouteName: 'TimerStack',
    tabBarOptions: {
      activeTintColor: Colors.grayscale.shade0,
      style: {
        backgroundColor: Colors.grayscale.shade80,
      },
    },
  }
)
