import { addDays, addYears, isWithinInterval, set, setMonth } from "date-fns";
import { MonthRange, TimeRange } from "../pages/fish-guide/fish-table";

export function isInTimeRange(time: Date, interval: TimeRange): boolean {
    let start = set(time, { hours: interval.start, minutes: 0 });
    const end = set(time, { hours: interval.end, minutes: 0 });
    // e.g. start: 9pm end: 4am, so we need to set start to be the day before
    if (interval.end < interval.start) {
        start = addDays(start, -1);
    }

    return isWithinInterval(time, {
        start,
        end,
    });
}

export function isInMonthRange(time: Date, interval: MonthRange): boolean {
    let start = setMonth(time, interval.start);
    const end = setMonth(time, interval.end);
    // e.g. start: Dec end: Feb, so we need to set start to be the year before
    if (interval.end < interval.start) {
        start = addYears(start, -1);
    }

    return isWithinInterval(time, {
        start,
        end,
    });
}
