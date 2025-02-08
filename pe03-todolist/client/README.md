# Input

The input format for this program is relative to tasks that user has to perform, also known as a to do list. Each task is stored in a todos array, via the webhook useState.

# Process

deleteTodo removes a todo at a given index by filtering the todo list and updating the state.  Because there's no database or middleware, no data validation or processing is performed on the todo items.

# Output

The output is a rendered list of ToDo tasks, each displaying its index, task description, and a deleteTodo function, reflecting the current state of the ToDo array after a new task is added.