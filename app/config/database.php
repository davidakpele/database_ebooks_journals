<?php

class Database {
	private $HOST = DB_HOST;
	private $USER = DB_USER;
	private $PASSWORD = DB_PASS;
	private $DbNAME = DB_NAME;
	private $charset = DB_CHARSET;
	private $statement;
	private $dbHandler;
	private $error;

	public function __construct(){
		$conn = 'mysql:host=' .$this->HOST . ';dbname=' .$this->DbNAME . ';charset=' .$this->charset;
		$options = array(
			PDO::ATTR_PERSISTENT => true,
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			// PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			// PDO::ATTR_EMULATE_PREPARES => false,
		);
		try{
			$this->dbHandler = new PDO($conn, $this->USER, $this->PASSWORD, $options);
		}catch(PDOException $e) {
			$this->error = $e->getMessage();
			echo $this->error;
		}
	}

	// Start transaction
	public function beginTransaction() {
		return $this->dbHandler->beginTransaction();
	}

	// Commit transaction
	public function commit() {
		return $this->dbHandler->commit();
	}

	// Rollback transaction
	public function rollBack() {
		return $this->dbHandler->rollBack();
	}

	// Allows us to write queries
	public function query($sql){
		$this->statement = $this->dbHandler->prepare($sql);
	}

	// Bind values
	public function bind($parameter, $value, $type = null){
		switch (is_null($type)) {
			case is_int($value):
				$type = PDO::PARAM_INT;
				break;
			case is_bool($value):
				$type = PDO::PARAM_BOOL;
				break;
			case is_null($value):
				$type = PDO::PARAM_NULL;
				break;
			default:
				$type = PDO::PARAM_STR;
		}
		$this->statement->bindValue($parameter, $value, $type);
	}

	// Execute the prepared statement
	public function execute(){
		return $this->statement->execute();
	}

	// Return an array
	public function resultSet(){
		$this->execute();
		return $this->statement->fetchAll(PDO::FETCH_ASSOC);
	}

	// Fetch method returns array
	public function PDOARRAYFETCH(){
		$this->execute();
		return $this->statement->fetch(PDO::FETCH_ARRAY);
	}

	// Fetch single row as an object
	public function single(){
		$this->execute();
		return $this->statement->fetch(PDO::FETCH_OBJ);
	}

	// Get row count
	public function rowCount(){
		$this->execute();
		return $this->statement->rowCount();
	}

	// Method to get the last inserted ID
	public function lastInsertId(){
		return $this->dbHandler->lastInsertId();
	}

}
