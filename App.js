import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'

function MainStatusBar ({...props}) {
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar translucent {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: <MaterialCommunityIcons name='cards' size={30} color='#000'/>
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: <Entypo name='new-message' size={30} color='#000' />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    //activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      //backgroundColor: '#00f',
      height: 56,
      //backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
   DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <MainStatusBar />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
