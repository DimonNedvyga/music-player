import { combineReducers } from 'redux'
import trackStartPlay from './reducers/trackStartPlay';
import createTrackList from './reducers/createTrackList';

export default combineReducers({
    createTrackList: createTrackList,
    trackStartPlay: trackStartPlay, 
});