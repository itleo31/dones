import React from 'react'
import { Container, Header, Body, Title, Content, Toast, List } from 'native-base'
import styles from '../../components/styles'
import AddTodoField from './AddTodoField'
import TodoListItem from './TodoListItem'
import storage from '../../components/storage'

export default class Dones extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    this.loadData()
  }

  submitAddTodo(todo) {
    if (!todo.title || todo.title.length === 0) {
      return
    }
    storage
      .createTodo(todo)
      .then(() => {
        this.loadData()
      })
      .catch(() => {
        Toast.show({
          text: 'Failed to save',
          type: 'danger',
        })
      })
  }

  loadData() {
    const items = storage.getTodos()

    this.setState({ items })
  }

  makeDone(todo) {
    const obj = {
      ...todo,
      isDone: true,
    }
    storage
      .updateTodo(obj)
      .then(() => {
        this.loadData()
      })
      .catch(() => {
        Toast.show({
          text: 'Failed to save',
          type: 'danger',
        })
      })
  }

  toggleStar(todo) {
    const obj = {
      ...todo,
      isStar: !todo.isStar,
    }
    storage
      .updateTodo(obj)
      .then(() => {
        this.loadData()
      })
      .catch((err) => {
        console.log(err)
        Toast.show({
          text: 'Failed to save',
          type: 'danger',
        })
      })
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Todos</Title>
          </Body>
        </Header>
        <Content>
          <AddTodoField onSubmit={todo => this.submitAddTodo(todo)} />
          <List
            style={{ marginTop: 20 }}
            dataArray={this.state.items}
            renderRow={item => (
              <TodoListItem
                item={item}
                toggleStar={() => this.toggleStar(item)}
                makeDone={() => this.makeDone(item)}
              />
            )}
          />
        </Content>
      </Container>
    )
  }
}
