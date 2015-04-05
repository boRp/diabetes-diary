# Diabetes-Diary

A Meteor mobile app to keep track of health data for diabetes patients. **[PRE-ALPHA]**


## DISCLAIMER !


### Experimental Pre-Alpha

This app is in pre-alpha status. It's an experiment and should be treated as such. If you feel like joining the experiment - feel free!


### About the Management of Health Data

Health data is sensitive and important! As a diabetes patient, you should keep track of your values OUTSIDE OF THIS APP, as neither the data's safety nor its integrity can be guaranteed in experimental pre-alpha mode. Neither owner nor any contributors are responsible for any actions anybody takes regarding his or her health.


### Exemption from Liability

This app is heavily under development. Neither owner nor contributors are responsible for actions an individual chooses to take with the code published. This includes (but is not limited to) any effects the app will have on the device it is installed on, choices based on the data entered into the app or any other action.

None of us is a legal expert - we're just experimenting with an app.


## About this App

This app is an experiment in using the meteor framework to build a mobile app.

The app's goal is to provide a diabetes patient with the means to keep track of his blood glucose value, the meals he eats, the insuline injected and further comments. We aim to keep as much control over the data as possible with the user.

Please refer to the [to-do-list](TODOS.md) for features not yet included in the app.


### Demo

Find a running demo here: diadia.meteor.com

The demo is running in the browser and is also a "native" mobile app. For example, the android version can be downloaded here: <INSERT-URL>

:info: You need to allow the installation of "untrusted apps on your android device <INSERT_MORE_INFO>



## Quickstart


1. Install meteor (https://www.meteor.com/install)
2. Clone the repository `git@github.com:boRp/diabetes-diary.git`
3. One plugin MUST be installed via mrt before: `mrt add clockpicker`
   This plugin is not transferred to the new package style yet, more info can be found here: https://github.com/AndrasPH/meteor-clockpicker


### Run the app

in browser for local development:

`meteor`


Or on a plugged-in device:

`meteor run android-device`

`meteor run ios-device`

More general information regarding meteor can be found here: http://docs.meteor.com/#/basic/


### technical details

For more specific technical details, please see [technical documentation](TECHNICAL-FEATURES.md)


### build

> This has only been tested for android yet!


To build the app:

`meteor build /tmp/diadia/ --server diadia.meteor.com:80 --debug`

> The debug flag seems to be needed to install the apk on the phone without going through the app store


Afterwards, you'll find the compiled apk within `/tmp/diadia/<INSERT_PATH>`



More information on building mobile apps for android and iOS: http://docs.meteor.com/#/basic/buildingmobileapps




## License

MIT