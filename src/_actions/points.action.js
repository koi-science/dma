import { pointsConstant } from '../_constants'

export const pointsActions = {
  submit
};

function submit(point) {
    return {
        type: pointsConstant.SUBMIT_REQUEST,
        point
    }
}