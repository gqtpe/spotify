import dayjs from "dayjs";



//ISO 8601 to MMM DD, YYYY
export const formatTime = (time: string) => {
    const date = dayjs(time)
    return date.format('MMM DD, YYYY')
}