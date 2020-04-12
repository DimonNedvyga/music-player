import React , { Component } from 'react';
import Player from './Player/Player';
import style from './Header.css';
// import Progress_line from './Progress_line/Progress_line';


class Header extends Component {

render() {
    return (
            <div className={style.Header}>
                <Player player={this.props.player}/>
                {/* <Progress_line/> */}
            </div>
        );
    };
};

export default Header;