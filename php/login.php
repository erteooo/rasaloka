<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($hashed_password);

    if ($stmt->fetch() && password_verify($password, $hashed_password)) {
        // Redirect ke produk.html jika login berhasil
        header("Location: produk.html");
        exit; // Menghentikan eksekusi script setelah redirect
    } else {
        // Tampilkan pesan error jika login gagal
        echo "Invalid email or password.";
    }

    $stmt->close();
}
$conn->close();
?>
