export const msToTime = (ms: number) => {
    let secondsPlayed = 0;
    let minutesPlayed = 0;
    secondsPlayed = Math.floor(ms / 1000);
    minutesPlayed = Math.floor(secondsPlayed / 60);
    secondsPlayed = secondsPlayed % 60;
    return {sec: secondsPlayed, min: minutesPlayed}
}
export const formatWithLeadingZero = (sec: number) => sec.toString().length === 1 ? `0${sec}` : sec