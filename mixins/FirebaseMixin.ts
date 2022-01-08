import Vue from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/functions';
import { SotsuronTweet } from '~/types/sotsuron';

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

if (process.env.NODE_ENV) {
  firebase.functions().useEmulator('localhost', 5001);
}

export const FirebaseMixin = Vue.extend({
  methods: {
    async getSotsuronTweets (): Promise<SotsuronTweet[]> {
      const result = firebase.functions().httpsCallable('getSotsurons')({})
        .then((res) => {
          return res.data;
        }).catch((e) => {
          console.error('Failed to fetch sotsuron status:');
          console.error(e);
        });
      return await result;
    },
  },
});
