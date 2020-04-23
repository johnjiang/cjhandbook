export interface MonthRange {
    start: number;
    end: number;
}

export interface TimeRange {
    start: number;
    end: number;
}

export type Animal = Fish | Insect;

export interface Fish {
    id: number;
    name: string;
    location: string;
    size: string;
    price: number;
    time: TimeRange[] | null;
    month: MonthRange[];
}

export interface Insect {
    id: number;
    name: string;
    location: string;
    price: number;
    time: TimeRange[] | null;
    month: MonthRange[];
}

export enum AnimalType {
    FISH = "FISH",
    INSECT = "INSECT",
    FOSSIL = "FOSSIL",
}
