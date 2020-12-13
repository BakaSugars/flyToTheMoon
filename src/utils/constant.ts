export enum EventName {
    PUSH_COMMAND = 'pc',
    FRAME_COMMAND = 'fc',
    FRAME_CHANGE = 'fcc',
    GAME_END = 'ge',
    UPDATE_DIRECTION = 'ud',
    EAT_STAR = 'es',
    COLLID_STONE = 'cs'
}

export enum Command {
    ACC = '↑',
    SLOW = '↓',
    LEFT = '←',
    RIGHT = '→',
    SHIELD = 's'
}

export const BUTTON_SIZE = 50;

export const ABSOLUTE = 'absolute';