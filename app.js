/**
 * Created by Brian on 12/16/2014.
 */

// create angular module and inject firebase
angular.module('scheduleApp', ['firebase'])

// create main controller and access to firebase
.controller('mainController', function($scope, $firebase) {
        // get # of real time users yee
        var listRef = new Firebase("https://shining-inferno-9125.firebaseio.com/presence/");
        var userRef = listRef.push();

        // add to presence list when online
        var presenceRef = new Firebase("https://shining-inferno-9125.firebaseio.com/.info/connected");
        presenceRef.on("value", function(snap) {
            if (snap.val()) {
                userRef.push(true);
                // remove ourselves when we disconnect.
                userRef.onDisconnect().remove()
            }
        });

        listRef.on("value", function(snap) {
            $scope.online = snap.numChildren();
        });


        // connect to firebase
        var ref = new Firebase("https://shining-inferno-9125.firebaseio.com/days");
        var fb = $firebase(ref);

        // sync as object (as opposed to the array method which is good for chat apps *hint
        var syncObject = fb.$asObject();

        // three way data binding mmhmm
        syncObject.$bindTo($scope,'days' );

        // function to set the default data
        $scope.reset = function() {

            fb.$set({
                monday: {
                    name: 'Monday',
                    slots: {
                            009: {
                                time: '9:00am',
                                booked: false
                            },
                            011: {
                                time: '11:00am',
                                booked: false
                            },
                            100: {
                                time: '1:00pm',
                                booked: false
                            },
                            300: {
                                time: '3:00pm',
                                booked: false
                            },
                            500: {
                                time: '5:00pm',
                                booked: false
                            }


                    }
                },
                tuesday: {
                    name: 'Tuesday',
                    slots: {
                        0900: {
                            time: '9:00pm',
                            booked: false
                        },
                        0110: {
                            time: '11:00pm',
                            booked: false
                        }
                    }
                }
            });
        };
    });

