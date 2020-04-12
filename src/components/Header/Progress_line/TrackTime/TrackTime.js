import React, { Component } from 'react';
import style from './TrackTime.css';
import { connect } from 'react-redux';
import formatedTime from '../../../../lib/Player/formatedTime';

class TrackTime extends Component {
    render() {
        return(
            <div className={style.TrackTime}>
                {formatedTime(this.props.GetTrackDuration)}
            </div>
        );
    };
};

function mapStateToProps(store) {
    return {
        GetTrackDuration: store.trackStartPlay.trackDuration,
    };
};

export default connect(mapStateToProps, null)(TrackTime);