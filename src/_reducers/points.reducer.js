import { pointsConstant } from '../_constants/';

// TODO retrieve data from server
const pointList = [{
    coordinates: {
        lat: 59.95,
        lng: 30.33
    },
    dsc: {
        ph: '6.5',
        location_type: 'river',
        color: 'deep blue',
        location_dsc: '2 cm from Helsinki (on the map)',
    }
}];

export function points(state=pointList, action) {

    switch (action.type) {
        case pointsConstant.SUBMIT_REQUEST:
            return [
                ...state,
                action.point
            ];

        default:
            return state
    }
}