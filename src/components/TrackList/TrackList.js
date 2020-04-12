import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './TrackList.css';
import Track from './Track/Track';
import createUrl from '../../lib/Player/urlTrack';

class TrackList extends Component {

    showTracks = () => this.props.GetFileList.map((item, index, mass)=>{
        let src = createUrl(item);
        return <Track key={index} id={index} name={item.name} src={src} player={this.props.player}/>
    });

    render() {
        return (
            <div className={style.TrackList}>
                {this.showTracks()}
            </div>
        );
    };
};

function mapStateToProps(store) {
    return {
        GetUrlTrack: store.trackStartPlay.urlTrack,
        GetCurrentTimeTrack: store.trackStartPlay.currentTimeTrack,
        GetTrackDuration: store.trackStartPlay.trackDuration,
        GetRewind: store.trackStartPlay.rewind,
        GetFileList: store.createTrackList.trackList,
    };
};

export default connect(mapStateToProps , null)(TrackList);