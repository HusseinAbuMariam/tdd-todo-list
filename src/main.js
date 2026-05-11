import "./style.css";

// Modified version of https://github.com/GSG-G7/master-reference/blob/52e7346db9697fe6ed0b62b4f0835c85ab080fd7/coursebook/week-2/project/skeleton/dom.js#L9
function setupTodo() {
  // This is the dom node where we will keep our todo
  const container = document.getElementById("todo-container");
  const addTodoForm = document.getElementById("add-todo");

  let state = [
    { id: -3, description: "first todo" },
    { id: -2, description: "second todo" },
    { id: -1, description: "third todo" },
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  const createTodoNode = function (todo) {
    const todoNode = document.createElement("li");
    // you will need to use addEventListener
      
    // add span holding description
    const span =document.createElement("span")
    span.textContent= todo.description;
    todoNode.appendChild(span);
    // this adds the delete button
    const deleteButtonNode = document.createElement("button");
        deleteButtonNode.textContent = "Delete";

    deleteButtonNode.addEventListener("click", function (event) {
        event.stopPropagation();
      const newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    // add markTodo button
   todoNode.addEventListener("click", function () {
    const newState = todoFunctions.markTodo(state, todo.id);
    update(newState);
    });

    // add classes for css
  if (todo.done) {
      todoNode.classList.add("done");
    }
  return todoNode;
};
  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function (event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?
        event.preventDefault();
        
      const description = event.target.elements.description.value; // event.target ....
      const newTodo={
        description
      };
      // hint: todoFunctions.addTodo
      const newState = todoFunctions.addTodo(state, newTodo); // ?? change this!
      update(newState);
      event.target.reset();
    });
  }
  // you should not need to change this function
  const update = function (newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  const renderState = function (state) {
    const todoListNode = document.createElement("ul");

    state.forEach(function (todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };
setupTodo();
}