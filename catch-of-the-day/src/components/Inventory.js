import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      desc: PropTypes.string,
      status: PropTypes.string,
    }),
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  };

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    // Look up the cutten store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    // claim it if theres is no owner
    if (!store.owner) {
      //save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    // set the state of the inventory component to reflect the current owner
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    console.log("Logging Out");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    // check if they are logged in
    if (!this.state.uid)
      return <Login authenticate={this.authenticate}></Login>;

    // Check if they are not the owner of the store
    if (this.state.uid !== this.state.owner)
      return (
        <div>
          <p> Sorry you are not the owner</p>
          {logout}
        </div>
      );

    // finally, they must be the onwer. Just render the invnetory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            key={key}
            updateFish={this.props.updateFish}
            fish={this.props.fishes[key]}
            index={key}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
