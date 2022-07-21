import "./app-info.css";

const AppInfo = ({employeeLength, awardLength}) => {
	return (
		<div className="app-info">
			<h1>Учёт сотрудников в компании </h1>
			<h2>Общее число сотрудников: {employeeLength}</h2>
			<h2>Премию получат: {awardLength}</h2>
		</div>
	)
};

export default AppInfo;