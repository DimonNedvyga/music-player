import initialState from '../Store/InitState'; 
import { ID, PLAY, STOP, CURENT_TIME, ADD_URL, TRACK_DURATION, REWIND_TRACK, PERCENT_REWIND } from '../actions/actionsTypes';


export default function trackStartPlay(state = initialState, action) {
    switch(action.type) {
        case PLAY :
            return Object.assign({}, state, {
                    playerState: "played",
              });
        case STOP :
            return Object.assign({}, state, {
                    playerState: "stoped"
              });
        case ADD_URL :
            return Object.assign({}, state, {
                urlTrack: action.urlTrack
            });
        case CURENT_TIME :
            return Object.assign({}, state, {
                   currentTimeTrack: action.currentTimeTrack,
              });
        case TRACK_DURATION :
            return Object.assign({}, state, {
                trackDuration : action.trackDuration,
              });
        case REWIND_TRACK :
            return Object.assign({}, state, {
                rewind : action.rewind,
              });
        case PERCENT_REWIND :
            return Object.assign({}, state, {
                percentRewind : action.percentRewind,
             });
        case ID :
            return Object.assign({}, state, {
                currentTrackID: action.id,
            });
        default:
          return state
    };
};