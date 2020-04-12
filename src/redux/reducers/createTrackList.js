import { ADD_FILE } from '../actions/actionsTypes';

const initialState = {
    trackList: [],
};  

export default function createTrackList(state = initialState, action) {
    switch(action.type) {
        case ADD_FILE :
            let mass = state.trackList;
            mass.push(action.file);
            return Object.assign({}, state, {
                    trackList: mass,
              });
        default:
          return state
    };
};