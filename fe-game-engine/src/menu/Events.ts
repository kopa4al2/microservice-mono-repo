export interface CreateLobbyEvent {
    playerName: string,
    lobbyName: string,
    lobbyPassword: string,
}

export interface StartGameEvent {
    players: string[],
}

export enum EventType {
    CREATE_LOBBY = 'CREATE_LOBBY',
    START_GAME = 'START_GAME'
}