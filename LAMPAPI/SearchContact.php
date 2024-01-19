<?php

$inData = getRequestInfo();

$searchResults = "";
$searchCount = 0;

// Connect to database
$conn = new mysqli("localhost", "NotTheBeast", "WeLoveCOP4331", "COP4331");

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    // Extract search term from JSON data

    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE (Name LIKE ? OR Phone LIKE ? OR Email LIKE ?) AND UserID LIKE ?");
    $likePattern = "%" . $search_term . "%";
    $stmt->bind_param("ssss", $likePattern, $likePattern, $likePattern, $inData["UserID"]);
    $stmt->execute();

    $result = $stmt->get_result();

    while($row = $result->fetch_assoc())
    {
        if($searchCount > 0)
        {
            $searchResults .= ",";
        }
        $searchCount++;
        $searchResults .= '{"Name" : "' . $row["Name"] . '", "Phone" : "' . $row["Phone"] . '", "Email" : "' . $row["Email"] . '"}';
    }

    if ($searchCount == 0) {
        returnWithError("No Records Found");
    } else {
        returnWithInfo($searchResults);
    }

    sendResultInfoAsJson(json_encode($Contacts));
    $stmt->close();
    $conn->close();
    returnWithError("");
}

function getRequestInfo() {
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj) {
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err) {
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

function returnWithInfo( $searchResults ){
        $retValue = '{"results":[' . $searchResults . '],"error":""}';
        sendResultInfoAsJson( $retValue );
}
?>
