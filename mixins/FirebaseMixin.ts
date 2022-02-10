import Vue from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/functions';
import { SotsuronTweet } from '~/typings/sotsuron';
import { sotsuronTweets } from '~/data/sotsuron';

const firebaseConfig = {
  apiKey: 'AIzaSyDGPvC1rphuk62qR__JSz-nV4cA3kEDDNY',
  authDomain: 'smallkirbyxyz-be189.firebaseapp.com',
  projectId: 'smallkirbyxyz-be189',
  storageBucket: 'smallkirbyxyz-be189.appspot.com',
  messagingSenderId: '1053053072521',
  appId: '1:1053053072521:web:41a75204351d8c5b35c258',
  measurementId: 'G-0JTYHMHGKT',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

if (process.env.NODE_ENV !== 'production') {
  firebase.functions().useEmulator('localhost', 5001);
}

export const FirebaseMixin = Vue.extend({
  methods: {
    // fetch sotsuron tweets list.
    // the data is now static.
    getSotsuronTweets (): Promise<SotsuronTweet[]> {
      return Promise.resolve(sotsuronTweets).then((v: SotsuronTweet[]) => v);
    },
  },
});
