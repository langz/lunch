import React, { Component } from 'react';
import './App.css';
import fire from './fire';
import ax from './ax';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: [] }; // <- set up react state
  }
  componentWillMount() {
    let that = this;
    ax.getLunchForToday()
      .then(function (response) {
        let result = response.data.results;
        let restaurants = result.filter((item) => {
          return item.restaurant.objectId === 'vhYbt71R5s' ||
            item.restaurant.objectId === 'tnaU8GppPK' ||
            item.restaurant.objectId === 'bzQ7G5WKro';
        });
        restaurants.map((item) => {
          item.name = (item.restaurant.objectId === 'vhYbt71R5s') ? 'Eat the Street' : (item.restaurant.objectId === 'tnaU8GppPK') ? 'Soup' : 'Fresh 4 You';
        });
        that.setState({ restaurants: restaurants.concat(that.state.restaurants) });
        //vhYbt71R5s - Eat the Street - C/D
        //tnaU8GppPK - Soup & Sandwich - M
        //bzQ7G5WKro - Fresh 4 You - C/D
        console.log(restaurants)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Tiles items={this.state.restaurants} />
    );
  }
}

class Tile extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-top">
          <h1>
            1
          </h1>
        </div>
        <div className="card-bottom">
          <h2>
            {this.props.item.name}
          </h2>
          <p>
            {this.props.item.lunchMenuEN}
          </p>
        </div>
      </div>
    );
  }
}

class Tiles extends Component {
  render() {
    return (
      <div className="wrapper">
        {
          this.props.items.map(item => <Tile key={item.objectId} item={item} />)
        }
      </div>
    );
  }
}

export default App;