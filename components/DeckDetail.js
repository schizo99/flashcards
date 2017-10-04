import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import getDecks from '../utils/api'
import { AppLoading } from 'expo'

class DeckDetail extends Component {

  state = {
    ready: true,
  }
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: `${deckId}`
    }
  }
  render() {
    const { deckId, questions } = this.props
    return (
      <View style={styles.decks}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 40}}>{deckId}</Text>
          <Text style={{fontSize: 20, color: 'gray', textAlign: 'center'}}>
            { typeof questions === 'undefined' ? 0 : questions.length } cards</Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate('AddCard', { deckId })}>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quizButton} onPress={() => this.props.navigation.navigate('Quiz', { deckId })}>
            <Text style={{color: 'white'}}>Start Quiz</Text>
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
  decks: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noDecks: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  addButton: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 5,
  },
  quizButton: {
    backgroundColor: 'black',
    borderWidth: 1,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 5,
  }
})


function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deckId,
    questions: state[deckId].questions,
    navigation
  }
}

export default connect(
  mapStateToProps
)(DeckDetail)