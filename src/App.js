/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');

var dataGenerator = require('./dataGenerator');
var Pagination = require('./Pagination');
var Chart = require('./Chart');

require('./App.less');

var App = React.createClass({
  getInitialState: function() {
    var domain = [0, 30];
    return {
      data: this.getData(domain),
      domain: {x: domain, y: [0, 100]},
      tooltips: [],
      prevDomain: null
    };
  },

  _allData: dataGenerator.generate(50),

  getData: function(domain) {
    return _.filter(this._allData, function(d) {
      return d.x >= domain[0] && d.x <= domain[1];
    });
  },

  render: function() {
    return (
      <div className="App">
        <p>Chart</p>
        <Pagination
          appState={this.state}
          setAppState={this.setAppState}
          getData={this.getData} />
        <Chart
          data={this.state.data}
          domain={this.state.domain}
          tooltips={this.state.tooltips}
          prevDomain={this.state.prevDomain} />
      </div>
    );
  },

  setAppState: function(partialState, callback) {
    return this.setState(partialState, callback);
  }
});

module.exports = App;