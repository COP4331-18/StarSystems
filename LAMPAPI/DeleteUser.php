<?php

    $inData = getRequestInfo();

    $ID = $inData["ID"];  // Get the User ID from the request

    $conn = new mysqli("localhost", "NotTheBeast", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error) 
    {
      returnWithError($conn->connect_error);
    } 
    else 
    {
      // Prepare the DELETE statement
      $stmt = $conn->prepare("DELETE FROM Users WHERE ID=?");
      $stmt->bind_param("i", $ID);  // Bind the User ID as an integer

      if ($stmt->execute()) {
        // User deleted successfully
        $stmt->close();
        $conn->close();
        returnWithError("");  // Return empty JSON to indicate success
      } 
      else 
      {
        // Error deleting user
        $error = $stmt->error;
        $stmt->close();
        $conn->close();
        returnWithError("Error deleting user: " . $error);
      }
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