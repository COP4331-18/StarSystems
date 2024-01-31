<?php

	$postData = json_decode(file_get_contents('php://input'), true);

	$UserID = $postData["UserID"];
	$page = $postData["page"] ?? 1; // Retrieve page number, default to 1

	$conn = new mysqli("localhost", "NotTheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError($conn->connect_error);
	} 
	else 
	{
		$stmt = $conn->prepare("SELECT Name, Phone, Email FROM Contacts WHERE UserID=? LIMIT ?, 10");
		$offset = ($page - 1) * 10; // Calculate offset for pagination
		$stmt->bind_param("ii", $UserID, $offset);

		$contacts = []; // Initialize the contacts array here

		if ($stmt->execute()) 
		{
			$result = $stmt->get_result();

			if ($result->num_rows > 0) 
			{
				$contacts = $result->fetch_all(MYSQLI_ASSOC);
			}

			sendResultInfoAsJson($contacts);
		} 
		else 
		{
			// Handle query execution errors
			returnWithError("Failed to execute query");
		}

		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo json_encode($obj); // Ensure proper JSON encoding
	}

	function returnWithError($err)
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}

?>
