CREATE TABLE cells (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pos_x INT NOT NULL,
    pos_y INT NOT NULL,
    color VARCHAR(255) NOT NULL
);

CREATE TABLE drawing_board(  
    id int PRIMARY KEY AUTO_INCREMENT,
    property VARCHAR(50) NOT NULL,
    value TEXT
);