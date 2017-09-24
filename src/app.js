import React from 'react'
import { TabNavigator } from 'react-navigation'
import Icons from 'react-native-vector-icons/FontAwesome'
import { Container, Spinner, Text, Root } from 'native-base'

import DonesScene from './scenes/Dones'
import TodosScene from './scenes/Todos'

import storage from './components/storage'
import styles from './components/styles'

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
    initialRouteName: 'Todos',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#2199CB',
      showLabel: false,
    },
  },
)

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      state: 'loading',
      errorMessage: '',
    }
  }
  componentWillMount() {
    this.loadComponentsAsync()
  }

  async loadComponentsAsync() {
    try {
      await Promise.all([storage.open()])

      this.setState({
        state: 'loaded',
      })
    } catch (error) {
      this.setState({
        state: 'error',
        errorMessage: error.message,
      })
    }
  }

  render() {
    switch (this.state.state) {
    case 'loading':
      return (
        <Container style={styles.container}>
          <Spinner color="grey" />
        </Container>
      )

    case 'error':
      return (
        <Container style={styles.container}>
          <Text style={styles.errorText}>{this.state.errorMessage}</Text>
        </Container>
      )

    default:
      return (
        <Root>
          <AppNavigation />
        </Root>
      )
    }
  }
}
