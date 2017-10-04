import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { addDeck } from '../actions'
import { saveDeck } from '../utils/api'
import { connect } from 'react-redux'
import { setQuizDone } from '../utils/helpers'

class Quiz extends Component  {
  state = {
    front: true,
    questions: [],
    correct: 0,
    incorrect: 0,
    answeredQuestions: [],
    showResult: false
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  componentDidMount() {
    this.setState({ questions: this.props.questions })
  }
  correct = () => {
    this.setState({ 
      correct: this.state.correct + 1,
      front: true
    })
    this.nextQuestion()
  }
  incorrect = () => {
    this.setState({
      incorrect: this.state.incorrect + 1,
      front: true
    })
    this.nextQuestion()
  }
  nextQuestion = () => {
    answer = this.state.questions.slice(0, 1)
    this.setState({
      questions: this.state.questions.slice(1),
      answeredQuestions: this.state.answeredQuestions.concat(answer)
    });
    if (this.state.questions.length - 1 === 0) {
      this.setState({ showResult: true })
    }
  }
  restart = () => {
    this.setState({
      front: true,
      questions: this.props.questions,
      correct: 0,
      incorrect: 0,
      answeredQuestions: [],
      showResult: false
    })

  }
  flip = () => {
    let front = this.state.front ? false : true
    this.setState({front: front})
  }
  render () {
    const { front, questions, showResult, answeredQuestions, correct, incorrect } = this.state
    const { deckId } = this.props
    if (showResult) {
      setQuizDone()
      return (
        <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.card}>
            <Text style={{textAlign: 'center', fontSize: 40}}>
              Result
            </Text>
            <Text style={{textAlign: 'center', fontSize: 20, color: 'red'}}>
              {((100/answeredQuestions.length) * correct).toFixed(2)} % correct answers
            </Text>
          </View>
          <View style={styles.deck}>
            <TouchableOpacity style={styles.restartButton} onPress={this.restart}>
              <Text style={{textAlign: 'center', color: 'black', fontSize: 20}}>
                Restart Quiz
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack() }>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      )
    }
    
    if (typeof questions === 'undefined' || questions.length === 0 ) {
      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={{fontSize: 40}}>{deckId}</Text>
            <Text style={{fontSize: 20, color: 'gray', textAlign: 'center'}}>
              No cards</Text>
          </View>
          <View style={styles.card}>
            <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
      
    return (
      <View style={styles.container}>
        <View>
          <Text style={{ textAlign: 'left', fontSize: 20, padding: 10 }}>
            {answeredQuestions.length} / {questions.length + answeredQuestions.length} 
          </Text>
        </View>
        <View style={styles.card}>
          <TouchableOpacity onPress={this.flip}>
            <View style={styles.card}>
              <Text style={{textAlign: 'center', fontSize: 40}}>
                { typeof questions[0] !== 'undefined' ?
                    front ? questions[0].answer : questions[0].question 
                    : null }
              </Text>
              <Text style={{textAlign: 'center', fontSize: 20, color: 'red'}}>
                { front && typeof questions[0] !== 'undefined' ? 'Answer' : 'Question' }
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.deck}>
          <TouchableOpacity style={styles.answerButton} onPress={this.correct}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
              Correct
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.correctButton} onPress={this.incorrect}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
              Incorrect
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deck: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleInput : {
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 5,
    height: 40,
    margin: 20,
  },
  answerButton : {
    backgroundColor: 'green',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 5,
    width: 180
  },
  correctButton : {
    backgroundColor: 'red',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 5,
    width: 180
  },
  restartButton : {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 5,
    width: 180
  },
  backButton : {
    backgroundColor: 'black',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 5,
    width: 180
  }
})


function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deckId,
    questions: state[deckId].questions
  }  
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    addDeck: (deck) => dispatch(addDeck({
      [deck.title]: deck
    })),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz)