var ToDoList = React.createClass({
    render: function() {
        return (
            <div className="ToDoList">
                <h1>To Do List</h1>
                <ToDoItems />
                <CreateNewItem />
            </div>
            );
    }
});


var ToDoItems = React.createClass({
    render: function() {
        return (
            <div className="toDoItems">
                <Item label="item 1" />
                <Item label="item 2" />
            </div>
            );
    }
});

var Item = React.createClass({
    render: function() {
        return (
            <div className="toDoItem">
                <h2 className="label">
                 {this.props.label}
                </h2>
                <input type="checkbox" />
            </div>
            );
    }
});

var CreateNewItem= React.createClass({
    render: function() {
        return (
            <div className="createNewItem">
            Hello, world! I am a form for creating a new to-do item
            </div>
            );
    }
});



React.render(
    <ToDoList />,
    document.getElementById('content')
);
