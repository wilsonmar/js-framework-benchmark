'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

window.rowsUpdated = 0;
window.rowsMounted = 0;

export class Row extends React.Component {
	constructor(props) {
		super(props);
		this.onDelete = this.onDelete.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data !== this.props.data || nextProps.styleClass !== this.props.styleClass;
	}
//	componentDidUpdate() {
//		window.rowsUpdated++;
//	}
//	componentDidMount() {
//		window.rowsMounted++;
//	}

	onDelete() {
		this.props.onDelete(this.props.data.id);
	}
	onClick() {
		this.props.onClick(this.props.data.id);
	}

	render() {
		// onClick={this.onClick}
		// onClick={this.onDelete}
		let {styleClass, onClick, onDelete, data} = this.props;
		return (<tr className={styleClass} data-id={data.id}>
			<td className="col-md-1">{data.id}</td>
			<td className="col-md-4">
				<a >{data.label}</a>
			</td>
			<td className="col-md-1"><a ><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
			<td className="col-md-6"></td>
		</tr>);
	}
}

