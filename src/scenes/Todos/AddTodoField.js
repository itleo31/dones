import React from 'react'
import { StyleSheet } from 'react-native'
import { Item, Input, Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  plus: {
    marginLeft: 10,
  },
  input: {
    marginLeft: 10,
  },
  star: {
    marginRight: 10,
  },
})

const initialState = {
  isStar: false,
  title: '',
}

export default class AddTodoView extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }
  render() {
    return (
      <Item>
        <Icon style={styles.plus} active name="plus" size={24} />
        <Input
          style={styles.input}
          placeholder="Add Todo item"
          value={this.state.title}
          onChangeText={title => this.setState({ title })}
          onSubmitEditing={() => {
            this.props.onSubmit(this.state)
            this.setState(initialState)
          }}
        />
        <Button
          style={styles.star}
          transparent
          onPress={() => {
            this.setState({ isStar: !this.state.isStar })
          }}
        >
          <Icon name={this.state.isStar ? 'star' : 'star-o'} size={24} />
        </Button>
      </Item>
    )
  }
}

AddTodoView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
