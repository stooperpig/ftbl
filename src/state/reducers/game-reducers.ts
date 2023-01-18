import { RootState } from "../../constants/store";

export const loadGame = (state: RootState, payload: any): RootState => {
    return {...payload};
}