import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'

export default class NewDeck extends Component  {
  state = {
    title: ''
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
    //alignItems: 'center'
  },
  titleInput : {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    margin: 20,
  }
})