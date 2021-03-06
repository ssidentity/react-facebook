"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.Method = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _LoginStatus = _interopRequireDefault(require("./constants/LoginStatus"));

var Method = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete'
};
exports.Method = Method;

var Facebook =
/*#__PURE__*/
function () {
  function Facebook(options) {
    if (options === void 0) {
      options = {};
    }

    this.options = (0, _extends2.default)({
      domain: 'connect.facebook.net',
      version: 'v3.2',
      cookie: false,
      status: false,
      xfbml: false,
      language: 'en_US',
      frictionlessRequests: false,
      debug: false,
      chatSupport: false
    }, options);

    if (!this.options.appId) {
      throw new Error('You need to set appId');
    }

    if (!this.options.wait) {
      this.init();
    }
  }

  var _proto = Facebook.prototype;

  _proto.getAppId = function getAppId() {
    return this.options.appId;
  };

  _proto.init = function init() {
    var _this = this;

    return _regenerator.default.async(function init$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!this.loadingPromise) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", this.loadingPromise);

          case 2:
            this.loadingPromise = new Promise(function (resolve) {
              var _this$options = _this.options,
                  domain = _this$options.domain,
                  language = _this$options.language,
                  debug = _this$options.debug,
                  chatSupport = _this$options.chatSupport,
                  restOptions = (0, _objectWithoutPropertiesLoose2.default)(_this$options, ["domain", "language", "debug", "chatSupport"]);

              window.fbAsyncInit = function () {
                window.FB.init({
                  appId: restOptions.appId,
                  version: restOptions.version,
                  cookie: restOptions.cookie,
                  status: restOptions.status,
                  xfbml: restOptions.xfbml,
                  frictionlessRequests: _this.frictionlessRequests
                });
                resolve(window.FB);
              };

              if (window.document.getElementById('facebook-jssdk')) {
                return resolve(window.FB);
              }

              var js = window.document.createElement('script');
              js.id = 'facebook-jssdk';
              js.async = true;
              js.defer = true;
              js.src = "https://" + domain + "/" + language + "/sdk" + (chatSupport ? '/xfbml.customerchat' : '') + (debug ? '/debug' : '') + ".js";
              window.document.body.appendChild(js);
            });
            return _context.abrupt("return", this.loadingPromise);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  };

  _proto.process = function process(method, before, after) {
    var fb;
    return _regenerator.default.async(function process$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (before === void 0) {
              before = [];
            }

            if (after === void 0) {
              after = [];
            }

            _context2.next = 4;
            return _regenerator.default.awrap(this.init());

          case 4:
            fb = _context2.sent;
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              fb[method].apply(fb, before.concat([function (response) {
                if (!response) {
                  reject(new Error('Response is undefined'));
                } else if (response.error) {
                  var _response$error = response.error,
                      code = _response$error.code,
                      type = _response$error.type,
                      message = _response$error.message;
                  var error = new Error(message);
                  error.code = code;
                  error.type = type;
                  reject(error);
                } else {
                  resolve(response);
                }
              }], after));
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  };

  _proto.ui = function ui(options) {
    return _regenerator.default.async(function ui$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", this.process('ui', [options]));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  };

  _proto.api = function api(path, method, params) {
    return _regenerator.default.async(function api$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (method === void 0) {
              method = Method.GET;
            }

            if (params === void 0) {
              params = {};
            }

            return _context4.abrupt("return", this.process('api', [path, method, params]));

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  };

  _proto.login = function login(opts) {
    return _regenerator.default.async(function login$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (opts === void 0) {
              opts = null;
            }

            return _context5.abrupt("return", this.process('login', [], [opts]));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  };

  _proto.logout = function logout() {
    return _regenerator.default.async(function logout$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", this.process('logout'));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, null, this);
  };

  _proto.getLoginStatus = function getLoginStatus() {
    return _regenerator.default.async(function getLoginStatus$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", this.process('getLoginStatus'));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, null, this);
  };

  _proto.getAuthResponse = function getAuthResponse() {
    return _regenerator.default.async(function getAuthResponse$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", this.process('getAuthResponse'));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, null, this);
  };

  _proto.getTokenDetail = function getTokenDetail(loginResponse) {
    var response;
    return _regenerator.default.async(function getTokenDetail$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (!(loginResponse.status === _LoginStatus.default.CONNECTED && loginResponse.authResponse)) {
              _context9.next = 2;
              break;
            }

            return _context9.abrupt("return", loginResponse.authResponse);

          case 2:
            _context9.next = 4;
            return _regenerator.default.awrap(this.getLoginStatus());

          case 4:
            response = _context9.sent;

            if (!(response.status === _LoginStatus.default.CONNECTED && response.authResponse)) {
              _context9.next = 7;
              break;
            }

            return _context9.abrupt("return", response.authResponse);

          case 7:
            throw new Error('Token is undefined');

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, null, this);
  };

  _proto.getProfile = function getProfile(params) {
    return _regenerator.default.async(function getProfile$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.abrupt("return", this.api('/me', Method.GET, params));

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, null, this);
  };

  _proto.getTokenDetailWithProfile = function getTokenDetailWithProfile(params, response) {
    var tokenDetail, profile;
    return _regenerator.default.async(function getTokenDetailWithProfile$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _regenerator.default.awrap(this.getTokenDetail(response));

          case 2:
            tokenDetail = _context11.sent;
            _context11.next = 5;
            return _regenerator.default.awrap(this.getProfile(params));

          case 5:
            profile = _context11.sent;
            return _context11.abrupt("return", {
              profile: profile,
              tokenDetail: tokenDetail
            });

          case 7:
          case "end":
            return _context11.stop();
        }
      }
    }, null, this);
  };

  _proto.getToken = function getToken() {
    var authResponse;
    return _regenerator.default.async(function getToken$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _regenerator.default.awrap(this.getTokenDetail());

          case 2:
            authResponse = _context12.sent;
            return _context12.abrupt("return", authResponse.accessToken);

          case 4:
          case "end":
            return _context12.stop();
        }
      }
    }, null, this);
  };

  _proto.getUserId = function getUserId() {
    var authResponse;
    return _regenerator.default.async(function getUserId$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _regenerator.default.awrap(this.getTokenDetail());

          case 2:
            authResponse = _context13.sent;
            return _context13.abrupt("return", authResponse.userID);

          case 4:
          case "end":
            return _context13.stop();
        }
      }
    }, null, this);
  };

  _proto.sendInvite = function sendInvite(to, options) {
    return _regenerator.default.async(function sendInvite$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            return _context14.abrupt("return", this.ui((0, _extends2.default)({
              to: to,
              method: 'apprequests'
            }, options)));

          case 1:
          case "end":
            return _context14.stop();
        }
      }
    }, null, this);
  };

  _proto.postAction = function postAction(ogNamespace, ogAction, ogObject, ogObjectUrl, noFeedStory) {
    var url;
    return _regenerator.default.async(function postAction$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            url = "/me/" + ogNamespace + ":" + ogAction + "?" + ogObject + "=" + encodeURIComponent(ogObjectUrl);

            if (noFeedStory === true) {
              url += '&no_feed_story=true';
            }

            return _context15.abrupt("return", this.api(url, Method.POST));

          case 3:
          case "end":
            return _context15.stop();
        }
      }
    }, null, this);
  };

  _proto.getPermissions = function getPermissions() {
    var response;
    return _regenerator.default.async(function getPermissions$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _regenerator.default.awrap(this.api('/me/permissions'));

          case 2:
            response = _context16.sent;
            return _context16.abrupt("return", response.data);

          case 4:
          case "end":
            return _context16.stop();
        }
      }
    }, null, this);
  };

  _proto.hasPermissions = function hasPermissions(permissions) {
    var usersPermissions, findedPermissions;
    return _regenerator.default.async(function hasPermissions$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return _regenerator.default.awrap(this.getPermissions());

          case 2:
            usersPermissions = _context17.sent;
            findedPermissions = permissions.filter(function (p) {
              var currentPermission = usersPermissions.find(function (row) {
                var permission = row.permission,
                    status = row.status;
                return status === 'granted' && permission === p;
              });
              return !!currentPermission;
            });
            return _context17.abrupt("return", findedPermissions.length === permissions.length);

          case 5:
          case "end":
            return _context17.stop();
        }
      }
    }, null, this);
  };

  _proto.subscribe = function subscribe(eventName, callback) {
    var fb;
    return _regenerator.default.async(function subscribe$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return _regenerator.default.awrap(this.init());

          case 2:
            fb = _context18.sent;
            fb.Event.subscribe(eventName, callback);

          case 4:
          case "end":
            return _context18.stop();
        }
      }
    }, null, this);
  };

  _proto.unsubscribe = function unsubscribe(eventName, callback) {
    var fb;
    return _regenerator.default.async(function unsubscribe$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return _regenerator.default.awrap(this.init());

          case 2:
            fb = _context19.sent;
            fb.Event.unsubscribe(eventName, callback);

          case 4:
          case "end":
            return _context19.stop();
        }
      }
    }, null, this);
  };

  _proto.parse = function parse(parentNode) {
    var fb;
    return _regenerator.default.async(function parse$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return _regenerator.default.awrap(this.init());

          case 2:
            fb = _context20.sent;

            if (typeof parentNode === 'undefined') {
              fb.XFBML.parse();
            } else {
              fb.XFBML.parse(parentNode);
            }

          case 4:
          case "end":
            return _context20.stop();
        }
      }
    }, null, this);
  };

  _proto.getRequests = function getRequests() {
    return _regenerator.default.async(function getRequests$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            return _context21.abrupt("return", this.api('/me/apprequests'));

          case 1:
          case "end":
            return _context21.stop();
        }
      }
    }, null, this);
  };

  _proto.removeRequest = function removeRequest(requestID) {
    return _regenerator.default.async(function removeRequest$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            return _context22.abrupt("return", this.api(requestID, Method.DELETE));

          case 1:
          case "end":
            return _context22.stop();
        }
      }
    }, null, this);
  };

  _proto.setAutoGrow = function setAutoGrow() {
    var fb;
    return _regenerator.default.async(function setAutoGrow$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.next = 2;
            return _regenerator.default.awrap(this.init());

          case 2:
            fb = _context23.sent;
            fb.Canvas.setAutoGrow();

          case 4:
          case "end":
            return _context23.stop();
        }
      }
    }, null, this);
  };

  _proto.paySimple = function paySimple(product, quantity) {
    return _regenerator.default.async(function paySimple$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            if (quantity === void 0) {
              quantity = 1;
            }

            return _context24.abrupt("return", this.ui({
              method: 'pay',
              action: 'purchaseitem',
              product: product,
              quantity: quantity
            }));

          case 2:
          case "end":
            return _context24.stop();
        }
      }
    }, null, this);
  };

  _proto.pay = function pay(product, options) {
    return _regenerator.default.async(function pay$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            return _context25.abrupt("return", this.ui((0, _extends2.default)({
              method: 'pay',
              action: 'purchaseitem',
              product: product
            }, options)));

          case 1:
          case "end":
            return _context25.stop();
        }
      }
    }, null, this);
  };

  return Facebook;
}();
/*
  sendToFriends: function(options, callback) {
    if(!options) {
      options = {};
    }

    options.method = 'send';

    this.afterLoad(function(err, fbApi) {
      if(err) {
        return callback(err);
      }

      FB.ui(options, function(response) {
        fbApi._callCallbackByResponse(callback, response);
      });
    });
  },

  sendMessage: function(message, name, caption, description, url, imgUrl, callback) {
    this.afterLoad(function(err, fbApi) {
      if(err) {
        return callback(err);
      }

      FB.ui({
        method: 'stream.publish',
        message: message,
        attachment: {
          name: name,
          caption: caption,
          description: description,
          href: url,
          media:[{
            type: 'image',
            src:  imgUrl,
            href: url
          }]
        },
        action_links: [{
          text: 'Code',
          href: url
        }],
        user_prompt_message: message
      },
      function(response) {
        fbApi._callCallbackByResponse(callback, response);
      });
    });
  },

  sendInviteForm: function(options, callback) {
    if(typeof options === 'function') {
      callback = options;
      options = {};
    }

    this.afterLoad(function(err, fbApi) {
      if(err) {
        return callback(err);
      }

      options.method = options.method || 'apprequests';


      FB.ui(options, function(response) {
        fbApi._callCallbackByResponse(callback, response);
      });
    });
  },

  checkPageLike: function(pageID, callback) {
    this.afterLoad(function(err, fbApi) {
      if(err) {
        return callback(err);
      }

      fbApi.getUserID(function(err, userID) {
        if(err) {
          return callback(err);
        }

        var fqlQuery = `SELECT uid FROM page_fan WHERE page_id = ${pageID} and uid = ${userID}`;
        var query = FB.Data.query(fqlQuery);

        query.wait(function(rows) {
          if (rows.length === 1 && rows[0].uid === userID) {
            callback(null, true, query);
          }
          else {
            callback(null, false, query);
          }
        });
      });
    });
  },

  sendMessageToFriend: function (friendID, link, callback) {
    this.afterLoad(function(err, fbApi) {
      if(err) {
        return callback(err);
      }

      FB.ui({
        to: friendID,
        method: 'send',
        link: link
      }, function(response) {
        fbApi._callCallbackByResponse(callback, response);
      });
    });
  },

  _prepareUsers: function(data) {
    var users=[];

    for(var index in data) {
      var userData=data[index];

      var user = {
        provider_uid: 'facebook'+'_'+userData.uid,
        provider: 'facebook',
        id: userData.uid,
        name: userData.name,
        first_name: userData.first_name,
        last_name: userData.last_name,
        status: (userData.status!==null) ? userData.status : null,
        image: '//graph.facebook.com/'+userData.uid+'/picture?'
      };

      users.push(user);
    }

    return users;
  },

  getUserList: function(callback) {
    this.afterLoad(function(err, fbApi) {
      if(err) {
        return callback(err);
      }

      FB.api('fql', {
        q: `
          SELECT uid, name, first_name, last_name, online_presence, status
          FROM user
          WHERE uid IN
            ( SELECT uid2 FROM friend WHERE uid1 = me()) ORDER BY name
        `,
      }, function (response)
      {
        var users = fbApi._prepareUsers(response.data);
        callback(null, users, response);
      });
    });
  },

  postFeed: function(options, callback) {
    this.afterLoad(function(err, fbApi) {
      if(err) {
        return callback(err);
      }

      options.method='feed';

      FB.ui(options, function(response) {
        fbApi._callCallbackByResponse(callback, response);
      });
    });
  },

  //need publish_stream
  createAlbum: function(name, description, callback) {
    this.afterLoad(function(err, fbApi) {
      if(err) {
        return callback(err);
      }

      FB.api('/me/albums', 'post', {
        name: name,
        description: description
      },function(response) {
        fbApi._callCallbackByResponse(callback, response);
      });
    });
  },

  //need publish_stream
  addImageToAlbum: function(albumID, imageURL, message, callback) {
    this.afterLoad(function(err, fbApi) {
      if(err) {
        return callback(err);
      }

      FB.api('/'+albumID+'/photos', 'post', {
        message: message,
        url: imageURL
      }, function(response) {
        fbApi._callCallbackByResponse(callback, response);
      });
    });
  },

  //'user_photos'
  getAlbums: function(callback) {
    this.afterLoad(function(err, fbApi) {
      if(err) {
        return callback(err);
      }

      FB.api('/me/albums', function(response) {
        fbApi._callCallbackByResponse(callback, response);
      });
    });
  },

  //'user_photos'
  getAlbumPhotos: function(albumID, callback) {
    this.afterLoad(function(err, fbApi) {
      if(err) {
        return callback(err);
      }

      FB.api('/'+albumID+'/photos', function(response) {
        fbApi._callCallbackByResponse(callback, response);
      });
    });
  },

  //'user_photos'
  getAlbumCoverPicture: function(albumID, callback) {
    this.afterLoad(function(err, fbApi) {
      if(err) {
        return callback(err);
      }

      FB.api('/'+albumID+'/picture', function(response) {
        fbApi._callCallbackByResponse(callback, response);
      });
    });
  },

  //'publish_stream'
  postPhoto: function(photoUrl, message, callback) {
    this.afterLoad(function(err, fbApi) {
      if(err) {
        return callback(err);
      }

      FB.api('/me/photos', 'post', {
        message: message,
        url: photoUrl
      },function(response) {
        fbApi._callCallbackByResponse(callback, response);
      });
    });
  },

  getPageInfo: function(callback) {
    this.afterLoad(function(err, fbApi) {
      if(err) {
        return callback(err);
      }

      FB.Canvas.getPageInfo(function(response) {
        fbApi._callCallbackByResponse(callback, response);
      });
    });
  }
*/


exports.default = Facebook;
//# sourceMappingURL=Facebook.js.map