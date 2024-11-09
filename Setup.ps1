# Define MySQL credentials
$mysqlUser = "root"
$mysqlPassword = "srdeepuN67*"
$mysqlHost = "localhost"
$databaseName = "healthdb"

# Detect OS and set MySQL path accordingly
if ($IsWindows) {
    # Windows MySQL path
    $mysqlPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
} elseif ($IsMacOS) {
    # macOS MySQL path
    $mysqlPath = "/usr/local/mysql/bin/mysql"
} else {
    Write-Host "Unsupported OS"
    exit 1
}

# SQL command to create the database
$sqlCreateDatabase = @"
CREATE SCHEMA IF NOT EXISTS $databaseName;
USE $databaseName;
"@

try {
    # Create the database
    & $mysqlPath -u $mysqlUser -p"$mysqlPassword" -h $mysqlHost -e $sqlCreateDatabase
    Write-Host "Database created successfully"
} catch {
    Write-Host "Failed to create database"
    exit 1
}

# SQL command to create the patient table
$sqlCreateTable = @"
CREATE TABLE IF NOT EXISTS $databasename.tbl_patient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(200),
    middle_name	VARCHAR(200),
    last_name	VARCHAR(200),
    dob	DATE,
    age	SMALLINT,
    address	VARCHAR(200),
    password VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone_no VARCHAR(11),
    history	JSON
    );
"@

try {
    # Create the patient table
    & $mysqlPath -u $mysqlUser -p"$mysqlPassword" -h $mysqlHost -e $sqlCreateTable
    Write-Host "Table created successfully"
} catch {
    Write-Host "Failed to create table"
    exit 1
}

# SQL command to insert sample data
$sqlInsertData = @"
INSERT INTO $databasename.tbl_patient (
    id, first_name, middle_name, last_name, dob, age, email, phone_no, address, password, history
) VALUES (
    1, 'John', 'Adams', 'Doe', '1998-05-14', 35, 'john.doe@example.com', '3025551234', '123 Elm St, Springfield, IL', 'password123', NULL
);

INSERT INTO $databasename.tbl_patient (
    id, first_name, middle_name, last_name, dob, age, email, phone_no, address, password, history
) VALUES (
    2, 'Jane', 'Anne', 'Smith', '1996-11-23', 28, 'jane.smith@example.com', '1115555678', '456 Oak St, Springfield, IL', 'password456', NULL
);

INSERT INTO $databasename.tbl_patient (
    id, first_name, middle_name, last_name, dob, age, email, phone_no, address, password, history
) VALUES (
    3, 'Michael', 'Cuthbert', 'Johnson', '1982-07-07', 42, 'michael.johnson@example.com', '7045559012', '789 Pine St, Springfield, NC', 'password789', NULL
);
"@

try {
    # Insert sample data
    & $mysqlPath -u $mysqlUser -p"$mysqlPassword" -h $mysqlHost -e $sqlInsertData
    Write-Host "Sample patient data inserted successfully"
} catch {
    Write-Host "Failed to insert sample patient data"
    exit 1
}

$sqlCreateTable = @"
CREATE TABLE IF NOT EXISTS $databasename.tbl_doctor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(200),
    middle_name	VARCHAR(200),
    last_name	VARCHAR(200),
    dob	DATE,
    age	SMALLINT,
    address	VARCHAR(200),
    password VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone_no VARCHAR(13),
    specialization	VARCHAR(200),
    licensed_year DATE,
    licensed_by	VARCHAR(200),
    schedule JSON,
    rating	DECIMAL(10,2)
    );
"@

try {
    # Create the doctor table
    & $mysqlPath -u $mysqlUser -p"$mysqlPassword" -h $mysqlHost -e $sqlCreateTable
    Write-Host "Doctor table created successfully"
} catch {
    Write-Host "Failed to create Doctor table"
    exit 1
}

# SQL command to insert sample data
$sqlInsertData = @"
INSERT INTO $databasename.tbl_doctor (
    id, first_name, middle_name, last_name, dob, age, email, phone_no, address, password, specialization, licensed_year, licensed_by, schedule, rating
) VALUES (
    12, 'Joseph', 'A.', 'Dore', '1978-05-15', 45, 'joseph.dore@example.com', '+17043635513', '123 Main St, Anytown, USA', 'securepassword', 'Neurology', '2005-06-20', 'North Carolina Medical Board', '{"Monday":[{"end":"2:30pm","start":"2pm","hospital":1}],"Tuesday":[{"end":"2:30pm","start":"2pm","hospital":1},{"end":"9:30pm","start":"1pm","hospital":2}]}', 3.8
);

INSERT INTO $databasename.tbl_doctor (
    id, first_name, middle_name, last_name, dob, age, email, phone_no, address, password, specialization, licensed_year, licensed_by, schedule, rating
) VALUES (
    "Aniket", "S.", "Shendre", "1998-05-14", 35, "aniket.shendre@example.com", "+17043635513", "123 Elm St, Springfield, IL", "password123", "Cardiology", "2005-06-20", "North Carolina Medical Board", '{"Monday":[{"end":"2:30pm","start":"2pm","hospital":1}],"Tuesday":[{"end":"2:30pm","start":"2pm","hospital":1},{"end":"9:30pm","start":"1pm","hospital":2}]}', 4.5
"@

try {
    # Insert sample data
    & $mysqlPath -u $mysqlUser -p"$mysqlPassword" -h $mysqlHost -e $sqlInsertData
    Write-Host "Sample doctor data inserted successfully"
} catch {
    Write-Host "Failed to insert sample doctor data"
    exit 1
}

$sqlCreateTable = @"
CREATE TABLE IF NOT EXISTS $databasename.tbl_hospital (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200),
    county VARCHAR(100),
    state CHAR(2),
    beds_total INT,
    beds_available INT,
    UNIQUE (name, county, state)
    );
"@

try {
    # Create the hospital table
    & $mysqlPath -u $mysqlUser -p"$mysqlPassword" -h $mysqlHost -e $sqlCreateTable
    Write-Host "Hospital table created successfully"
} catch {
    Write-Host "Failed to create Hospital table"
    exit 1
}

# SQL command to insert sample data
$sqlInsertData = @"
INSERT INTO $databasename.tbl_hospital (
    id, name, county, state, street, beds_total, beds_available
) VALUES (
    1, 'General Hospital', 'Orange', 'CA', '123 Elm St', 10, 3
);

INSERT INTO $databasename.tbl_hospital (
    id, name, county, state, street, beds_total, beds_available
) VALUES (
    2, 'County Medical Center', 'Dallas', 'TX', '456 Oak St', 300, 50
);

INSERT INTO $databasename.tbl_hospital (
    id, name, county, state, street, beds_total, beds_available
) VALUES (
    3, 'St. Mary's Hospital', 'Maricope', 'AZ', '789 Pine St', 150, 20
);

INSERT INTO $databasename.tbl_hospital (
    id, name, county, state, street, beds_total, beds_available
) VALUES (
    4, 'Northside Hospital', 'Cook', 'IL', '1010 Maple St', 200, 100
);

INSERT INTO $databasename.tbl_hospital (
    id, name, county, state, street, beds_total, beds_available
) VALUES (
    5, 'City Hospital', 'King', 'WA', '2020 Oak St', 150, 50
);
"@

try {
    # Insert sample data
    & $mysqlPath -u $mysqlUser -p"$mysqlPassword" -h $mysqlHost -e $sqlInsertData
    Write-Host "Sample hospital data inserted successfully"
} catch {
    Write-Host "Failed to insert sample hospital data"
    exit 1
}

$sqlCreateTable = @"
CREATE TABLE IF NOT EXISTS $databasename.tbl_appointment (
   id INT PRIMARY KEY AUTO_INCREMENT,
   tbl_doctor_id INT,
  tbl_patient_id INT,
  tbl_hospital_id INT,
  start_time DATETIME,
  end_time DATETIME,
  type VARCHAR(100),
  reason VARCHAR(100),
  notes VARCHAR(2000),
  symptoms VARCHAR(500),
  FOREIGN KEY (tbl_doctor_id) REFERENCES tbl_doctor(id) ON DELETE CASCADE,
  FOREIGN KEY (tbl_patient_id) REFERENCES tbl_patient(id) ON DELETE CASCADE,
  FOREIGN KEY (tbl_hospital_id) REFERENCES tbl_hospital(id) ON DELETE CASCADE
)
"@

try {
    # Create the appointment table
    & $mysqlPath -u $mysqlUser -p"$mysqlPassword" -h $mysqlHost -e $sqlCreateTable
    Write-Host "Appointment table created successfully"
} catch {
    Write-Host "Failed to create Appointment table"
    exit 1
}

$sqlCreateTable = @"
CREATE TABLE $databasename.tbl_department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200),
  tbl_hospital_id INT,
  FOREIGN KEY (tbl_hospital_id) REFERENCES tbl_hospital(id) ON DELETE CASCADE
) 
"@

try {
    # Create the department table
    & $mysqlPath -u $mysqlUser -p"$mysqlPassword" -h $mysqlHost -e $sqlCreateTable
    Write-Host "Department table created successfully"
} catch {
    Write-Host "Failed to create Department table"
    exit 1
}

$sqlCreateTable = @"
CREATE TABLE $databasename.tbl_doctor_department (
  doctor_id int NOT NULL,
  department_id int NOT NULL,
  PRIMARY KEY (doctor_id,department_id)
) 
"@

try {
    # Create the doctor_department table
    & $mysqlPath -u $mysqlUser -p"$mysqlPassword" -h $mysqlHost -e $sqlCreateTable
    Write-Host "Doctor_department table created successfully"
} catch {
    Write-Host "Failed to create Doctor_department table"
    exit 1
}


Write-Host "Setup completed successfully"
