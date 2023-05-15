<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $_POST['email'];
  $message = $_POST['message'];

  // Validate input data
  if (!empty($email) && !empty($message)) {
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
      // Retrieve PostgreSQL connection details from environment variables
      $host = 'ep-blue-waterfall-197106-pooler.us-east-1.postgres.vercel-storage.com';
      $port = 5432;
      $dbname = 'verceldb';
      $username = 'default';
      $password = 'NJK9SGDqh6Xd';

      // Establish a database connection
      $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $username, $password);

      // Insert data into the database
      $stmt = $conn->prepare('INSERT INTO messages (email, message) VALUES (?, ?)');
      $stmt->execute([$email, $message]);

      // Close the database connection
      $conn = null;

      // Display a confirmation message
      echo 'Thank you for your message!';
    } else {
      echo 'Invalid email address!';
    }
  } else {
    echo 'Please fill in all the fields!';
  }
}
?>
