<?php

	$inData = getRequestInfo();

	$Name = $inData["Name"];
	$Phone = $inData["Phone"];
	$Email = $inData["Email"];
	$UserID = $inData["UserID"];
	$ID = $inData["ID"];

	$conn = new mysqli("localhost", "NotTheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) {
    	returnWithError($conn->connect_error);
	} else {
    	$stmt = $conn->prepare("UPDATE Contacts SET Name = ?, Phone = ?, Email = ? WHERE UserID = ? AND ID = ?");
		$stmt->bind_param("sssss", $Name, $Phone, $Email, $UserID, $ID);
    	$stmt->execute();
    	if ($stmt->affected_rows == 0) {
        	returnWithError("Contact not found or no changes made");
    	}
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
