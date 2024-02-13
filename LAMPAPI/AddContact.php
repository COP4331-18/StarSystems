<?php

	$inData = getRequestInfo();
	
	$Name = $inData["Name"];
	$Phone = $inData["Phone"];
	$Email = $inData["Email"];
 	$UserID = $inData["UserID"];

	// Validate phone number (only allow numeric values)
	if (!is_numeric($Phone)) 
	{
    	returnWithError("Invalid phone number. Please enter only numbers.");
		exit();
	}

	// Validate email format
	if (!filter_var($Email, FILTER_VALIDATE_EMAIL)) 
	{
    	returnWithError("Invalid email format. Please enter a valid email address.");
		exit();
	}

	$conn = new mysqli("localhost", "NotTheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (Name,Phone,Email,UserID) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $Name, $Phone, $Email, $UserID);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
