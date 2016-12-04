'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
const {Row} = require('./Row');
const {Store} = require('./Store');

var startTime;
var lastMeasure;
var startMeasure = function(name) {
    startTime = performance.now();
    lastMeasure = name;
}
var stopMeasure = function() {
    var last = lastMeasure;
    if (lastMeasure) {
        window.setTimeout(function () {
            lastMeasure = null;
            var stop = performance.now();
            var duration = 0;
            console.log(last+" took "+(stop-startTime));
        }, 0);
    }
}

var getParentId = function(elem) {
    while (elem) {
        if (elem.tagName==="TR") {
            return parseInt(elem.getAttribute("data-id"));
        }
        elem = elem.parentNode;
    }
    return undefined;
}

export class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {store: new Store()};
        this.select = this.select.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.updateAll = this.updateAll.bind(this);
        this.update = this.update.bind(this);
        this.addMany = this.addMany.bind(this);
        this.clear = this.clear.bind(this);
        this.swapRows = this.swapRows.bind(this);
        this.cycleDown = this.cycleDown.bind(this);
        this.cycleUp = this.cycleUp.bind(this);
        this.onClick = this.onClick.bind(this);
        this.start = 0;
    }
    printDuration() {
        stopMeasure();
    }
    componentDidUpdate() {
        this.printDuration();
    }
    componentDidMount() {
        this.printDuration();
    }
    updateAll() {
        startMeasure("updateAll");
        this.state.store.update(1);
        this.setState({store: this.state.store});
    }
    add() {
        startMeasure("add");
        this.state.store.add();
        this.setState({store: this.state.store});
    }
    update() {
        startMeasure("update");
        this.state.store.update(10);
        this.setState({store: this.state.store});
    }
    select(id) {
        startMeasure("select",id);
        this.state.store.select(id);
        this.setState({store: this.state.store});
    }
    delete(id) {
        startMeasure("delete");
        this.state.store.delete(id);
        this.setState({store: this.state.store});
    }
    addMany() {
        startMeasure("addMany");
        this.state.store.addMany();
        this.setState({store: this.state.store});
    }
    clear() {
        startMeasure("clear");
        this.state.store.clear();
        this.setState({store: this.state.store});
    }
    swapRows() {
        startMeasure("swapRows");
        this.state.store.swapRows();
        this.setState({store: this.state.store});
    }
    cycleDown() {
        startMeasure("cycleDown");
        // document.getElementsByTagName("tr")[0].style = "background-color:#dcc";
        this.state.store.cycleDown();
        this.setState({store: this.state.store});
    }
    cycleUp() {
        startMeasure("cycleUp");
        // let elems = document.getElementsByTagName("tr"); 
        // elems[elems.length-1].style = "background-color:#cdc";
        this.state.store.cycleUp();
        this.setState({store: this.state.store});
    }
    onClick(e) {
		if (e.target.className.indexOf('remove')>-1) {
			e.preventDefault();
			let id = getParentId(e.target);
			this.delete(id);
		} else if (e.target.tagName=='A') {
			e.preventDefault();
			let data_id = getParentId(e.target);
			this.select(data_id);
		}
    }
    render () {
        let rows = this.state.store.data.map((d,i) => {
            return <Row key={d.id} data={d} onClick={this.select} onDelete={this.delete} styleClass={d.id === this.state.store.selected ? 'danger':''}></Row>
        });
        return (<div className="container">
            <div className="jumbotron">
                <div className="row">
                    <div className="col-md-6">
                        <h1>React v15.4.0</h1>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="clear" onClick={this.clear}>Clear</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="add" onClick={this.add}>Append 1,000 rows</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="addmany" onClick={this.addMany}>Append 10,000 rows</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="update" onClick={this.update}>Update every 10th row</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="updateall" onClick={this.updateAll}>Update all rows</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="swaprows" onClick={this.swapRows}>Swap Rows</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="cycleup" onClick={this.cycleUp}>Cycle up</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="cycledown" onClick={this.cycleDown}>Cycle down</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table table-hover table-striped test-data">
                <tbody onClick={this.onClick}>
                    {rows}
                </tbody>
            </table>
            <span className="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
            </div>);
    }
}
