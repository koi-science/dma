import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { pointsActions } from '../_actions';

// components
import ModalForm from './ModalForm';
//style
import {
	mapStyle,
	markerStyle,
	popupStyle
} from './style';
//other
const GOOGLE_API_KEY = 'AIzaSyCOiFW6eUh6DV8bRP9Jh7ZpodyMJYw3bMI';


const PlaceData = (props) => {

    const no3 = props.dsc.no3 ? (
		<div className="row">
			<dt className="col-lg-3" style={{paddingTop: 5}}>NO3</dt>
			<dd className="col-lg-9" style={{paddingTop: 5}}>{props.dsc.no3}</dd>
		</div>
    ) : null;

    const po4 = props.dsc.po4 ? (
		<div className="row">
			<dt className="col-lg-3" style={{paddingTop: 5}}>PO4</dt>
			<dd className="col-lg-9" style={{paddingTop: 5}}>{props.dsc.po4}</dd>
		</div>
    ) : null;

    const turbidity = props.dsc.turbidity ? (
		<div className="row">
			<dt className="col-lg-3" style={{paddingTop: 5}}>Turbidity</dt>
			<dd className="col-lg-9" style={{paddingTop: 5}}>{props.dsc.turbidity}</dd>
		</div>
    ) : null;

    const ph = props.dsc.ph ? (
		<div className="row">
			<dt className="col-lg-3" style={{paddingTop: 5}}>pH</dt>
			<dd className="col-lg-9" style={{paddingTop: 5}}>{props.dsc.ph}</dd>
		</div>
    ) : null;

    const location_type = props.dsc.location_type ? (
		<div className="row">
			<dt className="col-lg-3" style={{paddingTop: 5}}>Type of location</dt>
			<dd className="col-lg-9" style={{paddingTop: 5}}>{props.dsc.location_type}</dd>
		</div>
    ) : null;

    const color = props.dsc.color ? (
		<div className="row">
			<dt className="col-lg-3" style={{paddingTop: 5}}>Water color</dt>
			<dd className="col-lg-9" style={{paddingTop: 5}}>{props.dsc.color}</dd>
		</div>
    ) : null;

    const location_dsc = props.dsc.location_dsc ? (
		<div className="row">
			<dt className="col-lg-3" style={{paddingTop: 5}}>Description of location</dt>
			<dd className="col-lg-9" style={{paddingTop: 5}}>{props.dsc.location_dsc}</dd>
		</div>
    ) : null;

    const season = props.dsc.season ? (
		<div className="row">
			<dt className="col-lg-3" style={{paddingTop: 5}}>Season</dt>
			<dd className="col-lg-9" style={{paddingTop: 5}}>{props.dsc.season}</dd>
		</div>
    ) : null;

    const temperature = props.dsc.temperature ? (
		<div className="row">
			<dt className="col-lg-3" style={{paddingTop: 5}}>Temperature</dt>
			<dd className="col-lg-9" style={{paddingTop: 5}}>{props.dsc.temperature}</dd>
		</div>
    ) : null;

    return (
		<div className="hint hint--html hint--info hint--top" style={markerStyle}>
			<div style={popupStyle} className="hint__content">
				<dl>
					{no3}
					{po4}
					{turbidity}
					{ph}
					{location_type}
					{color}
					{location_dsc}
					{season}
					{temperature}
				</dl>
			</div>
		</div>
    )
};

const  zoom = 11,
	   center = {
           lat: 59.95,
           lng: 30.33
	   };

class MapPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
			point: {
				lat: null,
				lng: null
			}
		}
	}

	handleClick(e) {
		if (this.state.showModal) {
			return;
		}
        this.setState({
			showModal: true,
            point: {
                lat: e.lat,
                lng: e.lng
            }
        });
	}

	closeModal() {
        this.setState({showModal: false});
    }

    submitModal(point) {
        this.createPoint(point);
    }

    createPoint(point) {
		this.props.dispatch(pointsActions.submit(point));
		this.setState({
            showModal: false,
		});
	}

    render() {

        const places = this.props.points.map((point, index) => {
			const { coordinates, dsc } = point;
			return (
				<PlaceData
					key={index}
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
						   onModalSubmit={(point) => this.submitModal(point)}
						   />
			</GoogleMapReact>
        );
    }
}

function mapStateToProps(state) {
    return {
        points: state.points
    };
}

const connectedMapPage = connect(mapStateToProps)(MapPage);
export { connectedMapPage as MapPage };

