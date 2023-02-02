import { Chart } from "./chart-types"

export enum CommState {
    READY = "READY",
    WAITING = "WAITING"
}

export interface GameState {
    commState: CommState,
    homeTeam: Team,
    vistingTeam: Team,
    currentPlayerId: number,
    currentQuarter: number,
    currentTimeMinutes: number,
    currentTimeSeconds: number,
    currentDown: number,
    currentYard: number,
    firstDownYard: number,
    playSelectionMode: PlaySelectionMode
}

export interface Player {
    name: string,
    id: number
}

export interface PlayMap {
    [key: string]: string
}

export enum PlaySelectionMode {
    OFFENSE = "OFFENSE",
    DEFENSE = "DEFENSE",
    PAT = "PAT",
    KICKOFF = "KICKOFF",
    COIN_TOSS = "COIN_TOSS",
    OPENING_KICKOFF = "OPENING_KICKOFF"
}

export interface Team {
    name: string,
    chartName?: string,
    chart?: Chart,
    timeOuts?: number,
    score?: number,
    wonCoinToss?: boolean,
    receivingSecondHalf?: boolean,
    possession?: boolean,
    player?: Player
}