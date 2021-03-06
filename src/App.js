import React, { Component } from 'react';
import './App.css';
import fire from './fire';
import ax from './ax';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: [] }; // <- set up react state
    this.ref = fire.database().ref(new Date().toISOString().substring(0, 10));

  }
  componentWillMount() {
    this.firebase();
    this.fetchMenu();
  }

  firebase() {
    let that = this;
    this.ref.on('value', function (dataSnapshot) {
      let items = [];
      dataSnapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item['.key'] = childSnapshot.key;
        items.push(item);
      });
      that.setState({
        restaurants: items
      });
    });
  }

  fetchMenu() {
    //vhYbt71R5s - Eat the Street - C/D
    //tnaU8GppPK - Soup & Sandwich - M
    //bzQ7G5WKro - Fresh 4 You - C/D

    let that = this;
    ax.getLunchForToday()
      .then(function (response) {
        let result = response.data.results;
        let restaurants = result.filter((item) => {
          return item.restaurant.objectId === 'vhYbt71R5s' ||
            item.restaurant.objectId === 'tnaU8GppPK' ||
            item.restaurant.objectId === 'bzQ7G5WKro';
        });
        restaurants.forEach((item) => {
          item.name = (item.restaurant.objectId === 'vhYbt71R5s') ? 'Eat the Street' : (item.restaurant.objectId === 'tnaU8GppPK') ? 'Soup' : 'Fresh 4 You';
        });
        restaurants.forEach((element) => {
          that.ref.child(element.name).once("value", snapshot => {
            const userData = snapshot.val();
            if (!userData) {
              element.votes = 0;
              that.ref.child(element.name).set(element);
            }
          });
        });
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
  handleClick(item, e) {
    let votesUpdate = item.votes + 1;
    fire.database().ref(new Date().toISOString().substring(0, 10)).child(item['.key']).update({ votes: votesUpdate });
  }
  render() {
    return (
      <div className="card" onClick={(e) => this.handleClick(this.props.item, e)}>
        <div className="card-top">
          <h1>
            {this.props.item.votes}
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
          this.props.items.map(item => <Tile key={item.objectId} item={item} votes={this.props.votes} />)
        }
      </div>
    );
  }
}

export default App;