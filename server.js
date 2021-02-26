var mysql = require('mysql');
var express = require('express');
var inquirer = require('inquirer');
var conTab = require('console.table');

var connection = mysql.createConnection({
	host: 'localhost',

	// Your port; if not 3306
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: 'password',
	database: 'staffDB',
});

// declaring function used to enable main menu functionality
function mainMenu() {
	inquirer
		.prompt({
			name: 'choice',
			type: 'list',
			message: 'Choose a category: ',
			choices: ['Employees', 'Roles', 'Departments', 'Exit Program'],
		})
		.then(function (answer) {
			switch (answer.choice) {
				case 'Employees':
					employeeMenu();
					break;
				case 'Roles':
					roleMenu();
					break;
				case 'Departments':
					departmentMenu();
					break;
				case 'Exit Program':
					connection.end();
					break;
			}
		});
}

function employeeMenu() {
	inquirer
		.prompt({
			name: 'choice',
			type: 'list',
			message: 'What would you like to do?',
			choices: [
				'View all employees',
				'Add an employee',
				'Update employee role',
			],
		})
		.then((answer) => {
			switch (answer.choice) {
				case 'View all employees':
					viewAllEmployees();
					break;
				case 'Add an employee':
					addEmployee();
					break;
				case 'Update employee role':
					updateRole();
					break;
			}
		});
}

function roleMenu() {
	inquirer
		.prompt({
			name: 'choice',
			type: 'list',
			message: 'What would you like to do?',
			choices: ['View all roles', 'Add a role'],
		})
		.then((answer) => {
			switch (answer.choice) {
				case 'View all roles':
					viewAllRoles();
					break;
				case 'Add a role':
					addRole();
					break;
			}
		});
}

function departmentMenu() {
	inquirer
		.prompt({
			name: 'choice',
			type: 'list',
			message: 'What would you like to do?',
			choices: ['View all departments', 'Add a department'],
		})
		.then((answer) => {
			switch (answer.choice) {
				case 'View all departments':
					viewAllDepartments();
					break;
				case 'Add a department':
					addDepartment();
					break;
			}
		});
}

// declaring function that enables viewing all employees
function viewAllEmployees() {
	let query = `SELECT employee.id, employee.first_name, employee.last_name, title, department.name AS department, salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id ORDER BY employee.id`;

	connection.query(query, (err, res) => {
		if (err) throw err;
		console.table(res);
		mainMenu();
	});
}

function addEmployee() {}

function updateRole() {}

// declaring function that allows us to view all roles
function viewAllRoles() {
	let query = `SELECT role.id, title, salary, name AS department FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id`;

	connection.query(query, (err, res) => {
		if (err) throw err;
		console.table(res);
		mainMenu();
	});
}

function addRole() {}

// declaring function that allows us to view departments
function viewAllDepartments() {
	let query = `SELECT * FROM department ORDER BY id`;
	connection.query(query, (err, res) => {
		if (err) throw err;
		console.table(res);
		mainMenu();
	});
}

// declaring function to add a new department
function addDepartment() {
	inquirer
		.prompt({
			name: 'choice',
			type: 'input',
			message: 'What department would you like to add?',
		})
		.then((answer) => {
			let query = 'INSERT INTO department SET ?';
			connection.query(query, { name: answer.choice }, (err, res) => {
				if (err) throw err;
				console.log('Department added!');
				mainMenu();
			});
		});
}

// Connect to the DB
connection.connect((err) => {
	if (err) throw err;
	console.log(`connected as id ${connection.threadId}\n`);
	mainMenu();
});
