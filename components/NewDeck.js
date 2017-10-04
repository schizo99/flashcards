import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { addDeck } from '../actions'
import { saveDeck } from '../utils/api'
import { connect } from 'react-redux'

class NewDeck extends Component  {
  state = {
    title: '',
    questions: []
  }
  submit = () => {
    const { title } = this.state
    const deck = this.state
    this.props.addDeck(deck)
    saveDeck(deck)

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
        NavigationActions.navigate({ routeName: 'DeckDetail', params: {deckId: title}})
      ]
    })
    this.props.navigation.dispatch(resetAction)
    
    

  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <Text style={{textAlign: 'center', fontSize: 60}}>
            What is the title of your new deck?
          </Text>
          <TextInput
            style={styles.titleInput}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
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
    justifyContent: 'center',
  },
  titleInput : {
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 5,
    height: 40,
    margin: 20,
  },
  submitButton : {
    backgroundColor: 'black',
    borderWidth: 1,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  }
})

function mapDispatchToProps (dispatch, { navigation }) {

  return {
    addDeck: (deck) => dispatch(addDeck({
      [deck.title]: deck
    })),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  undefined,
  mapDispatchToProps,
)(NewDeck)