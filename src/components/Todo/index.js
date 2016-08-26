import React, { Component } from 'react'
import TodoInput from './TodoInput'
import dateTimeFormatter from 'UTIL/dateTimeFormatter'

export default class Todo extends Component {
  delTodo (todoId) {
    if (!confirm('确认删除？')) return
    this.props.delTodo(todoId)
  }

  render () {
    let { todos, addTodo } = this.props
    return (
      <div>
        <ul>
          { todos.map(todo =>
            <li key={todo.id}>
              { todo.content }
              <a href="javascript:;"
                style={{textDecoration: 'none'}}
                className="pull-right"
                onClick={() => this.delTodo(todo.id)}>
                &otimes;
              </a>
              <span className="label label-default pull-right">
                { dateTimeFormatter(todo.createdAt) }
              </span>
            </li>
          )}
        </ul>
        <TodoInput addTodo={addTodo} />
      </div>
    )
  }
}
