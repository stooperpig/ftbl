import { useSelector } from 'react-redux';
import { RootState } from '../../../constants/store';
import './game-status.css';
import { TeamPanel } from './team';

interface PropTypes {
}

const getQuarterOrDown = (aNumber: number): string => {
    switch(aNumber) {
        case 1:
            return '1st';
        case 2:
            return '2nd';
        case 3: 
            return '3rd';
        case 4: 
            return '4th';
        default:
            return '';
    }
}

const getTime = (minutes: number, seconds: number): string => {
    let time = `${minutes}:`;
    if (seconds < 10) {
        time += `0${seconds}`;
    } else {
        time += seconds;
    }

    return time;
}

export const GameStatusPanel = (props: PropTypes) => {

    const currentDown = useSelector((state: RootState) => state.currentDown);
    const currentYard = useSelector((state: RootState) => state.currentYard);
    const firstDownYard = useSelector((state: RootState) => state.firstDownYard);
    const homeTeam = useSelector((state: RootState) => state.homeTeam);
    const visitingTeam = useSelector((state: RootState) => state.vistingTeam);
    const currentQuarter = useSelector((state: RootState) => state.currentQuarter);
    const currentTimeMinutes = useSelector((state: RootState) => state.currentTimeMinutes);
    const currentTimeSeconds = useSelector((state: RootState) => state.currentTimeSeconds);

    const distance = (firstDownYard > 99 || firstDownYard < 1) ? 'Goal' : Math.abs(firstDownYard - currentYard);

    return(
        <div className="game-status-panel">
            <div className="game-status-panel-bar">
                <TeamPanel team={homeTeam}/>
                <TeamPanel team={visitingTeam}/>
                <div className="game-status-panel-quarter">{getQuarterOrDown(currentQuarter)}</div>
                <div className="game-status-panel-time">{getTime(currentTimeMinutes, currentTimeSeconds)}</div>
                <div className="game-status-panel-down">{getQuarterOrDown(currentDown)} <span className="game-status-panel-small">&</span> {distance}</div>
            </div>
        </div>
    );
};