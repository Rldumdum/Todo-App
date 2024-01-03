import { Component } from "react";
import "./App.css";
import "./styles/todosContainer.css";

export default class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      inputVal: "",
      editMode: false,
      editedTodoindex: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      inputVal: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.editMode) {
      const updatedTodos = [...this.state.todos];
      updatedTodos[this.state.editedTodoindex] = this.state.inputVal;
      this.setState({
        todos: updatedTodos,
        editMode: false,
        editedTodoindex: null,
        inputVal: "",
      });
    } else {
      this.setState((state) => ({
        todos: state.todos.concat(state.inputVal),
        inputVal: "",
      }));
    }
  }

  handleEdit(todo, idx) {
    if (this.state.editMode) {
      const updatedTodos = [...this.state.todos];
      updatedTodos[this.state.editedTodoindex] = this.state.inputVal;
      this.setState({
        todos: updatedTodos,
        editMode: false,
        editedTodoindex: null,
        inputVal: "",
      });
    }
    this.setState({
      inputVal: todo,
      editedTodoindex: idx,
      editMode: true,
    });
  }

  handleDelete(idx) {
    this.setState((state) => ({
      todos: state.todos.filter((_, index) => index !== idx),
    }));
  }

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Enter a task: </label>
          <input
            type="text"
            value={this.state.editMode ? "" : this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="container">
          {this.state.todos.map((todo, idx) => {
            return (
              <div
                key={idx}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {this.state.editedTodoindex === idx ? (
                  <input
                    defaultValue={this.state.inputVal}
                    onChange={this.handleInputChange}
                  ></input>
                ) : (
                  <p
                    onClick={() => {
                      this.handleDelete(idx);
                    }}
                    className="todoItem"
                  >
                    {todo}
                  </p>
                )}
                <button
                  onClick={(e) => {
                    this.state.editedTodoindex === idx
                      ? this.handleSubmit(e)
                      : this.handleEdit(todo, idx, e);
                  }}
                >
                  {this.state.editedTodoindex === idx ? "Save Changes" : "Edit"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
