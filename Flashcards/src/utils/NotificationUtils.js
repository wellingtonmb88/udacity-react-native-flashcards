
import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'Flashcards:notifications';
const QUIZ_COMPLETED_DATE = 'QUIZ_COMPLETED_DATE';

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  };

  function createNotification () {
    console.log("createNotification")
    return {
      title: 'Exercise your brain!',
      body: "👋 don't forget to train your flashcards for today!",
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  };

  export function setLocalNotification() {
    AsyncStorage.getItem(QUIZ_COMPLETED_DATE)
      .then(JSON.parse)
      .then((date) => {
        const today = (new Date()).toDateString();

        console.log("today", today)
        console.log("date", date)
        if(today !== date) {

            console.log("date2:", date)
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {

            console.log("status", status)
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()

                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate())
                tomorrow.setHours(21)
                tomorrow.setMinutes(39)

                console.log("tomorrow", tomorrow)
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day'
                  }
                );
              }
            });
        }
      });
  };

  export function setLocalNotification2 () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()

                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMintutes(0)
                const today = (new Date()).toDateString();

                Notifications.scheduleLocalNotificationsAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            });
        }
      });
  };