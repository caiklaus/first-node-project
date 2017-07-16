'use strict'

/**
 * practice Node.js project
 *
 * @auther caiklaus
 */

import path from 'path';
import ProjectCore from 'project-core';
import createDebug from 'debug';

const $ = global.$ = new ProjectCore();

// create Debug function
$.createDebug = function (name) {
  return createDebug('my:' + name);
};
const debug = $.createDebug('server');

//load config files
$.init.add((done) => {
  $.config.load(path.resolve(__dirname,'config.js'));
  const env = process.env.NODE_ENV || null;
  if (env) {
    debug('load env: %s', e);
    $.config.load(path.resolve(__dirname, '../config', env + '.js'));
  }
  $.env = env;
  done();
});

//init MongoDB
$.init.load(path.resolve(__dirname, 'init', 'mongodb.js'));
//load Models
$.init.load(path.resolve(__dirname, 'models'));


// 加载methods
$.init.load(path.resolve(__dirname, 'methods'));

//init Express
$.init.load(path.resolve(__dirname, 'init', express));
//load routes
$.init.load(path.resolve(__dirname, 'routes'));


$.init((err) =>{
  if (err) {
    console.error(err);
    process.exit(-1);
  } else {
    console.log('inited [env=%s]', $.env);
  }

//  const item = new $.model.User({
//    name: 'User${$.utils.date('Ymd')}',
//    password: '123456',
//    nickname: 'test user',
//  });
//  item.save(console.log);
});
