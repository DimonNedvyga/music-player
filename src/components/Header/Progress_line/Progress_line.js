import React, { Component } from 'react';
import style from './Progress_line.css';
import { connect } from 'react-redux';

import { CURENT_TIME , REWIND_TRACK, PERCENT_REWIND } from '../../../redux/actions/actionsTypes';

class Progress_line extends Component {
    constructor(){
        super();
    };

    rangePosition = (currentTime, duration ,getPercent) => {
        let rangePosition = currentTime*100/duration;
        let percentRewind = getPercent;
        if (percentRewind !== 0) {
            rangePosition = percentRewind;
        };
        let style = {background: `linear-gradient(to right, rgba(32,124,229,1) 0%, rgba(32,124,229,1) ${rangePosition}%, rgba(88,155,230,1)  ${rangePosition}%, rgba(88,155,230,1)  100%)`};
        return style;
    };

    rewind(e) {
        let elem = e.target;
        let elemClick = e.pageX;
        let elemWidth = elem.getBoundingClientRect().width;
        let elemLeft = elem.getBoundingClientRect().left;
        let percentRewind = (elemClick - elemLeft)*100/elemWidth;
        let momentTrack = percentRewind*this.props.GetTrackDuration/100;
        if (e === "onDragEnd" || "onClick") {
            this.props.SetCurrentTimeTrack(momentTrack);
            this.props.SetRewind(momentTrack);
        };
        this.props.SetPercentRewind(percentRewind);
    };

    render() {
        return (
            <div className={/*(this.props.urlTrack)? style.trackIsLoad : style.trackIsNotLoaded*/ style.trackIsLoad} draggable="false" onMouseDown={(e)=>this.rewind(e)} onDrag={(e)=>this.rewind(e)} onDragEnd={(e)=>this.rewind(e)} style={this.rangePosition(this.props.GetCurrentTimeTrack, this.props.GetTrackDuration, this.props.GetPercentRewind)}>
                {/* <div className={style.slider_Range}></div> */}
            </div>
        )
    };
};

function mapStateToProps(store) {
    return {
        GetTrackDuration: store.trackStartPlay.trackDuration,
        GetCurrentTimeTrack: store.trackStartPlay.currentTimeTrack,
        urlTrack: store.trackStartPlay.urlTrack,
        GetPercentRewind: store.trackStartPlay.percentRewind,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        SetCurrentTimeTrack: (currentTimeTrack)=> {dispatch({ type: CURENT_TIME , currentTimeTrack: currentTimeTrack })},
        SetRewind: (momentTrack)=> dispatch({ type: REWIND_TRACK, rewind: momentTrack }),
        SetPercentRewind: (percentRewind) => dispatch({ type: PERCENT_REWIND, percentRewind: percentRewind }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Progress_line);