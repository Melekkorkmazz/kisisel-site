<?php
$servername = "db";       // docker-compose’da db container adı
$username = "root";       // MySQL root kullanıcı
$password = "root";       // şifre
$dbname = "testdb";       // oluşturduğumuz veritabanı

// Bağlantıyı oluştur
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Bağlantı başarısız: " . $conn->connect_error);
}
echo "DB bağlantısı başarılı!<br>";

// Örnek tablo oluşturma
$sql = "CREATE TABLE IF NOT EXISTS ziyaretci (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    isim VARCHAR(30) NOT NULL
)";
$conn->query($sql);

// Örnek veri ekleme
$conn->query("INSERT INTO ziyaretci (isim) VALUES ('Melek')");

// Verileri listeleme
$result = $conn->query("SELECT * FROM ziyaretci");
while($row = $result->fetch_assoc()) {
    echo "ID: " . $row["id"]. " - İsim: " . $row["isim"]. "<br>";
}

$conn->close();
?>