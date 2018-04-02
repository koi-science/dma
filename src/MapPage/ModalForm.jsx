import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Modal,
    Button,
    FormControl,
    FormGroup,
    ControlLabel
} from 'react-bootstrap';

import DatePicker from 'react-16-bootstrap-date-picker';


function mapStateToProps(state) {
    return {
    };
}

// TODO can be a functional component
class ModalForm  extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            observation: '',
            no3: '',
            po4: '',
            nh4: '',
            turbidity: '',
            ph: '',
            water_temperature: '',
            date: '',
            coordinates: '',
            water_type: '',


            day_temperature: '',
            location_type: '',
            location_dsc: ''
        };

        this.emptyState = JSON.parse(JSON.stringify(this.state));
    }

    handleClick(){
        this.props.onModalClose();
    }

    handleSubmit(e) {
        e.preventDefault();

        const point = {
          coordinates : {
            lat: this.props.point.lat,
            lng: this.props.point.lng
          },
          dsc: this.state
        };

        this.setState(this.emptyState);
        this.props.onModalSubmit(point);

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleNumericChange(e) {
       if (this.isNumber(e.target.value) || e.target.value === '') {
           this.handleChange(e)
       }
    }

    handleDateChange(date) {
        this.setState({date: date});
    }

    isNumber(str) {
        let pattern = /^\d+$/;
        return pattern.test(str);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.handleClick()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {/*Point coordinates:*/}
                        {/*lat {this.props.point ? this.props.point.lat : undefined}*/}
                        {/*lng {this.props.point ? this.props.point.lng : undefined}*/}
                        Add water quality report
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <FormGroup
                            controlId="formWaterReport">

                            <h5>Algae or Phytoplankton content</h5>
                            <ControlLabel>Microscope observation: </ControlLabel>
                            <FormControl
                                type="text"
                                maxlength="120"
                                name="observation"
                                value={this.state.observation}
                                onChange={(e) => this.handleChange(e)}
                            />

                            <h5>Nutrients</h5>
                            <ControlLabel>Phosphorus (PO4) mg/l: </ControlLabel>
                            <FormControl
                                type="text"
                                name="no3"
                                value={this.state.no3}
                                onChange={(e) => this.handleNumericChange(e)}
                            />

                            <ControlLabel>Nitrate (NO3) mg/l:</ControlLabel>
                            <FormControl
                                type="number"
                                min="0"
                                step="0.1"
                                name="po4"
                                value={this.state.po4}
                                onChange={(e) => this.handleNumericChange(e)}
                            />

                            <ControlLabel>Ammonia (NH4) mg/l:</ControlLabel>
                            <FormControl
                                type="number"
                                min="0"
                                step="0.1"
                                name="nh4"
                                value={this.state.nh4}
                                onChange={(e) => this.handleNumericChange(e)}
                            />

                            <h5>Other chemical parameters</h5>

                            <ControlLabel>pH: </ControlLabel>
                            <FormControl
                                type="text"
                                min="0"
                                step="0.1"
                                name="ph"
                                value={this.state.ph}
                                onChange={(e) => this.handleNumericChange(e)}
                            />
                            <ControlLabel>Turbidity: </ControlLabel>
                            <FormControl
                                type="number"
                                min="0"
                                step="0.1"
                                name="turbidity"
                                value={this.state.turbidity}
                                onChange={(e) => this.handleNumericChange(e)}
                            />

                            <ControlLabel>Water temperature: </ControlLabel>
                            <FormControl
                                type="number"
                                min="0"
                                name="water_temperature"
                                value={this.state.water_temperature}
                                onChange={(e) => this.handleNumericChange(e)}
                            />

                            <h5>Sampling information</h5>
                            <ControlLabel>Date: </ControlLabel>
                            <DatePicker
                                onChange={(date) => {this.handleDateChange(date) }}
                                name="date"
                                value={this.state.date}/>

                            {/*<ControlLabel>GPS localization or address: </ControlLabel>*/}

                            <ControlLabel>Day temperature: </ControlLabel>
                            <FormControl
                                type="number"
                                min="0"
                                name="day_temperature"
                                value={this.state.day_temperature}
                                onChange={(e) => this.handleNumericChange(e)}
                            />

                            <ControlLabel>Water body type: </ControlLabel>
                            <FormControl componentClass="select"
                                         name="water_type"
                                         value={this.state.water_type}
                                         onChange={ (e) => { this.handleChange(e) }}>
                                <option label=" " value=""></option>
                                <optgroup label="stagnated water">
                                    <option value="Stagnated water: big pond, lake">big pond, lake</option>
                                </optgroup>
                                <optgroup label="running water">
                                    <option value="Running water: river">river</option>
                                </optgroup>
                            </FormControl>

                            <ControlLabel>Location type: </ControlLabel>
                            <FormControl componentClass="select"
                                         name="location_type"
                                         value={this.state.location_type}
                                         onChange={ (e) => { this.handleChange(e) }}>
                                <option label=" " value=""></option>
                                <option value="City or urban park">City or urban park</option>
                                <option value="Natural park or forest">Natural park or forest</option>
                            </FormControl>

                            <ControlLabel>Location desription: </ControlLabel>
                            <FormControl
                                type="text"
                                maxLength="120"
                                name="location_dsc"
                                value={this.state.location_dsc}
                                onChange={(e) => this.handleChange(e)}
                            />


                        </FormGroup>
                        <FormGroup>
                        <Button type="submit" bsStyle="primary">Save changes</Button>
                    </FormGroup>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

export  default connect(
    mapStateToProps
)(ModalForm);