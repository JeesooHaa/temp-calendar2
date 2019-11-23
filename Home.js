import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { addTodo, removeTodo } from './src/actions'

import { connect } from 'react-redux'

// const goToAbout = (updateItem, tempDate, items) => {
//   Actions.about(updateItem, tempDate, items)
// }
const goToAbout = () => {
  Actions.about()
}

const initialState = {
  height: '',
  name: ''
}

class Home extends Component {

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

  constructor(props) {
    super(props);
    this.state = {
      items: {
        "2017-06-14": [
          {
            "height": 50,
            "name": "0614",
          }
        ],
        "2017-06-17": [
          {
            "height": 50,
            "name": "0617",
          }
        ]
      },
      data: [],
      tempDate: '2017-06-14'
    };
  }

  // updateAuto(tempDate) {
  //   const popTodo = this.props.todos.pop()
  //   this.state.items[tempDate].push(popTodo)
  //   tempItems = this.state.items
  //   this.updateItem(tempItems)
  // }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (prevState.data !== nextProps.todos) {
  //     return updateAuto(this.state.tempDate)
  //   }
  //   return null;
  //   }

  updateDate(temp) {
    this.setState(
      {tempDate: temp}
    )
  }

  updateItem(tempItems) {
    this.setState(
        this.state.items = tempItems
    )
  }

  render() {
    const { todos } = this.props

    return (
      <Agenda
        items={this.state.items}
        onDayPress={this.onDayPress.bind(this)}
        // loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2017-05-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyData={this.renderEmptyData.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}

      />
    );
  }

  // loadItems(day) {
    // console.log(day)
    // setTimeout(() => {
    //   for (let i = -15; i < 85; i++) {
    //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //     const strTime = this.timeToString(time);
    //     if (!this.state.items[strTime]) {
    //       this.state.items[strTime] = [];
    //       const numItems = Math.floor(Math.random() * 5);
    //       for (let j = 0; j < numItems; j++) {
    //         this.state.items[strTime].push({
    //           name: 'Item for ' + strTime,
    //           height: Math.max(50, Math.floor(Math.random() * 150))
    //         });
    //       }
    //     }
    //   }
    //   console.log(this.state.items);
    //   const newItems = {};
    //   Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
    //   this.setState({
    //     items: newItems
    //   });
    // }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  // }

  onDayPress(day) {
    const temp = day.dateString
    this.updateDate(temp)
    const popTodo = this.props.todos.pop()
    this.state.items[temp].push(popTodo)
    tempItems = this.state.items
    this.updateItem(tempItems)
    // this.updateItem(tempItems)
    // console.log(this.state.items)
  }

  renderItem(item) {
    // console.log(item)
    return (
      <View style={styles.item}>
        <Text>{item.name}</Text>
        <Button
          title="Update item"
          // onPress={()=> console.log(this.state.tempDate)}
          onPress={goToAbout}

        />
      </View>
    );
  }

  renderEmptyData() {
    return (
      <View style={styles.emptyDate}>
        <Button
          title="Add item"
          onPress={goToAbout}
        /> 
      </View>
    );
  }


  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  // timeToString(time) {
  //   const date = new Date(time);
  //   return date.toISOString().split('T')[0];
  // }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});

const mapDispatchToProps = {
  dispatchAddBook: (book) => addBook(book),
  // dispatchRemoveBook: (book) => removeBook(book)
}

const mapStateToProps = (state) => ({
  todos: state.todoReducer.todos
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
