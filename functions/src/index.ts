import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import { TwitterApi, TweetV2 } from 'twitter-api-v2';
import * as moment from 'moment';

firebase.initializeApp();

export interface SotsuronTweet {
  id: string,
  done_pages: number,
  text: string,
  timestamp: number,
}

const sotsuronTweetPattern = /\(([0-9]+)\/30\)$/;

const getSotsuronText = (tweet: TweetV2) => {
  const tweet_str = tweet.text;
  const index = tweet_str.search(sotsuronTweetPattern);
  if (index === -1) {
    return '';
  } else {
    return tweet_str.slice(0, index);
  }
};

const getSotsuronDonePage = (tweet: TweetV2) => {
  const tweet_str = tweet.text;
  const match = tweet_str.match(sotsuronTweetPattern);
  if (match === null) {
    return null;
  } else {
    return Number(match[1]);
  }
};

const isSotsuronTweet = (tweet: TweetV2) => {
  const done_pages = getSotsuronDonePage(tweet);
  return done_pages !== null && !isNaN(done_pages);
};

const getTimestamp = (tweet: TweetV2) => {
  const time_str = tweet.created_at;
  if (time_str === undefined) {
    return moment().unix();
  }
  return moment(time_str).unix();
};

const tweet2sotsuron = (tweet: TweetV2) => {
  const done_pages = getSotsuronDonePage(tweet) as number;
  const text = getSotsuronText(tweet);
  const timestamp = getTimestamp(tweet);
  return {
    id: tweet.id,
    done_pages,
    text,
    timestamp,
  } as SotsuronTweet;
};

const registerSotsuronTweet = async (tweet: SotsuronTweet) => {
  const sotsuronRef = firebase.firestore().collection('sotsuron').doc(tweet.id);
  await sotsuronRef.set(tweet, {
    merge: true,
  });
};

const getMyRecentTweets = async () => {
  const keys = {
    appKey: functions.config().twitter.app_key,
    appSecret: functions.config().twitter.app_secret,
    accessToken: functions.config().twitter.access_token,
    accessSecret: functions.config().twitter.access_secret,
  };
  const client = (new TwitterApi(keys)).readOnly;
  const me = await client.currentUser();
  const since = moment().subtract(1, 'day');
  const timeline = await client.v2.userTimeline(me.id_str, {
    'exclude': ['retweets', 'replies'],
    'tweet.fields': ['created_at'],
    'start_time': since.format(),
  });

  return timeline.tweets;
};

const updateSotsuronTweets = async () => {
  const sotsuron_tweets = (await getMyRecentTweets()).filter((tweet) => {
    return isSotsuronTweet(tweet);
  }).map((tweet) => {
    return tweet2sotsuron(tweet);
  });
  (await getMyRecentTweets()).filter((tweet) => {
    return isSotsuronTweet(tweet);
  });

  for (const sotsuron of sotsuron_tweets) {
    registerSotsuronTweet(sotsuron);
  }
};

exports.getSotsurons = functions.https.onCall(async (_data, _context) => {
  const sotsuronRef = firebase.firestore().collection('sotsuron');
  const snapshot = await sotsuronRef.get();
  if (snapshot.empty) {
    return [];
  }
  const sotsurons = [] as SotsuronTweet[];
  snapshot.forEach((doc) => {
    const data = doc.data();
    sotsurons.push({
      id: data.id,
      done_pages: data.done_pages,
      text: data.text,
      timestamp: data.timestamp,
    });
  });

  return sotsurons;
});

exports.scheduledSotsuronUpdate = functions.pubsub.schedule('every 1 hours').onRun(async () => {
  await updateSotsuronTweets();
});
