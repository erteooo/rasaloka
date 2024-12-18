<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];

    // Cek apakah email terdaftar
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Generate token unik untuk reset password
        $token = bin2hex(random_bytes(50));
        $stmt->close();

        // Simpan token ke database
        $stmt = $conn->prepare("UPDATE users SET reset_token = ?, reset_token_expiry = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email = ?");
        $stmt->bind_param("ss", $token, $email);
        $stmt->execute();

        // Kirim email dengan link reset password
        $reset_link = "http://yourwebsite.com/reset_password.php?token=" . $token;
        $subject = "Reset Password Anda";
        $message = "Klik link berikut untuk reset password Anda: " . $reset_link;
        $headers = "From: no-reply@yourwebsite.com";

        if (mail($email, $subject, $message, $headers)) {
            echo "Link reset password telah dikirim ke email Anda.";
        } else {
            echo "Gagal mengirim email.";
        }
    } else {
        echo "Email tidak terdaftar.";
    }

    $stmt->close();
}
$conn->close();
?>
