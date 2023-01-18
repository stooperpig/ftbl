import { PassingPlays, RunningPlays } from '../../../constants/game-constants';
import './play-selection.css';

interface PropTypes {
}

const getPlays = (): any[] => {
    const optionGroups = [];
    let keys = Object.keys(RunningPlays);
    let options = keys.map(key => {
        return {value: key, label: RunningPlays[key]}
    })
    optionGroups.push({label: 'Running', options});

    keys = Object.keys(PassingPlays);
    options = keys.map(key => {
        return {value: key, label: PassingPlays[key]}
    })
    optionGroups.push({label: 'Passing', options});

    options = [];
    options.push({value: "Punt", label: "Punt"});
    options.push({value: "Field Goal", label: "Field Goal"});
    optionGroups.push({label: "Other", options});

    return optionGroups
}

const renderOptions = () => {
    const optionGroups: any[] = getPlays();
    if (optionGroups.length > 1) {
        return(
            <>
            {optionGroups.map((optionGroup: any, index0: number) => {
                return (
                    <optgroup label={optionGroup.label} key={index0}>
                        {optionGroup.options.map((option: any, index1: number) => {
                            return (<option key={index1} value={option.value}>{option.label}</option>)
                        })}
                    </optgroup>
                );
            })}
            </>
        )
    } else {
        const options = optionGroups[0].options;
        return(
            <>
            {options.map((option: any, index: number) => {
                return (
                    <option key={index} value={option.value}>{option.label}</option>
                )
            })}
            </>
        )
    }
}

export const PlaySelectionPanel = (props: PropTypes) => {
    return(
        <div className="play-selection-panel">
            Offensive Plays<br/>
            <select size={13}>
                {renderOptions()}
            </select><br/>
            <button>Lock Play</button>
        </div>
    );
}