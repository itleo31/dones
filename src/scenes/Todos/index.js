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
      items: [
        {
          key: '1',
          title: 'abc',
          isStar: false,
          isDone: false,
        },
        {
          key: '2',
          title: 'def',
          isStar: true,
          isDone: true,
        },
      ],
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
            renderRow={item => <TodoListItem item={item} />}
          />
        </Content>
      </Container>
    )
  }
}
