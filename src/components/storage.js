import Realm from 'realm'

let realm
const TodoSchema = {
  name: 'Todo',
  properties: {
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
    title: item.title,
    isDone: item.isDone,
    isStar: item.isStar,
  }))
}

const createTodo = todo =>
  tryWrite(() => {
    realm.create('Todo', todo)
  })

const deleteTodo = todo =>
  tryWrite(() => {
    realm.delete(todo)
  })

export default {
  open,
  getTodos,
  createTodo,
  deleteTodo,
}
