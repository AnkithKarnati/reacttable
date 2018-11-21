import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

class App extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      addModalForm: false,
      editingData: {},
      name: "",
      age: "",
      area: "",
      city: "",
      addedName: "",
      addedArea: "",
      addedAge: "",
      cityNameForEdit: "",
      addCity:""
    };
  }
  // -------------------Add----------------------------
  handleAdd = () => {
    this.setState({ addModalForm: true });
  };
  selectedCity = e => {
    this.setState({ city: e.target.value });
  };
  addNameData = e => {
    this.setState({ addedName: e.target.value });
  };
  addAreaData = e => {
    this.setState({ addedArea: e.target.value });
  };
  addAgeData = e => {
    this.setState({ addedAge: e.target.value });
  };
  submitAddFormData = () => {
    const obj = {};
    obj.name = this.state.addedName;
    obj.area = this.state.addedArea;
    obj.age = this.state.addedAge;
    this.props.dispatch({
      type: "ADD_CORPORATOR_CITY",
      obj: obj,
      cityName: this.state.city
    });

    this.setState({ addModalForm: false });
  };
  closeAddModal = () => {
    this.setState({ addModalForm: false });
  };
  // -------------------Edit-----------------------------
  handleEdit = (cityData, rowId, data) => {
    this.setState({ modalIsOpen: true });
    cityData.map(row => {
      if (row.id === rowId) {
        this.setState({ editingData: row });
      }
      return null;
    });
    this.setState({ cityNameForEdit: data });
  };
  onChange = data => e => {
    const { editingData } = this.state;
    editingData[data] = e.target.value;
  };
  handleSubmit = () => {
    this.setState({ modalIsOpen: false });
    this.props.dispatch({
      type: "EDIT_CORPORATOR_CITY",
      obj: this.state.editingData,
      cityName: this.state.cityNameForEdit
    });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  // -------------------Delete----------------------------
  handleDelete = (cityData, rowId, cityName) => {
    const updatedRows = [];
    cityData.map(row => {
      if (row.id === rowId) {
      } else {
        updatedRows.push(row);
      }
      return null;
    });
    // console.log(updatedRows);
    this.props.dispatch({
      type: "DELETE_CORPORATOR_CITY",
      cityName: cityName,
      updatedRows: updatedRows
    });
  };
  enterCity =(e) => {
    this.setState({addCity:e.target.value})
  }
  addCity = () => {
    this.props.dispatch({
      type: "ADD_CITY",
      city: this.state.addCity
    });

  }
  // ------------------Table Displaying----------------------
  displayTable = corporatorsData => {
    return Object.keys(corporatorsData).map(cityKey => {
      // console.log('cityKey', cityKey);
      return (
        <table>
          <tr>
            <td>{cityKey}</td>
          </tr>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Area</td>
            <td>Age</td>
          </tr>
          {corporatorsData[cityKey].map((cityData, index) => {
            const id = index + 1;
            cityData.id = id;
            return (
              <tr>
                <td>{cityData.id}</td>
                <td>{cityData.name}</td>
                <td>{cityData.area}</td>
                <td>{cityData.age}</td>
                <td>
                  <button
                    data-target="modal1"
                    class="btn modal-trigger"
                    onClick={() =>
                      this.handleEdit(
                        corporatorsData[cityKey],
                        cityData.id,
                        cityKey
                      )
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn red darken-4"
                    onClick={() =>
                      this.handleDelete(
                        corporatorsData[cityKey],
                        cityData.id,
                        cityKey
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      );
    });
  };

  getCityOptions = () =>
    Object.keys(this.props.corporators).map(cityName => {
      return <option value={cityName}>{cityName}</option>;
    });

  render() {
    // console.log('in app', this.props.corporators);
    return (
      <div className="container section dispalytable">
        <h1>React Table</h1>
          <label>Add City:</label>
          <input type ="text" onChange={this.enterCity} />
          <div align ='right'>
            <button class="btn modal-trigger" onClick={this.addCity}>Submit</button><br />
            </div>
        <button data-target="modal1"class="btn modal-trigger"onClick={this.handleAdd}>Add </button>
        {this.displayTable(this.props.corporators)}
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            // onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            // style={customStyles}
            contentLabel="Example Modal"
          >
            <div class="right">
              <button className="btn red darken-4" align="right" onClick={this.closeModal}>close</button>
            </div>
            <form>
              Name:{" "}
              <input type="text"defaultValue={this.state.editingData.name} onChange={this.onChange("name")} />
              Area:{" "}
              <input type="text"  defaultValue={this.state.editingData.area} onChange={this.onChange("area")}  />
              Age:{" "}
              <input type="text"defaultValue={this.state.editingData.age} onChange={this.onChange("age")} />
              <button class="btn modal-trigger" onClick={this.handleSubmit}>  Submit </button>
            </form>
          </Modal>
        </div>
        <div>
          <Modal
            isOpen={this.state.addModalForm}
            // onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeAddModal}
            // style={customStyles}
            contentLabel="Example Modal"
          >
            <div>
              <div class="right">
                <button className="btn red darken-4"  align="right" onClick={this.closeAddModal}>close</button>
              </div>
              <label>Select City</label>
              <select
                class="browser-default" onChange={this.selectedCity}>
                <option value="" disabled selected>  Choose your option </option>
                {this.getCityOptions()}
              </select>
              <label>Name:</label>
              <input type="text" onChange={this.addNameData} />
              <label>Area:</label>
              <input type="text" onChange={this.addAreaData} />
              <label>Age:</label>
              <input type="text" onChange={this.addAgeData} />
              <button class="btn modal-trigger"  onClick={this.submitAddFormData}>Submit</button>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    corporators: state.tabledata.corporators
  };
};

export default connect(mapStateToProps)(App);
