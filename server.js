var mysql = require('mysql');
var inquirer = require('inquirer');
var conTab = require('console.table');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'staffDB',
});

// Connecting to the database
connection.connect((err) => {
	if (err) throw err;
	mainMenu();
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

// declaring function for employee submenu
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

// declaring function for role submenu
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

// declaring function for department submenu
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

// declaring function that enables adding a new employee
function addEmployee() {
	connection.query('SELECT title, id FROM role', (err, res) => {
		if (err) throw err;
		let titles = res;

		connection.query(
			`SELECT CONCAT(first_name, " ", last_name) AS name, id FROM employee`,
			(err, res) => {
				if (err) throw err;

				let managers = res;
				managers.unshift({ name: 'No Manager', id: 0 });

				inquirer
					.prompt([
						{
							name: 'firstName',
							type: 'input',
							message: "Enter the employee's first name:",
						},
						{
							name: 'lastName',
							type: 'input',
							message: "Enter the employee's last name:",
						},
						{
							name: 'role',
							type: 'list',
							message: "Enter the employee's role:",
							choices: titles.map((titles) => titles.title),
						},
						{
							name: 'daBoss',
							type: 'list',
							message:
								"Enter the employee's manager (if they don't have one, select 'No Manager'):",
							choices: managers.map((names) => names.name),
						},
					])
					.then((answers) => {
						let roleId = titles.filter(
							(roles) => roles.title === answers.role
						)[0].id;

						let managerId = managers.filter(
							(names) => names.name === answers.daBoss
						)[0].id;

						let newEmployee = {
							first_name: answers.firstName,
							last_name: answers.lastName,
							role_id: roleId,
						};
						if (managerId != 0) {
							newEmployee.manager_id = managerId;
						}
						connection.query(
							'INSERT INTO employee SET ?',
							newEmployee,
							(err, res) => {
								if (err) throw err;
								console.log('New employee added!');
								mainMenu();
							}
						);
					});
			}
		);
	});
}

// declaring function that enables changing employee role
function updateRole() {
	connection.query('SELECT title, id FROM role', (err, res) => {
		if (err) throw err;
		let titles = res;

		connection.query(
			`SELECT CONCAT(first_name, " ", last_name) AS name, id FROM employee`,
			(err, res) => {
				if (err) throw err;
				let currentEmployees = res;

				inquirer
					.prompt([
						{
							name: 'employee',
							type: 'list',
							message: 'Select the employee whose role you want to change:',
							choices: currentEmployees.map((names) => names.name),
						},

						{
							name: 'title',
							type: 'list',
							message: 'Select a new role for the employee:',
							choices: titles.map((titles) => titles.title),
						},
					])
					.then((response) => {
						let roleId = titles.filter((el) => el.title === response.title)[0]
							.id;

						let id = currentEmployees.filter(
							(names) => names.name === response.employee
						)[0].id;

						connection.query(
							'UPDATE employee SET ? WHERE ?',
							[{ role_id: roleId }, { id: id }],
							(err, res) => {
								if (err) throw err;
								console.log('Employee role updated!');
								mainMenu();
							}
						);
					});
			}
		);
	});
}

// declaring function that allows us to view all roles
function viewAllRoles() {
	let query = `SELECT role.id, title, salary, name AS department FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id`;

	connection.query(query, (err, res) => {
		if (err) throw err;
		console.table(res);
		mainMenu();
	});
}

// declaring function to add new role
function addRole() {
	connection.query('SELECT name, id FROM department', (err, res) => {
		if (err) throw err;
		inquirer
			.prompt([
				{
					name: 'department',
					type: 'list',
					message: 'Select a department for the new role:',
					choices: res.map((names) => names.name),
				},
				{
					name: 'role',
					type: 'input',
					message: 'Enter a name for the new role:',
				},
				{
					name: 'salary',
					type: 'input',
					message:
						'Enter a salary for the new role (numeric values only, please!):',
				},
			])
			.then((answers) => {
				let id = res.filter((names) => names.name === answers.department)[0].id;

				let role = {
					title: answers.role,
					salary: parseInt(answers.salary),
					department_id: id,
				};

				connection.query('INSERT INTO role SET ?', role, (err, res) => {
					if (err) throw err;
					console.log('New role added!');
					mainMenu();
				});
			});
	});
}

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
			message: 'Enter a name for the new department:',
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
