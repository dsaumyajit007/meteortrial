Todos = new Mongo.Collection('todos');



if(Meteor.isClient){
    Template.todos.helpers({
        'todo':function(){
            return Todos.find({},{sort:{createdAt : -1}});
        }
    })

    Template.addTodo.events({
        'submit form': function(event){
            event.preventDefault();
            var todoName = $('#todoName').val();
            Todos.insert({
                name : todoName,
                completed : false,
                createdAt : new Date()
            })
            $('#todoName').val('');
        }

    })

    Template.todoItem.events({

        'click .delete-todo' : function(event){
            event.preventDefault();
            if(window.confirm("Are you sure?"))
                Todos.remove({_id: this._id});
        },

        'keyup [name=todoItem]' : function (event) {
            if(event.which == 13 || event.which == 27)
                $(event.target).blur();
            var item = $(event.target).val();
            console.log(item);
            Todos.update({_id:this._id},{$set : {name:item}});
        },

        'change [type=checkbox]' : function(event){
            var document = this._id;
            var isCompleted = this.completed;
            
        }
    })

}

if(Meteor.isServer){
    // server code goes here
}