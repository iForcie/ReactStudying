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
				{ name: "John C.", salary: 800, increase: true, like: true, id: 1 },
				{ name: "Alex M.", salary: 3000, increase: false, like: false, id: 2 },
				{ name: "Carl W.", salary: 5000, increase: false, like: false, id: 3 }
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
				like: false,
				id: index + 1
			}
			const newData = [...data, newEmployee];
			return {
				data: newData
			}
		});
	}

	onToggleProp = (id, prop) => {			// for Increase and Like
		console.log(id);
		this.setState(({data}) => ({
			data: data.map(item => {
				if (item.id === id) {
					return {...item, [prop]: !item[prop]}
				}
				return item;
			})
		}));
	}

	render() {
		const employeeLength = this.state.data.length;
		const award = this.state.data.filter(item => item.increase);
		return (
			<div className="app">
				<AppInfo employeeLength={employeeLength} awardLength={award.length}/>
	
				<div className='search-panel'>
					<SearchPanel />
					<AppFilter />
				</div>
	
				<EmployeesList 
					data={this.state.data}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp}/>
				<EmployeesAddForm onAddEmployee={this.addEmployee}/>
			</div>
		);
	}
}

export default App;