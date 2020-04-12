import React , { Component } from 'react';
import { connect } from 'react-redux';
import vizualization from '../../lib/Player/vizualiztion';

class Vizualization extends Component {
    constructor(props){
        super();

        // INIT_PLAYER
        this.PLAYER = props.player;
    };

    // viz(PLAYER){
    //     var an= this;
    //       AudioContext = window.AudioContext || window.webkitAudioContext;

    //     //Создание источника
    //     this.audio = PLAYER;
    //   //   this.audio.src = "test1.ogg";
    //   //   this.controls = true;
    //     //Создаем аудио-контекст
    //     this.context = new AudioContext();
    //     this.node = this.context.createScriptProcessor(2048, 1, 1);
    //     //Создаем анализатор
    //     this.analyser = this.context.createAnalyser();
    //     this.analyser.smoothingTimeConstant = 0.3;
    //     this.analyser.fftSize = 512;
    //     this.bands = new Uint8Array(this.analyser.frequencyBinCount);
        
    //     //Подписываемся на событие
    //     // this.audio.addEventListener('canplay', function () {

    //     if (this.props.GetPlayerState === "played") {
    //         console.log("start");
    //         //отправляем на обработку в  AudioContext 
    //        an.source = an.context.createMediaElementSource(PLAYER);
    //        //связываем источник и анализатором
    //        an.source.connect(an.analyser);
    //        //связываем анализатор с интерфейсом, из которого он будет получать данные
    //        an.analyser.connect(an.node);
    //        //Связываем все с выходом
    //        an.node.connect(an.context.destination);
    //        an.source.connect(an.context.destination);
    //        //подписываемся на событие изменения входных данных
    //        an.node.onaudioprocess = function () {
    //            an.analyser.getByteFrequencyData(an.bands);
    //            if (!an.audio.paused) {
    //                if (typeof an.update === "function") {
    //                    console.log(an.bands);
    //                    return an.update(an.bands);
    //                } else {
    //                    return 0;
    //                }
    //            }
    //        };
           
    //     };
    //     // });
    //     // return this;
    // };

    render() {
        return (
            <div>
                {/* {this.viz(this.PLAYER)} */}
            </div>
        )
    };
};

function mapStateToProps(store){
    return {
        GetPlayerState: store.trackStartPlay.playerState,
    };
};

export default connect(mapStateToProps, null)(Vizualization);