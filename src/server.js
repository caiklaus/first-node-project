'use strict'

/**
 * practice Node.js project
 *
 * @auther caiklaus
 */

import path from 'path';
import ProjectCore from 'project-core';

const $ = global.$ = new ProjectCore();

$.init.add((done) => {
  $.config.load(path.resolve(__dirname,'config.js'));
  const env = process.env.NODE_ENV || null;
  if (env) {
    $.config.load(path.resolve(__dirname, '../config', env + '.js'));
  }
  $.env = env;
  done();
});

//init MongoDB
$.init.load(path.resolve(__dirname, 'init', 'mongodb.js'));
//load Models
$.init.load(path.resolve(__dirname, 'models'));

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

  const item = new $.model.User({
    name: 'User${$.utils.date('Ymd')}',
    password: '123456',
    nickname: 'test user',
  });
  item.save(console.log);
})
