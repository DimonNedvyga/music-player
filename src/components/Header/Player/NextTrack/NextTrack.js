import React, { Component } from 'react';
import style from './NextTrack.css';
import createUrl from '../../../../lib/Player/urlTrack';
import { ID, ADD_URL , STOP, CURENT_TIME , PLAY, TRACK_DURATION , REWIND_TRACK, PERCENT_REWIND } from '../../../../redux/actions/actionsTypes';
import { connect } from 'react-redux';

class NextTrack extends Component {
    constructor(props){
        super();
        // INIT_PLAYER
        this.PLAYER = props.player;
    };
    
    nextTrack = (PLAYER) => {
        let nextTrackIndex = this.props.GetTrackID + 1;

        if (nextTrackIndex <= this.props.GetFileList.length - 1 ) {
            
            this.props.SetTrackID(nextTrackIndex);

            // get src active-track
            let url = createUrl(this.props.GetFileList[nextTrackIndex]);
            PLAYER.src = url;
    
            // button PLAY state is active
            this.props.played();
    
            // player start
            PLAYER.play();
        };
    };


    render() {
        return (
            <div className={style.nextTrack} onClick={()=>this.nextTrack(this.PLAYER)}>
                <div className={style.next_first}></div>
                <div className={style.next_second}></div>
            </div>
        );
    };
};

function mapStateToProps(store) {
    return {
        GetPlayerState: store.trackStartPlay.playerState,
        GetUrlTrack: store.trackStartPlay.urlTrack,
        GetCurrentTimeTrack: store.trackStartPlay.currentTimeTrack,
        GetTrackDuration: store.trackStartPlay.trackDuration,
        GetRewind: store.trackStartPlay.rewind,
        GetFileList: store.createTrackList.trackList,
        GetTrackID: store.trackStartPlay.currentTrackID,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        SetUrlCurrentTrack: (url)=> { dispatch({ type: ADD_URL , urlTrack: url  }) },
        SetCurrentTimeTrack: (currentTimeTrack)=> {dispatch({ type: CURENT_TIME , currentTimeTrack: currentTimeTrack })},
        SetTrackDuration: (trackDuration)=> { dispatch({ type: TRACK_DURATION , trackDuration: trackDuration })},
        played: () =>{ dispatch({ type: PLAY })},
        stoped: () =>{ dispatch({ type: STOP })},
        SetRewind: (momentTrack)=> dispatch({ type: REWIND_TRACK, rewind: momentTrack }),
        SetPercentRewind: (percentRewind) => dispatch({ type: PERCENT_REWIND, percentRewind: percentRewind }),
        SetTrackID: (id) => dispatch({ type: ID, id: id }),       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NextTrack);