import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';

import { points } from './points';

import {
	Modal,
	Button,
	FormControl,
	FormGroup,
	ControlLabel
} from 'react-bootstrap';
import { mapStyle, markerStyle, popupStyle } from './style';

const GOOGLE_API_KEY = 'AIzaSyCOiFW6eUh6DV8bRP9Jh7ZpodyMJYw3bMI';


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

const PlaceData = (props) => (
    <div className="hint hint--html hint--info hint--top" style={markerStyle}>
		<div style={popupStyle} className="hint__content">
			{/*<dl className="row ">*/}
				{/*<dt className="col-lg-3" style={{paddingTop: 5}}>Description lists</dt>*/}
				{/*<dd className="col-lg-9" style={{paddingTop: 5}}>A description list is perfect for defining terms.</dd>*/}

				{/*<dt className="col-lg-3" style={{paddingTop: 5}}>Euismod</dt>*/}
				{/*<dd className="col-lg-9" style={{paddingTop: 5}}>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>*/}
			{/*</dl>*/}
			<div>{props.dsc}</div>
		</div>
	</div>
);

const  zoom = 11,
	   center = {
           lat: 59.95,
           lng: 30.33
	   };


export class MapPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
			point: {
				lat: null,
				lng: null
			},
            pointList: points
		}
	}

	handleClick(e) {
		if (this.state.showModal) {
			return;
		}
		let pointList = this.state.pointList;
        this.setState({
			showModal: true,
            point: {
                lat: e.lat,
                lng: e.lng
            },
            pointList: pointList
        });
	}

	closeModal() {
        this.setState({showModal: false});
    }

    submitModal() {
        this.createPoint(this.state.point);
    }

    createPoint(point) {
		let points = this.state.pointList.slice();
		points.push({
			id: points[points.length - 1].id++,
			coordinates: {
				lat: point.lat, lng: point.lng
			}
		});
		this.setState({
            showModal: false,
            point: {
                lat: null,
                lng: null
            },
			pointList: points
		});

	}

    render() {
		const places = this.state.pointList.map((point) => {
			const {id, coordinates, dsc } = point;
			return (
				<PlaceData
					key={id}
					lat={coordinates.lat}
					lng={coordinates.lng}
					dsc={dsc}
				/>
			);
		});
								


        return (
			<GoogleMapReact onClick={(e) => this.handleClick(e)}
				style={mapStyle}
				bootstrapURLKeys={{
					key: GOOGLE_API_KEY,
					v: '3.29'}}
				defaultCenter={center}
				defaultZoom={zoom}
			>
				{places}

				<ModalForm show={this.state.showModal}
						   point={this.state.point}
						   onModalClose={() => this.closeModal()}
						   onModalSubmit={() => this.submitModal()}
						   />
			</GoogleMapReact>
        );
    }
}

export default connect(
	mapStateToProps,
// Implement map dispatch to props
)(MapPage)

