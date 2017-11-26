
import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export const QUIZ_COMPLETED_DATE = 'QUIZ_COMPLETED_DATE';

function createNotification() {
    return {
        title: 'Exercise your brain!',
        body: "👋 don't forget to practice your flashcards today!",
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
            Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({ status }) => {
                    if (status === 'granted') {
                        const todayString = (new Date()).toDateString();

                        let scheduledDate = new Date();

                        if (todayString !== date) {
                            //Schedule date for today
                            scheduledDate.setDate(scheduledDate.getDate());
                        } else {
                            //Schedule date for tomorrow
                            scheduledDate.setDate(scheduledDate.getDate() + 1);
                        }

                        scheduledDate.setHours(20);
                        scheduledDate.setMinutes(30);

                        Notifications.cancelAllScheduledNotificationsAsync();

                        Notifications.scheduleLocalNotificationAsync(
                            createNotification(),
                            {
                                time: scheduledDate,
                                repeat: 'day'
                            }
                        );
                    }
                });
        });
};