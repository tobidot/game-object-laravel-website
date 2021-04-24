/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/ts/games/med-tiva/api/MedTivaServerApi.ts":
/*!*************************************************************!*\
  !*** ./resources/ts/games/med-tiva/api/MedTivaServerApi.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MedTivaServerApi = void 0;

var GameServerApi_1 = __webpack_require__(/*! ../../utils/GameServerApi */ "./resources/ts/games/utils/GameServerApi.ts");

var MedTivaServerApi =
/** @class */
function (_super) {
  __extends(MedTivaServerApi, _super);

  function MedTivaServerApi() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MedTivaServerApi.prototype.recruit = function (data) {
    return this.action('recruit', data);
  };

  return MedTivaServerApi;
}(GameServerApi_1.GameServerApi);

exports.MedTivaServerApi = MedTivaServerApi;

/***/ }),

/***/ "./resources/ts/games/utils/GameServerApi.ts":
/*!***************************************************!*\
  !*** ./resources/ts/games/utils/GameServerApi.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports) {



var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GameServerApi = void 0;

var GameServerApi =
/** @class */
function () {
  function GameServerApi() {
    var query = new URLSearchParams(window.location.search);
    this.auth_token = query.get("auth-token");
    this.game_session_id = query.get("game-session");
    if (!this.game_session_id) throw new Error("Unable to initialize GameServerApi");
    this.base_uri = "/api/game-sessions/" + this.game_session_id;
    this.headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
    console.log("Enter Game Session", this.game_session_id, "with auth_token", this.auth_token);
  }

  GameServerApi.prototype.get_body = function (data) {
    return JSON.stringify(Object.assign({
      auth_token: this.auth_token
    }, data));
  };

  GameServerApi.prototype.standard_fetch = function (target, data) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , fetch(target, {
          method: "POST",
          body: this.get_body(data),
          headers: this.headers
        }).then(function (response) {
          return response.json();
        }).then(function (json) {
          if (!('success' in json) || json.success !== true) {
            return Promise.reject({
              reason: "Fetching from server was not successfull",
              details: json
            });
          }

          return json.data;
        })];
      });
    });
  };

  GameServerApi.prototype.get_me = function () {
    var target = this.base_uri + "/me";
    var data = {};
    return this.standard_fetch(target, data);
  };

  GameServerApi.prototype.get_players = function () {
    var target = this.base_uri + "/players";
    var data = {};
    return this.standard_fetch(target, data);
  };

  GameServerApi.prototype.get_variables = function (list) {
    return __awaiter(this, void 0, void 0, function () {
      var target, data;
      return __generator(this, function (_a) {
        target = this.base_uri + "/data";
        data = {
          variables: list
        };
        return [2
        /*return*/
        , this.standard_fetch(target, data)];
      });
    });
  };

  GameServerApi.prototype.get_fields = function (list) {
    return __awaiter(this, void 0, void 0, function () {
      var target, data;
      return __generator(this, function (_a) {
        target = this.base_uri + "/fields";
        data = {
          fields: list
        };
        return [2
        /*return*/
        , this.standard_fetch(target, data)];
      });
    });
  };

  GameServerApi.prototype.action = function (action, action_data) {
    if (action_data === void 0) {
      action_data = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      var target, data;
      return __generator(this, function (_a) {
        target = this.base_uri + "/action";
        data = {
          action: action,
          action_data: action_data
        };
        return [2
        /*return*/
        , this.standard_fetch(target, data)];
      });
    });
  };

  return GameServerApi;
}();

exports.GameServerApi = GameServerApi;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************************************!*\
  !*** ./resources/ts/games/med-tiva/index.ts ***!
  \**********************************************/


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var MedTivaServerApi_1 = __webpack_require__(/*! ./api/MedTivaServerApi */ "./resources/ts/games/med-tiva/api/MedTivaServerApi.ts");

console.log("initialize Med-Tiva");
var api = new MedTivaServerApi_1.MedTivaServerApi();
window.api = api;
})();

/******/ })()
;