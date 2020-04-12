export default function formatedTime(time) {
    let minuts = Math.trunc(Number(time.toFixed(0))/60);
    let seconds = Number(time.toFixed(0)) - minuts*60;
    if ( seconds < 10 ) {
        seconds = "0" + seconds;
    };
    let currentTime = minuts + ":" + seconds;
    return currentTime;
};