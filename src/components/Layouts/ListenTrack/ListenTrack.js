import React , { Component } from 'react';
import Header from '../../Header/Header';
import TrackList from '../../TrackList/TrackList';
import SideBar from '../../SideBar/SideBar';
import Vizualization from '../../Vizualization/Vizualization';
import style from './ListenTrack.css';

class ListenTrack extends Component {
    
    render() {
        return (
            <div className={style.layout}>
                <Header className={style.Header} player={this.props.player}/>
                <TrackList player={this.props.player}/>
                <SideBar/>
                <Vizualization player={this.props.player}/>
            </div>
        );
    };
};

export default ListenTrack;