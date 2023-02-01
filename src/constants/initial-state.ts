import { GameState, PlaySelectionMode } from "../types/game-types";

export const InitialGameState: GameState  = {
    homeTeam: {
        name: "Georgia Tech",
        chartName: "georgiaTech",
        chart: undefined,
        timeOuts: 3,
        score: 0,
        wonCoinToss: true,
        receivingSecondHalf: true,
        possession: true,
        player: {
            name: "Bill",
            id: 0
        }
    },
    vistingTeam: {
        name: "Minnesota",
        chartName: "minnesota",
        chart: undefined,
        timeOuts: 3,
        score: 0,
        wonCoinToss: false,
        receivingSecondHalf: false,
        possession: false,
        player: {
            name: "MJ",
            id: 1
        }        
    },
    currentPlayerId: 0,
    currentQuarter: 1,
    currentTimeMinutes: 12,
    currentTimeSeconds: 5,
    currentDown: 1,
    currentYard: 90,
    firstDownYard: 100,
    playSelectionMode: PlaySelectionMode.OFFENSE
}