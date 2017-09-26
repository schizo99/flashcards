import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import getDecks from '../utils/api'
import { AppLoading } from 'expo'

class Decks extends Component {

  state = {
    ready: true,
  }
  
  render() {
    const { ready } = this.state
    const { decks } = this.props
    if (ready === false) {
      return <AppLoading />
    }
    if (Object.keys(decks).length === 0) {
      return (
        <View style={styles.container}>
          <View style={styles.decks}>
            <Text style={styles.noDecks}>
              You haven't created any deck.
            </Text>
            <TouchableOpacity style={ styles.createDeckButton } onPress={() => this.props.navigation.navigate('NewDeck')}>
              <Text>
                Create deck
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    console.log("Decks:", decks)
    return (
      <View>
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
  createDeckButton: {
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  }
})

function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
)(Decks)