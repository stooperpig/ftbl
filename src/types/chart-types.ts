
export interface ChartCellKey {
    chartName: ChartName,
    defensivePlay: string,
    offensivePlay: string,
    roll: string
}

export interface Chart {
    name: string,
    description: string,
    offensivePlays: ResultsTable,
    otherResults: ResultsTable,
    specialTeams: ResultsTable,
    defensivePlays: DefensivePlay 
}

export enum ChartName {
    OFFENSE = 'Offense',
    DEFENSE = 'Defense',
    OTHER = 'Other',
    SPECIAL_TEAMS = 'Special Teams'
}

export enum ChartResultColor {
    RED = 'RED',
    BLACK = 'BLACK',
    YELLOW = 'YELLOW',
    WHITE = 'WHITE',
    GREEN = 'GREEN',
    ERROR = 'ERROR'
}

export interface ChartResult {
    ocrResult: string,
    ocrColor: ChartResultColor,
    ocrRgb: string,
    color: ChartResultColor,
    type: ChartResultType,
    yardage: number,
    outOfBounds: boolean,
    noReturn: boolean,
    mandatory: boolean
}

export enum ChartResultType {
    NORMAL = 'NORMAL',
    BREAK_AWAY = 'BREAK_AWAY',
    OFFENSIVE_PENALTY = 'OFFENSIVE_PENALTY',
    DEFENSIVE_PENALTY = 'DEFENSIVE_PENALTY',
    PASS_INTERFERENCE = 'PASS_INTERFERENCE', 
    INCOMPLETE_PASS = 'INCOMPLETE_PASS',
    QR = 'QR',
    SOP = 'SOP',
    BLP = 'BLP',
    QT = 'QT',
    TOUCH_DOWN = 'TOUCH_DOWN',
    INTERCEPTION = 'INTERCEPTION',
    FUMBLE = 'FUMBLE',
    BLOCKED_KICK = 'BLOCKED_KICK',
    MISSED_FIELD_GOAL = 'MISSED_FIELD_GOAL'
}

export interface DefensivePlay {
    [key: string]: ResultsTable
}



export interface ResultsTable {
    [key: string]: ChartResult[];
}