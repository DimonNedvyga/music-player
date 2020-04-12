import React, {Component} from 'react';
import { connect } from 'react-redux';
import style from './CurrentTime.css';
import formatedTime from '../../../../lib/Player/formatedTime';

class CurrentTime extends Component{

    render() {
    return (
            <div className={style.CurrentTime}>
                {formatedTime(this.props.GetCurrentTimeTrack)}
            </div>
        );
    };
};

function mapStateToProps(store) {
    return {
        GetCurrentTimeTrack: store.trackStartPlay.currentTimeTrack,
    };
};

export default connect(mapStateToProps, null)(CurrentTime);