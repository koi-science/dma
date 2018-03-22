import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Modal,
    Button,
    FormControl,
    FormGroup,
    ControlLabel
} from 'react-bootstrap';


function mapStateToProps(state) {
    return {
    };
}

// TODO can be a functional component
class ModalForm  extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            no3: '',
            po4: '',
            turbidity: '',
            ph: '',
            location_type: '',
            color: '',
            location_dsc: '',
            season: '',
            temperature: ''
        }
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

        this.props.onModalSubmit(point);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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

                            <ControlLabel>NO3 concentration</ControlLabel>
                            <FormControl
                                type="number"
                                min="0"
                                name="no3"
                                value={this.state.no3}
                                onChange={(e) => this.handleChange(e)}
                            />

                            <ControlLabel> PO4 concentration</ControlLabel>
                            <FormControl
                                type="number"
                                min="0"
                                name="po4"
                                value={this.state.po4}
                                onChange={(e) => this.handleChange(e)}
                            />

                            <ControlLabel>Turbidity</ControlLabel>
                            <FormControl
                                type="number"
                                min="0"
                                name="turbidity"
                                value={this.state.turbidity}
                                onChange={(e) => this.handleChange(e)}
                            />

                            <ControlLabel>pH value</ControlLabel>
                            <FormControl
                                type="text"
                                min="0"
                                name="ph"
                                value={this.state.ph}
                                onChange={(e) => this.handleChange(e)}
                            />

                            <ControlLabel>Type of location</ControlLabel>
                            <FormControl
                                type="text"
                                name="location_type"
                                value={this.state.location}
                                onChange={(e) => this.handleChange(e)}
                            />

                            <ControlLabel>Color of the surface water</ControlLabel>
                            <FormControl
                                type="text"
                                name="color"
                                value={this.state.color}
                                onChange={(e) => this.handleChange(e)}
                            />

                            <ControlLabel>Description of location</ControlLabel>
                            <FormControl
                                type="text"
                                name="location_dsc"
                                value={this.state.location}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <ControlLabel>Season</ControlLabel>
                            <FormControl
                                type="text"
                                name="season"
                                value={this.state.season}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <ControlLabel>Temperature of the day</ControlLabel>
                            <FormControl
                                type="text"
                                name="temperature"
                                value={this.state.temperature}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <FormControl.Feedback />
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