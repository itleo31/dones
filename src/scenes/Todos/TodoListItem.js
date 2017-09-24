import React from 'react'
import { ListItem, Text, Button, Icon } from 'native-base'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  listItemTitle: {
    flex: 1,
  },
  iconButton: {
    fontSize: 28,
    color: '#9b9b9b',
  },
})

export default class TodoListItem extends React.Component {
  render() {
    return (
      <ListItem style={styles.listItem}>
        <Button transparent onPress={() => this.props.makeDone()}>
          <Icon name="square" style={styles.iconButton} />
        </Button>
        <Text style={styles.listItemTitle}>{this.props.item.title}</Text>
        <Button transparent onPress={() => this.props.toggleStar()}>
          <Icon active={this.props.item.isStar} name="star" style={styles.iconButton} />
        </Button>
      </ListItem>
    )
  }
}

TodoListItem.propTypes = {
  item: PropTypes.object.isRequired,
  toggleStar: PropTypes.func.isRequired,
  makeDone: PropTypes.func.isRequired,
}
