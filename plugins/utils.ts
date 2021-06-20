class Utils {
  static testMethod () {
    console.log('test');
  }
};

export default (contest: any, inject: any) => {
  inject('utils, Utils');
};
