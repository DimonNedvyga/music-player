import React, {Component} from 'react';
import style from './SideBar.css';
import AddTrack from './AddTrack/AddTrack';
import RecordingTrack from './RecordingTrack/RecordingTrack';

class SideBar extends Component {
    render() {
        return(
            <div className={style.SideBar}>
                 <AddTrack/> 
                <RecordingTrack/>
            </div>
        );
    };
};

export default SideBar;