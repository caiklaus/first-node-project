'use strict'

/**
 * practice Node.js project
 *
 * @auther caiklaus
 */

 module.exports = function (set, get, has) {

    //listen server
    set('web.port', 3000);

    // session redis connection
    set('web.session.redis', {
      host: '127.0.0.1',
      port: 6379,
    });

 };
