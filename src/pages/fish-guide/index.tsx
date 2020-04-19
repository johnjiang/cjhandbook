import React, { ReactElement } from "react";
import { Checkbox, Table, Tag } from "antd";
import numeral from "numeral";

import fishData from "../../../data/json/fish.json";
import styled from "styled-components";
import { isInMonthRange, isInTimeRange } from "../../helpers/date-helper";

const { Column } = Table;

export enum Hemisphere {
    NORTHEN = "NORTHERN",
    SOUTHERN = "SOUTHERN",
}

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function hoursToString(hours: number): string {
    if (hours === 0) {
        return "12am";
    } else if (hours <= 12) {
        return `${hours}am`;
    } else {
        return `${hours - 12}pm`;
    }
}

const RangeContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export interface MonthRange {
    start: number;
    end: number;
}

export interface TimeRange {
    start: number;
    end: number;
}

interface FishData {
    name: string;
    location: string;
    size: string;
    price: number;
    time: TimeRange[] | null;
    northenMonths: MonthRange[] | null;
    southernMonths: MonthRange[] | null;
}

function isFishAvailable(data: FishData, hemisphere: Hemisphere): boolean {
    if (data.time) {
        const inTimeRange = data.time.some((interval) => {
            return isInTimeRange(new Date(), interval);
        });

        if (!inTimeRange) {
            return false;
        }
    }

    let monthIntervals;
    if (hemisphere === Hemisphere.NORTHEN) {
        monthIntervals = data.northenMonths;
    } else {
        monthIntervals = data.southernMonths;
    }

    if (monthIntervals) {
        const inMonthRange = monthIntervals.some((interval) => {
            return isInMonthRange(new Date(), interval);
        });

        if (!inMonthRange) {
            return false;
        }
    }

    return true;
}

interface Props {
    hemisphere: Hemisphere;
    isRealTime: boolean;
    showCaughtFish?: boolean;
    caughtFish: Record<string, boolean>;
    onCaughtFishChange: (fishName: string, isCaught: boolean) => void;
}

export default function FishGuide({
    isRealTime,
    showCaughtFish = true,
    hemisphere,
    caughtFish,
    onCaughtFishChange,
}: Props): ReactElement {
    const fish: FishData[] = Object.values(fishData);
    let dataSource = fish;

    if (isRealTime) {
        dataSource = fish.filter((data) => {
            return isFishAvailable(data, hemisphere);
        });
    }

    if (!showCaughtFish) {
        dataSource = fish.filter((data) => {
            return !caughtFish[data.name];
        });
    }

    return (
        <Table dataSource={dataSource} pagination={false} rowKey="name">
            <Column
                title="Caught"
                dataIndex="name"
                key="caught"
                align="center"
                render={(name: string): ReactElement => {
                    return (
                        <span>
                            <Checkbox
                                value={name}
                                checked={caughtFish[name]}
                                onChange={(e): void => {
                                    onCaughtFishChange(name, e.target.checked);
                                }}
                            />
                        </span>
                    );
                }}
            />
            <Column
                title="Name"
                dataIndex="name"
                sorter={(a: FishData, b: FishData): number =>
                    a.name.localeCompare(b.name)
                }
            />
            <Column
                title="Location"
                dataIndex="location"
                filters={[
                    { text: "River", value: "River" },
                    { text: "Pond", value: "Pond" },
                    { text: "Sea", value: "Sea" },
                ]}
                onFilter={(value, record: FishData): boolean =>
                    record.location.includes(String(value))
                }
                sorter={(a, b): number => a.location.localeCompare(b.location)}
            />
            <Column
                title="Size"
                dataIndex="size"
                filters={[
                    { text: "Narow", value: "Narrow" },
                    { text: "Smallest", value: "Smallest" },
                    { text: "Small", value: "Small" },
                    { text: "Medium", value: "Medium" },
                    { text: "Large", value: "Large" },
                    { text: "X-Large", value: "X Large" },
                ]}
                onFilter={(value, record: FishData): boolean =>
                    record.size === value
                }
            />
            <Column
                title="Price"
                dataIndex="price"
                align="right"
                sorter={(a: FishData, b: FishData): number => a.price - b.price}
                render={(value): ReactElement => {
                    return <span>{numeral(value).format("0,0")}</span>;
                }}
            />
            <Column
                title="Time"
                dataIndex="time"
                key="time"
                render={(
                    ranges: TimeRange[] | null,
                ): ReactElement | ReactElement[] => {
                    if (!ranges) {
                        return <span>All day</span>;
                    }

                    return (
                        <RangeContainer>
                            {ranges.map(
                                (range, index): ReactElement => {
                                    return (
                                        <span key={index}>
                                            {hoursToString(range.start)} -{" "}
                                            {hoursToString(range.end)}
                                        </span>
                                    );
                                },
                            )}
                        </RangeContainer>
                    );
                }}
            />
            <Column
                title="Month"
                dataIndex={
                    hemisphere === Hemisphere.NORTHEN
                        ? "northenMonths"
                        : "southernMonths"
                }
                render={(
                    ranges: MonthRange[] | null,
                ): ReactElement | ReactElement[] => {
                    if (!ranges) {
                        return <span>Year-round</span>;
                    }

                    return (
                        <RangeContainer>
                            {ranges.map(
                                (range, index): ReactElement => {
                                    return (
                                        <span key={index}>
                                            {MONTHS[range.start]} -{" "}
                                            {MONTHS[range.end]}
                                        </span>
                                    );
                                },
                            )}
                        </RangeContainer>
                    );
                }}
            />
            <Column
                title={"Status"}
                key="status"
                render={(value, record: FishData): ReactElement => {
                    if (isFishAvailable(record, hemisphere)) {
                        return <Tag color="green">AVAILABLE</Tag>;
                    }
                    return <Tag color="red">UNAVAILABLE</Tag>;
                }}
            />
        </Table>
    );
}
