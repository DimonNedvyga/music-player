import React , { Component } from 'react';
import style from './Track.css';
import ButtonPlayTrack from './ButtonPlayTrack/ButtonPlayTrack';

class Track extends Component {

        textCut = (name) => {
            if( name.length > 40) {
                    return name.slice(0,40) + "...";
                } else {
                    return name;
                };
        };

    render() {
        return (
            <div className={style.Track}>
                <ButtonPlayTrack className={style.btn_play} id={this.props.id} src={this.props.src} player={this.props.player}/>
                <span className={style.name}>
                    <p className={style.nameBand}>
                        Track
                    </p>
                    <p className={style.nameSong}>
                        {this.textCut(this.props.name)}
                    </p>
                </span>
                <span className={style.timeSong}>
                    {/* 3:00 */}
                        {this.props.duration}
                    </span>
            </div>
        );
    };
};

export default Track;