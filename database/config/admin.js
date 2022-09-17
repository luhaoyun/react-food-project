module.exports = ({ env }) => ({
  // auth: {
  //   secret: env('ADMIN_JWT_SECRET'),
  // },
  // apiToken: {
  //   salt: env('API_TOKEN_SALT'),
  // },
  auth: {
    secret: env('ADMIN_JWT_SECRET','LEaKwgAYmoMFuPBrsQ5ZwQ'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT','XCrnCQhOHvyK3cdtyx5ROA'),
  },
});
