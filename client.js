$(document).ready(function(){
	$("#form-add").click(function(){
		var formData = {
			name: $("#form-name").val(),
			email: $("#form-email").val(),
			dni: $("#form-DNI").val()
		};

		$.ajax({
			method: "POST",
		    url: "server.php",
		    data: formData})
		.done(function(result){
			if(result == 'true'){
				$("#form-name").val("");
				$("#form-email").val("");
				$("#form-DNI").val("");
				refresh();
			}
			else{
				alert("No se ha podido insertar correctamente");
			}
			
		})
    	.fail(function(){
    		alert("No se ha podido enviar correctamente");
    	});
	});

	$("#list-order").click(function(){
		if($("#list-order").text() == 'Ascendant'){
			$("#list-order").text('Descendant');
		}else{
			$("#list-order").text('Ascendant');
		}
		refresh();
	});


	refresh();
});
function refresh(){
		var formData;
		if($("#list-order").text() == 'Ascendant'){
			formData = {order: 'ASC'}
		}else{
			formData = {order: 'DESC'}
		}

		$.ajax({
			method: "GET",
		    url: "server.php",
		    data: formData})
	    .done(function(response){
	    	response = JSON.parse(response);
	    	$("#list-content").empty();
	    	for(var i = 0; i < response.length; i++){
	    		$("#list-content").append(
	    				"<li id='list-" + response[i].id + "'>"
						+ "<span id='list-" + response[i].id + "-text'>" + response[i].name + "</span> "
						+ "<button id='list-" + response[i].id + "-editar' onclick='edit(" + response[i].id + ")'>Editar</button>"
						/*+ "<button id='list-" + response[i].id + "-eliminar' onclick='delete(" + response[i].id + ")'>Eliminar</button>"*/ + "</li>"
						);
	    	}
	    });
	}

function edit(id){
	if($("#list-" + id + "-editar").text() == 'Editar'){
		var text = $("#list-" + id + "-text").text();
		$("#list-" + id + "-text").remove();
		$("#list-" + id + "-editar").before("<input id='list-" + id + "-text' value='" + text + "'>");
		$("#list-" + id + "-editar").text("Guardar");
	}else{
		var text = $("#list-" + id + "-text").val();

		var formData = {
			id: id,
			name: text
		};
		$.ajax({
			method: "POST",
		    url: "server.php",
		    data: formData})
		.done(function(result){
			$("#list-" + id + "-text").remove();
			$("#list-" + id + "-editar").before("<span id='list-" + id + "-text'>" + text + "</span>");
			$("#list-" + id + "-editar").text("Editar");
			refresh();
		});
	}
}