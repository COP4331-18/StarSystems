<?php

$inData = getRequestInfo();

$searchResults = "";
$searchCount = 0;
$currentPage = isset($inData["page"]) ? (int)$inData["page"] : 1;
$itemsPerPage = 10; // Set the desired number of items per page

// Connect to database
$conn = new mysqli("localhost", "NotTheBeast", "WeLoveCOP4331", "COP4331");

if ($conn->connect_error) {
  returnWithError($conn->connect_error);
} else {

  $offset = ($currentPage - 1) * $itemsPerPage;

  // Calculate total number of records before applying any filters
  $stmt = $conn->prepare("SELECT COUNT(*) FROM Contacts");
  $stmt->execute();
  $result = $stmt->get_result();
  $totalRecords = $result->fetch_row()[0];
  $stmt->close();

  // Apply filter and select contacts with pagination
  $stmt = $conn->prepare("SELECT ID, Name, Phone, Email FROM Contacts WHERE (Name LIKE ? OR Phone LIKE ? OR Email LIKE ?) AND UserID LIKE ? LIMIT ?, ?");
  $likePattern = "%" . $inData["search"] . "%";
  $stmt->bind_param("sssssi", $likePattern, $likePattern, $likePattern, $inData["UserID"], $offset, $itemsPerPage);
  $stmt->execute();

  $result = $stmt->get_result();

  while($row = $result->fetch_assoc())
  {
    if($searchCount > 0)
    {
      $searchResults .= ",";
    }
    $searchCount++;
    $searchResults .= '{"ID": ' . $row["ID"] . ', "Name" : "' . $row["Name"] . '", "Phone" : "' . $row["Phone"] . '", "Email" : "' . $row["Email"] . '"}';
  }

  $stmt->close();

  if ($searchCount == 0) {
    returnWithError("No Records Found");
  } else {
    // Calculate total number of pages
    $totalPages = ceil($totalRecords / $itemsPerPage);

    // Build pagination information
    $paginationInfo = array(
      "currentPage" => $currentPage,
      "totalPages" => $totalPages,
      "itemsPerPage" => $itemsPerPage,
      "hasPrevious" => $currentPage > 1,
      "hasNext" => $currentPage < $totalPages
    );

    // Combine search results and pagination information
    $response = array(
      "results" => json_decode("[" . $searchResults . "]"),
      "pagination" => $paginationInfo,
      "error" => ""
    );

    sendResultInfoAsJson(json_encode($response));
  }

  $conn->close();
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
