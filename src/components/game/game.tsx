import './game.css';
import { FieldPanel } from "./field/field";
import { GameStatusPanel } from "./status/game-status";
import { PlayResultsPanel } from "./results/play-results";
import { PlaySelectionPanel } from "./plays/play-selection";
import React from 'react';
import axios from 'axios';
import { InitialGameState } from '../../constants/initial-state';
import { useDispatch } from 'react-redux';
import { LOAD_GAME } from '../../constants/action-constants';
import { AppDispatch } from '../../constants/store';

interface PropTypes {
}

const retrieveGame = () => async (dispatch: AppDispatch) => {
    const homeTeamChart = await axios.get("/api/readChart?chartName=minnesota");
    const visitingTeamChart = await axios.get("/api/readChart?chartName=georgiaTech");
    const state = {...InitialGameState};
    state.homeTeam.chart = homeTeamChart.data
    state.vistingTeam.chart = visitingTeamChart.data;
    dispatch({type: LOAD_GAME, payload: state});
}

export const Game = (props: PropTypes) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(retrieveGame());
    });

    return(
        <div className="game">
            <GameStatusPanel/>
            <FieldPanel/>
            <div className="game-lower-panel">
                <PlaySelectionPanel/>
                <PlayResultsPanel/>
            </div>
        </div>
    );
}