USE staff;

INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('Marketing');

INSERT INTO role (title, salary, department_id) VALUES ('Junior Engineer', 70000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Senior Engineer', 130000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('VP of Engineering', 190000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Junior Salesperson', 50000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Senior Salesperson', 125000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('VP of Sales', 170000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Junior Marketing Executive', 40000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Senior Marketing Executive', 90000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('VP of Marketing', 150000, 3);

INSERT INTO employee (first_name, last_name, role_id) VALUES ('Elon', 'Musk', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Jordan', 'Belfort', 6);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Gary', 'Vaynerchuk', 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Allie', 'Miller', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Gordon', 'Gekko', 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Lynn', 'Jones', 8, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Kevin', 'Stelly', 1, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Stevan', 'McAleer', 4, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Todd', 7, 6);