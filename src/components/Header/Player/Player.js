import React, { Component, createElement } from 'react';
import style from './Player.css';
import Wrapper_btn from './Btn_play_stop/Wrapper_btn';
import PrevTrack from './PrevTrack/PrevTrack';
import NextTrack from './NextTrack/NextTrack';
import Progress_line from '../Progress_line/Progress_line';
import CurrentTime from '../Progress_line/CurrentTime/CurrentTime';
import TrackTime from '../Progress_line/TrackTime/TrackTime';
import createUrl from '../../../lib/Player/urlTrack';

import { ADD_URL , STOP, CURENT_TIME , PLAY, TRACK_DURATION , REWIND_TRACK, PERCENT_REWIND } from '../../../redux/actions/actionsTypes';
import { connect } from 'react-redux';

class Player extends Component {
    constructor(props){
        super();

        // INIT_PLAYER
        this.PLAYER = props.player;
    };

timerCurrentTime(PLAYER) {
    this.interval = setInterval(()=>{
        this.props.SetCurrentTimeTrack(Number(PLAYER.currentTime));

        this.props.SetPercentRewind(0);

        // rewind
        if (this.props.GetRewind !== 0) {
            this.props.SetCurrentTimeTrack(Number(this.props.GetRewind));
            PLAYER.currentTime = this.props.GetRewind;
            this.props.SetRewind(0);
        };

        // stoped player ,track is over
        if (Number(PLAYER.currentTime) === Number(PLAYER.duration)){
            this.pause(PLAYER);
            this.props.SetCurrentTimeTrack(0); // reset currentTimeTrack
            clearInterval(this.interval);
        };
        if (this.props.GetPlayerState === "stoped") {
            clearInterval(this.interval);
        };
    },50);
};

play = (PLAYER,currentTimeTrack) => {

    // // get src active-track
    let url = createUrl(this.props.GetFileList[this.props.GetTrackID]);
    PLAYER.src = url;

    if (url) {
        // get current time active track
        PLAYER.currentTime = Number(currentTimeTrack);

        // set trackDuration
        PLAYER.onloadedmetadata = () => {
            this.props.SetTrackDuration(PLAYER.duration);
        };

        // button PLAY state is active
        this.props.played();

        // player start
        PLAYER.play();

        // start track timer
        this.timerCurrentTime(this.PLAYER);
    };
};

pause = (PLAYER) => {
    // player pause
    PLAYER.pause();

    // button STOP state is active
    this.props.stoped();

    // clear timer track
    clearInterval(this.interval);
};

    render() {
        return (
            <div className={style.Player}>
                <div className={style.controls_track}>
                    <PrevTrack player={this.PLAYER}/>
                    <Wrapper_btn playHandler={ ()=>{this.play(this.PLAYER,this.props.GetCurrentTimeTrack)} } pauseHandler={ ()=> {this.pause(this.PLAYER)} } player={this.PLAYER}/>
                    <NextTrack player={this.PLAYER}/>
                </div>
                <div className={style.wrapperProgressLine}>
                    <CurrentTime/>
                    <Progress_line/>
                    <TrackTime/>
                </div>
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
        GetPlayerState: store.trackStartPlay.playerState,
        GetFileList: store.createTrackList.trackList,
        GetTrackID: store.trackStartPlay.currentTrackID,
    };
};

function mapDispatchToProps(dispatch){
    return {
        SetUrlCurrentTrack: (url)=> { dispatch({ type: ADD_URL , urlTrack: url  }) },
        SetCurrentTimeTrack: (currentTimeTrack)=> {dispatch({ type: CURENT_TIME , currentTimeTrack: currentTimeTrack })},
        SetTrackDuration: (trackDuration)=> { dispatch({ type: TRACK_DURATION , trackDuration: trackDuration })},
        played: () =>{ dispatch({ type: PLAY })},
        stoped: () =>{ dispatch({ type: STOP })},
        SetRewind: (momentTrack)=> dispatch({ type: REWIND_TRACK, rewind: momentTrack }),
        SetPercentRewind: (percentRewind) => dispatch({ type: PERCENT_REWIND, percentRewind: percentRewind }),
    }
};

export default connect(mapStateToProps , mapDispatchToProps)(Player);

