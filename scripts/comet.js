'use strict';

const projectConfig = require(`projectConfig`);
const _ = require('lodash');
const cordova = window ? window.cordova : undefined;
const doc = window.document;
const isMobileApp = typeof(cordova) !== undefined;
const statuses = {
  LOADING: 'loading',
  LOADED: 'loaded'
};

function values(obj) {
  var val = [];

  for(var i in obj) {
    if(obj.hasOwnProperty(i)) {
      val.push(obj[i]);
    }
  }

  return val;
}

function initialize() {
  setStatus(statuses.LOADING);

  setContentSecurityPolicy();
  return new Promise(function(resolve, reject) {
    if(isMobileApp) {
      doc.addEventListener('deviceready', resolve, false);
    }
    else {
      resolve();
    }
  })
  .then(function() {
    setStatus(statuses.LOADED);
  });
}

function setStatus(status) {
  var
    cl = document.body.classList,
    allowedStatuses = values(statuses);

  if(allowedStatuses.indexOf(status) === -1) return;

  DOMTokenList.prototype.remove.apply(cl, allowedStatuses);
  cl.add(status);
}

function setContentSecurityPolicy() {
  var
    head = doc.head,
    meta = doc.createElement('meta'),
    csp = projectConfig['content-security-policy'],
    contentStr = '';

  for(var directive in csp) {
    contentStr += `${directive} ${csp[directive].join(' ')};`;
  }

  meta.setAttribute('http-equiv', 'Content-Security-Policy');
  meta.setAttribute('content', contentStr);

  head.insertBefore(meta, head.firstChild);
}

function getConfig(key) {
  return projectConfig[key];
}

function cordovaPlugin(name) {
  return cordova.plugins[name];
}

_.assignIn(exports, {
  initialize: initialize,
  get isMobileApp() {
    return isMobileApp;
  },
  config: getConfig,
  cordovaPlugin: cordovaPlugin
});
