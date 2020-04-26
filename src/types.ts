export type MonthRange = number[];

export type TimeRange = number[];

export type Animal = Fish | Bug;

export interface Fish {
    id: number;
    name: string;
    location: string;
    size: string;
    price: number;
    time: TimeRange[] | null;
    month: MonthRange[];
}

export interface Bug {
    id: number;
    name: string;
    location: string;
    price: number;
    time: TimeRange[] | null;
    month: MonthRange[];
}

export enum AnimalType {
    FISH = "FISH",
    BUG = "BUG",
    FOSSIL = "FOSSIL",
    ART = "ART",
}

export interface Art {
    id: number;
    name: string;
    originalName: string;
    artist: string;
    year: string;
    fakes?: {
        variation: string;
        reason: string;
    }[];
}
