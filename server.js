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
	console.log('employee menu!');
	// inquirer.prompt({}).then();
}

function roleMenu() {
	console.log('role menu!');
}

function departmentMenu() {
	console.log('department menu!');
}

// Connect to the DB
connection.connect((err) => {
	if (err) throw err;
	console.log(`connected as id ${connection.threadId}\n`);
	mainMenu();
});
