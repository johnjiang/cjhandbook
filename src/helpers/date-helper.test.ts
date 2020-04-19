import { isInMonthRange, isInTimeRange } from "./date-helper";

describe("date-helper", () => {
    describe("isInTimeRange", () => {
        const twoAm = new Date(2020, 3, 1, 12);
        const twelvePm = new Date(2020, 3, 1, 12, 5);

        it.each`
            time        | start | end   | expected
            ${twelvePm} | ${4}  | ${13} | ${true}
            ${twelvePm} | ${4}  | ${12} | ${false}
            ${twelvePm} | ${4}  | ${9}  | ${false}
            ${twoAm}    | ${23} | ${3}  | ${false}
        `("returns expected", ({ time, start, end, expected }) => {
            expect(isInTimeRange(time, { start, end })).toBe(expected);
        });
    });

    describe("isInMonthRange", () => {
        const december = new Date(2020, 11, 1);
        const january = new Date(2020, 0, 1);
        const april = new Date(2020, 3, 1);

        it.each`
            time        | start | end   | expected
            ${december} | ${9}  | ${11} | ${true}
            ${december} | ${4}  | ${9}  | ${false}
            ${january}  | ${11} | ${3}  | ${true}
            ${april}    | ${4}  | ${9}  | ${false}
        `("returns expected", ({ time, start, end, expected }) => {
            expect(isInMonthRange(time, { start, end })).toBe(expected);
        });
    });
});
