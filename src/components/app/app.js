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
			],
			term: '',
			filter: ''
		};
	}

	deleteItem = (id) => {
		this.setState(({data}) => {
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

	searchEmp = (items, term) => {
		if (term.length === 0) return items;

		return items.filter(item => {
			return item.name.indexOf(term) > -1;
		});
	}

	onUpdateSearch = (term) => {
		this.setState({term});
	}

	filterSearch = (items, filter) => {
		switch(filter) {
			case 'awardEmp':
				return items.filter(item => item.increase);
			case 'moreThan1000':
				return items.filter(item => item.salary > 1000)
			
			default:
				return items;
		}
	}

	onFilterSelect = (filter) => {
		this.setState({filter});
	}

	render() {
		const {data, term, filter} = this.state;
		const employeeLength = this.state.data.length;
		const award = this.state.data.filter(item => item.increase);
		const visibleData = this.filterSearch(this.searchEmp(data, term), filter);
		
		return (
			<div className="app">
				<AppInfo employeeLength={employeeLength} awardLength={award.length}/>
	
				<div className='search-panel'>
					<SearchPanel onUpdateSearch={this.onUpdateSearch}/>
					<AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
				</div>
	
				<EmployeesList 
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp}/>
				<EmployeesAddForm onAddEmployee={this.addEmployee}/>
			</div>
		);
	}
}

export default App;