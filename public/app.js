//alert("hello");


$(document).ready(function(){
	$.getJSON("/api/todos")
	.then(addTodos)

	$("#todoInput").keypress(function(event){
		if(event.which == 13){
			createtodo();
		}
	});

	$('.list').on('click','li',function(){
		updateTodo($(this));
	});


	$('.list').on('click','span',function(e){
		e.stopPropagation();
		var clicked = $(this).parent().data('id');
		$(this).parent().remove();
		
		
		$.ajax({
			method:'DELETE',
			url : '/api/todos/'+clicked

		}).then(function(data){
			console.log(data);
		});
	})
});
function addTodos(todos){
	todos.forEach(function(todo){
		addTodo(todo);
	});
}


function addTodo(todo){
	var newTodo = $('<li class = "task">' + todo.name + '<span>X</span></li>');
		newTodo.data('id', todo._id);
		newTodo.data('completed', todo.completed);
		if(todo.completed){
			newTodo.addClass("done");
		}
		$('.list').append(newTodo);
}
function createtodo(){
	var usrInput = $('#todoInput').val();
	$.post('/api/todos',{ name: usrInput})
	.then(function(newtodo){
	$('#todoInput').val('')
 	addTodo(newtodo);
	})
}

function updateTodo(todo){
	var isDone = !todo.data('completed');
	var updatedata = {completed: isDone};
	$.ajax({
		method:'PUT',
		url: '/api/todos/'+todo.data('id'),
		data:updatedata
	})
	.then(function(){
		todo.toggleClass("done");
		todo.data('completed',isDone);

	})
}