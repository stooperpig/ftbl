import { Team } from '../../../types/game-types';
import './team.css';

interface PropTypes {
    team: Team
}

const renderPossessionMarker = (possession: boolean | undefined) => {
    if (possession) {
        return (
            <svg width="40" height="20" fill="white" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="25" cy="13" rx="12" ry="6"/>
        </svg>
    )
    } else {
        return null;
    }
}

export const TeamPanel = (props: PropTypes) => {
    return(
        <div className="team-panel">
            <div className="team-panel-first-row">
                <div className="team-panel-name">
                    {props.team.name}
                    {renderPossessionMarker(props.team.possession)}
                </div>
                <div className="team-panel-score">{props.team.score}</div>
            </div>
            <div className="team-panel-second-row">
                <div className="team-panel-timeout"></div>
                <div className="team-panel-timeout"></div>
                <div className="team-panel-timeout"></div>
            </div>
        </div>
    );
}