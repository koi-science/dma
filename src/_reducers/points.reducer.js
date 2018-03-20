import { pointsConstant } from '../_constants/';

const pointList = [{
    id: 1,
    coordinates: {
        lat: 59.95,
        lng: 30.33
    },
    dsc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
    'Praesent cursus cursus felis, ac consequat erat tincidunt eu.' +
    ' Vivamus efficitur placerat nibh. Sed mattis dapibus odio nec faucibus.'
}]

export function points(state=pointList, action) {
    switch (action.type) {
        case pointsConstant.SUBMIT_REQUEST:
            return {
                text: action.text
            };

        default:
            return state
    }
}