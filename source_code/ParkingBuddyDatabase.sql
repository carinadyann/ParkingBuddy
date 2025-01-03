-- Switch to the PB_DATABASE database or create it if it doesn't exist
CREATE DATABASE IF NOT EXISTS PB_DATABASE;
USE PB_DATABASE;

-- Create ParkingLot table
CREATE TABLE ParkingLot (
    lot_id INT PRIMARY KEY AUTO_INCREMENT,
    location VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    available_spaces INT NOT NULL
);

-- Create SetupParking table
CREATE TABLE SetupParking (
    setup_id INT PRIMARY KEY AUTO_INCREMENT,
    zone ENUM('Zone 1', 'Zone 2') NOT NULL,
    parking_spot ENUM('A1', 'A2') NOT NULL,
    duration_type ENUM('00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', 'Day Pass') NOT NULL
);

-- Create User table
CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    saved_school_campus ENUM('Arizona State University',
    'California State Polytechnic University Pomona',
    'California State University Dominguez Hills',
    'California State University Fullerton',
    'California State University Long Beach',
    'California State University Los Angeles',
    'California State University Northridge',
    'California State University San Bernardino',
    'San Diego State University',
    'University of California Irvine',
    'University of California Riverside') NOT NULL
);

-- Insert data into User table
INSERT INTO User (first_name, last_name, saved_school_campus) VALUES
('Admin', 'User', 'California State University Los Angeles'),
('Firstname', 'Last Name', 'California State University Los Angeles');

-- Create UserCredentials table
CREATE TABLE UserCredentials (
    credentials_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Insert data into UserCredentials table
INSERT INTO UserCredentials (user_id, username, password) VALUES
(1, 'admin', 'password'),
(2, 'admin2', 'password');

-- Create Vehicle table
CREATE TABLE Vehicle (
    vehicle_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    license_plate VARCHAR(20) NOT NULL,
    make_model VARCHAR(100) NOT NULL,
    year ENUM('1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', 
              '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', 
              '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', 
              '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', 
              '2024') NOT NULL,
    color ENUM('White', 'Black', 'Gray', 'Silver', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Brown', 
               'Beige', 'Gold', 'Purple') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Create Reservation table
CREATE TABLE Reservation (
    reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    setup_id INT,
    reservation_datetime DATETIME NOT NULL,
    duration_minutes INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (setup_id) REFERENCES SetupParking(setup_id)
);

-- Create TransactionHistory table
CREATE TABLE TransactionHistory (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    setup_id INT,
    entry_datetime DATETIME NOT NULL,
    exit_datetime DATETIME,
    parking_fee DECIMAL(10, 2),
    payment_status ENUM('pending', 'paid') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (setup_id) REFERENCES SetupParking(setup_id)
);

-- Create Employee table
CREATE TABLE Employee (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'employee') NOT NULL
);


CREATE TABLE PaymentMethod (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    cardholder_name VARCHAR(255) NOT NULL,
    card_number VARCHAR(20) NOT NULL,
    card_type ENUM('Visa', 'Mastercard') NOT NULL,
    expiration_date CHAR(5) NOT NULL,      -- For 'MM/YY' format
    cvv VARCHAR(4) NOT NULL,               -- Store as a string
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
