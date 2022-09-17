module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // app: {
  //   keys: env.array('APP_KEYS'),
  // },
  app: {
    keys: env.array('APP_KEYS',['VXe1XB1jT52gAfDUdrPqKQ', 'B6nd556hI+5sE2VqUAUtqw','N61Tdi0yX7fxmxIsaPWcsw','yzc2/nIczrWHN4szxhF7VA'])
  },
});
