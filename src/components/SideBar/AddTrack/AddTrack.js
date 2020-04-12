import React, { Component } from 'react';
import style from './AddTrack.css';
import { connect } from 'react-redux';
import { ADD_URL, ADD_FILE } from '../../../redux/actions/actionsTypes';
import createUrl from '../../../lib/Player/urlTrack';

class AddTrack extends Component {
 
    choose(e) {
            let track = e.target.files[0];
            // addFile in trackList
            if (track && track.type.indexOf('audio') + 1) {
                this.props.AddTrackInList(track);
            // ------
                let url = createUrl(track);
                this.props.SetUrlCurrentTrack(url);
            };
    };
 
    render() {
        return (
            <div>
                <input type={"file"} id={"fileLoad"} accept=".mp3, .aac, .wav, .flac, .MP3, .AAC, .WAV, .FLAC" onChange={(e)=>this.choose(e)} className={style.uploadFile}/>
                <label htmlFor={"fileLoad"} className={style.AddTrack} title={"Добавить трек в плейлист"}>
                    <div className={style.btn_horizontal}></div>
                    <div className={style.btn_vertical}></div>
                </label>
            </div>
        );
    };
};

function mapDispatchToProps(dispatch){
    return {
        SetUrlCurrentTrack: (url)=> { dispatch({ type: ADD_URL , urlTrack: url }) },
        AddTrackInList: (file)=> { dispatch({ type: ADD_FILE, file: file }) },
    }
};

export default connect(null, mapDispatchToProps)(AddTrack);
