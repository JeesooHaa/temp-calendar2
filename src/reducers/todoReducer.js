import uuidV4 from 'uuid/v4'
import { ADD_TODO, REMOVE_TODO } from '../actions'

// const initialState = {
//   books: [{ name: 'East of Eden', author: 'John Steinbeck', id: uuidV4() }]
// }

const initialState = {
  todos: [{ height: 50, name: '성공', id: uuidV4() }],
  // dates: [{ date: "2017-06-14", id: uuidV4() }]
}

const todoReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TODO:
      return {
        todos: [
          ...state.todos,
          action.todo
        ],
      }
    // case REMOVE_BOOK:
    //   const index = state.books.findIndex(book => book.id === action.book.id)
    //   return {
    //     books: [
    //       ...state.books.slice(0, index),
    //       ...state.books.slice(index + 1)
    //     ]
    //   }

    default:
      return state
  }
}

export default todoReducer