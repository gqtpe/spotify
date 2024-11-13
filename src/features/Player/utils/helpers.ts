export const msToTime = (ms: number) => {
    let secondsPlayed = Math.floor(ms / 1000);
    const minutesPlayed = Math.floor(secondsPlayed / 60);
    secondsPlayed = secondsPlayed % 60;
    return `${minutesPlayed}:${formatWithLeadingZero(secondsPlayed)}`
}
export const formatWithLeadingZero = (sec: number) => sec.toString().length === 1 ? `0${sec}` : sec