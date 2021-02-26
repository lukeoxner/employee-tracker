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

// Connect to the DB
connection.connect((err) => {
	if (err) throw err;
	console.log(`connected as id ${connection.threadId}\n`);
	mainMenu();
});
