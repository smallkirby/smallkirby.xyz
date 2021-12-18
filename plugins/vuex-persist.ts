import createPersistedState from 'vuex-persistedstate';

// @ts-ignore
export default ({ store }) => {
  createPersistedState({
    key: 'smallkirby.xyz',
    storage: window.localStorage,
  })(store);
};
