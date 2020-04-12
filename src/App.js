import React , { Component } from 'react';
import ListenTrack from './components/Layouts/ListenTrack/ListenTrack';

class App extends Component {
    constructor(props){
        super();

        // INIT_PLAYER
        this.PLAYER = new Audio;
    };
    render() {
        return (
            <ListenTrack player={this.PLAYER}/>
        );
    };
};

export default App;
