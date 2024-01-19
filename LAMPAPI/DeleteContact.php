<?php
    $inData = getRequestInfo();

    $UserID = $inData["UserID"];
    $FirstName = $inData["FirstName"];
    $LastName = $inData["LastName"];

    $conn = new mysqli("localhost", "NotTheBeast", "WeLoveCOP4331", "COP4331");

    if($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE FirstName = ? AND LastName = ? AND UserID = ?");
        $stmt->bind_param("ssi", $FirstName, $LastName, $UserID);
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
