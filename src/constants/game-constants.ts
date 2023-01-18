import { PlayMap } from "../types/game-types"

export const DefensivePlays: PlayMap = {
    "A": "Standard",
    "B": "Short Yardage (GAPS)",
    "C": "Short Yardage (WIDE)",
    "D": "Pass Prevent (SHORT)",
    "E": "Pass Prevent (LONG)",
    "F": "Blitz"
}

export const RunningPlays: PlayMap = {
    "1": "Line Plunge",
    "2": "Counter",
    "3": "End + Reverse",
    "4": "Draw",
    "5": "Option",
}

export const PassingPlays: PlayMap = {
    "6": "Screen Pass",
    "7": "Sprintout Pass",
    "8": "Bootleg Pass",
    "9": "Drop Back Pass",
}

export const KickOffPlays: PlayMap = {
    "Kickoff": "Kickoff",
    "Onside Kick": "Onside Kick"
}

export const PointAfterTouchDownPlays: PlayMap = {
    "PAT Kick": "PAT Kick",
    "2 Point Conversion": "2 point"
}