'use strict'

/**
 * practice Node.js project
 *
 * @auther caiklaus
 */
import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multiparty from 'multiparty';
import session from 'express-session';
import _RedisStore from 'connect-redis';
const RedisStore = _RedisStore(session);

module.exports = function (done) {

  const debug = $.createDebug('init:express');
  debug('initing Express...');

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(multipart());
  app.use(session({
    secret: $.config.get('web.session.secret'),
    store: new RedisStore($.config.get('web.session.redis')),
  }));

  const router = express.Router();

const routerWrap = {};
['get', 'head', 'post', 'put', 'del', 'delete'].forEach(method => {
  routerWrap[method] = function (path, ...fnList) {
    fnList = fnList.map(fn => {
      return function (req, res, next) {
        const ret = fn(req, res, next);
        if (ret && ret.catch) ret.catch(next);
      };
    });
    router[method](path, ...fnList);
  };
});
$.router = routerWrap;
};
