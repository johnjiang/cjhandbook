import { addDays, addYears, isWithinInterval, set, setMonth } from "date-fns";
import { MonthRange, TimeRange } from "../types";

export function isInTimeRange(time: Date, interval: TimeRange): boolean {
    const [intervalStart, intervalEnd] = interval;
    let start = set(time, { hours: intervalStart, minutes: 0 });
    let end = set(time, { hours: intervalEnd, minutes: 0 });
    // e.g. start: 9pm end: 4am, so we need to set start to be the day before
    if (intervalEnd < intervalStart) {
        if (time.getHours() >= intervalStart) {
            end = addDays(end, 1);
        } else {
            start = addDays(start, -1);
        }
    }

    return isWithinInterval(time, {
        start,
        end,
    });
}

export function isInMonthRange(time: Date, interval: MonthRange): boolean {
    const [intervalStart, intervalEnd] = interval;
    let start = setMonth(time, intervalStart);
    let end = setMonth(time, intervalEnd);
    // e.g. start: Dec end: Feb, so we need to set start to be the year before
    if (intervalEnd < intervalStart) {
        if (time.getMonth() >= intervalStart) {
            end = addYears(end, 1);
        } else {
            start = addYears(start, -1);
        }
    }

    return isWithinInterval(time, {
        start,
        end,
    });
}
