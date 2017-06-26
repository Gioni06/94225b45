import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import https from 'https';
import crendentials from './credentials';
import config from './config';
import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Home from '../src/components/home.component';
import SocketIo from 'socket.io'
import socketEvents from './socket.events'

const app = express();
const environment = process.env.NODE_ENV || 'production';
let port = process.env.PORT || config.DEV_PORT;

const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.resolve(__dirname, '../server/views/layouts'),
  extname: '.handlebars',
  helpers: {
    json: function(obj) {
      return JSON.stringify(obj, null, 3);
    },
  },
});

app.engine('handlebars', hbs.engine);
const viewsLocation = path.resolve(__dirname, '../server/views');
app.set('view engine', 'handlebars');
app.set('views', viewsLocation);

if (environment === 'development') {
  const webpackConfig = require('../config/webpack.config.dev');
  const compiler = webpack(webpackConfig);
  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
      },
    })
  );
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(express.static(path.resolve(__dirname, 'src')));
} else {
  port = config.PROD_PORT;
  app.use(express.static(path.resolve(__dirname, 'dist')));
}

app.get('/', (req, res) => {
  const options = { };
  res.render('home', options);
});

const httpsServer = https.createServer(crendentials, app);
httpsServer.listen(port, config.HOST, err => {
  if (err) {
    throw new Error(err);
  } else {
    console.info(config.serverMessage(port));
  }
});

const io = new SocketIo(httpsServer)
socketEvents(io)
