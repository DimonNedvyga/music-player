import React, { Component } from 'react';
import style from './Wrapper_btn.css';
import { connect } from 'react-redux';
import { PLAY, STOP, } from '../../../../redux/actions/actionsTypes';

class Wrapper_btn extends Component {

    playAndStop = () => {
        function played(props){
            props.playHandler();
        };
        function paused(props) {
            props.pauseHandler();
        };
        if (this.props.GetPlayerState === "stoped" ) {
            return (
            <div className={style.Wrapper_btn} onClick={()=>played(this.props)}>
               <div className={style.play_btn}></div>
            </div>
            );
        } else {
            return (
            <div className={style.Wrapper_btn} onClick={()=>paused(this.props)}>
               <div className={style.stop_btn}></div>
            </div>
            );
        };
    };

    render() {
        return (
            <React.Fragment>
                {this.playAndStop()}
            </React.Fragment> 
        );
    };
};

function mapStateToProps(store) {
    return {
        GetPlayerState: store.trackStartPlay.playerState,
    };
};

function mapDispatchToProps(dispatch){
    return {
        played: () =>{ dispatch({ type: PLAY })},
        stoped: () =>{ dispatch({ type: STOP })},
    }
};

export default connect(mapStateToProps , mapDispatchToProps)(Wrapper_btn);