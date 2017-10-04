import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { AppLoading } from 'expo'

class Decks extends Component {

  state = {
    ready: true,
    animatedValue: new Animated.Value(0),
  }
  componentDidMount () {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  navigate = (title) => {
    this.props.navigation.navigate('DeckDetail', { deckId: title })
    this.setState({ animatedValue: new Animated.Value(0)})
  }
  goDeck = (title) => {
    const { animatedValue } = this.state
    Animated.timing(animatedValue,{
        toValue: 360,
      }).start(() => this.navigate(title))
  }
  render() {
    const { ready, animatedValue } = this.state
    const { decks } = this.props
    let frontInterpolate = animatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    })
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
              <Text style={{color: 'white'}}>
                Create deck
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
          {Object.keys(decks).map(title => {
            const { questions, ...rest } = decks[title]
            
          return (
            <View key={title} style={styles.deck}>
              <TouchableOpacity activeOpacity={1} onPress={() => this.goDeck(title)}>
                <Animated.View style={[{backfaceVisibility: 'hidden'}, {transform: [{ rotateY: frontInterpolate}]}]}>
                  <Text style={{fontSize: 30, textAlign: 'center'}}>{title}</Text>
                  <Text style={{fontSize: 15, color: 'gray', textAlign: 'center'}}>
                    { typeof questions === 'undefined' ? 0 : questions.length } cards
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
          )})}
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
  deck: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  noDecks: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  createDeckButton: {
    backgroundColor: 'black',
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