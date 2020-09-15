import React from "react";

class EditFishForm extends React.Component {
  handleChange = (event) => {
    //update the fish
    //1. Take a copy of the current fish and update it
    const updateFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    };

    // call the updateFish method to update the state to mirror the input
    this.props.updateFish(this.props.index, updateFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
          type="text"
        />
        <input
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
          type="text"
        />
        <select
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option onChange={this.handleChange} value="available">
            Fresh!
          </option>
          <option onChange={this.handleChange} value="unavailable">
            Sold Out!
          </option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
          type="text"
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
