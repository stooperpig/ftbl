import './opening-kickoff.css';
import { useSelector } from "react-redux";
import { RootState } from "../../../constants/store";
import { PlaySelectionMode } from "../../../types/game-types";
import Modal from "../modal";


interface PropTypes {

}

const didCurrentPlayerWinToss = (currentPlayerId: number, homeTeamWonCoinToss: boolean, homePlayerId: number, vistingPlayerId: number) => {
    return (currentPlayerId === homePlayerId && homeTeamWonCoinToss) || (currentPlayerId === vistingPlayerId && !homeTeamWonCoinToss);
}

export const OpeningKickoffModal = (props: PropTypes) => {
    const playSelectionMode = useSelector((state: RootState) => state.playSelectionMode);
    const currentPlayerId = useSelector((state: RootState) => state.currentPlayerId);
    const homeTeamWonCoinToss = useSelector((state: RootState) => state.homeTeam.wonCoinToss);
    const homePlayerId = useSelector((state: RootState) => state.homeTeam.player?.id);
    const vistingPlayerId = useSelector((state: RootState) => state.vistingTeam.player?.id);

    const closeHandler = () => {
        console.log('close coin toss modal')
    }

    if (playSelectionMode === PlaySelectionMode.OPENING_KICKOFF && didCurrentPlayerWinToss(currentPlayerId, homeTeamWonCoinToss || false, homePlayerId || 0, vistingPlayerId || 0)) {
        return (
            <Modal showHideClassName='modal display-block' title={"Opening Kickoff"} handleClose={closeHandler}>
                <div className="opening-kickoff">
                    <p>You have won the coin toss.</p>
                    Do you wish to recieve or kick?<br/><br/>
                    <button>Receive</button> <button>Kick</button>
                </div>
            </Modal>
        );
    } else {
        return null;
    }
}