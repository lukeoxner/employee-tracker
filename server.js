var mysql = require('mysql');
var inquirer = require('inquirer');

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

connection.connect(function (err) {
	if (err) throw err;
	mainMenu();
});

function mainMenu() {
	inquirer
		.prompt({
			name: 'choice',
			type: 'list',
			message: 'Choose a category: ',
			choices: ['Employees', 'Roles', 'Departments'],
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
			}
		});
}
