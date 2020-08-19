import React, {Fragment, useEffect, useState} from "react";
import Stepper from 'react-stepper-horizontal';

const Levels = ({quizLevel, levelNames}) => {

    const [levels, setLevels] = useState([]);

    useEffect(() => {
        const quizSteps = levelNames.map(level => ({title: level.toUpperCase()}));
        setLevels(quizSteps)
    }, [levelNames])
    return (
        <div className="levelsContainer" style={{background: 'transparent'}}>
            <Fragment>
                <Stepper
                    steps={ levels}
                    activeStep={ quizLevel }
                    circleTop={0}
                    activeTitleColor={'#d31017'}
                    activeColor={'#d31017'}
                    completeTitleColor={'#E0E0E0'}
                    completeColor={'#E0E0E0'}
                    completeBarColor={'#E0E0E0'}
                    barStyle={'dashed'}
                />
            </Fragment>
        </div>
    )
}

export default React.memo(Levels);