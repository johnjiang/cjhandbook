import React, { ReactElement } from "react";
import { Checkbox, Space, Table } from "antd";
import numeral from "numeral";
import styled from "styled-components";
import { isInMonthRange, isInTimeRange } from "../../helpers/date-helper";
import AnimalStatusTag from "./animal-status-tag";
import { Animal, AnimalType, Fish, MonthRange, TimeRange } from "../../types";

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

export function isAnimalAvailable(
    data: Animal,
    hemisphere: Hemisphere,
): boolean {
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
        monthIntervals = data.month;
    } else {
        monthIntervals = data.month.map((interval) => {
            return {
                start: (interval.start + 6) % 12,
                end: (interval.end + 6) % 12,
            };
        });
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
    animalType: AnimalType;
    animals: Animal[];
    hemisphere: Hemisphere;
    caughtFish: Record<string, boolean>;
    onCaughtFishChange: (fishName: string, isCaught: boolean) => void;
}

export default function AnimalTable({
    animalType,
    animals,
    hemisphere,
    caughtFish,
    onCaughtFishChange,
}: Props): ReactElement {
    return (
        <Table
            dataSource={animals}
            pagination={false}
            rowKey="name"
            showSorterTooltip={false}
        >
            <Column
                title="Caught"
                dataIndex="name"
                key="caught"
                align="center"
                render={(name: string, record: Fish): ReactElement => {
                    return (
                        <Space>
                            <Checkbox
                                value={name}
                                checked={caughtFish[name]}
                                onChange={(e): void => {
                                    onCaughtFishChange(name, e.target.checked);
                                }}
                            />
                            <img
                                src={`/images/${animalType.toLowerCase()}-${
                                    record.id
                                }.png`}
                                alt={name}
                                loading="lazy"
                            />
                        </Space>
                    );
                }}
            />
            <Column
                title="Name"
                dataIndex="name"
                sorter={(a: Animal, b: Animal): number =>
                    a.name.localeCompare(b.name)
                }
            />
            <Column
                title="Location"
                dataIndex="location"
                sorter={(a: Animal, b: Animal): number =>
                    a.location.localeCompare(b.location)
                }
            />
            {animalType === AnimalType.FISH && (
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
                    onFilter={(value, record: Fish): boolean =>
                        record.size === value
                    }
                />
            )}
            <Column
                title="Price"
                dataIndex="price"
                align="right"
                sorter={(a: Animal, b: Animal): number => a.price - b.price}
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
                dataIndex="month"
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
                                    let { start, end } = range;

                                    if (
                                        hemisphere === Hemisphere.SOUTHERN &&
                                        !(start === 0 && end === 11)
                                    ) {
                                        start = (start + 6) % 12;
                                        end = (end + 6) % 12;
                                    }

                                    return (
                                        <span key={index}>
                                            {MONTHS[start]} - {MONTHS[end]}
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
                align="center"
                render={(value, record: Animal): ReactElement => {
                    return (
                        <AnimalStatusTag
                            animal={record}
                            hemisphere={hemisphere}
                        />
                    );
                }}
            />
        </Table>
    );
}
