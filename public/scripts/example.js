
 //creating the to-do list from the create new item

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
                <CreateNewItem onItemSubmit={this.handleItemSubmit} />
                <ToDoItems data={this.state.data} />
            </div>
            );
    }
});



 // creating a new item header section

 var CreateNewItem= React.createClass({
     handleSubmit: function(e) {
         e.preventDefault();
         var label = this.refs.label.getDOMNode().value.trim();
         var number = this.refs.number.getDOMNode().value.trim();
         var hours = this.refs.hours.getDOMNode().checked;
         var instances = this.refs.instances.getDOMNode().checked;

         console.log("create new item variables: " + hours);
         if (!label) {
             return;
         }
         this.props.onItemSubmit({label:label, number:number, hours:hours, instances:instances});
         this.refs.label.getDOMNode().value = '';
         this.refs.number.getDOMNode().value = '';
         this.refs.hours.getDOMNode().checked = '';
         this.refs.instances.getDOMNode().checked = '';
         return;
     },
     render: function() {
         return (
             <form className="listForm" onSubmit={this.handleSubmit}>
                 <input type="text" placeholder="enter a label" ref="label"/>
                 <input type="number" placeholder="enter a number" min="1" max="7" ref="number" />
                 <input type="radio" name="type" value="hours" ref="hours" />number of hours
                 <input type="radio" name="type" value="instances" ref="instances"/>number of instances
                 <input type="submit" value="Post" />
             </form>
             );
     }
 });

 //creating an instances item


 var ItemInstance = React.createClass({
     handleCheck: function(e) {
         var amount = 50/this.props.number;
         $('.progress-bar').css(
             'width', "+=" + amount);
         return amount;
     },
     createItemInstance: function(){
         var checkboxes = [];
         for (var i=0; i < this.props.number; i++) {
             checkboxes.push(<input type="checkbox" onClick={this.handleCheck}/>);
             console.log("adding to inputs");
         }
         this.props.checkboxes = checkboxes;
     },
     render: function() {
         this.createItemInstance();
         return (
             <form className="checkboxes-list">
             {this.props.checkboxes}
                 </form>
             );
         }

             });

 // creating hours item

 var ItemHours = React.createClass({
     handleSubmit: function(e) {
         var amount = 50/this.props.number;
         $('.progress-bar').css(
             'width', "+=" + amount);
         return amount;
     },
     render: function() {
         return (
             <form className="submit-item">
                 <input type="text" name="type" value="hours" ref="hours" placeholder="enter number of hours" min="1" max="10" ref="number"/>
                 <input type="submit" value="Post" />
             </form>
             );
     }

 });



 //creating an item logic: instances vs. hours

 var Item = React.createClass({

     createInputs: function() {
         var inputs = [];
         if (this.props.instances == true){
             inputs.push(<ItemInstance  number={this.props.number}/>);
         }
         else if (this.props.hours == true){
             inputs.push(<ItemHours  number={this.props.number}/>);
         }

         else{
             alert("please make a selection");
         }

         this.props.inputs = inputs;
     },
     render: function() {
         this.createInputs();
         return (
             <div className="toDoItem">
                 <h2 className="label">
                {this.props.label}
                 </h2>
            {this.props.inputs}
                 <div className="progress-bar"></div>
             </div>
             );
     }
 });

//create a list of items to insert into the page


var ToDoItems = React.createClass({
    render: function() {
        var listNodes = this.props.data.map(function (data, index) {
            return (
                <Item label={data.label} number={data.number} hours={data.hours} instances={data.instances} key={index}/>
                );
        });
        return (
            <div class="toDoItems">
                {listNodes}
                </div>
            );
    }
});





React.render(
    <ToDoList url="list.json" pollInterval={2000} />,
    document.getElementById('content')
);
