

var ToDoList = React.createClass({
    loadListFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleItemSubmit: function(item) {
        console.log("submit function successful");
        var items = this.state.data;
        items.push(item);
        this.setState({data: items}, function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: item,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadListFromServer();
        setInterval(this.loadListFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="ToDoList">
                <h1>To Do List</h1>
                <ToDoItems data={this.state.data} />
                <CreateNewItem onItemSubmit={this.handleItemSubmit} />
            </div>
            );
    }
});


var ToDoItems = React.createClass({
    render: function() {
        var listNodes = this.props.data.map(function (data, index) {
            return (
                <Item label={data.label} number={data.number} key={index}/>
                );
        });
        return (
            <div class="toDoItems">
                {listNodes}
                </div>
            );
    }
});

var Item = React.createClass({
    calculateNumber: function() {
    var inputs = [];
    for (var i=0; i < this.props.number; i++) {
        inputs.push(<input type="checkbox" />);
        console.log("adding to inputs");
    }
    this.props.inputs = inputs;
    },
    render: function() {
        this.calculateNumber();
        return (
            <div className="toDoItem">
                <h2 className="label">
                {this.props.label}
                </h2>
            {this.props.inputs}
            </div>
            );
    }
});

var CreateNewItem= React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var label = this.refs.label.getDOMNode().value.trim();
        var number = this.refs.number.getDOMNode().value.trim();
        if (!label) {
            return;
        }
        this.props.onItemSubmit({label:label, number:number});
        this.refs.label.getDOMNode().value = '';
        this.refs.number.getDOMNode().value = '';
        return;
    },
    render: function() {
        return (
            <form className="listForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="enter a label" ref="label"/>
                <input type="number" placeholder="enter a number" min="1" max="7" ref="number" />
                <input type="submit" value="Post" />
            </form>
            );
    }
});



React.render(
    <ToDoList url="list.json" pollInterval={2000} />,
    document.getElementById('content')
);
