
 //creating the to-do list from the create new item

var ToDoList = React.createClass({
    loadListFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                console.log("Successful AJAX State Update:"); console.log(data);
                this.setState({data: data});
                console.log("State Set to"); console.log(this.state);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleItemSubmit: function(item) {
        console.log("submit function successful");
        var items = this.state.data;
        console.log("State on submit"); console.log(this.state);
        items.push(item);
        this.setState({data: items}, function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: item,
            success: function(data) {
                console.log("Successful AJAX Item Submit:"); console.log(data);
                this.setState({data: data});
                console.log("State Set to"); console.log(this.state);
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
            <div className="header--MAIN">
                <h1 className="header--text">To Do List</h1>
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
             <form className="create-item--MAIN" onSubmit={this.handleSubmit}>
                 <input className="create-item--input-field" type="text" placeholder="enter a label" ref="label"/>
                 <input className="create-item--input-field" type="number" placeholder="enter a number" min="1" max="7" ref="number" />
                 <span className="create-item--label">number of hours</span>
                 <input className="create-item--radio-button" type="radio" name="type" value="hours" ref="hours" />
                 <span className="create-item--label">number of instances</span>
                 <input className="create-item--radio-button" type="radio" name="type" value="instances" ref="instances"/>
                 <input className="create-item--button" type="submit" value="Submit" />
             </form>
             );
     }
 });

 //creating an instances item


 var ItemInstance = React.createClass({
     handleCheck: function(e) {
         var amount = 400/this.props.number;
         $('.progress-bar--progress').css(
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
             <form className="instance--checkboxes">
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
             <form className="hours--submit-items">
                 <input className="hours--input-field" type="text" name="type" value="hours" ref="hours" placeholder="enter number of hours" min="1" max="10" ref="number"/>
                 <input className="hours--submit" type="submit" value="Post" />
             </form>
             );
     }

 });

 var ProgressBar = React.createClass({

     render: function(){
         return(
             <div className="progress-bar--MAIN">
                 <div className="progress-bar--progress"></div>
                 </div>
             )
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
             <div className="item--MAIN">
                 <h2 className="item--label">
                {this.props.label}
                 </h2>
            {this.props.inputs}
             <ProgressBar/>
             </div>
             );
     }
 });

//create a list of items to insert into the page


var ToDoItems = React.createClass({
    render: function() {
        var listNodes = this.props.data.map(function (data) {
            return (
                <Item label={data.label} number={data.number} hours={data.hours} instances={data.instances} key={data.index}/>
                );
        });
        return (
            <div className="items-list--MAIN">
                {listNodes}
                </div>
            );
    }
});





React.render(
    <ToDoList url="/json/list" pollInterval={2000} />,
    document.getElementById('content')
);
