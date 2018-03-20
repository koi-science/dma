import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
    Modal,
    Button,
    FormControl,
    FormGroup,
    ControlLabel
} from 'react-bootstrap';

import { pointsActions } from '../_actions';

function mapStateToProps(state) {
    return {
    };
}

class ModalForm  extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    handleClick(){
        this.props.onModalClose();
    }

    handleSubmit(e) {
        e.preventDefault();
        // console.log('props', this.props);
        // this.props.dispatch(pointsActions.submit(this.state.value));
        this.props.onModalSubmit();
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.handleClick()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Point coordinates:
                        lat {this.props.point ? this.props.point.lat : undefined}
                        lng {this.props.point ? this.props.point.lng : undefined}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Water description</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.value}
                                placeholder="Enter text"
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