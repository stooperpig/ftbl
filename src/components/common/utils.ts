import { Chart, ChartCellKey, ChartName, ChartResult } from "../../types/chart-types";


export const getChartResult = (chart: Chart, chartCellKey: ChartCellKey): ChartResult => {
    switch (chartCellKey.chartName) {
        case ChartName.OFFENSE: {
            const table = chart.offensivePlays;
            const play = table[chartCellKey.offensivePlay];
            const cell = play[+chartCellKey.roll - 10];
            return cell;
        }
        case ChartName.DEFENSE:
            console.log(chartCellKey);
            const defensivePlays = chart.defensivePlays;
            console.log(defensivePlays);
            const table = defensivePlays[chartCellKey.defensivePlay];
            console.log(table);
            const play = table[chartCellKey.offensivePlay];
            console.log(play);
            const cell = play[+chartCellKey.roll - 1];
            console.log(cell);
            return cell;
        case ChartName.SPECIAL_TEAMS: {
            const table = chart.specialTeams;
            const play = table[chartCellKey.offensivePlay];
            const cell = play[+chartCellKey.roll - 10];
            return cell;
        }
        case ChartName.OTHER: {
            const table = chart.otherResults;
            const play = table[chartCellKey.offensivePlay];
            const cell = play[+chartCellKey.roll - 10];
            return cell;
        }
        default: {
            const table = chart.offensivePlays;
            const play = table[chartCellKey.offensivePlay];
            const cell = play[+chartCellKey.roll - 10];
            return cell;
        }
    }
}
