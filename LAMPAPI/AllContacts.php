<?php

$inData = getRequestInfo();

$contacts = [];
$currentPage = isset($inData["page"]) ? (int)$inData["page"] : 1;
$itemsPerPage = 10; // Set the desired number of items per page

// Connect to database
$conn = new mysqli("localhost", "NotTheBeast", "WeLoveCOP4331", "COP4331");

if ($conn->connect_error) {
  returnWithError($conn->connect_error);
} else {

  $offset = ($currentPage - 1) * $itemsPerPage;

  // Fetch all contacts for the user with pagination
  $stmt = $conn->prepare("SELECT ID, Name, Phone, Email FROM Contacts WHERE UserID=? LIMIT ?, ?");
  $stmt->bind_param("sii", $inData["UserID"], $offset, $itemsPerPage);
  $stmt->execute();

  $result = $stmt->get_result();

  while ($row = $result->fetch_assoc()) {
    $contacts[] = $row;
  }

  $stmt->close();

  // Calculate total number of contacts for the user
  $stmt = $conn->prepare("SELECT COUNT(*) FROM Contacts WHERE UserID=?");
  $stmt->bind_param("i", $inData["UserID"]);
  $stmt->execute();
  $result = $stmt->get_result();
  $totalContacts = $result->fetch_row()[0];
  $stmt->close();

  // Calculate total pages
  $totalPages = ceil($totalContacts / $itemsPerPage);

  // Build pagination information
  $paginationInfo = array(
    "currentPage" => $currentPage,
    "totalPages" => $totalPages,
    "itemsPerPage" => $itemsPerPage,
    "hasPrevious" => $currentPage > 1,
    "hasNext" => $currentPage < $totalPages
  );

  // Combine contacts and pagination information
  $response = array(
    "results" => $contacts,
    "pagination" => $paginationInfo,
    "error" => ""
  );

  sendResultInfoAsJson(json_encode($response));

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
