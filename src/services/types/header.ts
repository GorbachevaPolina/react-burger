declare type TIconTypes = 'secondary' | 'primary' | 'error' | 'success';

type TState = {
    icon: TIconTypes;
    text: string;
};

export type THeaderState = {
    home: TState;
    orders: TState;
    profile: TState;
};