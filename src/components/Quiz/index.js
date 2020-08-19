import React, {Component, Fragment} from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { QuizMarvel } from "../QuizMarvel";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import QuizOver from "../QuizOver";

toast.configure()

class Quiz extends Component{

    state = {
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

    storedDataRef = React.createRef();

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
    showWelcomeMsg = pseudo  =>{
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
        if (this.state.storedQuestions !==  prevState.storedQuestions) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }

        if(this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
        }

        if(this.props.userData.pseudo) {
            this.showWelcomeMsg(this.props.userData.pseudo)
        }
    }

    gameOver = () =>{
        this.setState({
            quizEnd: true
        })
    }
    submitAnswer = selectdAnswer => {
        this.setState({
            userAnswer: selectdAnswer,
            btnDisabled: false
        })
    }
    nextQuestions = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1){
            this.gameOver();
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

    render() {
        const btnEndQuizz = this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminer"
        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p  key={index}
                    className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
                    onClick={() => this.submitAnswer(option)}
                >
                    {option}
                </p>
            )
        })
        return this.state.quizEnd ? (
                <QuizOver />
            )
            :
            (
                <Fragment>
                    <Levels />
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