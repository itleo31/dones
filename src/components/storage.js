import Realm from 'realm'

let realm
const TodoSchema = {
  name: 'Todo',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    isStar: { type: 'bool', default: false },
    isDone: { type: 'bool', default: false },
  },
}

const tryWrite = execute =>
  new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        resolve(execute())
      })
    } catch (error) {
      reject(error)
    }
  })

const open = () =>
  Realm.open({ schema: [TodoSchema] }).then((instance) => {
    realm = instance
    return realm
  })

const getTodos = (filter) => {
  const todos = realm.objects('Todo')
  if (filter) {
    return todos.filtered(filter)
  }
  return todos.map(item => ({
    id: item.id,
    title: item.title,
    isDone: item.isDone,
    isStar: item.isStar,
  }))
}

const createTodo = todo =>
  tryWrite(() => {
    const obj = {
      ...todo,
      id: new Date().getTime().toString(),
    }
    realm.create('Todo', obj)
  })

const deleteTodo = todo =>
  tryWrite(() => {
    realm.delete(todo)
  })

const updateTodo = todo =>
  tryWrite(() => {
    realm.create('Todo', todo, true)
  })

export default {
  open,
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
}
