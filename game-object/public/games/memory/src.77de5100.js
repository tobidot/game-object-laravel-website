// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/@game.object/ts-game-toolbox/src/data/RgbColor.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RgbColor = void 0;
var RgbColor = /** @class */ (function () {
    function RgbColor(r, g, b, a) {
        if (r === void 0) { r = 0; }
        if (g === void 0) { g = 0; }
        if (b === void 0) { b = 0; }
        if (a === void 0) { a = 255; }
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    RgbColor.prototype.to_hex = function () {
        return "#" + [this.r, this.g, this.b, this.a].map(function (v) { return ("00" + v.toString(16)).substr(-2); }).join('');
    };
    RgbColor.prototype.lerp = function (other, t) {
        return new RgbColor(this.r * (1 - t) + other.r * t, this.g * (1 - t) + other.g * t, this.b * (1 - t) + other.b * t, this.a * (1 - t) + other.a * t);
    };
    return RgbColor;
}());
exports.RgbColor = RgbColor;

},{}],"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_event_controller_interface = exports.is_controller_interface = exports.Controller = void 0;
class Controller {
    constructor(models, views, controllers) {
        this.models = models;
        this.views = views;
        this.controllers = controllers;
    }
}
exports.Controller = Controller;
function is_controller_interface(controller) {
    return controller instanceof Controller;
}
exports.is_controller_interface = is_controller_interface;
function is_event_controller_interface(controller) {
    return controller instanceof Controller;
}
exports.is_event_controller_interface = is_event_controller_interface;

},{}],"game/controllers/BaseController.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseController = void 0;

var Controller_1 = require("@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller");

var BaseController = /*#__PURE__*/function (_Controller_1$Control) {
  _inherits(BaseController, _Controller_1$Control);

  var _super = _createSuper(BaseController);

  function BaseController() {
    _classCallCheck(this, BaseController);

    return _super.apply(this, arguments);
  }

  return BaseController;
}(Controller_1.Controller);

exports.BaseController = BaseController;
},{"@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller.js"}],"game/controllers/GameController.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameController = void 0;

var RgbColor_1 = require("@game.object/ts-game-toolbox/src/data/RgbColor");

var BaseController_1 = require("./BaseController");

var GameController = /*#__PURE__*/function (_BaseController_1$Bas) {
  _inherits(GameController, _BaseController_1$Bas);

  var _super = _createSuper(GameController);

  function GameController() {
    var _this;

    _classCallCheck(this, GameController);

    _this = _super.apply(this, arguments);
    _this.colord_gradients = 3;
    _this.board_size = 6;
    _this.board_spacing = 80;
    _this.card_size = 60;

    _this.all_colors = function () {
      var step = Math.trunc(0xdf / _this.colord_gradients) + 0x20;
      var buffer = [];

      for (var r = 0x20; r <= 0xff; r += step) {
        for (var g = 0x20; g <= 0xff; g += step) {
          for (var b = 0x20; b <= 0xff; b += step) {
            if (r === b && b === g) continue;
            buffer.push(new RgbColor_1.RgbColor(r, g, b));
          }
        }
      }

      return buffer;
    }();

    return _this;
  }
  /**
   * Start a new game
   */


  _createClass(GameController, [{
    key: "new_game",
    value: function new_game() {
      this.new_players();
      this.new_memory_cards();
      this.shuffle_memory_cards(); /// response

      this.models.camera.center.set(400 - this.board_spacing * this.board_size / 2, 300 - this.board_spacing * this.board_size / 2);
      var response = {
        view: this.views.main.current_player.set(this.models.game.active_player).players.set(this.models.players.all()).memory_cards.set(this.models.cards.all()).camera.set(this.models.camera),
        controller: this.controllers.for_event.game_controller
      };
      return response;
    }
  }, {
    key: "new_memory_cards",
    value: function new_memory_cards() {
      var last_color = null;

      for (var x = 0; x < this.board_size; x++) {
        for (var y = 0; y < this.board_size; y++) {
          var card = this.models.cards.insert_new();
          card.collider.set(x * this.board_spacing + 10, y * this.board_spacing + 10, this.card_size, this.card_size);
          card.is_revealed = false;

          if (last_color === null) {
            card.color = last_color = this.get_random_color();
          } else {
            card.color = last_color;
            last_color = null;
          }
        }
      }
    }
  }, {
    key: "shuffle_memory_cards",
    value: function shuffle_memory_cards() {
      var all_cards = this.models.cards.all();

      for (var i = 0; i < 25 * 2; ++i) {
        var card_a = all_cards[Math.trunc(all_cards.length * Math.random())];
        var card_b = all_cards[Math.trunc(all_cards.length * Math.random())]; // swap the colors

        var _ref = [card_b.color, card_a.color];
        card_a.color = _ref[0];
        card_b.color = _ref[1];
      }
    }
  }, {
    key: "new_players",
    value: function new_players() {
      var _this2 = this;

      for (var i = 0; i < 2; ++i) {
        this.models.players.insert_new(function (model) {
          model.points = 0;
          model.selected_card = null;
          _this2.models.game.max_player_id = model.id;
          return model;
        });
      }

      this.models.game.active_player = this.models.players.all()[0];
    }
  }, {
    key: "get_random_color",
    value: function get_random_color() {
      return this.all_colors[Math.trunc(Math.random() * this.all_colors.length)];
    }
  }]);

  return GameController;
}(BaseController_1.BaseController);

exports.GameController = GameController;
},{"@game.object/ts-game-toolbox/src/data/RgbColor":"../node_modules/@game.object/ts-game-toolbox/src/data/RgbColor.ts","./BaseController":"game/controllers/BaseController.ts"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/geometries/Vector2.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
class Vector2 {
    constructor(x = 0, y = 0) {
        if (typeof x === "object") {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }
    }
    set(x, y = 0) {
        if (typeof x === "object") {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }
        return this;
    }
    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    mul(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    divide(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }
    len2() {
        return this.x * this.x + this.y * this.y;
    }
    len() {
        return Math.sqrt(this.len2());
    }
    set_magnitude(magnitude) {
        const len = this.len();
        this.x = this.x / len * magnitude;
        this.y = this.y / len * magnitude;
        return this;
    }
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
    cross(other) {
        return new Vector2(this.x * other.y, this.y * other.x);
    }
    get_unsigned() {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }
    cpy() {
        return new Vector2(this.x, this.y);
    }
    normalize() {
        const len = this.len();
        if (len < 0.000001)
            return this;
        this.x /= len;
        this.y /= len;
        return this;
    }
    get_projection_of(other) {
        const len = this.dot(other) / this.len2();
        return this.cpy().mul(len);
    }
    is_null_vector() {
        return Math.abs(this.x) < 0.001 && Math.abs(this.y) < 0.001;
    }
    get_angle() {
        // let 0 be showing up (0,1)
        return (Math.atan2(this.y, this.x) + (Math.PI / 2)) % (2 * Math.PI);
    }
    rotate_radians_clockwise(radians) {
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);
        const new_x = -sin * this.y + cos * this.x;
        const new_y = sin * this.x + cos * this.y;
        this.y = new_y;
        this.x = new_x;
        return this;
    }
    rotate_right_angles_clockwise(count = 1) {
        if (count < 1)
            return this;
        const new_x = this.y;
        this.y = -this.x;
        this.x = new_x;
        return this.rotate_right_angles_clockwise(count - 1);
    }
    /**
     * Create a Vector2 from an angle and a length.
     * An angle of 0 points to the right, turning clockwise.
     *
     * @param angle
     * @param length
     */
    static from_angle(angle, length = 1) {
        return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length);
    }
}
exports.Vector2 = Vector2;
/**
 * ### Static methods
 */
/**
 * Standard Vectors
 */
Vector2.RIGHT = new Vector2(1, 0);
Vector2.LEFT = new Vector2(-1, 0);
Vector2.UP = new Vector2(0, -1);
Vector2.DOWN = new Vector2(0, 1);

},{}],"../node_modules/@game.object/ts-game-toolbox/dist/src/geometries/Rect.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
const Vector2_1 = require("./Vector2");
/**
 * @class Rect
 * A helper class for Rectangles
 */
class Rect {
    constructor(x = 0, y = 0, w = 0, h = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    get left() {
        return this.x;
    }
    get_left() {
        return this.x;
    }
    get top() {
        return this.y;
    }
    get_top() {
        return this.y;
    }
    get right() {
        return this.x + this.w;
    }
    get_right() {
        return this.x + this.w;
    }
    get_bottom() {
        return this.y + this.h;
    }
    get bottom() {
        return this.y + this.h;
    }
    get width() {
        return this.w;
    }
    get_width() {
        return this.w;
    }
    get height() {
        return this.h;
    }
    get_height() {
        return this.h;
    }
    cpy() {
        return new Rect(this.x, this.y, this.w, this.h);
    }
    set(x, y, w, h) {
        if (typeof x === "object") {
            this.x = x.x;
            this.y = x.y;
            this.w = x.w;
            this.h = x.h;
        }
        else {
            this.x = x;
            this.y = y;
            if (w !== undefined)
                this.w = w;
            if (h !== undefined)
                this.h = h;
        }
        return this;
    }
    /**
     * Secondary properties
     */
    get_area() {
        return this.w * this.h;
    }
    get center() {
        return new Vector2_1.Vector2(this.x + this.w / 2, this.y + this.h / 2);
    }
    set center(center) {
        this.x = center.x - this.w / 2;
        this.y = center.y - this.h / 2;
    }
    set_center(center) {
        this.center = center;
        return this;
    }
    /**
     * Expand this rectangle to include the given target.
     * @param target
     */
    expand_to(target) {
        if (this.contains(target))
            return this;
        const left = Math.min(this.x, target.x);
        const top = Math.min(this.y, target.y);
        const right = Math.max(this.get_right(), target.x);
        const bottom = Math.max(this.get_bottom(), target.y);
        return this.set(left, top, right - left, bottom - top);
    }
    overlaps_with(other) {
        return Rect.overlap(this, other);
    }
    is_within(outer) {
        return Rect.is_within(this, outer);
    }
    contains(x, y) {
        if (typeof x === "object") {
            return Rect.contains(this, x);
        }
        if (typeof y !== "number")
            throw new Error("Unexpected type error");
        return Rect.contains(this, { x, y });
    }
    /**
     * Manipulate this rectangle to change into the target rectangle by the factor t.
     *
     * @param target
     * @param t
     *  0 => rectangle is unchanged
     *  ..
     *  1 => the rectangle is identical to the target rectangle.
     */
    lerp(target, t) {
        const it = 1 - t;
        this.x = this.x * it + target.x * t;
        this.y = this.y * it + target.y * t;
        this.w = this.w * it + target.w * t;
        this.h = this.h * it + target.h * t;
        return this;
    }
    /**
     * This functions returns the corners of this rectangle in clockwise order.
     * Starting with the left-top one.
     *
     * @returns array
     * [ left_top, right_top, right_bottom, left_bottom ]
     */
    get_corners() {
        return [
            { x: this.left, y: this.top },
            { x: this.right, y: this.top },
            { x: this.right, y: this.bottom },
            { x: this.left, y: this.bottom },
        ];
    }
    /**
     * ### static function
     */
    /**
     * Is the given point inside the rectangle.
     * The borders of the rectangle count as inside.
     * @see Rect.contains_exclusive
     *
     * @param rect
     *  The rectangle defining the boundry
     * @param point
     *  The point to check
     * @return boolean
     *  True => the point is inside
     */
    static contains(rect, point) {
        return (point.x >= rect.x && point.y >= rect.y && point.x <= rect.x + rect.w && point.y <= rect.y + rect.h);
    }
    /**
     * Is the given point inside the rectangle.
     * The borders of the rectangle count as outside.
     * @see Rect.contains
     *
     * @param rect
     *  The rectangle bilding the boundry
     * @param point
     *  The point to check
     * @return boolean
     *  True => the point is inside
     */
    static contains_exclusive(rect, point) {
        return (point.x > rect.x && point.y > rect.y && point.x < rect.x + rect.w && point.y < rect.y + rect.h);
    }
    /**
     * Do theses Rectangles overlap
     * @param a
     * @param b
     */
    static overlap(a, b) {
        const overlap_x = (a.x + a.w > b.x && a.x <= b.x) || (b.x + b.w > a.x && b.x <= a.x);
        const overlap_y = (a.y + a.h > b.y && a.y <= b.y) || (b.y + b.h > a.y && b.y <= a.y);
        return overlap_x && overlap_y;
    }
    /**
     * Is the inner rectangle completly within the outer rectangle.
     *
     * @param inner
     * @param outer
     */
    static is_within(inner, outer) {
        const within_x = inner.x > outer.x && inner.x + inner.w < outer.x + outer.w;
        const within_y = inner.y > outer.y && inner.y + inner.h < outer.y + outer.h;
        return within_x && within_y;
    }
}
exports.Rect = Rect;

},{"./Vector2":"../node_modules/@game.object/ts-game-toolbox/dist/src/geometries/Vector2.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerEvent.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_controller_event = void 0;
function is_controller_event(object) {
    return typeof object === "object" && "event_name" in object;
}
exports.is_controller_event = is_controller_event;

},{}],"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/View.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = exports.is_view_interface = void 0;
function is_view_interface(view) {
    return view instanceof View;
}
exports.is_view_interface = is_view_interface;
class View {
    constructor(collection) {
        this.collection = collection;
        this.update = null;
    }
    draw() { }
    ;
    set_update(update) {
        this.update = update;
        return this;
    }
}
exports.View = View;

},{}],"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/helpers/ControllerResponse.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_controller_response = void 0;
const Controller_1 = require("../Controller");
const ControllerEvent_1 = require("../ControllerEvent");
const View_1 = require("../View");
function update_controller_response(base, response) {
    if (response === null) {
        return base;
    }
    if (View_1.is_view_interface(response)) {
        base.view = response;
        return base;
    }
    if (Controller_1.is_event_controller_interface(response)) {
        base.controller = response;
        return base;
    }
    if (ControllerEvent_1.is_controller_event(response)) {
        if (base.events === undefined)
            base.events = [];
        base.events.push(response);
        return base;
    }
    base.controller = response.controller;
    base.view = response.view;
    if (response.events !== undefined) {
        if (base.events === undefined)
            base.events = [];
        base.events.push(...response.events);
    }
    return base;
}
exports.update_controller_response = update_controller_response;

},{"../Controller":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller.js","../ControllerEvent":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerEvent.js","../View":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/View.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/controllers/PromiseController.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalPromiseController = exports.PromiseController = void 0;
const ControllerResponse_1 = require("../helpers/ControllerResponse");
class PromiseController {
    constructor(resolver) {
        this.next = null;
        this.cached_response = null;
        this.resolver = this.create_resolver_function(resolver);
    }
    create_resolver_function(resolver) {
        return () => {
            const response = (typeof resolver === "object") ? resolver : resolver();
            response.controller.next = this.create_controller_next_function(response);
            return response;
        };
    }
    create_controller_next_function(response) {
        return () => {
            if (this.next === null)
                return this;
            this.resolver = this.next.resolver;
            this.cached_response = null;
            this.next = this.next.next;
            return this;
        };
    }
    get response() {
        if (this.cached_response)
            return this.cached_response;
        const response = this.resolver();
        this.cached_response = {};
        ControllerResponse_1.update_controller_response(this.cached_response, response);
        return this.cached_response;
    }
    get view() {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.view;
    }
    get controller() {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.controller;
    }
    get events() {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.events;
    }
    then(resolve) {
        if (this.next) {
            this.next.then(resolve);
        }
        else {
            if (resolve instanceof PromiseController) {
                this.next = resolve;
            }
            else {
                this.next = new PromiseController(resolve);
            }
        }
        return this;
    }
    finaly(resolve) {
        if (this.next) {
            this.next.finaly(resolve);
        }
        else {
            this.next = new FinalPromiseController(resolve);
        }
        return this;
    }
}
exports.PromiseController = PromiseController;
class FinalPromiseController extends PromiseController {
    constructor(resolver) {
        super(() => {
            const response = (typeof resolver === "object") ? resolver : resolver();
            return response;
        });
    }
    create_resolver_function(resolver) {
        return () => {
            return (typeof resolver === "object") ? resolver : resolver();
        };
    }
}
exports.FinalPromiseController = FinalPromiseController;

},{"../helpers/ControllerResponse":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/helpers/ControllerResponse.js"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/Model.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var Model = /** @class */ (function () {
    function Model(models) {
        this.models = models;
    }
    return Model;
}());
exports.Model = Model;

},{}],"game/models/PlayerModel.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerModel = exports.PickCardResponse = exports.PickCardResponseType = void 0;

var Model_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/Model");

var PickCardResponseType;

(function (PickCardResponseType) {
  PickCardResponseType[PickCardResponseType["INVALID_MOVE"] = 0] = "INVALID_MOVE";
  PickCardResponseType[PickCardResponseType["REVEALED_FIRST_CARD"] = 1] = "REVEALED_FIRST_CARD";
  PickCardResponseType[PickCardResponseType["REVEALED_FITTING_PAIR"] = 2] = "REVEALED_FITTING_PAIR";
  PickCardResponseType[PickCardResponseType["REVEALED_UNFITTING_PAIR"] = 3] = "REVEALED_UNFITTING_PAIR";
})(PickCardResponseType = exports.PickCardResponseType || (exports.PickCardResponseType = {}));

;

var PickCardResponse = /*#__PURE__*/function () {
  function PickCardResponse(state, picked_card) {
    _classCallCheck(this, PickCardResponse);

    this.state = state;
    this.picked_card = picked_card;
    this.response = {};
  }

  _createClass(PickCardResponse, [{
    key: "do_on",
    value: function do_on(callback) {
      for (var _len = arguments.length, events = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        events[_key - 1] = arguments[_key];
      }

      if (events.includes(this.state)) {
        this.response = callback(this.response, this.picked_card);
      }

      return this;
    }
  }]);

  return PickCardResponse;
}();

exports.PickCardResponse = PickCardResponse;
/**
 * Model representing the player state
 */

var PlayerModel = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(PlayerModel, _Model_1$Model);

  var _super = _createSuper(PlayerModel);

  function PlayerModel() {
    var _this;

    _classCallCheck(this, PlayerModel);

    _this = _super.apply(this, arguments);
    _this.id = PlayerModel.next_id++; //

    _this.selected_card = null;
    _this.points = 0;
    return _this;
  } // 

  /**
   *
   * @param card
   *  the card the player has selected
   * @return PickCardResponse
   *  returns the possible outcomes
   */


  _createClass(PlayerModel, [{
    key: "pick_card",
    value: function pick_card(card) {
      if (card.is_drawn) return new PickCardResponse(PickCardResponseType.INVALID_MOVE, card);

      if (!this.selected_card) {
        return new PickCardResponse(PickCardResponseType.REVEALED_FIRST_CARD, card);
      } else {
        if (this.selected_card === card) return new PickCardResponse(PickCardResponseType.INVALID_MOVE, card);

        if (this.selected_card.color === card.color) {
          return new PickCardResponse(PickCardResponseType.REVEALED_FITTING_PAIR, card);
        } else {
          return new PickCardResponse(PickCardResponseType.REVEALED_UNFITTING_PAIR, card);
        }
      }
    }
  }]);

  return PlayerModel;
}(Model_1.Model);

exports.PlayerModel = PlayerModel;
PlayerModel.next_id = 1;
},{"@game.object/ts-game-toolbox/src/abstract/mvc/Model":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/Model.ts"}],"game/controllers/event_controllers/GameEventController.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameEventController = void 0;

var BaseController_1 = require("../BaseController");

var Rect_1 = require("@game.object/ts-game-toolbox/dist/src/geometries/Rect");

var PromiseController_1 = require("@game.object/ts-game-toolbox/dist/src/abstract/mvc/controllers/PromiseController");

var PlayerModel_1 = require("../../models/PlayerModel");

var GameEventController = /*#__PURE__*/function (_BaseController_1$Bas) {
  _inherits(GameEventController, _BaseController_1$Bas);

  var _super = _createSuper(GameEventController);

  function GameEventController() {
    _classCallCheck(this, GameEventController);

    return _super.apply(this, arguments);
  }

  _createClass(GameEventController, [{
    key: "update",
    value: function update(delta_seconds) {
      return null;
    }
  }, {
    key: "mouse_pressed",
    value: function mouse_pressed(event, x, y) {
      var _this = this;

      var camera = this.models.camera;
      var hit = this.models.cards.all().reduce(function (hit, next) {
        var screen_collider = camera.transformRect(new Rect_1.Rect().set(next.collider));
        if (screen_collider.contains({
          x: x,
          y: y
        })) return next;
        return hit;
      }, null);

      if (hit !== null) {
        var player = this.models.game.active_player;

        if (!player) {
          throw new Error("Who is my player");
        }

        return player.pick_card(hit) // Nothing happens
        // reveal the first card
        .do_on(function (response, card) {
          card.is_revealed = true;
          player.selected_card = card;
          return response;
        }, PlayerModel_1.PickCardResponseType.REVEALED_FIRST_CARD) // Second Draw
        .do_on(function (response, card) {
          return new PromiseController_1.PromiseController(function () {
            card.is_revealed = true;
            return {
              controller: _this.controllers.delay_controller.trigger_at.set(performance.now() + 1000 * 1)
            };
          });
        }, PlayerModel_1.PickCardResponseType.REVEALED_UNFITTING_PAIR, PlayerModel_1.PickCardResponseType.REVEALED_FITTING_PAIR) // Bad draw
        .do_on(function (response, card) {
          if (!(response instanceof PromiseController_1.PromiseController)) return response;
          return response.finaly(function () {
            if (!player.selected_card) return response;
            card.is_revealed = false;
            player.selected_card.is_revealed = false;
            player.selected_card = null;

            _this.models.game.next_player();

            return {
              view: _this.views.main.current_player.set(_this.models.game.active_player),
              controller: _this
            };
          });
        }, PlayerModel_1.PickCardResponseType.REVEALED_UNFITTING_PAIR) // 
        .do_on(function (response, card) {
          if (!(response instanceof PromiseController_1.PromiseController)) return response;
          return response.finaly(function () {
            if (!player.selected_card) return response;
            player.selected_card.is_drawn = card.is_drawn = true;
            player.selected_card = null;
            player.points++;
            return {
              controller: _this
            };
          });
        }, PlayerModel_1.PickCardResponseType.REVEALED_FITTING_PAIR).response;
      }

      return null;
    }
  }]);

  return GameEventController;
}(BaseController_1.BaseController);

exports.GameEventController = GameEventController;
},{"../BaseController":"game/controllers/BaseController.ts","@game.object/ts-game-toolbox/dist/src/geometries/Rect":"../node_modules/@game.object/ts-game-toolbox/dist/src/geometries/Rect.js","@game.object/ts-game-toolbox/dist/src/abstract/mvc/controllers/PromiseController":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/controllers/PromiseController.js","../../models/PlayerModel":"game/models/PlayerModel.ts"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/signals/ChainProperty.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CP = exports.ChainProperty = void 0;
class ChainProperty {
    constructor(view, property) {
        this.view = view;
        this.property = property;
    }
    set(value) {
        this.property = value;
        return this.view;
    }
    get() {
        return this.property;
    }
}
exports.ChainProperty = ChainProperty;
exports.CP = ChainProperty;

},{}],"game/controllers/DelayController.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DelayController = void 0;

var ChainProperty_1 = require("@game.object/ts-game-toolbox/dist/src/signals/ChainProperty");

var BaseController_1 = require("./BaseController");

var DelayController = /*#__PURE__*/function (_BaseController_1$Bas) {
  _inherits(DelayController, _BaseController_1$Bas);

  var _super = _createSuper(DelayController);

  function DelayController() {
    var _this;

    _classCallCheck(this, DelayController);

    _this = _super.apply(this, arguments);
    _this.next = null;
    _this.trigger_at = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), 0);
    return _this;
  }

  _createClass(DelayController, [{
    key: "update",
    value: function update() {
      if (performance.now() > this.trigger_at.get()) {
        if (this.next) return this.next();
      }

      return null;
    }
  }, {
    key: "mouse_pressed",
    value: function mouse_pressed(event) {
      if (this.next) return this.next();
      return null;
    }
  }]);

  return DelayController;
}(BaseController_1.BaseController);

exports.DelayController = DelayController;
},{"@game.object/ts-game-toolbox/dist/src/signals/ChainProperty":"../node_modules/@game.object/ts-game-toolbox/dist/src/signals/ChainProperty.js","./BaseController":"game/controllers/BaseController.ts"}],"game/controllers/ControllerCollection.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_controllers = void 0;

var GameController_1 = require("./GameController");

var GameEventController_1 = require("./event_controllers/GameEventController");

var DelayController_1 = require("./DelayController");

function create_controllers(models, views) {
  var controllers = {};
  var buffer = {
    game_controller: new GameController_1.GameController(models, views, controllers),
    delay_controller: new DelayController_1.DelayController(models, views, controllers),
    for_event: {
      game_controller: new GameEventController_1.GameEventController(models, views, controllers)
    }
  };
  return Object.assign(controllers, buffer);
}

exports.create_controllers = create_controllers;
},{"./GameController":"game/controllers/GameController.ts","./event_controllers/GameEventController":"game/controllers/event_controllers/GameEventController.ts","./DelayController":"game/controllers/DelayController.ts"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/signals/SignalSocket.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalSocket = void 0;
class SignalSocket {
    constructor() {
        this.listeners = [];
    }
    add(listener) {
        this.listeners.push(listener);
    }
    remove(listener) {
        const index = this.listeners.indexOf(listener);
        if (index < 0)
            return;
        const length = this.listeners.length;
        this.listeners[index] = this.listeners[length - 1];
        this.listeners.pop();
    }
    trigger_event(signal) {
        this.listeners.forEach((listener) => {
            listener(signal);
        });
    }
}
exports.SignalSocket = SignalSocket;

},{}],"../node_modules/@game.object/ts-game-toolbox/dist/src/signals/ObservableSocket.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableSocket = void 0;
const SignalSocket_1 = require("./SignalSocket");
class ObservableSocket extends SignalSocket_1.SignalSocket {
    constructor(value) {
        super();
        this.value = value;
    }
    trigger_event() { throw new Error('Do not call this directly'); }
    set(new_value) {
        super.trigger_event({
            old: this.value,
            new: new_value,
        });
        this.value = new_value;
    }
    get() {
        return this.value;
    }
}
exports.ObservableSocket = ObservableSocket;
;

},{"./SignalSocket":"../node_modules/@game.object/ts-game-toolbox/dist/src/signals/SignalSocket.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/signals/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signals = void 0;
const SignalSocket_1 = require("./SignalSocket");
const ObservableSocket_1 = require("./ObservableSocket");
// export * from "./SignalSocket";
// export * from "./ObservableSocket";
exports.signals = {
    SignalSocket: SignalSocket_1.SignalSocket,
    ObservableSocket: ObservableSocket_1.ObservableSocket,
};

},{"./SignalSocket":"../node_modules/@game.object/ts-game-toolbox/dist/src/signals/SignalSocket.js","./ObservableSocket":"../node_modules/@game.object/ts-game-toolbox/dist/src/signals/ObservableSocket.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/assets/manager/AssetManager.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetManager = void 0;
class AssetManager {
}
exports.AssetManager = AssetManager;

},{}],"../node_modules/@game.object/ts-game-toolbox/dist/src/assets/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assets = void 0;
const AssetManager_1 = require("./manager/AssetManager");
// export * from "./manager/AssetManager"
exports.assets = {
    AssetManager: AssetManager_1.AssetManager
};

},{"./manager/AssetManager":"../node_modules/@game.object/ts-game-toolbox/dist/src/assets/manager/AssetManager.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/geometries/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geometries = void 0;
const Rect_1 = require("./Rect");
const Vector2_1 = require("./Vector2");
exports.geometries = {
    Rect: Rect_1.Rect,
    Vector2: Vector2_1.Vector2,
};

},{"./Rect":"../node_modules/@game.object/ts-game-toolbox/dist/src/geometries/Rect.js","./Vector2":"../node_modules/@game.object/ts-game-toolbox/dist/src/geometries/Vector2.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/testing/exceptions/ExceptionExpectedException.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestClassExceptionExpectedExcetpion = void 0;
class TestClassExceptionExpectedExcetpion extends Error {
}
exports.TestClassExceptionExpectedExcetpion = TestClassExceptionExpectedExcetpion;

},{}],"../node_modules/@game.object/ts-game-toolbox/dist/src/testing/TestClass.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestClass = void 0;
const ExceptionExpectedException_1 = require("./exceptions/ExceptionExpectedException");
class TestClass {
    set_up() { console.log(this); }
    tear_down() { }
    set_class_up() { }
    tear_class_down() { }
    run_all_test_cases() {
        const test = this;
        console.log(">>> Start " + test.get_name());
        this.set_class_up();
        for (const test_name of Object.getOwnPropertyNames(test.__proto__)) {
            const test_statement = test[test_name];
            if (typeof test_statement === "function" && test_name.indexOf('test') === 0) {
                console.log('%c > Run ' + test_name, 'background: blue; color: yellow;');
                test.set_up();
                test_statement.call(test);
                test.tear_down();
                console.log('%c < Done ', 'background: blue; color: green;');
            }
        }
        this.tear_class_down();
        console.log("<<< Done " + test.get_name());
    }
    assert_exception(exception, callback) {
        try {
            callback();
            throw new ExceptionExpectedException_1.TestClassExceptionExpectedExcetpion('Expected an exception from ' + String(callback).substr(0, 255));
        }
        catch (error) {
            if (!(error instanceof exception))
                throw error;
            this.success();
        }
    }
    assert_instance_of(value, expected) {
        if (false === value instanceof expected) {
            throw new Error('Expected ' + value.toString() + ' to be of instance ' + expected.name);
        }
        this.success();
    }
    assert_equals(value, expected) {
        if (value !== expected) {
            throw new Error('Expected ' + String(value) + ' to be equal to ' + String(expected));
        }
        this.success();
    }
    assert_not_equals(value, expected) {
        if (value === expected) {
            throw new Error('Expected ' + String(value) + ' to be NOT equal to ' + String(expected));
        }
        this.success();
    }
    assert_true(value) {
        if (value === false) {
            throw new Error('Expected ' + String(value) + ' to be true');
        }
        this.success();
    }
    assert_false(value) {
        if (value === true) {
            throw new Error('Expected ' + String(value) + ' to be false');
        }
        this.success();
    }
    success() {
        console.log('.');
    }
}
exports.TestClass = TestClass;

},{"./exceptions/ExceptionExpectedException":"../node_modules/@game.object/ts-game-toolbox/dist/src/testing/exceptions/ExceptionExpectedException.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/testing/TestConsoleLogElement.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestConsoleLogElement = void 0;
class TestConsoleLogElement {
    constructor() {
        this.window_on_error_func = (event, source, lineno, colno, error) => {
            if (event instanceof ErrorEvent) {
                source = event.filename;
                lineno = event.lineno;
                colno = event.colno;
                error = event.error;
            }
            if (error instanceof Error) {
                console.error(error.name + ' : ' + error.message);
            }
            else {
                console.error(event);
            }
            // const source_file = source?.replace(window.location.origin, '');
            // const error_position = "[" + [lineno, colno].join(':') + "]";
            // console.error([...new Array(4)].map(() => '=').join('') + source_file + error_position);
        };
        this.container = this.create_element();
        this.hook_into_console_log();
        this.hook_into_console_error();
        this.hook_into_window_error();
    }
    get_element() {
        return this.container;
    }
    clear() {
        this.container.innerHTML = "";
    }
    hook_into_console_log() {
        const console_log = window.console.log;
        console.log = (...args) => {
            console_log(...args);
            this.log(...args);
        };
    }
    hook_into_console_error() {
        const console_error = window.console.error;
        console.error = (...args) => {
            const text = args[0].toString();
            console_error(text);
            this.log("%c" + text, "color: red;", ...args);
        };
    }
    hook_into_window_error() {
        window.addEventListener('error', this.window_on_error_func);
    }
    create_element() {
        const container = document.createElement('div');
        container.className = "test-console-log";
        return container;
    }
    log(...args) {
        const format_or_log = args.shift();
        if (typeof format_or_log === "string") {
            return this.print_format(format_or_log, ...args)
                .then((...rest_args) => {
                this.log(...args);
            });
        }
        else {
            args.forEach((arg) => {
                this.print((arg).toString());
            });
        }
    }
    print_format(format, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let style = '';
                let text = format;
                if (format.indexOf('%c') === 0) {
                    style = args[0];
                    text = text.substr(2);
                }
                while (text.indexOf('%s') !== -1) {
                    const next = args.shift();
                    if (next === null)
                        throw Error('argument mismatch');
                    text = text.replace('%s', next.toString());
                }
                this.print(text, style);
            });
        });
    }
    print(text, style) {
        const span = document.createElement('span');
        if (style)
            span.style.cssText = style;
        span.innerText = text;
        this.container.append(span);
    }
}
exports.TestConsoleLogElement = TestConsoleLogElement;

},{}],"../node_modules/@game.object/ts-game-toolbox/dist/src/testing/TestDashboard.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDashboard = void 0;
const TestConsoleLogElement_1 = require("./TestConsoleLogElement");
class TestDashboard {
    constructor() {
        this.tests = [];
        this.start_all_tests_func = () => {
            this.elements.console_log.clear();
            console.log('Starting Tests ... ');
            for (const test of this.tests) {
                test.run_all_test_cases();
            }
            console.log(' ... Tests finished');
        };
        this.elements = this.create_dashboard_elements();
    }
    get_element() {
        return this.elements.dashboard;
    }
    create_dashboard_elements() {
        const dashboard = this.create_dashboard_wrapping_element();
        const button_list = this.create_test_button_list();
        const console_log = new TestConsoleLogElement_1.TestConsoleLogElement();
        dashboard.append(button_list);
        dashboard.append(console_log.get_element());
        this.elements = {
            dashboard,
            button_list,
            console_log,
        };
        return this.elements;
    }
    create_dashboard_wrapping_element() {
        const dashboard = document.createElement('div');
        dashboard.className = 'test-dashboard';
        return dashboard;
    }
    create_test_button_list() {
        const button_list = document.createElement('ul');
        button_list.className = "test-dashboard__button-list";
        const button_start_all = this.create_element_button('Run all tests', this.start_all_tests_func);
        button_list.append(button_start_all);
        this.tests.forEach((test) => {
            const button = this.create_element_for_test_button(test);
            button_list.append(button);
        });
        return button_list;
    }
    create_element_for_test_button(test) {
        return this.create_element_button(test.get_name(), () => {
            this.elements.console_log.clear();
            test.run_all_test_cases();
        });
    }
    create_element_button(text, on_click) {
        let list_item = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = text;
        button.addEventListener('click', on_click);
        list_item.append(button);
        return list_item;
    }
    add_test(tests) {
        if (!(tests instanceof Array)) {
            tests = [tests];
        }
        tests.forEach((test) => {
            this.tests.push(test);
            if (this.elements) {
                this.elements.button_list.append(this.create_element_for_test_button(test));
            }
        });
        return this;
    }
}
exports.TestDashboard = TestDashboard;

},{"./TestConsoleLogElement":"../node_modules/@game.object/ts-game-toolbox/dist/src/testing/TestConsoleLogElement.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/testing/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testing = void 0;
// export * from "./TestClass"
const TestClass_1 = require("./TestClass");
const TestDashboard_1 = require("./TestDashboard");
exports.testing = {
    TestClass: TestClass_1.TestClass,
    TestDashboard: TestDashboard_1.TestDashboard,
};

},{"./TestClass":"../node_modules/@game.object/ts-game-toolbox/dist/src/testing/TestClass.js","./TestDashboard":"../node_modules/@game.object/ts-game-toolbox/dist/src/testing/TestDashboard.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/trees/exceptions/TreeElementNotFoundException.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeElementNotFoundException = void 0;
class TreeElementNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = TreeElementNotFoundException.name;
        Object.setPrototypeOf(this, TreeElementNotFoundException.prototype);
    }
}
exports.TreeElementNotFoundException = TreeElementNotFoundException;

},{}],"../node_modules/@game.object/ts-game-toolbox/dist/src/trees/QuadTree.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadTreeBranch = exports.QuadTree = void 0;
const TreeElementNotFoundException_1 = require("./exceptions/TreeElementNotFoundException");
const Rect_1 = require("../geometries/Rect");
class QuadTree {
    constructor(base_rect) {
        this.root_branch = new QuadTreeBranch(base_rect.x, base_rect.y, base_rect.w, base_rect.h);
    }
    pick(rect) {
        return this.root_branch.pick(rect);
    }
    add(element) {
        let is_within = Rect_1.Rect.is_within(element, this.root_branch);
        if (is_within) {
            this.root_branch.add(element);
        }
        else {
            this.elevate_root_branch();
            this.add(element);
        }
    }
    /**
     * First wrap the root in a branch that contains the root at the bottom right,
     * then create a branch wich has that new branch in the bottom left,
     * like that the tree expands in all directions
     */
    elevate_root_branch() {
        const old_root_branch = this.root_branch;
        const extend_top_left_rect = {
            x: old_root_branch.x - old_root_branch.w,
            y: old_root_branch.y - old_root_branch.h,
            w: old_root_branch.w * 2,
            h: old_root_branch.h * 2,
        };
        const extend_bottom_right_rect = {
            x: extend_top_left_rect.x,
            y: extend_top_left_rect.y,
            w: extend_top_left_rect.w * 2,
            h: extend_top_left_rect.h * 2,
        };
        this.wrap_root_node_in_node_with_rect(extend_top_left_rect, 2);
        this.wrap_root_node_in_node_with_rect(extend_bottom_right_rect, 0);
    }
    wrap_root_node_in_node_with_rect(rect, node_pos) {
        const wrapper_node = new QuadTreeBranch(rect.x, rect.y, rect.w, rect.h);
        wrapper_node.create_child_branches();
        if (!wrapper_node.child_branch_nodes)
            throw new Error();
        wrapper_node.child_branch_nodes[node_pos] = this.root_branch;
        this.root_branch = wrapper_node;
    }
    change_element(element, rect) {
        this.remove(element);
        element.x = rect.x;
        element.y = rect.y;
        element.w = rect.w;
        element.h = rect.h;
        this.add(element);
    }
    remove(element) {
        if (!this.root_branch.remove(element)) {
            throw new TreeElementNotFoundException_1.TreeElementNotFoundException();
        }
    }
    is_empty() {
        return this.root_branch.is_empty();
    }
    clear() {
        this.root_branch.clear(8);
    }
}
exports.QuadTree = QuadTree;
class QuadTreeBranch extends Rect_1.Rect {
    constructor() {
        super(...arguments);
        this.child_branch_nodes = null;
        this.elements = [];
    }
    add(element) {
        if (this.child_branch_nodes === null) {
            this.elements.push(element);
            this.create_child_branches_if_necessary();
            return true;
        }
        ;
        const overlapping_branches = this.child_branch_nodes.filter((branch) => {
            return branch.overlaps_with(element);
        }, []);
        if (overlapping_branches.length === 0)
            throw Error('Inconsistent Result');
        if (overlapping_branches.length === 1) {
            overlapping_branches[0].add(element);
        }
        else {
            this.elements.push(element);
        }
        return true;
    }
    readd_own_elements() {
        const elements = this.elements.splice(0);
        elements.forEach((element) => {
            this.add(element);
        });
    }
    create_child_branches_if_necessary() {
        if (this.elements.length < 10)
            return;
        this.create_child_branches();
        this.readd_own_elements();
    }
    create_child_branches() {
        const w_half = this.w / 2;
        const h_half = this.h / 2;
        this.child_branch_nodes = [
            new QuadTreeBranch(this.x, this.y, w_half, h_half),
            new QuadTreeBranch(this.x + w_half, this.y, w_half, h_half),
            new QuadTreeBranch(this.x + w_half, this.y + h_half, w_half, h_half),
            new QuadTreeBranch(this.x, this.y + h_half, w_half, h_half),
        ];
    }
    pick(rect, result = []) {
        if (!this.overlaps_with(rect))
            return result;
        result.push(...this.elements.filter((element) => Rect_1.Rect.overlap(rect, element)));
        if (this.child_branch_nodes === null)
            return result;
        if (this.is_within(rect))
            return this.pick_all(result);
        for (let branch of this.child_branch_nodes) {
            branch.pick(rect, result);
        }
        return result;
    }
    pick_all(result) {
        result.push(...this.elements);
        if (this.child_branch_nodes === null)
            return result;
        for (let branch of this.child_branch_nodes) {
            branch.pick_all(result);
        }
        return result;
    }
    remove(element) {
        const id = this.elements.indexOf(element);
        if (id !== -1) {
            this.elements.splice(id, 1);
            return true;
        }
        if (this.child_branch_nodes === null)
            return false;
        for (let branch of this.child_branch_nodes) {
            if (branch.remove(element))
                return true;
        }
        return false;
    }
    is_empty() {
        if (!this.is_self_empty())
            return false;
        if (this.child_branch_nodes === null)
            return true;
        for (let branch of this.child_branch_nodes) {
            if (!branch.is_empty())
                return false;
        }
        return true;
    }
    is_self_empty() {
        return this.elements.length === 0;
    }
    clear(max_levels_deep) {
        this.elements.splice(0);
        if (this.child_branch_nodes) {
            if (max_levels_deep <= 0) {
                this.child_branch_nodes = null;
            }
            else {
                this.child_branch_nodes.forEach((node) => {
                    node.clear(max_levels_deep - 1);
                });
            }
        }
    }
}
exports.QuadTreeBranch = QuadTreeBranch;

},{"./exceptions/TreeElementNotFoundException":"../node_modules/@game.object/ts-game-toolbox/dist/src/trees/exceptions/TreeElementNotFoundException.js","../geometries/Rect":"../node_modules/@game.object/ts-game-toolbox/dist/src/geometries/Rect.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/trees/index.js":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trees = void 0;
const QuadTree_1 = require("./QuadTree");
const TreeElementNotFoundException_1 = require("./exceptions/TreeElementNotFoundException");
__exportStar(require("./QuadTree"), exports);
__exportStar(require("./exceptions/TreeElementNotFoundException"), exports);
exports.trees = {
    exceptions: {
        TreeElementNotFoundException: TreeElementNotFoundException_1.TreeElementNotFoundException,
    },
    QuadTree: QuadTree_1.QuadTree,
};

},{"./QuadTree":"../node_modules/@game.object/ts-game-toolbox/dist/src/trees/QuadTree.js","./exceptions/TreeElementNotFoundException":"../node_modules/@game.object/ts-game-toolbox/dist/src/trees/exceptions/TreeElementNotFoundException.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    constructor(models) {
        this.models = models;
    }
}
exports.Model = Model;

},{}],"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/CanvasView.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasView = void 0;
const View_1 = require("./View");
class CanvasView extends View_1.View {
    constructor(canvas, collection) {
        super(collection);
        this.canvas = canvas;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            throw new Error("could not create context");
        this.context = ctx;
    }
    reset_canvas_state() {
        this.context.font = "32px monospace";
        this.context.textAlign = "left";
        this.context.fillStyle = "black";
        this.context.strokeStyle = "white";
    }
}
exports.CanvasView = CanvasView;

},{"./View":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/View.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/helpers/ControllerEvent.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerEventConstructor = exports.event = void 0;
function event(event, time_provider) {
    return new ControllerEventConstructor(event, time_provider);
}
exports.event = event;
class ControllerEventConstructor {
    constructor(event, time_provide) {
        this.event = event;
        this.time_provide = time_provide;
        if (typeof event === "string") {
            this.event_name = event;
        }
        else {
            this.event_name = event.event_name;
            Object.assign(this, event);
        }
    }
    after_x_seconds(seconds) {
        this.fire_at = this.time_provide.ingame_time_in_seconds + seconds;
        return this;
    }
    set_data(data) {
        Object.assign(this, data);
        return this;
    }
}
exports.ControllerEventConstructor = ControllerEventConstructor;

},{}],"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/MVCgame.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MvcGame = void 0;
const ControllerResponse_1 = require("./helpers/ControllerResponse");
/**
 * <
    // MODEL_COLLECTION extends ModelCollection,
    // VIEW_COLLECTION extends ViewCollection,
    // CONTROLLER_COLLECTION extends ControllerCollection,
    // MODEL extends Model<MODEL_COLLECTION> = Model<MODEL_COLLECTION>,
    // VIEW extends View<VIEW_COLLECTION> = View<VIEW_COLLECTION>,
    // CONTROLLER extends Controller<MODEL_COLLECTION, VIEW_COLLECTION, CONTROLLER_COLLECTION> = Controller<MODEL_COLLECTION, VIEW_COLLECTION, CONTROLLER_COLLECTION>,
    >
 */
class MvcGame {
    constructor() {
        this.active_view = null;
        this.active_controller = null;
        this.event_queue = [];
        this.ingame_time_in_seconds = 0;
    }
    update(delta_seconds) {
        this.ingame_time_in_seconds += delta_seconds;
        if (!this.active_controller)
            return;
        if (!this.active_controller.update)
            return;
        this.apply_controller_response(this.active_controller.update(delta_seconds));
        this.handle_events();
    }
    handle_events() {
        let event_queue_buffer = [...this.event_queue];
        this.event_queue = [];
        event_queue_buffer = event_queue_buffer.filter((event) => {
            if (event.fire_at && event.fire_at >= this.ingame_time_in_seconds)
                return true;
            if (!this.active_controller)
                return false;
            if (!this.active_controller.dispatch_event)
                return false;
            this.apply_controller_response(this.active_controller.dispatch_event(event));
            return false;
        });
        this.event_queue = [...event_queue_buffer, ...this.event_queue];
    }
    apply_controller_response(response) {
        const response_struct = ControllerResponse_1.update_controller_response({}, response);
        if (response_struct.view !== undefined) {
            this.set_active_view(response_struct.view);
        }
        if (response_struct.controller !== undefined) {
            this.set_active_controller(response_struct.controller);
        }
        if (response_struct.events !== undefined) {
            this.event_queue.push(...response_struct.events);
        }
    }
    draw() {
        if (!this.active_view)
            return;
        if (this.active_view.update) {
            this.active_view.update();
        }
        this.active_view.draw();
    }
    set_active_controller(controller) {
        this.active_controller = controller;
    }
    set_active_view(view) {
        this.active_view = view;
    }
}
exports.MvcGame = MvcGame;

},{"./helpers/ControllerResponse":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/helpers/ControllerResponse.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/MvcGame.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MvcGame = void 0;
const ControllerResponse_1 = require("./helpers/ControllerResponse");
/**
 * <
    // MODEL_COLLECTION extends ModelCollection,
    // VIEW_COLLECTION extends ViewCollection,
    // CONTROLLER_COLLECTION extends ControllerCollection,
    // MODEL extends Model<MODEL_COLLECTION> = Model<MODEL_COLLECTION>,
    // VIEW extends View<VIEW_COLLECTION> = View<VIEW_COLLECTION>,
    // CONTROLLER extends Controller<MODEL_COLLECTION, VIEW_COLLECTION, CONTROLLER_COLLECTION> = Controller<MODEL_COLLECTION, VIEW_COLLECTION, CONTROLLER_COLLECTION>,
    >
 */
class MvcGame {
    constructor() {
        this.active_view = null;
        this.active_controller = null;
        this.event_queue = [];
        this.ingame_time_in_seconds = 0;
    }
    update(delta_seconds) {
        this.ingame_time_in_seconds += delta_seconds;
        if (!this.active_controller)
            return;
        if (!this.active_controller.update)
            return;
        this.apply_controller_response(this.active_controller.update(delta_seconds));
        this.handle_events();
    }
    handle_events() {
        let event_queue_buffer = [...this.event_queue];
        this.event_queue = [];
        event_queue_buffer = event_queue_buffer.filter((event) => {
            if (event.fire_at && event.fire_at >= this.ingame_time_in_seconds)
                return true;
            if (!this.active_controller)
                return false;
            if (!this.active_controller.dispatch_event)
                return false;
            this.apply_controller_response(this.active_controller.dispatch_event(event));
            return false;
        });
        this.event_queue = [...event_queue_buffer, ...this.event_queue];
    }
    apply_controller_response(response) {
        const response_struct = ControllerResponse_1.update_controller_response({}, response);
        if (response_struct.view !== undefined) {
            this.set_active_view(response_struct.view);
        }
        if (response_struct.controller !== undefined) {
            this.set_active_controller(response_struct.controller);
        }
        if (response_struct.events !== undefined) {
            this.event_queue.push(...response_struct.events);
        }
    }
    draw() {
        if (!this.active_view)
            return;
        if (this.active_view.update) {
            this.active_view.update();
        }
        this.active_view.draw();
    }
    set_active_controller(controller) {
        this.active_controller = controller;
    }
    set_active_view(view) {
        this.active_view = view;
    }
}
exports.MvcGame = MvcGame;

},{"./helpers/ControllerResponse":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/helpers/ControllerResponse.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/MvcCanvasGame.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MvcCanvasGame = void 0;
const MvcGame_1 = require("./MvcGame");
class MvcCanvasGame extends MvcGame_1.MvcGame {
    constructor() {
        super();
        const canvas = document.getElementById('canvas');
        if (!(canvas instanceof HTMLCanvasElement))
            throw new Error("Canvas not found");
        this.canvas = canvas;
        const models = this.create_models();
        const views = this.create_views(canvas);
        const controllers = this.create_controllers(models, views);
        this.models = models;
        this.views = views;
        this.controllers = controllers;
        this.attach_event_listeners();
        this.apply_controller_response(this.start());
    }
    attach_event_listeners() {
        this.canvas.addEventListener("keydown", (event) => {
            if (!this.active_controller)
                return;
            if (this.active_controller.key_pressed) {
                this.apply_controller_response(this.active_controller.key_pressed(event));
            }
        });
        this.canvas.addEventListener("click", (event) => {
            if (!this.active_controller)
                return;
            if (this.active_controller.mouse_pressed) {
                const x = (event.x - this.canvas.offsetLeft) * this.canvas.width / this.canvas.clientWidth;
                const y = (event.y - this.canvas.offsetTop) * this.canvas.height / this.canvas.clientHeight;
                const response = this.active_controller.mouse_pressed(event, x, y);
                this.apply_controller_response(response);
            }
        });
    }
}
exports.MvcCanvasGame = MvcCanvasGame;

},{"./MvcGame":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/MvcGame.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/ModelTable.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelTable = void 0;
class ModelTable {
    constructor(model_collection, model_class) {
        this.models = [];
        this.model_collection = model_collection;
        this.model_class = model_class;
    }
    insert_new(modify) {
        return this.insert(modify
            ? modify(new this.model_class(this.model_collection))
            : new this.model_class(this.model_collection));
    }
    insert(model) {
        this.models.push(model);
        return model;
    }
    delete(model) {
        this.models = this.models.filter((current) => model !== current);
    }
    all() {
        return this.models;
    }
    filter(callback) {
        this.models = this.models.filter(callback);
    }
    map(callback) {
        this.models = this.models.map(callback);
    }
    for_each(callback) {
        this.models.forEach(callback);
    }
    /**
     * Return a filtered array of models
     *
     * @param property
     * @param expected_value
     */
    where(property, expected_value) {
        let callback;
        if (expected_value instanceof Function) {
            callback = (model) => expected_value(model[property]);
        }
        else {
            callback = (model) => model[property] === expected_value;
        }
        return this.models.filter(callback);
    }
}
exports.ModelTable = ModelTable;

},{}],"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abstract = void 0;
const Model_1 = require("./mvc/Model");
const View_1 = require("./mvc/View");
const Controller_1 = require("./mvc/Controller");
const CanvasView_1 = require("./mvc/CanvasView");
const ControllerEvent_1 = require("./mvc/helpers/ControllerEvent");
const MVCgame_1 = require("./mvc/MVCgame");
const MvcCanvasGame_1 = require("./mvc/MvcCanvasGame");
const ModelTable_1 = require("./mvc/ModelTable");
const ControllerResponse_1 = require("./mvc/helpers/ControllerResponse");
const PromiseController_1 = require("./mvc/controllers/PromiseController");
exports.abstract = {
    mvc: {
        MvcGame: MVCgame_1.MvcGame,
        MvcCanvasGame: MvcCanvasGame_1.MvcCanvasGame,
        CanvasView: CanvasView_1.CanvasView,
        Model: Model_1.Model,
        ModelTable: ModelTable_1.ModelTable,
        View: View_1.View,
        Controller: Controller_1.Controller,
        helpers: {
            ControllerEventConstructor: ControllerEvent_1.ControllerEventConstructor,
            update_controller_response: ControllerResponse_1.update_controller_response,
        },
        controllers: {
            PromiseController: PromiseController_1.PromiseController
        },
    },
};

},{"./mvc/Model":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model.js","./mvc/View":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/View.js","./mvc/Controller":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller.js","./mvc/CanvasView":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/CanvasView.js","./mvc/helpers/ControllerEvent":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/helpers/ControllerEvent.js","./mvc/MVCgame":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/MVCgame.js","./mvc/MvcCanvasGame":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/MvcCanvasGame.js","./mvc/ModelTable":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/ModelTable.js","./mvc/helpers/ControllerResponse":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/helpers/ControllerResponse.js","./mvc/controllers/PromiseController":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/mvc/controllers/PromiseController.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/data/RgbColor.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RgbColor = void 0;
class RgbColor {
    constructor(r = 0, g = 0, b = 0, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    to_hex() {
        return "#" + [this.r, this.g, this.b, this.a].map(v => ("00" + v.toString(16)).substr(-2)).join('');
    }
    lerp(other, t) {
        return new RgbColor(this.r * (1 - t) + other.r * t, this.g * (1 - t) + other.g * t, this.b * (1 - t) + other.b * t, this.a * (1 - t) + other.a * t);
    }
}
exports.RgbColor = RgbColor;

},{}],"../node_modules/@game.object/ts-game-toolbox/dist/src/data/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const RgbColor_1 = require("./RgbColor");
exports.data = {
    RgbColor: RgbColor_1.RgbColor
};

},{"./RgbColor":"../node_modules/@game.object/ts-game-toolbox/dist/src/data/RgbColor.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/commons/Colors.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = void 0;
const RgbColor_1 = require("../data/RgbColor");
exports.Colors = {
    RED: new RgbColor_1.RgbColor(255, 0, 0),
    BLUE: new RgbColor_1.RgbColor(0, 0, 255),
    GREEN: new RgbColor_1.RgbColor(0, 255, 0),
    BLACK: new RgbColor_1.RgbColor(0, 0, 0),
    WHITE: new RgbColor_1.RgbColor(255, 255, 255),
};

},{"../data/RgbColor":"../node_modules/@game.object/ts-game-toolbox/dist/src/data/RgbColor.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/src/commons/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commons = void 0;
const Colors_1 = require("./Colors");
exports.commons = {
    Colors: Colors_1.Colors,
};

},{"./Colors":"../node_modules/@game.object/ts-game-toolbox/dist/src/commons/Colors.js"}],"../node_modules/@game.object/ts-game-toolbox/dist/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tools = void 0;
const signals_1 = require("./src/signals");
const assets_1 = require("./src/assets");
const geometries_1 = require("./src/geometries");
const testing_1 = require("./src/testing");
const trees_1 = require("./src/trees");
const abstract_1 = require("./src/abstract");
const data_1 = require("./src/data");
const commons_1 = require("./src/commons");
exports.tools = {
    signals: signals_1.signals,
    assets: assets_1.assets,
    geometries: geometries_1.geometries,
    testing: testing_1.testing,
    trees: trees_1.trees,
    abstract: abstract_1.abstract,
    data: data_1.data,
    commons: commons_1.commons,
};

},{"./src/signals":"../node_modules/@game.object/ts-game-toolbox/dist/src/signals/index.js","./src/assets":"../node_modules/@game.object/ts-game-toolbox/dist/src/assets/index.js","./src/geometries":"../node_modules/@game.object/ts-game-toolbox/dist/src/geometries/index.js","./src/testing":"../node_modules/@game.object/ts-game-toolbox/dist/src/testing/index.js","./src/trees":"../node_modules/@game.object/ts-game-toolbox/dist/src/trees/index.js","./src/abstract":"../node_modules/@game.object/ts-game-toolbox/dist/src/abstract/index.js","./src/data":"../node_modules/@game.object/ts-game-toolbox/dist/src/data/index.js","./src/commons":"../node_modules/@game.object/ts-game-toolbox/dist/src/commons/index.js"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/View.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = exports.is_view_interface = void 0;
function is_view_interface(view) {
    return view instanceof View;
}
exports.is_view_interface = is_view_interface;
var View = /** @class */ (function () {
    function View(collection) {
        this.collection = collection;
        this.update = null;
    }
    View.prototype.draw = function () { };
    ;
    View.prototype.set_update = function (update) {
        this.update = update;
        return this;
    };
    return View;
}());
exports.View = View;

},{}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/CanvasView.ts":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasView = void 0;
var View_1 = require("./View");
var CanvasView = /** @class */ (function (_super) {
    __extends(CanvasView, _super);
    function CanvasView(canvas, collection) {
        var _this = _super.call(this, collection) || this;
        _this.canvas = canvas;
        var ctx = canvas.getContext("2d");
        if (!ctx)
            throw new Error("could not create context");
        _this.context = ctx;
        return _this;
    }
    CanvasView.prototype.reset_canvas_state = function () {
        this.context.font = "32px monospace";
        this.context.textAlign = "left";
        this.context.fillStyle = "black";
        this.context.strokeStyle = "white";
    };
    return CanvasView;
}(View_1.View));
exports.CanvasView = CanvasView;

},{"./View":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/View.ts"}],"game/views/main/MainView.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainView = void 0;

var ts_game_toolbox_1 = require("@game.object/ts-game-toolbox");

var CanvasView_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/CanvasView");

var RgbColor_1 = require("@game.object/ts-game-toolbox/src/data/RgbColor");

var ChainProperty_1 = require("@game.object/ts-game-toolbox/dist/src/signals/ChainProperty");

var MainView = /*#__PURE__*/function (_CanvasView_1$CanvasV) {
  _inherits(MainView, _CanvasView_1$CanvasV);

  var _super = _createSuper(MainView);

  function MainView() {
    var _this;

    _classCallCheck(this, MainView);

    _this = _super.apply(this, arguments); /// Base Colors

    _this.bg_color = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), ts_game_toolbox_1.tools.commons.Colors.BLACK);
    _this.fg_color = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), ts_game_toolbox_1.tools.commons.Colors.WHITE);
    _this.hi_color = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), ts_game_toolbox_1.tools.commons.Colors.RED); /// memory cards

    _this.memory_cards = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), []); // Camera

    _this.camera = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), null); // players 

    _this.players = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), []); // players turn

    _this.current_player = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), null); /// configuration

    _this.card_bg_color = new RgbColor_1.RgbColor(0x08, 0x08, 0x08);
    return _this;
  }

  _createClass(MainView, [{
    key: "draw",
    value: function draw() {
      var _this2 = this;

      this.reset_canvas_state();
      var camera = this.camera.get();

      if (!camera) {
        console.log('no camera');
        return;
      }

      this.context.translate(camera.center.x, camera.center.y);
      this.context.strokeStyle = "#282828";
      this.context.beginPath();
      this.memory_cards.get().forEach(function (card) {
        if (card.is_drawn) return;

        if (card.is_revealed) {
          _this2.context.fillStyle = card.color.to_hex();
        } else {
          _this2.context.fillStyle = _this2.card_bg_color.to_hex();
        }

        _this2.context.fillRect(card.collider.x, card.collider.y, card.collider.w, card.collider.h);

        _this2.context.rect(card.collider.x, card.collider.y, card.collider.w, card.collider.h);
      });
      this.players.get().forEach(function (player) {
        if (_this2.current_player.get() === player) {
          _this2.context.fillStyle = _this2.hi_color.get().to_hex();

          _this2.context.fillRect((player.id - 1) * 150 + 50 - 25, 500 - 8, 150, 32);
        }

        _this2.context.fillStyle = _this2.fg_color.get().to_hex();

        _this2.context.fillText("Player " + player.id + ": " + player.points, (player.id - 1) * 150 + 50, 500);
      });
      this.context.stroke();
      this.context.resetTransform();
    }
    /**
     * Reset default canvas state and paint the background
     */

  }, {
    key: "reset_canvas_state",
    value: function reset_canvas_state() {
      _get(_getPrototypeOf(MainView.prototype), "reset_canvas_state", this).call(this);

      this.context.fillStyle = this.bg_color.get().to_hex();
      this.context.fillRect(0, 0, 800, 600);
      this.context.fillStyle = this.fg_color.get().to_hex();
      this.context.lineWidth = 2;
      this.context.font = "16px monospace";
      this.context.lineJoin = "round";
      this.context.textAlign = "left";
      this.context.textBaseline = "top";
      this.context.imageSmoothingEnabled = false;
    }
  }]);

  return MainView;
}(CanvasView_1.CanvasView);

exports.MainView = MainView;
},{"@game.object/ts-game-toolbox":"../node_modules/@game.object/ts-game-toolbox/dist/index.js","@game.object/ts-game-toolbox/src/abstract/mvc/CanvasView":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/CanvasView.ts","@game.object/ts-game-toolbox/src/data/RgbColor":"../node_modules/@game.object/ts-game-toolbox/src/data/RgbColor.ts","@game.object/ts-game-toolbox/dist/src/signals/ChainProperty":"../node_modules/@game.object/ts-game-toolbox/dist/src/signals/ChainProperty.js"}],"game/views/ViewCollection.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_views = void 0;

var MainView_1 = require("./main/MainView");

function create_views(canvas) {
  var collection = {};
  var main = new MainView_1.MainView(canvas, collection);
  return Object.assign(collection, {
    main: main,
    partials: {}
  });
}

exports.create_views = create_views;
},{"./main/MainView":"game/views/main/MainView.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/ModelTable.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelTable = void 0;
var ModelTable = /** @class */ (function () {
    function ModelTable(model_collection, model_class) {
        this.models = [];
        this.model_collection = model_collection;
        this.model_class = model_class;
    }
    ModelTable.prototype.insert_new = function (modify) {
        return this.insert(modify
            ? modify(new this.model_class(this.model_collection))
            : new this.model_class(this.model_collection));
    };
    ModelTable.prototype.insert = function (model) {
        this.models.push(model);
        return model;
    };
    ModelTable.prototype.delete = function (model) {
        this.models = this.models.filter(function (current) { return model !== current; });
    };
    ModelTable.prototype.all = function () {
        return this.models;
    };
    ModelTable.prototype.filter = function (callback) {
        this.models = this.models.filter(callback);
    };
    ModelTable.prototype.map = function (callback) {
        this.models = this.models.map(callback);
    };
    ModelTable.prototype.for_each = function (callback) {
        this.models.forEach(callback);
    };
    /**
     * Return a filtered array of models
     *
     * @param property
     * @param expected_value
     */
    ModelTable.prototype.where = function (property, expected_value) {
        var callback;
        if (expected_value instanceof Function) {
            callback = function (model) { return expected_value(model[property]); };
        }
        else {
            callback = function (model) { return model[property] === expected_value; };
        }
        return this.models.filter(callback);
    };
    return ModelTable;
}());
exports.ModelTable = ModelTable;

},{}],"tools/helper.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert_never = void 0;

function assert_never(variable) {
  return variable;
}

exports.assert_never = assert_never;
},{}],"game/models/CameraModel.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraModel = void 0;

var Rect_1 = require("@game.object/ts-game-toolbox/dist/src/geometries/Rect");

var Vector2_1 = require("@game.object/ts-game-toolbox/dist/src/geometries/Vector2");

var Model_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/Model");

var helper_1 = require("../../tools/helper");

var CameraModel = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(CameraModel, _Model_1$Model);

  var _super = _createSuper(CameraModel);

  function CameraModel() {
    var _this;

    _classCallCheck(this, CameraModel);

    _this = _super.apply(this, arguments);
    _this.center = new Vector2_1.Vector2(0, 0);
    return _this;
  }

  _createClass(CameraModel, [{
    key: "transform",
    value: function transform(shape) {
      if (shape instanceof Rect_1.Rect) return this.transformRect(shape);
      if (shape instanceof Vector2_1.Vector2) return this.transformVector2(shape);
      return helper_1.assert_never(shape);
    }
  }, {
    key: "transformVector2",
    value: function transformVector2(vector2) {
      return vector2.add(this.center);
    }
  }, {
    key: "transformRect",
    value: function transformRect(rect) {
      rect.x += this.center.x;
      rect.y += this.center.y;
      return rect;
    }
  }]);

  return CameraModel;
}(Model_1.Model);

exports.CameraModel = CameraModel;
},{"@game.object/ts-game-toolbox/dist/src/geometries/Rect":"../node_modules/@game.object/ts-game-toolbox/dist/src/geometries/Rect.js","@game.object/ts-game-toolbox/dist/src/geometries/Vector2":"../node_modules/@game.object/ts-game-toolbox/dist/src/geometries/Vector2.js","@game.object/ts-game-toolbox/src/abstract/mvc/Model":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/Model.ts","../../tools/helper":"tools/helper.ts"}],"game/models/GameModel.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameModel = void 0;

var Model_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/Model");

var GameModel = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(GameModel, _Model_1$Model);

  var _super = _createSuper(GameModel);

  function GameModel() {
    var _this;

    _classCallCheck(this, GameModel);

    _this = _super.apply(this, arguments);
    _this.max_player_id = 0;
    _this.active_player = null;
    return _this;
  }

  _createClass(GameModel, [{
    key: "next_player",
    value: function next_player() {
      if (this.active_player === null) return;

      if (this.active_player.id >= this.models.game.max_player_id) {
        this.active_player = this.models.players.all()[0];
      } else {
        this.active_player = this.models.players.where('id', this.active_player.id + 1)[0];
      }
    }
  }]);

  return GameModel;
}(Model_1.Model);

exports.GameModel = GameModel;
},{"@game.object/ts-game-toolbox/src/abstract/mvc/Model":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/Model.ts"}],"game/models/MemoryCardModel.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryCardModel = void 0;

var ts_game_toolbox_1 = require("@game.object/ts-game-toolbox");

var Rect_1 = require("@game.object/ts-game-toolbox/dist/src/geometries/Rect");

var Model_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/Model");

var MemoryCardModel = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(MemoryCardModel, _Model_1$Model);

  var _super = _createSuper(MemoryCardModel);

  function MemoryCardModel() {
    var _this;

    _classCallCheck(this, MemoryCardModel);

    _this = _super.apply(this, arguments);
    _this.color = ts_game_toolbox_1.tools.commons.Colors.WHITE;
    _this.is_revealed = false;
    _this.is_drawn = false;
    _this.collider = new Rect_1.Rect(0, 0, 0, 0);
    return _this;
  }

  return MemoryCardModel;
}(Model_1.Model);

exports.MemoryCardModel = MemoryCardModel;
},{"@game.object/ts-game-toolbox":"../node_modules/@game.object/ts-game-toolbox/dist/index.js","@game.object/ts-game-toolbox/dist/src/geometries/Rect":"../node_modules/@game.object/ts-game-toolbox/dist/src/geometries/Rect.js","@game.object/ts-game-toolbox/src/abstract/mvc/Model":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/Model.ts"}],"game/models/ModelCollection.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_models = void 0;

var ModelTable_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/ModelTable");

var CameraModel_1 = require("./CameraModel");

var GameModel_1 = require("./GameModel");

var MemoryCardModel_1 = require("./MemoryCardModel");

var PlayerModel_1 = require("./PlayerModel");

function create_models() {
  var collection = {};
  return Object.assign(collection, {
    game: new GameModel_1.GameModel(collection),
    camera: new CameraModel_1.CameraModel(collection),
    players: new ModelTable_1.ModelTable(collection, PlayerModel_1.PlayerModel),
    cards: new ModelTable_1.ModelTable(collection, MemoryCardModel_1.MemoryCardModel)
  });
}

exports.create_models = create_models;
},{"@game.object/ts-game-toolbox/src/abstract/mvc/ModelTable":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/ModelTable.ts","./CameraModel":"game/models/CameraModel.ts","./GameModel":"game/models/GameModel.ts","./MemoryCardModel":"game/models/MemoryCardModel.ts","./PlayerModel":"game/models/PlayerModel.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/Controller.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_event_controller_interface = exports.is_controller_interface = exports.Controller = void 0;
var Controller = /** @class */ (function () {
    function Controller(models, views, controllers) {
        this.models = models;
        this.views = views;
        this.controllers = controllers;
    }
    return Controller;
}());
exports.Controller = Controller;
function is_controller_interface(controller) {
    return controller instanceof Controller;
}
exports.is_controller_interface = is_controller_interface;
function is_event_controller_interface(controller) {
    return controller instanceof Controller;
}
exports.is_event_controller_interface = is_event_controller_interface;

},{}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/ControllerEvent.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_controller_event = void 0;
function is_controller_event(object) {
    return typeof object === "object" && "event_name" in object;
}
exports.is_controller_event = is_controller_event;

},{}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/helpers/ControllerResponse.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_controller_response = void 0;
var Controller_1 = require("../Controller");
var ControllerEvent_1 = require("../ControllerEvent");
var View_1 = require("../View");
function update_controller_response(base, response) {
    var _a;
    if (response === null) {
        return base;
    }
    if (View_1.is_view_interface(response)) {
        base.view = response;
        return base;
    }
    if (Controller_1.is_event_controller_interface(response)) {
        base.controller = response;
        return base;
    }
    if (ControllerEvent_1.is_controller_event(response)) {
        if (base.events === undefined)
            base.events = [];
        base.events.push(response);
        return base;
    }
    base.controller = response.controller;
    base.view = response.view;
    if (response.events !== undefined) {
        if (base.events === undefined)
            base.events = [];
        (_a = base.events).push.apply(_a, response.events);
    }
    return base;
}
exports.update_controller_response = update_controller_response;

},{"../Controller":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/Controller.ts","../ControllerEvent":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/ControllerEvent.ts","../View":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/View.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/MvcGame.ts":[function(require,module,exports) {
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MvcGame = void 0;
var ControllerResponse_1 = require("./helpers/ControllerResponse");
/**
 * <
    // MODEL_COLLECTION extends ModelCollection,
    // VIEW_COLLECTION extends ViewCollection,
    // CONTROLLER_COLLECTION extends ControllerCollection,
    // MODEL extends Model<MODEL_COLLECTION> = Model<MODEL_COLLECTION>,
    // VIEW extends View<VIEW_COLLECTION> = View<VIEW_COLLECTION>,
    // CONTROLLER extends Controller<MODEL_COLLECTION, VIEW_COLLECTION, CONTROLLER_COLLECTION> = Controller<MODEL_COLLECTION, VIEW_COLLECTION, CONTROLLER_COLLECTION>,
    >
 */
var MvcGame = /** @class */ (function () {
    function MvcGame() {
        this.active_view = null;
        this.active_controller = null;
        this.event_queue = [];
        this.ingame_time_in_seconds = 0;
    }
    MvcGame.prototype.update = function (delta_seconds) {
        this.ingame_time_in_seconds += delta_seconds;
        if (!this.active_controller)
            return;
        if (!this.active_controller.update)
            return;
        this.apply_controller_response(this.active_controller.update(delta_seconds));
        this.handle_events();
    };
    MvcGame.prototype.handle_events = function () {
        var _this = this;
        var event_queue_buffer = __spreadArrays(this.event_queue);
        this.event_queue = [];
        event_queue_buffer = event_queue_buffer.filter(function (event) {
            if (event.fire_at && event.fire_at >= _this.ingame_time_in_seconds)
                return true;
            if (!_this.active_controller)
                return false;
            if (!_this.active_controller.dispatch_event)
                return false;
            _this.apply_controller_response(_this.active_controller.dispatch_event(event));
            return false;
        });
        this.event_queue = __spreadArrays(event_queue_buffer, this.event_queue);
    };
    MvcGame.prototype.apply_controller_response = function (response) {
        var _a;
        var response_struct = ControllerResponse_1.update_controller_response({}, response);
        if (response_struct.view !== undefined) {
            this.set_active_view(response_struct.view);
        }
        if (response_struct.controller !== undefined) {
            this.set_active_controller(response_struct.controller);
        }
        if (response_struct.events !== undefined) {
            (_a = this.event_queue).push.apply(_a, response_struct.events);
        }
    };
    MvcGame.prototype.draw = function () {
        if (!this.active_view)
            return;
        if (this.active_view.update) {
            this.active_view.update();
        }
        this.active_view.draw();
    };
    MvcGame.prototype.set_active_controller = function (controller) {
        this.active_controller = controller;
    };
    MvcGame.prototype.set_active_view = function (view) {
        this.active_view = view;
    };
    return MvcGame;
}());
exports.MvcGame = MvcGame;

},{"./helpers/ControllerResponse":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/helpers/ControllerResponse.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/MvcCanvasGame.ts":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MvcCanvasGame = void 0;
var MvcGame_1 = require("./MvcGame");
var MvcCanvasGame = /** @class */ (function (_super) {
    __extends(MvcCanvasGame, _super);
    function MvcCanvasGame() {
        var _this = _super.call(this) || this;
        var canvas = document.getElementById('canvas');
        if (!(canvas instanceof HTMLCanvasElement))
            throw new Error("Canvas not found");
        _this.canvas = canvas;
        var models = _this.create_models();
        var views = _this.create_views(canvas);
        var controllers = _this.create_controllers(models, views);
        _this.models = models;
        _this.views = views;
        _this.controllers = controllers;
        _this.attach_event_listeners();
        _this.apply_controller_response(_this.start());
        return _this;
    }
    MvcCanvasGame.prototype.attach_event_listeners = function () {
        var _this = this;
        this.canvas.addEventListener("keydown", function (event) {
            if (!_this.active_controller)
                return;
            if (_this.active_controller.key_pressed) {
                _this.apply_controller_response(_this.active_controller.key_pressed(event));
            }
        });
        this.canvas.addEventListener("click", function (event) {
            if (!_this.active_controller)
                return;
            if (_this.active_controller.mouse_pressed) {
                var x = (event.x - _this.canvas.offsetLeft) * _this.canvas.width / _this.canvas.clientWidth;
                var y = (event.y - _this.canvas.offsetTop) * _this.canvas.height / _this.canvas.clientHeight;
                var response = _this.active_controller.mouse_pressed(event, x, y);
                _this.apply_controller_response(response);
            }
        });
    };
    return MvcCanvasGame;
}(MvcGame_1.MvcGame));
exports.MvcCanvasGame = MvcCanvasGame;

},{"./MvcGame":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/MvcGame.ts"}],"game/base/Game.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var ControllerCollection_1 = require("../controllers/ControllerCollection");

var ViewCollection_1 = require("../views/ViewCollection");

var ModelCollection_1 = require("../models/ModelCollection");

var MvcCanvasGame_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/MvcCanvasGame");

var Game = /*#__PURE__*/function (_MvcCanvasGame_1$MvcC) {
  _inherits(Game, _MvcCanvasGame_1$MvcC);

  var _super = _createSuper(Game);

  function Game() {
    _classCallCheck(this, Game);

    return _super.apply(this, arguments);
  }

  _createClass(Game, [{
    key: "attach_event_listeners",
    value: function attach_event_listeners() {
      _get(_getPrototypeOf(Game.prototype), "attach_event_listeners", this).call(this);
    }
  }, {
    key: "update",
    value: function update(delta_seconds) {
      _get(_getPrototypeOf(Game.prototype), "update", this).call(this, delta_seconds);
    }
  }, {
    key: "start",
    value: function start() {
      return this.controllers.game_controller.new_game();
    }
  }, {
    key: "create_models",
    value: function create_models() {
      return ModelCollection_1.create_models();
    }
  }, {
    key: "create_views",
    value: function create_views(canvas) {
      return ViewCollection_1.create_views(canvas);
    }
  }, {
    key: "create_controllers",
    value: function create_controllers(models, views) {
      return ControllerCollection_1.create_controllers(models, views);
    }
  }]);

  return Game;
}(MvcCanvasGame_1.MvcCanvasGame);

exports.Game = Game;
},{"../controllers/ControllerCollection":"game/controllers/ControllerCollection.ts","../views/ViewCollection":"game/views/ViewCollection.ts","../models/ModelCollection":"game/models/ModelCollection.ts","@game.object/ts-game-toolbox/src/abstract/mvc/MvcCanvasGame":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/MvcCanvasGame.ts"}],"game/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load_game = void 0;

var Game_1 = require("./base/Game");

function load_game() {
  start_game();
}

exports.load_game = load_game;

function start_game() {
  var game = new Game_1.Game();
  var now = performance.now();

  var animation_frame = function animation_frame(timestamp) {
    var delta_ms = 16;
    timestamp - now;
    game.update(delta_ms / 1000);
    now = timestamp;
    game.draw();
    requestAnimationFrame(animation_frame);
  };

  requestAnimationFrame(animation_frame);
  return game;
}
},{"./base/Game":"game/base/Game.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var main_1 = require("./game/main");

(function () {
  var app = document.getElementById('app');
  if (!(app instanceof HTMLDivElement)) throw new Error("Could not locate canvas");
  main_1.load_game();
})();
},{"./game/main":"game/main.ts"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49716" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map