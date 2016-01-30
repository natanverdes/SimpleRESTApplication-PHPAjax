<?php


/* Connection */
$con = new mysqli("localhost", "root", "", "simple_rest_administration");
if ( $con->connect_errno ){
    echo "Fallo al conectar a MySQL";
    return;
}
$con->query("SET NAMES 'UTF8'");
$con->set_charset('utf-8');



if(isset($_GET['order'])){
	$return = array();

	$result = $con->query("SELECT id, name, email, dni FROM sra_user ORDER BY name " . $_GET['order']);
	$rows = array();
	while($row = $result->fetch_array()){
	    $rows[] = $row;
	}
	echo json_encode($rows);
}


else if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['dni'])){
	$return = array();

	$result = $con->query("INSERT INTO sra_user VALUES
		(NULL, '" . $_POST['name'] . "', '" . $_POST['email'] . "', '" .$_POST['dni']  ."')");
	if($con->affected_rows == 1){
		$return['result'] = 'true';
	}else{
		$return['result'] = 'false';
	}
	echo json_encode($result);
}
else if(isset($_POST['id']) && isset($_POST['name'])){
	$return = array();

	$result = $con->query("UPDATE sra_user SET name = '" . $_POST['name'] . "' WHERE id = " . $_POST['id']);
	if($con->affected_rows == 1){
		$return['result'] = 'true';
	}else{
		$return['result'] = 'false';
	}
	echo json_encode($result);
}

$con->close();