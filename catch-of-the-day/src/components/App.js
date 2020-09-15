import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    const params = this.props.match.params;
    // first reenstate local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // this will add a new fish object to the current state
  addFish = (fish) => {
    // 1. take a copy of the existing state
    const fishes = { ...this.state.fishes };

    // 2. Add our new fish to that fishes
    fishes[`fish${Date.now()}`] = fish;

    // 3. set the new fishes object to state
    this.setState({ fishes }); //in ES6 if the var name and the object key are the same, then this line is equivalent to this.setState({ fishes: fishes});
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. update that state
    fishes[key] = updatedFish;

    // 3. Set that to state
    this.setState({ fishes });
  };

  addToOrder = (key) => {
    //1. take a copy of state
    const order = { ...this.state.order };
    //2. either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;

    //3. call setState to update our state
    this.setState({ order });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  deleteFish = (key) => {
    //1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. remove an item from the state
    fishes[key] = null;
    // 3. update the state
    this.setState({ fishes });
  };

  deleteFromOrder = (key) => {
    //1. take a copy of state
    const order = { ...this.state.order };
    // 2. remove an item from the state
    delete order[key];
    // 3. update the state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                addToOrder={this.addToOrder}
                details={this.state.fishes[key]}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteFromOrder={this.deleteFromOrder}
        />
        <Inventory
          loadSampleFishes={this.loadSampleFishes}
          addFish={this.addFish}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
        />
      </div>
    );
  }
}

export default App;
