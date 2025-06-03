export interface User {
    id: number;
    name: string;
    active:boolean;
}

export interface UserInput {
    name: string;
}

export interface UserInputEdit {
    id: number;
    name: string;
    active:boolean;
}