import { LOAD_GAME } from "../../constants/action-constants";
import { InitialGameState } from "../../constants/initial-state";
import { loadGame } from "./game-reducers";

const rootReducer = (state = InitialGameState, action: any): any => {
    switch(action.type) {
        case LOAD_GAME:
            return loadGame(state, action.payload);
    }

    return state;
}

export default rootReducer; 