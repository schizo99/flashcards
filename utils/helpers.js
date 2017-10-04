import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const QUIZ_KEY = 'MobileFlashcards:quizDone'

export function setQuizDone () {
  return Notifications.cancelAllScheduledNotificationsAsync()
}

function createNotification () {
  return {
    title: 'Take a quiz!',
    body: "Don't forget to take a quiz today!",
    ios: {
      sound: true,
    },
  }
}

export function setLocalNotification () {
  let today = new Date()
  today.setHours(20)
  today.setMinutes(0)
  today.setSeconds(0)
  today.setMilliseconds(0)
  todayKey = today.getTime()
  AsyncStorage.getItem(QUIZ_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data !== todayKey) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: today,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(QUIZ_KEY, JSON.stringify(todayKey))
            } else if (status === 'undetermined') {
              alert("Please enable notifications to get Quiz reminders.")
            }
          })
      }
    })
}