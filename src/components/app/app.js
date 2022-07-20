import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import "./app.css";

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data : [
				{ name: "John C.", salary: 800, increase: true, id: 1 },
				{ name: "Alex M.", salary: 3000, increase: false, id: 2 },
				{ name: "Carl W.", salary: 5000, increase: false, id: 3 }
			]
		};
	}

	deleteItem = (id) => {
		this.setState(({data}) => {
			// const index = data.findIndex(elem => elem.id === id);

			// const before = data.slice(0, index);
			// const after = data.slice(index + 1);

			// const newArr = [...before, ...after];

			return {
				data: data.filter(item => item.id !== id)
			}
		})
	}

	addEmployee = (inputName, inputSalary) => {
		this.setState(({data}) => {
			const index = data[data.length-1].id;
			const newEmployee = {
				name: inputName,
				salary: inputSalary,
				increase: false,
				id: index + 1
			}
			const newData = [...data, newEmployee];
			return {
				data: newData
			}
		});
	}

	render() {
		return (
			<div className="app">
				<AppInfo />
	
				<div className='search-panel'>
					<SearchPanel />
					<AppFilter />
				</div>
	
				<EmployeesList 
					data={this.state.data}
					onDelete={this.deleteItem}/>
				<EmployeesAddForm onAddEmployee={this.addEmployee}/>
			</div>
		);
	}
}

export default App;