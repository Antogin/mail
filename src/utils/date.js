
import format from 'date-fns/format'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import isToday from 'date-fns/isToday'
import isThisWeek from 'date-fns/isThisWeek'
import isYesterday from 'date-fns/isYesterday'

export const formatRelativeTime = (date) => {

    if (isToday(date)) {
        return `${formatDistanceToNow(date)} ago`
    }
    if (isYesterday(date)) {
        return 'Yesterday'
    }
    if (isThisWeek(date)) {
        return format(date, "EEEE")
    }

    return format(date, "yyyy-MM-dd")
}