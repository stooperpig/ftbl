
import './chart-panel.css';
import { useState } from 'react';
import { Chart, ChartCellKey, ChartName, ChartResult, ChartResultColor, ChartResultType, DefensivePlay, ResultsTable } from '../../types/chart-types';
import React from 'react';
import { ChartCellModal } from '../modal/chart/chart-cell-modal';
import { getChartResult } from '../common/utils';
import axios from 'axios';

interface PropTypes {
}

interface GameTable {
    rows: ChartResult[][],
    columnHeadings: string[],
    rowHeadings: string[]
}

const defaultChart: Chart = {
    name: '',
    description: '',
    offensivePlays: {},
    specialTeams: {},
    otherResults: {},
    defensivePlays: {}
}

const buildTable = (rowHeadingStartIndex: number, resultsTable: ResultsTable): GameTable => {
    const table: GameTable = {
        rows: [],
        columnHeadings: [],
        rowHeadings: []
    };

    let columns: ChartResult[][] = [];
    let maxIndex = 0;

    Object.keys(resultsTable).forEach((key: string, index: number) => {
        table.columnHeadings.push(key);
        const resultColumn = resultsTable[key];
        columns.push(resultColumn);

        maxIndex = Math.max(maxIndex, resultColumn.length);
    });

    console.log("maxIndex: " + maxIndex);

    for (let i = 0; i < maxIndex; ++i) {
        table.rowHeadings.push('' + (i + rowHeadingStartIndex));
    }

    for (let i = 0; i < maxIndex; ++i) {
        let row: ChartResult[] = [];
        for (let j = 0; j < columns.length; ++j) {
            row.push(columns[j][i]);
        }
        table.rows.push(row);
    }

    console.log("rows: " + table.rows.length);

    return table;
}

export const ChartPanel = (props: PropTypes) => {

    const [activeChart, setActiveChart] = useState<string>('Offense');
    const [chart, setChart] = useState<Chart>(defaultChart);
    const [showModal, setShowModal] = useState<boolean>(true);
    const [chartCellKey, setChartCellKey] = useState<ChartCellKey>();

    React.useEffect(() => {
        axios.get("/api/readChart?chartName=minnesota")
            .then(res => {
                const body = res.data;
                console.log(body);
                setChart(body);
            });
    }, []);

    const renderResultsCell = (result: ChartResult, key: string, cellKey: ChartCellKey) => {
        let className = '';

        switch (result.color) {
            case ChartResultColor.RED:
                className = 'chart-panel-cell-red';
                break;
            case ChartResultColor.GREEN:
                className = 'chart-panel-cell-green';
                break;
            case ChartResultColor.YELLOW:
                className = 'chart-panel-cell-yellow';
                break;
            case ChartResultColor.BLACK:
                className = 'chart-panel-cell-black';
                break;
            case ChartResultColor.ERROR:
                className = 'chart-panel-cell-error';
                break;
            case ChartResultColor.WHITE:
                className = 'chart-panel-cell-white';
                break;
            default:
                className = 'chart-panel-cell-unknown';
        }

        if (cellKey.chartName === chartCellKey?.chartName && cellKey.defensivePlay === chartCellKey.defensivePlay
            && cellKey.offensivePlay === chartCellKey.offensivePlay && cellKey.roll === chartCellKey.roll) {
            className += ' chart-panel-selected-cell';
        }

        let content = getContent(result);
        switch (result.type) {

        }

        if (result.noReturn) {
            return(
                <td key={key} className={className} onClick={() => { editCell(cellKey); }}>{content}&dagger;</td>
            );
        } else {
            return (
                <td key={key} className={className} onClick={() => { editCell(cellKey); }}>{content}</td>
            );
        }
    }

    const getContent = (result: ChartResult): string => {
        switch (result.type) {
            case ChartResultType.NORMAL:
                let content = result.mandatory ? '(' : '';
                content += result.yardage !== 0 ? String(result.yardage) : '';
                content += result.mandatory ? ')' : '';
                content += result.outOfBounds ? '*' : '';
                return content;
            case ChartResultType.BREAK_AWAY:
                return 'B';
            case ChartResultType.OFFENSIVE_PENALTY:
                return 'OFF ' + result.yardage;
            case ChartResultType.DEFENSIVE_PENALTY:
                return 'DEF ' + result.yardage;
            case ChartResultType.PASS_INTERFERENCE:
                return 'PI ' + result.yardage;
            case ChartResultType.INCOMPLETE_PASS:
                return '';
            case ChartResultType.QR:
            case ChartResultType.SOP:
            case ChartResultType.BLP:
            case ChartResultType.QT:
                return result.type;
            case ChartResultType.TOUCH_DOWN:
                return result.mandatory ? '(TD)' : 'TD';
            case ChartResultType.INTERCEPTION:
                return 'INT' + (result.yardage > 0 ? ' ' + result.yardage : result.yardage);
            case ChartResultType.FUMBLE:
                return 'F' + (result.yardage === 0 ? '' : result.yardage > 0 ? '+' + result.yardage : result.yardage);
            case ChartResultType.BLOCKED_KICK:
                return 'BK' + result.yardage;
            case ChartResultType.MISSED_FIELD_GOAL:
                return 'NG';
            default:
                return 'error';
        }
    }

    const renderDefensiveTable = (defensivePlays: DefensivePlay | undefined) => {
        if (defensivePlays === undefined) {
            return (<div>empty</div>)
        }

        const keys: string[] = Object.keys(defensivePlays);
        keys.sort();

        return (
            <table>
                <tbody>
                    {keys.map((key, index) => {
                        return (
                            <tr key={index}>
                                <td className="chart-panel-defensive-play">{key}</td>
                                <td>{renderResultsTable(defensivePlays[key], 1, ChartName.DEFENSE, key)}</td>
                            </tr>);
                    })}
                </tbody>
            </table>
        );
    }

    const renderResultsTable = (resultsTable: ResultsTable | undefined, rowStartIndex: number, chartName: ChartName, defensivePlay: string) => {
        if (resultsTable !== undefined) {
            const table = buildTable(rowStartIndex, resultsTable);
            return (
                < table className="chart-panel-chart" >
                    <thead>
                        <tr>
                            <th></th>
                            {table.columnHeadings.map((value, index) => {
                                return (<th key={'h' + index}>{value}</th>)
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {table.rows.map((row, rowIndex) => {
                            return (
                                <tr key={'r' + rowIndex}>
                                    <td className='chart-panel-row-heading'>{table.rowHeadings[rowIndex]}</td>
                                    {row.map((chartResult, columnIndex) => {
                                        return renderResultsCell(chartResult, columnIndex + '-' + rowIndex, { chartName, defensivePlay, offensivePlay: table.columnHeadings[columnIndex], roll: table.rowHeadings[rowIndex] });
                                    })}
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table >
            );
        } else {
            return (
                <div>empty chart</div>
            );
        }
    }

    const renderActiveChart = () => {
        switch (activeChart) {
            case 'Offense':
                return (<div>{renderResultsTable(chart.offensivePlays, 10, ChartName.OFFENSE, '')}</div>);
            case 'Defense':
                return (<div>{renderDefensiveTable(chart.defensivePlays)}</div>);
            case 'Special Teams':
                return (<div>{renderResultsTable(chart.specialTeams, 10, ChartName.SPECIAL_TEAMS, '')}</div>);
            case 'Other':
                return (<div>{renderResultsTable(chart.otherResults, 10, ChartName.OTHER, '')}</div>);
            default:
                return (<div>{renderResultsTable(chart.offensivePlays, 10, ChartName.OFFENSE, '')}</div>);
        }
    }

    const editCell = (cellKey: ChartCellKey) => {
        setChartCellKey(cellKey);
        console.log(cellKey.chartName, cellKey.defensivePlay, cellKey.offensivePlay, cellKey.roll);
        handleShowModal();
    }

    const saveCell = (chartCellKey: ChartCellKey, data: ChartResult) => {
        const chartResult: ChartResult = getChartResult(chart, chartCellKey);
        chartResult.color = data.color;
        chartResult.mandatory = data.mandatory;
        chartResult.outOfBounds = data.outOfBounds;
        chartResult.noReturn = data.noReturn;
        chartResult.type = data.type;
        chartResult.yardage = data.yardage;


        axios.post('/api/saveChart', chart)
            .then(function (res) {
                setChart({ ...chart });
                console.log(res.data);
                //dispatch({ type: UPDATE_STATUS_MESSAGE, payload: res.data });
            })
            .catch(function (err) {
                console.log(err.data);
                //dispatch({ type: UPDATE_STATUS_MESSAGE, payload: err.data });
            });
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

    return (
        <div className="chart-panel">
            <div className="chart-panel-heading">
                Chart Name: {chart.name}<br />
                Chart Description: {chart.description}<br />
            </div>
            <div className="chart-panel-chart-types">
                <button onClick={() => { setActiveChart("Offense") }}>Offense</button>
                <button onClick={() => { setActiveChart("Defense") }}>Defense</button>
                <button onClick={() => { setActiveChart("Special Teams") }}>Special Teams</button>
                <button onClick={() => { setActiveChart("Other") }}>Other</button>
            </div>
            {renderActiveChart()}
            <ChartCellModal show={showModal} saveHandler={saveCell} closeHandler={closeModal} chart={chart} chartCellKey={chartCellKey} />
        </div>
    )
}