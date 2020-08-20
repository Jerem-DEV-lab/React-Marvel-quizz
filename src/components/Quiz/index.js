import React, {Component, Fragment} from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { QuizMarvel } from "../QuizMarvel";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import QuizOver from "../QuizOver";
import { FaChevronRight } from 'react-icons/fa';

toast.configure()

class Quiz extends Component{
    constructor(props) {
        super()
        this.initialstate = {
            levelNames: ["debutant", "confirme", "expert"],
            quizLevel: 0,
            maxQuestions: 10,
            storedQuestions: [],
            question: null,
            options: [],
            idQuestion: 0,
            btnDisabled: true,
            userAnswer: null,
            score: 0,
            showWelcomeMsg: false,
            quizEnd: false
        }

        this.state = this.initialstate;
        this.storedDataRef = React.createRef();
    }

    loadQuestions = quizz => {
        const fetchedArrayQuizz = QuizMarvel[0].quizz[quizz]
        if ( fetchedArrayQuizz.length >= this.state.maxQuestions){
            this.storedDataRef.current = fetchedArrayQuizz;
            const newArray = fetchedArrayQuizz.map(({answer, ...keepRest}) => keepRest);
            this.setState({
                storedQuestions: newArray
            })
        }else {
            console.log("pas assez de questions")
        }
    }
    showToastMsg = pseudo  =>{
        if (!this.state.showWelcomeMsg) {
            this.setState({
                showWelcomeMsg: true
            })
            toast.warn(`Bienvenue ${pseudo}, et bonne chance ! `, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar : false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            });
        }
    }

    componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.state.storedQuestions !==  prevState.storedQuestions) && this.state.storedQuestions.length ) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }

        if((this.state.idQuestion !== prevState.idQuestion) && this.state.storedQuestions.length ) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
        }

        if(this.state.quizEnd !== prevState.quizEnd ) {
            const gradePercent =  this.getPercentage(this.state.maxQuestions, this.state.score);
            this.gameOver(gradePercent);
        }

        if(this.props.userData.pseudo !== prevProps.userData.pseudo) {
            this.showToastMsg(this.props.userData.pseudo)
        }
    }

    getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

    gameOver = percent =>{
       if (percent >= 50){
           this.setState({
               quizLevel: this.state.quizLevel + 1,
               percent
           })
       } else{
           this.setState({percent})
       }
    }
    submitAnswer = selectdAnswer => {
        this.setState({
            userAnswer: selectdAnswer,
            btnDisabled: false
        })
    }
    nextQuestions = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1){
            this.setState({
                quizEnd: true
            })
        } else {
            this.setState(prevState => ({
                idQuestion: prevState.idQuestion + 1
            }))
        }
        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
        if(this.state.userAnswer === goodAnswer) {
            this.setState(prevstate => ({
                score: prevstate.score + 1
            }))
            toast.success("Bonne réponse + 1", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar : false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            });
        } else{
            toast.error("Mauvaise réponse !", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar : false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            });
        }
    }
    loadLevelQuestions = param => {
        this.setState({...this.initialstate, quizLevel: param})

        this.loadQuestions(this.state.levelNames[param])
    }
    render() {
        const btnEndQuizz = this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminer"
        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p  key={index}
                    className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
                    onClick={() => this.submitAnswer(option)}
                >
                <FaChevronRight />{option}
                </p>
            )
        })
        return this.state.quizEnd ? (
                <QuizOver
                    ref={this.storedDataRef}
                    levelNames={this.state.levelNames}
                    score={this.state.score}
                    maxQuestion={this.state.maxQuestions}
                    quizLevel={this.state.quizLevel}
                    percent={this.state.percent}
                    loadLevelQuestions={this.loadLevelQuestions}
                />
            )
            :
            (
                <Fragment>
                    <Levels
                        levelNames={this.state.levelNames}
                        quizLevel={this.state.quizLevel}
                    />
                    <ProgressBar
                        idQuestions={this.state.idQuestion}
                        maxQuestions={this.state.maxQuestions}
                    />
                    <Fragment>
                        <h2>{this.state.question}</h2>
                        {displayOptions}
                        <button className="btnSubmit"
                                disabled={this.state.btnDisabled}
                                onClick={this.nextQuestions}
                        >
                            {btnEndQuizz}
                        </button>
                    </Fragment>
                </Fragment>
            )
    }
}

export default Quiz;