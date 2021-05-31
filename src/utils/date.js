
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import isThisWeek from 'date-fns/isThisWeek'
import isYesterday from 'date-fns/isYesterday'

export const formatRelativeTime = (date) => {

    if (isToday(date)) {
        return format(date, "HH:mm")
    }
    if (isYesterday(date)) {
        return 'hier'
    }
    if (isThisWeek(date)) {
        return format(date, "EEEE")
    }

    return format(date, "yyyy-MM-dd")
}