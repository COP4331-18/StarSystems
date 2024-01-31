<?php

	$inData = getRequestInfo();

  	$FirstName = $inData["FirstName"];
  	$LastName = $inData["LastName"];
  	$Login = $inData["Login"];
  	$Password = $inData["Password"];

  	$conn = new mysqli("localhost", "NotTheBeast", "WeLoveCOP4331", "COP4331");
  	if ($conn->connect_error) 
  	{
    		returnWithError($conn->connect_error);
  	} 
  	else 
  	{
    		// Check for existing user with the same Login
    		$stmt = $conn->prepare("SELECT COUNT(*) FROM Users WHERE Login=?");
    		$stmt->bind_param("s", $Login);
    		$stmt->execute();
    		$result = $stmt->get_result();
    		$row = $result->fetch_row();
    		$existingUserCount = $row[0];
    		$stmt->close();

    		if ($existingUserCount > 0) 
    		{
        		returnWithError("Username already exists");
    		} 
    		else 
    		{
        		// Proceed with registration if the username is unique
        		$stmt = $conn->prepare("INSERT into Users (FirstName, LastName, Login, Password) VALUES (?, ?, ?, ?)");
        		$stmt->bind_param("ssss", $FirstName, $LastName, $Login, $Password);
        		$stmt->execute();
        		$stmt->close();
        		$conn->close();
        		returnWithError("");
    		}
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
