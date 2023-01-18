
import './chart-cell-modal.css';
import { Chart, ChartCellKey, ChartResult, ChartResultColor, ChartResultType } from '../../../types/chart-types';
import Modal from '../modal';
import { useState } from 'react';
import React from 'react';
import { getChartResult } from '../../common/utils';

interface PropTypes {
    show: boolean,
    saveHandler: any,
    closeHandler: any,
    chart: Chart,
    chartCellKey?: ChartCellKey
}

const renderCellKey = (chartCellKey: ChartCellKey) => {
    if (chartCellKey !== undefined) {
        switch (chartCellKey.chartName) {
            case "Offense":
                return (
                    <div className="chart-cell-modal-chart-cell-key">
                        <span className="chart-cell-modal-label">ChartName:</span> <span className="chart-cell-modal-read-only">{chartCellKey.chartName}</span>
                        <span className="chart-cell-modal-label">OffensivePlay:</span> <span className="chart-cell-modal-read-only">{chartCellKey.offensivePlay}</span>
                        <span className="chart-cell-modal-label">Roll:</span> <span className="chart-cell-modal-read-only">{chartCellKey.roll}</span>
                    </div>
                );
            case "Defense":
                return (
                    <div className="chart-cell-modal-chart-cell-key">
                        <span className="chart-cell-modal-label">ChartName:</span> <span className="chart-cell-modal-read-only">{chartCellKey.chartName}</span>
                        <span className="chart-cell-modal-label">DefensivePlay:</span> <span className="chart-cell-modal-read-only">{chartCellKey.defensivePlay}</span>
                        <span className="chart-cell-modal-label">OffensivePlay:</span> <span className="chart-cell-modal-read-only">{chartCellKey.offensivePlay}</span>
                        <span className="chart-cell-modal-label">Roll:</span> <span className="chart-cell-modal-read-only">{chartCellKey.roll}</span>
                    </div>
                );
            default:
                return (
                    <div className="chart-cell-modal-chart-cell-key">
                        <span className="chart-cell-modal-label">ChartName:</span> <span className="chart-cell-modal-read-only">{chartCellKey.chartName}</span>
                        <span className="chart-cell-modal-label">Play:</span> <span className="chart-cell-modal-read-only">{chartCellKey.offensivePlay}</span>
                        <span className="chart-cell-modal-label">Roll:</span> <span className="chart-cell-modal-read-only">{chartCellKey.roll}</span>
                    </div>
                );
        }
    } else {
        return null;
    }
}



export const ChartCellModal = (props: PropTypes) => {
    const [outOfBounds, setOutOfBounds] = useState<boolean>(false);
    const [noReturn, setNoReturn] = useState<boolean>(false);
    const [mandatory, setMandatory] = useState<boolean>(false);
    const [yardage, setYardage] = useState<string>('');
    const [color, setColor] = useState<ChartResultColor>(ChartResultColor.WHITE);
    const [type, setType] = useState<ChartResultType>(ChartResultType.NORMAL);

    const saveChart = () => {
        console.log("save chart outofbounds: " + outOfBounds);
        if (!Number.isNaN(Number(yardage))) {
            const chartResult: ChartResult = {
                ocrResult: '',
                ocrColor: ChartResultColor.BLACK,
                ocrRgb: '',
                color: color,
                type: type,
                yardage: +yardage,
                outOfBounds: outOfBounds,
                noReturn: noReturn,
                mandatory: mandatory
            };
            props.saveHandler(props.chartCellKey, chartResult);
        } else {
            console.log('can not save');
        }
    }

    const saveYardage = (event: any) => {
        console.log("saving yardage: " + event.target.value);
        setYardage(event.target.value);
    }

    React.useEffect(() => {
        props.chartCellKey && setOutOfBounds(getChartResult(props.chart, props.chartCellKey).outOfBounds);
        props.chartCellKey && setNoReturn(getChartResult(props.chart, props.chartCellKey).noReturn);
        props.chartCellKey && setMandatory(getChartResult(props.chart, props.chartCellKey).mandatory);
        props.chartCellKey && setYardage(String(getChartResult(props.chart, props.chartCellKey).yardage));
        props.chartCellKey && setColor(getChartResult(props.chart, props.chartCellKey).color);
        props.chartCellKey && setType(getChartResult(props.chart, props.chartCellKey).type);
        console.log("inside useEffect: " + props.chartCellKey);
    }, [props.chart, props.chartCellKey]);

    console.log('modal show: ' + props.show);
    if (props.show && props.chartCellKey !== undefined) {
        console.log(props.chart);
        const chartResult = getChartResult(props.chart, props.chartCellKey);
        return (
            <Modal showHideClassName='modal display-block' title={"Chart Result"} handleClose={props.closeHandler}>
                {renderCellKey(props.chartCellKey)}
                <div className="chart-cell-modal">
                    <div className="chart-cell-modal-ocr">
                        <span className="chart-cell-modal-label">ocrResult:</span> <span className="chart-cell-modal-read-only">{chartResult.ocrResult}</span>
                        <span className="chart-cell-modal-label">ocrColor:</span><span className="chart-cell-modal-read-only">{chartResult.ocrColor}</span>
                        <span className="chart-cell-modal-label">ocrRgb:</span><span className="chart-cell-modal-read-only">{chartResult.ocrRgb}</span>
                    </div>

                    <div className="chart-cell-modal-row">
                        <span className="chart-cell-modal-label">Type:</span>
                        <select className="chart-cell-modal-select" value={type} onChange={(event) => { setType(ChartResultType[event.target.value as keyof typeof ChartResultType]) }}>
                            <option value="NORMAL">NORMAL</option>
                            <option value="BREAK_AWAY">BREAK_AWAY</option>
                            <option value="OFFENSIVE_PENALTY">OFFENSIVE_PENALTY</option>
                            <option value="DEFENSIVE_PENALTY">DEFENSIVE_PENALTY</option>
                            <option value="PASS_INTERFERENCE">PASS_INTERFERENCE</option>
                            <option value="INCOMPLETE_PASS">INCOMPLETE_PASS</option>
                            <option value="QR">QR</option>
                            <option value="SOP">SOP</option>
                            <option value="BLP">BLP</option>
                            <option value="QT">QT</option>
                            <option value="TOUCH_DOWN">TOUCH_DOWN</option>
                            <option value="INTERCEPTION">INTERCEPTION</option>
                            <option value="FUMBLE">FUMBLE</option>
                            <option value="BLOCKED_KICK">BLOCKED_KICK</option>
                            <option value="MISSED_FIELD_GOAL">MISSED_FIELD_GOAL</option>
                        </select>
                        <span className="chart-cell-modal-label">Color:</span>
                        <select className="chart-cell-modal-select" value={color} onChange={(event) => { setColor(ChartResultColor[event.target.value as keyof typeof ChartResultColor]) }}>
                            <option value="RED">RED</option>
                            <option value="BLACK">BLACK</option>
                            <option value="YELLOW">YELLOW</option>
                            <option value="WHITE">WHITE</option>
                            <option value="GREEN">GREEN</option>
                            <option value="ERROR">ERROR</option>
                        </select>
                    </div>
                    <div className="chart-cell-modal-row">
                        <span className="chart-cell-modal-label">Yardage:</span>
                        <input type="text" className="chart-cell-modal-text" name="yardage" value={yardage} onChange={(event) => { saveYardage(event) }} onBlur={(event) => { saveYardage(event) }} />
                    </div>
                    <div className="chart-cell-modal-row">
                        <span className="chart-cell-modal-label">OutOfBounds:</span>
                        <input type="checkbox" name="outOfBounds" className="chart-cell-modal-checkbox" checked={outOfBounds} onChange={(event) => { setOutOfBounds(event.target.checked) }} />
                        <span className="chart-cell-modal-label">NoReturn:</span>
                        <input type="checkbox" name="noReturn" className="chart-cell-modal-checkbox" checked={noReturn} onChange={(event) => { setNoReturn(event.target.checked) }} />
                        <span className="chart-cell-modal-label">Mandatory:</span>
                        <input type="checkbox" name="mandatory" className="chart-cell-modal-checkbox" checked={mandatory} onChange={(event) => { setMandatory(event.target.checked) }} />
                    </div>
                </div>
                <div className="chart-cell-modal-buttons">
                    <button className="chart-cell-modal-button" onClick={saveChart}>Save</button> <button className="chart-cell-modal-button">Cancel</button>
                </div>
            </Modal>
        );
    } else {
        return (
            <div></div>
        )
    }
}