import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../constants/store";
import { PlaySelectionMode } from "../../../types/game-types";
import Modal from "../modal";


interface PropTypes {

}

export const CoinTossModal = (props: PropTypes) => {
    const playSelectionMode = useSelector((state: RootState) => state.playSelectionMode);

    const closeHandler = () => {
        console.log('close coin toss modal')
    }

    if (playSelectionMode === PlaySelectionMode.COIN_TOSS) {
        return (
            <Modal showHideClassName='modal display-block' title={"Coin Toss"} handleClose={closeHandler}>
                You have won the coin toss.   Do you wish to recieve or kick?
            </Modal>
        );
    } else {
        return null;
    }
}