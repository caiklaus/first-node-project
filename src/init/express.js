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

module.exports = function (done) {

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:false }));
  
};
