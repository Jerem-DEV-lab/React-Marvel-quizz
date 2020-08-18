import React, {Fragment, useEffect, useRef, useState} from "react";


const Landing = () => {

    const [btn, setBtn] = useState(false);

    const refWolverine = useRef(null);
        useEffect(() => {
            refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true)
        }, 1000)
    }, [])

    const setLeftImg = e => {
        refWolverine.current.classList.add("leftImg");
    }

    const setRightImg = e => {
            refWolverine.current.classList.add("rightImg");
    }

    const clearImg = () => {
            if(refWolverine.current.classList.contains("leftImg")){
                refWolverine.current.classList.remove('leftImg')
            } else if (refWolverine.current.classList.contains("rightImg")) {
                refWolverine.current.classList.remove('rightImg')
        }
    }
    const displayBtn = btn && (
        <Fragment>
            <div className="leftBox" onMouseOver={setLeftImg} onMouseOut={clearImg}>
                <button className="btn-welcome">Inscription</button>
            </div>
            <div className="rightBox" onMouseOver={setRightImg} onMouseOut={clearImg}>
                <button className="btn-welcome">Connexion</button>
            </div>
        </Fragment>
    )

    return(
        <main ref={refWolverine} className="welcomePage">
            { displayBtn }
        </main>
    )
}

export default Landing;