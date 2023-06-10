<?php

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}


// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "simple_db_empleados";

try {
    // Crear una conexión a la base de datos utilizando PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener todos los empleados
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $sql = "SELECT * FROM Empleados";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode($result);
        } else {
            echo json_encode([]);
        }
    }

    // Crear un nuevo empleado
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        $nombre = $data['nombre'];
        $apellido = $data['apellido'];
        $email = $data['email'];
        $fechaContratacion = $data['fecha_contratacion'];
        $salario = $data['salario'];

        

        $sql = "INSERT INTO Empleados (nombre, apellido, email, fecha_contratacion, salario)
                VALUES (:nombre, :apellido, :email, :fechaContratacion, :salario)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellido', $apellido);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':fechaContratacion', $fechaContratacion);
        $stmt->bindParam(':salario', $salario);

        if ($stmt->execute()) {
            $response = array('message' => 'Empleado creado correctamente');
            echo json_encode($response);
        } else {
            $response = array('error' => 'Error al crear el empleado');
            echo json_encode($response);
        }
    }

    // Actualizar un empleado
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $data = json_decode(file_get_contents('php://input'), true);

        $id = $data['id'];
        $nombre = $data['nombre'];
        $apellido = $data['apellido'];
        $email = $data['email'];
        $fechaContratacion = $data['fecha_contratacion'];
        $salario = $data['salario'];

        $sql = "UPDATE Empleados SET
                nombre = :nombre,
                apellido = :apellido,
                email = :email,
                fecha_contratacion = :fechaContratacion,
                salario = :salario
                WHERE id = :id";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellido', $apellido);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':fechaContratacion', $fechaContratacion);
        $stmt->bindParam(':salario', $salario);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            $response = array('message' => 'Empleado actualizado correctamente');
            echo json_encode($response);
        } else {
            $response = array('error' => 'Error al actualizar el empleado');
            echo json_encode($response);
        }
    }

    // Eliminar un empleado
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $data = json_decode(file_get_contents('php://input'), true);

        $id = $data['id'];

        $sql = "DELETE FROM Empleados WHERE id = :id";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            $response = array('message' => 'Empleado eliminado correctamente');
            echo json_encode($response);
        } else {
            $response = array('error' => 'Error al eliminar el empleado');
            echo json_encode($response);
        }
    }
} catch (PDOException $e) {
    $response = array('error' => 'Error en la conexión a la base de datos: ' . $e->getMessage());
    echo json_encode($response);
}

// Cerrar la conexión a la base de datos
$conn = null;

?>
