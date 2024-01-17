<?php
$inData = getRequestInfo();

$UserID = $inData["UserID"];
$Name = $inData["name"];
$Phone = $inData["phone"];
$Email = $inData["email"];

$conn = new mysqli("localhost", "NotTheBeast", "WeLoveCOP4331", "COP4331");
if ($conn->connect_error) {
	returnWithError($conn->connect_error);
} else {
	$stmt = $conn->prepare("INSERT into Contacts (UserID, Name, Phone, Email) VALUES(?,?,?,?)");
	$stmt->bind_param("ss", $UserID, $Name, $Phone, $Email);
	$stmt->execute();
	$stmt->close();
	$conn->close();
	returnWithError("");
}

function getRequestInfo()
{
	return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
	header('Content-type: application/json');
	echo $obj;
}

function returnWithError($err)
{
	$retValue = '{"error":"' . $err . '"}';
	sendResultInfoAsJson($retValue);
}
