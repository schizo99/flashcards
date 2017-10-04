import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { addCard } from '../actions'
import { saveDeck } from '../utils/api'
import { connect } from 'react-redux'

class NewDeck extends Component  {
  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }

  submit = () => {
    const title = this.props.navigation.state.params.deckId
    const question = this.state
    this.props.addCard({title, question})
    saveDeck({title, questions: [question, ...this.props[title].questions]})
    this.props.goBack()

  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <TextInput
            style={styles.titleInput}
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
            autoCorrect={false}
            placeholder='Question'
          />
          <TextInput
            style={styles.titleInput}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
            autoCorrect={false}
            placeholder='Answer'
          />
          <TouchableOpacity style={styles.submitButton} onPress={this.submit}>
            <Text style={{color: 'white', fontSize: 20}}>
              Submit
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
  },
  titleInput : {
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    height: 40,
    margin: 10,
  },
  submitButton : {
    backgroundColor: 'black',
    borderWidth: 1,
    padding: 10,
    alignSelf: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    margin: 20,
  }
})

function mapStateToProps (state, {navigation}){
  const { deckId } = navigation.state.params
  return {
    [deckId]: state[deckId]
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    addCard: (card) => {
      return dispatch(addCard({
        title: card.title,
        question: card.question
      })
    )},
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewDeck)