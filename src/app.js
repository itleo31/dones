import React from 'react'
import { TabNavigator } from 'react-navigation'
import Icons from 'react-native-vector-icons/FontAwesome'

import DonesScene from './scenes/Dones'
import TodosScene from './scenes/Todos'

const AppNavigation = TabNavigator(
  {
    Dones: {
      screen: DonesScene,
      navigationOptions: {
        tabBarLabel: '',
        tabBarIcon: ({ tintColor }) => <Icons name="check" size={28} color={tintColor} />, // eslint-disable-line
      },
    },
    Todos: {
      screen: TodosScene,
      navigationOptions: {
        tabBarLabel: '',
        tabBarIcon: ({ tintColor }) => <Icons name="list" size={20} color={tintColor} />, // eslint-disable-line
      },
    },
  },
  {
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#2199CB',
      showLabel: false,
    },
  },
)

export default AppNavigation
