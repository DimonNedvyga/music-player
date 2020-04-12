import React , { Component } from 'react';
import style from './ButtonPlayTrack.css';
import { ID, ADD_URL , STOP, CURENT_TIME , PLAY, TRACK_DURATION , REWIND_TRACK, PERCENT_REWIND } from '../../../../redux/actions/actionsTypes';
import { connect } from 'react-redux';

class ButtonPlayTrack extends Component {
    constructor(props){
        super();

        // INIT_PLAYER
        this.PLAYER = props.player;
    };

    btn_playStop = () => {
        if (this.props.GetPlayerState === "played" && this.props.id === this.props.GetTrackID) {
            return <div className={style.stopTrack}></div>;
        } else {
            return <div className={style.playTrack}></div>;
        };
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
    
    play = (PLAYER,src) => {
        this.pause(PLAYER);
        this.props.SetTrackID(this.props.id);

        // get src active-track
        PLAYER.src = src;

         // set current time active track
         if (this.props.id !== this.props.GetTrackID) {
            PLAYER.currentTime = Number(0);
        } else if (this.props.id === this.props.GetTrackID) {
            PLAYER.currentTime = Number(this.props.GetCurrentTimeTrack);
        };
        
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
    
    pause = (PLAYER) => {
        // player pause
        PLAYER.pause();
    
        // button STOP state is active
        this.props.stoped();
    
        // clear timer track
        clearInterval(this.interval);
    };

    clickHandler = () => {
        if ( this.props.id !== this.props.GetTrackID ) {
            return this.play(this.PLAYER,this.props.src)
        } else if ( this.props.GetPlayerState === "stoped" ) {
            return this.play(this.PLAYER,this.props.src)
        } else {
            return this.pause(this.PLAYER)
        };
    };

    render() {
        return (
            <div className={style.wrap} onClick={this.clickHandler}>
                {this.btn_playStop()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonPlayTrack);