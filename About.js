// import React, {useState} from 'react'
// import { TouchableOpacity, Text, StyleSheet, View, Button, FlatList } from 'react-native'
// import { Actions } from 'react-native-router-flux'
// import GoalItem from './components/GoalItem'
// import GoalInput from './components/GoalInput'

// const About = () => {
//    const goToHome = () => {
//       Actions.home()
//    }
//    //
//    const [courseGoals, setCourseGoals] = useState([])
//    const [isAddMode, setIsAddMode] = useState(false)

//    const addGoalHandler = goalTitle => {
//       console.log('목표를 설정했습니다.')
//       setCourseGoals(currentGoals => [
//         ...currentGoals, 
//         { id: Math.random().toString(), value: goalTitle }
//       ])
//       setIsAddMode(false)
//     }
//     const removeGoalHandler = goalId => {
//       console.log('지워집니다.')
//       setCourseGoals(currentGoals => {
//         return currentGoals.filter((goal) => goal.id !== goalId )
//       })
//     }
  
//     const cancelGoalAdditionHandler = () => {
//       console.log('취소')
//       setIsAddMode(false)
//     }



//    return (
//       <View>
//          {/* <TouchableOpacity style = {{ margin: 128 }} onPress = {goToHome}>
//          <Text>달라짐?</Text>
//          </TouchableOpacity> */}
//          <View style={styles.screen} >
//          <Button title="Add New Goal" onPress={() => setIsAddMode(true)}/>
//          <GoalInput 
//          visible={isAddMode} 
//          onAddGoal={addGoalHandler} 
//          onCancel={cancelGoalAdditionHandler}
//          />
//          <FlatList 
//          keyExtractor={(item,  index) => item.id}
//          data={courseGoals} 
//          renderItem={itemData => <GoalItem id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value}/>}
//          />
//          </View>
//          <TouchableOpacity style = {{ margin: 128 }}>
//          <Button title='[뒤로가기]' onPress = {goToHome}/>
//          </TouchableOpacity>

//       </View>

//    )
// }


// const styles = StyleSheet.create({
//    screen: {
//      padding: 50
//    },
 
//  })
 
// export default About

import React from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput, 
  TouchableOpacity,
  Button
} from 'react-native'
import { addTodo, removeTodo } from './src/actions'

import { connect } from 'react-redux'

import { Actions } from 'react-native-router-flux'


const goToHome = () => {
  Actions.home()
}

const initialState = {
  height: '',
  name: ''
}

class About extends React.Component {
  state = initialState
  
  updateInput = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value
    })
  }
  
  addTodo = () => {
    this.props.dispatchAddTodo(this.state)
    this.setState(initialState)
  }
  
  removeTodo = (todo) => {
    this.props.dispatchRemoveTodo(todo)
  }
  

  render() {
    const { todos } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Books</Text>
        <ScrollView
          keyboardShouldPersistTaps='always'
          style={styles.todosContainer}
        >
          {
            todos.map((todo, index) => (
              <View style={styles.todo} key={index}>
                <Text >{todo.name}</Text>
                <Text onPress={() => this.removeTodo(todo)}>Remove</Text>
              </View>
            ))
          }
        </ScrollView>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              value={this.state.name}
              onChangeText={value => this.updateInput('name', value)}
              style={styles.input}
              placeholder='Todo'
            />
            <TextInput
              value={this.state.height}
              onChangeText={value => this.updateInput('height', value)}
              style={styles.input}
              placeholder='Height'
            />
          </View>
          <TouchableOpacity onPress={this.addTodo}>
            <View style={styles.addButtonContainer}>
              <Text style={styles.addButton}>+</Text>
            </View>
          </TouchableOpacity>
          {/* <Button title='[저장하기]' onPress = {
            () => {const popTodo = this.props.todos.pop()
              this.props.items[this.props.tempDate].push(popTodo)
              tempItems = this.props.items
              this.updateItem(tempItems)}
          }/> */}
          <Button title='[뒤로가기]' onPress = {goToHome}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopColor: '#ededed',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100
  },
  inputWrapper: {
    flex: 1
  },
  input: {
    height: 44,
    padding: 7,
    backgroundColor: '#ededed',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    marginBottom: 5
  },
  addButton: {
    fontSize: 28,
    lineHeight: 28
  },
  addButtonContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#ededed',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  container: {
    flex: 1
  },
  todosContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flex: 1
  },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    fontSize: 20,
    textAlign: 'center'
  },
  book: {
    padding: 20
  },
  name: {
    fontSize: 18
  },
  author: {
    fontSize: 14,
    color: '#999'
  }
})

const mapDispatchToProps = {
  dispatchAddTodo: (todo) => addTodo(todo),
  // dispatchRemoveBook: (book) => removeBook(book)
}

const mapStateToProps = (state) => ({
  todos: state.todoReducer.todos
})

export default connect(mapStateToProps, mapDispatchToProps)(About)