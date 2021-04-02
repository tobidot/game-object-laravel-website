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
})({"game/config/UserInterfaceAction.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserInterfaceAction = void 0;
var UserInterfaceAction;

(function (UserInterfaceAction) {
  UserInterfaceAction[UserInterfaceAction["TOGGLE_MENU_GROUP"] = 0] = "TOGGLE_MENU_GROUP";
  UserInterfaceAction[UserInterfaceAction["OPTION_1"] = 1] = "OPTION_1";
  UserInterfaceAction[UserInterfaceAction["OPTION_2"] = 2] = "OPTION_2";
  UserInterfaceAction[UserInterfaceAction["OPTION_3"] = 3] = "OPTION_3";
  UserInterfaceAction[UserInterfaceAction["OPTION_4"] = 4] = "OPTION_4";
})(UserInterfaceAction = exports.UserInterfaceAction || (exports.UserInterfaceAction = {}));
},{}],"../node_modules/@game.object/ts-game-toolbox/src/geometries/Vector2.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (typeof x === "object") {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }
    }
    Vector2.prototype.set = function (x, y) {
        if (y === void 0) { y = 0; }
        if (typeof x === "object") {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }
        return this;
    };
    Vector2.prototype.sub = function (other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    };
    Vector2.prototype.add = function (other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    };
    Vector2.prototype.mul = function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    };
    Vector2.prototype.divide = function (scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    };
    Vector2.prototype.len2 = function () {
        return this.x * this.x + this.y * this.y;
    };
    Vector2.prototype.len = function () {
        return Math.sqrt(this.len2());
    };
    Vector2.prototype.set_magnitude = function (magnitude) {
        var len = this.len();
        this.x = this.x / len * magnitude;
        this.y = this.y / len * magnitude;
        return this;
    };
    Vector2.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y;
    };
    Vector2.prototype.cross = function (other) {
        return new Vector2(this.x * other.y, this.y * other.x);
    };
    Vector2.prototype.get_unsigned = function () {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    };
    Vector2.prototype.cpy = function () {
        return new Vector2(this.x, this.y);
    };
    Vector2.prototype.normalize = function () {
        var len = this.len();
        if (len < 0.000001)
            return this;
        this.x /= len;
        this.y /= len;
        return this;
    };
    Vector2.prototype.get_projection_of = function (other) {
        var len = this.dot(other) / this.len2();
        return this.cpy().mul(len);
    };
    Vector2.prototype.is_null_vector = function () {
        return Math.abs(this.x) < 0.001 && Math.abs(this.y) < 0.001;
    };
    Vector2.prototype.get_angle = function () {
        // let 0 be showing up (0,1)
        return (Math.atan2(this.y, this.x) + (Math.PI / 2)) % (2 * Math.PI);
    };
    Vector2.prototype.rotate_radians_clockwise = function (radians) {
        var sin = Math.sin(radians);
        var cos = Math.cos(radians);
        var new_x = -sin * this.y + cos * this.x;
        var new_y = sin * this.x + cos * this.y;
        this.y = new_y;
        this.x = new_x;
        return this;
    };
    Vector2.prototype.rotate_right_angles_clockwise = function (count) {
        if (count === void 0) { count = 1; }
        if (count < 1)
            return this;
        var new_x = this.y;
        this.y = -this.x;
        this.x = new_x;
        return this.rotate_right_angles_clockwise(count - 1);
    };
    /**
     * Create a Vector2 from an angle and a length.
     * An angle of 0 points to the right, turning clockwise.
     *
     * @param angle
     * @param length
     */
    Vector2.from_angle = function (angle, length) {
        if (length === void 0) { length = 1; }
        return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length);
    };
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
    return Vector2;
}());
exports.Vector2 = Vector2;

},{}],"../node_modules/@game.object/ts-game-toolbox/src/geometries/Rect.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
var Vector2_1 = require("./Vector2");
/**
 * @class Rect
 * A helper class for Rectangles
 */
var Rect = /** @class */ (function () {
    function Rect(x, y, w, h) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    Object.defineProperty(Rect.prototype, "left", {
        get: function () {
            return this.x;
        },
        enumerable: false,
        configurable: true
    });
    Rect.prototype.get_left = function () {
        return this.x;
    };
    Object.defineProperty(Rect.prototype, "top", {
        get: function () {
            return this.y;
        },
        enumerable: false,
        configurable: true
    });
    Rect.prototype.get_top = function () {
        return this.y;
    };
    Object.defineProperty(Rect.prototype, "right", {
        get: function () {
            return this.x + this.w;
        },
        enumerable: false,
        configurable: true
    });
    Rect.prototype.get_right = function () {
        return this.x + this.w;
    };
    Rect.prototype.get_bottom = function () {
        return this.y + this.h;
    };
    Object.defineProperty(Rect.prototype, "bottom", {
        get: function () {
            return this.y + this.h;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "width", {
        get: function () {
            return this.w;
        },
        enumerable: false,
        configurable: true
    });
    Rect.prototype.get_width = function () {
        return this.w;
    };
    Object.defineProperty(Rect.prototype, "height", {
        get: function () {
            return this.h;
        },
        enumerable: false,
        configurable: true
    });
    Rect.prototype.get_height = function () {
        return this.h;
    };
    Rect.prototype.cpy = function () {
        return new Rect(this.x, this.y, this.w, this.h);
    };
    Rect.prototype.set = function (x, y, w, h) {
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
    };
    /**
     * Secondary properties
     */
    Rect.prototype.get_area = function () {
        return this.w * this.h;
    };
    Object.defineProperty(Rect.prototype, "center", {
        get: function () {
            return new Vector2_1.Vector2(this.x + this.w / 2, this.y + this.h / 2);
        },
        set: function (center) {
            this.x = center.x - this.w / 2;
            this.y = center.y - this.h / 2;
        },
        enumerable: false,
        configurable: true
    });
    Rect.prototype.set_center = function (center) {
        this.center = center;
        return this;
    };
    /**
     * Expand this rectangle to include the given target.
     * @param target
     */
    Rect.prototype.expand_to = function (target) {
        if (this.contains(target))
            return this;
        var left = Math.min(this.x, target.x);
        var top = Math.min(this.y, target.y);
        var right = Math.max(this.get_right(), target.x);
        var bottom = Math.max(this.get_bottom(), target.y);
        return this.set(left, top, right - left, bottom - top);
    };
    Rect.prototype.overlaps_with = function (other) {
        return Rect.overlap(this, other);
    };
    Rect.prototype.is_within = function (outer) {
        return Rect.is_within(this, outer);
    };
    Rect.prototype.contains = function (x, y) {
        if (typeof x === "object") {
            return Rect.contains(this, x);
        }
        if (typeof y !== "number")
            throw new Error("Unexpected type error");
        return Rect.contains(this, { x: x, y: y });
    };
    /**
     * Manipulate this rectangle to change into the target rectangle by the factor t.
     *
     * @param target
     * @param t
     *  0 => rectangle is unchanged
     *  ..
     *  1 => the rectangle is identical to the target rectangle.
     */
    Rect.prototype.lerp = function (target, t) {
        var it = 1 - t;
        this.x = this.x * it + target.x * t;
        this.y = this.y * it + target.y * t;
        this.w = this.w * it + target.w * t;
        this.h = this.h * it + target.h * t;
        return this;
    };
    /**
     * This functions returns the corners of this rectangle in clockwise order.
     * Starting with the left-top one.
     *
     * @returns array
     * [ left_top, right_top, right_bottom, left_bottom ]
     */
    Rect.prototype.get_corners = function () {
        return [
            { x: this.left, y: this.top },
            { x: this.right, y: this.top },
            { x: this.right, y: this.bottom },
            { x: this.left, y: this.bottom },
        ];
    };
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
    Rect.contains = function (rect, point) {
        return (point.x >= rect.x && point.y >= rect.y && point.x <= rect.x + rect.w && point.y <= rect.y + rect.h);
    };
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
    Rect.contains_exclusive = function (rect, point) {
        return (point.x > rect.x && point.y > rect.y && point.x < rect.x + rect.w && point.y < rect.y + rect.h);
    };
    /**
     * Do theses Rectangles overlap
     * @param a
     * @param b
     */
    Rect.overlap = function (a, b) {
        var overlap_x = (a.x + a.w > b.x && a.x <= b.x) || (b.x + b.w > a.x && b.x <= a.x);
        var overlap_y = (a.y + a.h > b.y && a.y <= b.y) || (b.y + b.h > a.y && b.y <= a.y);
        return overlap_x && overlap_y;
    };
    /**
     * Is the inner rectangle completly within the outer rectangle.
     *
     * @param inner
     * @param outer
     */
    Rect.is_within = function (inner, outer) {
        var within_x = inner.x > outer.x && inner.x + inner.w < outer.x + outer.w;
        var within_y = inner.y > outer.y && inner.y + inner.h < outer.y + outer.h;
        return within_x && within_y;
    };
    return Rect;
}());
exports.Rect = Rect;

},{"./Vector2":"../node_modules/@game.object/ts-game-toolbox/src/geometries/Vector2.ts"}],"game/services/MenuBuilder.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuBuilder = void 0;

var Rect_1 = require("@game.object/ts-game-toolbox/src/geometries/Rect");

;

var MenuBuilder = /*#__PURE__*/function () {
  function MenuBuilder(groups, buttons, toggle_action_id) {
    _classCallCheck(this, MenuBuilder);

    this.groups = groups;
    this.buttons = buttons;
    this.toggle_action_id = toggle_action_id;
    this.config = {
      button_width: 150,
      button_height: 25,
      button_padding: 5,
      group_padding: 10,
      group_offset_x: 10,
      group_offset_y: 10,
      direction: "collumn"
    };
  }

  _createClass(MenuBuilder, [{
    key: "set_config",
    value: function set_config(config) {
      Object.assign(this.config, config);
    }
  }, {
    key: "from_object",
    value: function from_object(title, menu_structure) {
      var _this = this;

      var entries = Object.entries(menu_structure.items);
      var group = this.groups.insert_new(function (group) {
        group.title = title;
        group.is_visible = false;
        group.collider = _this.get_collider_for_group(entries.length, menu_structure.options);
        return group;
      });
      entries.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            title = _ref2[0],
            content = _ref2[1];

        if (_typeof(content) !== "object") {
          _this.add_button_to_group(group, title, content, menu_structure.options);
        } else {
          _this.add_group_to_group(group, title, content, menu_structure.options);
        }
      });
      return group;
    }
  }, {
    key: "add_button_to_group",
    value: function add_button_to_group(group, title, content, options) {
      var _this2 = this;

      return this.buttons.insert_new(function (button) {
        button.parent_group_id = group.id;
        button.title = title;
        button.action_id = content;
        button.is_visible = true;
        button.collider = _this2.get_collider_for_nth_button(group.children.length, options);
        return button;
      });
    }
  }, {
    key: "add_group_to_group",
    value: function add_group_to_group(group, title, content, options) {
      var button = this.add_button_to_group(group, title, this.toggle_action_id, options); // inner group

      var inner_group = this.from_object(title, content);
      inner_group.collider.x += button.collider.x + group.collider.x;
      inner_group.collider.y += button.collider.y + group.collider.y;
      inner_group.toggle_button_id = button.id;
      inner_group.z_index += group.z_index + 1;
      return inner_group;
    }
  }, {
    key: "get_collider_for_group",
    value: function get_collider_for_group(children_count, options) {
      var _a, _b, _c, _d, _e;

      var option_direction = (_a = options === null || options === void 0 ? void 0 : options.direction) !== null && _a !== void 0 ? _a : this.config.direction;
      var x = (_c = (_b = options === null || options === void 0 ? void 0 : options.position) === null || _b === void 0 ? void 0 : _b.x) !== null && _c !== void 0 ? _c : this.config.group_offset_x;
      var y = (_e = (_d = options === null || options === void 0 ? void 0 : options.position) === null || _d === void 0 ? void 0 : _d.y) !== null && _e !== void 0 ? _e : this.config.group_offset_y;

      if (option_direction === "row") {
        var _w = children_count * (this.config.button_width + this.config.button_padding) + this.config.button_padding;

        var _h = this.config.button_height + this.config.group_padding * 2;

        return new Rect_1.Rect(x, y, _w, _h);
      }

      var w = this.config.button_width + this.config.group_padding * 2;
      var h = children_count * (this.config.button_height + this.config.button_padding) + this.config.button_padding;
      return new Rect_1.Rect(x, y, w, h);
    }
  }, {
    key: "get_collider_for_nth_button",
    value: function get_collider_for_nth_button(index, options) {
      var _a;

      var option_direction = (_a = options === null || options === void 0 ? void 0 : options.direction) !== null && _a !== void 0 ? _a : this.config.direction;
      var w = this.config.button_width;
      var h = this.config.button_height;

      if (option_direction === "row") {
        var _x = this.config.button_padding + (this.config.button_width + this.config.button_padding) * index;

        var _y = this.config.group_padding;
        return new Rect_1.Rect(_x, _y, w, h);
      }

      var x = this.config.group_padding;
      var y = this.config.button_padding + (this.config.button_height + this.config.button_padding) * index;
      return new Rect_1.Rect(x, y, w, h);
    }
  }]);

  return MenuBuilder;
}();

exports.MenuBuilder = MenuBuilder;
},{"@game.object/ts-game-toolbox/src/geometries/Rect":"../node_modules/@game.object/ts-game-toolbox/src/geometries/Rect.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/controllers/Controller.ts":[function(require,module,exports) {
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

var Controller_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/controllers/Controller");

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
},{"@game.object/ts-game-toolbox/src/abstract/mvc/controllers/Controller":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/controllers/Controller.ts"}],"game/controllers/GameController.ts":[function(require,module,exports) {
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

var UserInterfaceAction_1 = require("../config/UserInterfaceAction");

var MenuBuilder_1 = require("../services/MenuBuilder");

var BaseController_1 = require("./BaseController");

var GameController = /*#__PURE__*/function (_BaseController_1$Bas) {
  _inherits(GameController, _BaseController_1$Bas);

  var _super = _createSuper(GameController);

  function GameController() {
    _classCallCheck(this, GameController);

    return _super.apply(this, arguments);
  }

  _createClass(GameController, [{
    key: "new_game",

    /**
     * Start a new game
     */
    value: function new_game() {
      this.models.camera.center.set(0, 0); // How i want it to be

      var menu_builder = new MenuBuilder_1.MenuBuilder(this.models.menu_groups, this.models.menu_buttons, UserInterfaceAction_1.UserInterfaceAction.TOGGLE_MENU_GROUP);
      menu_builder.set_config({
        button_width: 100,
        direction: "collumn"
      });
      var main_menu_group = menu_builder.from_object("Menu", {
        options: {
          position: {
            x: 25,
            y: 15
          },
          direction: "row"
        },
        items: {
          "Aktion 1": UserInterfaceAction_1.UserInterfaceAction.OPTION_1,
          "Aktion 2": UserInterfaceAction_1.UserInterfaceAction.OPTION_2,
          "Aktion 3": UserInterfaceAction_1.UserInterfaceAction.OPTION_3,
          "Aktion 4": UserInterfaceAction_1.UserInterfaceAction.OPTION_4,
          "Sub Menu": {
            items: {
              "Aktion 1": UserInterfaceAction_1.UserInterfaceAction.OPTION_1,
              "Aktion 2": UserInterfaceAction_1.UserInterfaceAction.OPTION_2
            }
          }
        }
      });
      main_menu_group.is_visible = true; /// response

      var response = {
        view: this.views.main.menu_groups.set(this.models.menu_groups.all()).camera.set(this.models.camera),
        controller: this.controllers.for_event.game_controller
      };
      return response;
    }
  }]);

  return GameController;
}(BaseController_1.BaseController);

exports.GameController = GameController;
},{"../config/UserInterfaceAction":"game/config/UserInterfaceAction.ts","../services/MenuBuilder":"game/services/MenuBuilder.ts","./BaseController":"game/controllers/BaseController.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/events/ControllerEvent.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_specific_controller_event = exports.is_controller_event = void 0;
function is_controller_event(object) {
    return typeof object === "object" && object.hasOwnProperty('event_name');
}
exports.is_controller_event = is_controller_event;
function is_specific_controller_event(object, name) {
    return is_controller_event(object) && (!name || object.event_name === name);
}
exports.is_specific_controller_event = is_specific_controller_event;

},{}],"game/controllers/event_controllers/GameEventController.ts":[function(require,module,exports) {
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

var ControllerEvent_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/events/ControllerEvent");

var UserInterfaceAction_1 = require("../../config/UserInterfaceAction");

var GameEventController = /*#__PURE__*/function (_BaseController_1$Bas) {
  _inherits(GameEventController, _BaseController_1$Bas);

  var _super = _createSuper(GameEventController);

  function GameEventController() {
    var _this;

    _classCallCheck(this, GameEventController);

    _this = _super.apply(this, arguments);
    _this.custom_event_handler = new Map([[UserInterfaceAction_1.UserInterfaceAction.TOGGLE_MENU_GROUP, function (event) {
      return _this.controllers.for_event.menu.toggle_menu_group(event);
    }]]);
    return _this;
  }

  _createClass(GameEventController, [{
    key: "update",
    value: function update(delta_seconds) {
      return null;
    }
  }, {
    key: "mouse_pressed",
    value: function mouse_pressed(event, x, y) {
      var response = null;
      if (!response) response = this.controllers.for_event.menu.mouse_pressed(event, x, y);
      return response;
    }
  }, {
    key: "custom_event",
    value: function custom_event(event) {
      if (ControllerEvent_1.is_specific_controller_event(event, "user-interface-event")) {
        var handler = this.custom_event_handler.get(event.action_id);

        if (!handler) {
          console.log("Unhandled Menu Action ", event);
          return null;
        }

        ;
        return handler(event);
      }

      return null;
    }
  }]);

  return GameEventController;
}(BaseController_1.BaseController);

exports.GameEventController = GameEventController;
},{"../BaseController":"game/controllers/BaseController.ts","@game.object/ts-game-toolbox/src/abstract/mvc/events/ControllerEvent":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/events/ControllerEvent.ts","../../config/UserInterfaceAction":"game/config/UserInterfaceAction.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/signals/ChainProperty.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CP = exports.ChainProperty = void 0;
var ChainProperty = /** @class */ (function () {
    function ChainProperty(view, property) {
        this.view = view;
        this.property = property;
    }
    ChainProperty.prototype.set = function (value) {
        this.property = value;
        return this.view;
    };
    ChainProperty.prototype.get = function () {
        return this.property;
    };
    return ChainProperty;
}());
exports.ChainProperty = ChainProperty;
exports.CP = ChainProperty;

},{}],"game/controllers/promise_controllers/DelayController.ts":[function(require,module,exports) {
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

var ChainProperty_1 = require("@game.object/ts-game-toolbox/src/signals/ChainProperty");

var BaseController_1 = require("../BaseController");

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
},{"@game.object/ts-game-toolbox/src/signals/ChainProperty":"../node_modules/@game.object/ts-game-toolbox/src/signals/ChainProperty.ts","../BaseController":"game/controllers/BaseController.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/adapters/UserInterfaceModelAdapter.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInterfaceModelAdapter = void 0;
var UserInterfaceModelAdapter = /** @class */ (function () {
    function UserInterfaceModelAdapter(target) {
        this.target = target;
    }
    UserInterfaceModelAdapter.prototype.is_clicked = function (in_game_mouse_position) {
        return (this.target.collider.contains(in_game_mouse_position))
            && this.target.is_clickable;
    };
    UserInterfaceModelAdapter.for = function (target) {
        if (!UserInterfaceModelAdapter.instance) {
            UserInterfaceModelAdapter.instance = new UserInterfaceModelAdapter(target);
        }
        UserInterfaceModelAdapter.instance.target = target;
        return UserInterfaceModelAdapter.instance;
    };
    return UserInterfaceModelAdapter;
}());
exports.UserInterfaceModelAdapter = UserInterfaceModelAdapter;

},{}],"../node_modules/@game.object/ts-game-toolbox/src/signals/SignalSocket.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalSocket = void 0;
var SignalSocket = /** @class */ (function () {
    function SignalSocket() {
        this.listeners = [];
    }
    SignalSocket.prototype.add = function (listener) {
        this.listeners.push(listener);
    };
    SignalSocket.prototype.remove = function (listener) {
        var index = this.listeners.indexOf(listener);
        if (index < 0)
            return;
        var length = this.listeners.length;
        this.listeners[index] = this.listeners[length - 1];
        this.listeners.pop();
    };
    SignalSocket.prototype.trigger_event = function (signal) {
        this.listeners.forEach(function (listener) {
            listener(signal);
        });
    };
    return SignalSocket;
}());
exports.SignalSocket = SignalSocket;

},{}],"../node_modules/@game.object/ts-game-toolbox/src/signals/ObservableSocket.ts":[function(require,module,exports) {
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
exports.ObservableSocket = void 0;
var SignalSocket_1 = require("./SignalSocket");
var ObservableSocket = /** @class */ (function (_super) {
    __extends(ObservableSocket, _super);
    function ObservableSocket(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    ObservableSocket.prototype.trigger_event = function () { throw new Error('Do not call this directly'); };
    ObservableSocket.prototype.set = function (new_value) {
        _super.prototype.trigger_event.call(this, {
            old: this.value,
            new: new_value,
        });
        this.value = new_value;
    };
    ObservableSocket.prototype.get = function () {
        return this.value;
    };
    return ObservableSocket;
}(SignalSocket_1.SignalSocket));
exports.ObservableSocket = ObservableSocket;
;

},{"./SignalSocket":"../node_modules/@game.object/ts-game-toolbox/src/signals/SignalSocket.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/signals/index.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signals = void 0;
var SignalSocket_1 = require("./SignalSocket");
var ObservableSocket_1 = require("./ObservableSocket");
// export * from "./SignalSocket";
// export * from "./ObservableSocket";
exports.signals = {
    SignalSocket: SignalSocket_1.SignalSocket,
    ObservableSocket: ObservableSocket_1.ObservableSocket,
};

},{"./SignalSocket":"../node_modules/@game.object/ts-game-toolbox/src/signals/SignalSocket.ts","./ObservableSocket":"../node_modules/@game.object/ts-game-toolbox/src/signals/ObservableSocket.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/assets/manager/AssetManager.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetManager = void 0;
var AssetManager = /** @class */ (function () {
    function AssetManager() {
    }
    return AssetManager;
}());
exports.AssetManager = AssetManager;

},{}],"../node_modules/@game.object/ts-game-toolbox/src/assets/index.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assets = void 0;
var AssetManager_1 = require("./manager/AssetManager");
// export * from "./manager/AssetManager"
exports.assets = {
    AssetManager: AssetManager_1.AssetManager
};

},{"./manager/AssetManager":"../node_modules/@game.object/ts-game-toolbox/src/assets/manager/AssetManager.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/geometries/index.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geometries = void 0;
var Rect_1 = require("./Rect");
var Vector2_1 = require("./Vector2");
exports.geometries = {
    Rect: Rect_1.Rect,
    Vector2: Vector2_1.Vector2,
};

},{"./Rect":"../node_modules/@game.object/ts-game-toolbox/src/geometries/Rect.ts","./Vector2":"../node_modules/@game.object/ts-game-toolbox/src/geometries/Vector2.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/testing/exceptions/ExceptionExpectedException.ts":[function(require,module,exports) {
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
exports.TestClassExceptionExpectedExcetpion = void 0;
var TestClassExceptionExpectedExcetpion = /** @class */ (function (_super) {
    __extends(TestClassExceptionExpectedExcetpion, _super);
    function TestClassExceptionExpectedExcetpion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TestClassExceptionExpectedExcetpion;
}(Error));
exports.TestClassExceptionExpectedExcetpion = TestClassExceptionExpectedExcetpion;

},{}],"../node_modules/@game.object/ts-game-toolbox/src/testing/TestClass.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestClass = void 0;
var ExceptionExpectedException_1 = require("./exceptions/ExceptionExpectedException");
var TestClass = /** @class */ (function () {
    function TestClass() {
    }
    TestClass.prototype.set_up = function () { console.log(this); };
    TestClass.prototype.tear_down = function () { };
    TestClass.prototype.set_class_up = function () { };
    TestClass.prototype.tear_class_down = function () { };
    TestClass.prototype.run_all_test_cases = function () {
        var test = this;
        console.log(">>> Start " + test.get_name());
        this.set_class_up();
        for (var _i = 0, _a = Object.getOwnPropertyNames(test.__proto__); _i < _a.length; _i++) {
            var test_name = _a[_i];
            var test_statement = test[test_name];
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
    };
    TestClass.prototype.assert_exception = function (exception, callback) {
        try {
            callback();
            throw new ExceptionExpectedException_1.TestClassExceptionExpectedExcetpion('Expected an exception from ' + String(callback).substr(0, 255));
        }
        catch (error) {
            if (!(error instanceof exception))
                throw error;
            this.success();
        }
    };
    TestClass.prototype.assert_instance_of = function (value, expected) {
        if (false === value instanceof expected) {
            throw new Error('Expected ' + value.toString() + ' to be of instance ' + expected.name);
        }
        this.success();
    };
    TestClass.prototype.assert_equals = function (value, expected) {
        if (value !== expected) {
            throw new Error('Expected ' + String(value) + ' to be equal to ' + String(expected));
        }
        this.success();
    };
    TestClass.prototype.assert_not_equals = function (value, expected) {
        if (value === expected) {
            throw new Error('Expected ' + String(value) + ' to be NOT equal to ' + String(expected));
        }
        this.success();
    };
    TestClass.prototype.assert_true = function (value) {
        if (value === false) {
            throw new Error('Expected ' + String(value) + ' to be true');
        }
        this.success();
    };
    TestClass.prototype.assert_false = function (value) {
        if (value === true) {
            throw new Error('Expected ' + String(value) + ' to be false');
        }
        this.success();
    };
    TestClass.prototype.success = function () {
        console.log('.');
    };
    return TestClass;
}());
exports.TestClass = TestClass;

},{"./exceptions/ExceptionExpectedException":"../node_modules/@game.object/ts-game-toolbox/src/testing/exceptions/ExceptionExpectedException.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/testing/TestConsoleLogElement.ts":[function(require,module,exports) {
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestConsoleLogElement = void 0;
var TestConsoleLogElement = /** @class */ (function () {
    function TestConsoleLogElement() {
        this.window_on_error_func = function (event, source, lineno, colno, error) {
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
    TestConsoleLogElement.prototype.get_element = function () {
        return this.container;
    };
    TestConsoleLogElement.prototype.clear = function () {
        this.container.innerHTML = "";
    };
    TestConsoleLogElement.prototype.hook_into_console_log = function () {
        var _this = this;
        var console_log = window.console.log;
        console.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console_log.apply(void 0, args);
            _this.log.apply(_this, args);
        };
    };
    TestConsoleLogElement.prototype.hook_into_console_error = function () {
        var _this = this;
        var console_error = window.console.error;
        console.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var text = args[0].toString();
            console_error(text);
            _this.log.apply(_this, __spreadArrays(["%c" + text, "color: red;"], args));
        };
    };
    TestConsoleLogElement.prototype.hook_into_window_error = function () {
        window.addEventListener('error', this.window_on_error_func);
    };
    TestConsoleLogElement.prototype.create_element = function () {
        var container = document.createElement('div');
        container.className = "test-console-log";
        return container;
    };
    TestConsoleLogElement.prototype.log = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var format_or_log = args.shift();
        if (typeof format_or_log === "string") {
            return this.print_format.apply(this, __spreadArrays([format_or_log], args)).then(function () {
                var rest_args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    rest_args[_i] = arguments[_i];
                }
                _this.log.apply(_this, args);
            });
        }
        else {
            args.forEach(function (arg) {
                _this.print((arg).toString());
            });
        }
    };
    TestConsoleLogElement.prototype.print_format = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var style = '';
                        var text = format;
                        if (format.indexOf('%c') === 0) {
                            style = args[0];
                            text = text.substr(2);
                        }
                        while (text.indexOf('%s') !== -1) {
                            var next = args.shift();
                            if (next === null)
                                throw Error('argument mismatch');
                            text = text.replace('%s', next.toString());
                        }
                        _this.print(text, style);
                    })];
            });
        });
    };
    TestConsoleLogElement.prototype.print = function (text, style) {
        var span = document.createElement('span');
        if (style)
            span.style.cssText = style;
        span.innerText = text;
        this.container.append(span);
    };
    return TestConsoleLogElement;
}());
exports.TestConsoleLogElement = TestConsoleLogElement;

},{}],"../node_modules/@game.object/ts-game-toolbox/src/testing/TestDashboard.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDashboard = void 0;
var TestConsoleLogElement_1 = require("./TestConsoleLogElement");
var TestDashboard = /** @class */ (function () {
    function TestDashboard() {
        var _this = this;
        this.tests = [];
        this.start_all_tests_func = function () {
            _this.elements.console_log.clear();
            console.log('Starting Tests ... ');
            for (var _i = 0, _a = _this.tests; _i < _a.length; _i++) {
                var test = _a[_i];
                test.run_all_test_cases();
            }
            console.log(' ... Tests finished');
        };
        this.elements = this.create_dashboard_elements();
    }
    TestDashboard.prototype.get_element = function () {
        return this.elements.dashboard;
    };
    TestDashboard.prototype.create_dashboard_elements = function () {
        var dashboard = this.create_dashboard_wrapping_element();
        var button_list = this.create_test_button_list();
        var console_log = new TestConsoleLogElement_1.TestConsoleLogElement();
        dashboard.append(button_list);
        dashboard.append(console_log.get_element());
        this.elements = {
            dashboard: dashboard,
            button_list: button_list,
            console_log: console_log,
        };
        return this.elements;
    };
    TestDashboard.prototype.create_dashboard_wrapping_element = function () {
        var dashboard = document.createElement('div');
        dashboard.className = 'test-dashboard';
        return dashboard;
    };
    TestDashboard.prototype.create_test_button_list = function () {
        var _this = this;
        var button_list = document.createElement('ul');
        button_list.className = "test-dashboard__button-list";
        var button_start_all = this.create_element_button('Run all tests', this.start_all_tests_func);
        button_list.append(button_start_all);
        this.tests.forEach(function (test) {
            var button = _this.create_element_for_test_button(test);
            button_list.append(button);
        });
        return button_list;
    };
    TestDashboard.prototype.create_element_for_test_button = function (test) {
        var _this = this;
        return this.create_element_button(test.get_name(), function () {
            _this.elements.console_log.clear();
            test.run_all_test_cases();
        });
    };
    TestDashboard.prototype.create_element_button = function (text, on_click) {
        var list_item = document.createElement('li');
        var button = document.createElement('button');
        button.innerText = text;
        button.addEventListener('click', on_click);
        list_item.append(button);
        return list_item;
    };
    TestDashboard.prototype.add_test = function (tests) {
        var _this = this;
        if (!(tests instanceof Array)) {
            tests = [tests];
        }
        tests.forEach(function (test) {
            _this.tests.push(test);
            if (_this.elements) {
                _this.elements.button_list.append(_this.create_element_for_test_button(test));
            }
        });
        return this;
    };
    return TestDashboard;
}());
exports.TestDashboard = TestDashboard;

},{"./TestConsoleLogElement":"../node_modules/@game.object/ts-game-toolbox/src/testing/TestConsoleLogElement.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/testing/index.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testing = void 0;
// export * from "./TestClass"
var TestClass_1 = require("./TestClass");
var TestDashboard_1 = require("./TestDashboard");
exports.testing = {
    TestClass: TestClass_1.TestClass,
    TestDashboard: TestDashboard_1.TestDashboard,
};

},{"./TestClass":"../node_modules/@game.object/ts-game-toolbox/src/testing/TestClass.ts","./TestDashboard":"../node_modules/@game.object/ts-game-toolbox/src/testing/TestDashboard.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/trees/exceptions/TreeElementNotFoundException.ts":[function(require,module,exports) {
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
exports.TreeElementNotFoundException = void 0;
var TreeElementNotFoundException = /** @class */ (function (_super) {
    __extends(TreeElementNotFoundException, _super);
    function TreeElementNotFoundException(message) {
        var _this = _super.call(this, message) || this;
        _this.name = TreeElementNotFoundException.name;
        Object.setPrototypeOf(_this, TreeElementNotFoundException.prototype);
        return _this;
    }
    return TreeElementNotFoundException;
}(Error));
exports.TreeElementNotFoundException = TreeElementNotFoundException;

},{}],"../node_modules/@game.object/ts-game-toolbox/src/trees/QuadTree.ts":[function(require,module,exports) {
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
exports.QuadTreeBranch = exports.QuadTree = void 0;
var TreeElementNotFoundException_1 = require("./exceptions/TreeElementNotFoundException");
var Rect_1 = require("../geometries/Rect");
var QuadTree = /** @class */ (function () {
    function QuadTree(base_rect) {
        this.root_branch = new QuadTreeBranch(base_rect.x, base_rect.y, base_rect.w, base_rect.h);
    }
    QuadTree.prototype.pick = function (rect) {
        return this.root_branch.pick(rect);
    };
    QuadTree.prototype.add = function (element) {
        var is_within = Rect_1.Rect.is_within(element, this.root_branch);
        if (is_within) {
            this.root_branch.add(element);
        }
        else {
            this.elevate_root_branch();
            this.add(element);
        }
    };
    /**
     * First wrap the root in a branch that contains the root at the bottom right,
     * then create a branch wich has that new branch in the bottom left,
     * like that the tree expands in all directions
     */
    QuadTree.prototype.elevate_root_branch = function () {
        var old_root_branch = this.root_branch;
        var extend_top_left_rect = {
            x: old_root_branch.x - old_root_branch.w,
            y: old_root_branch.y - old_root_branch.h,
            w: old_root_branch.w * 2,
            h: old_root_branch.h * 2,
        };
        var extend_bottom_right_rect = {
            x: extend_top_left_rect.x,
            y: extend_top_left_rect.y,
            w: extend_top_left_rect.w * 2,
            h: extend_top_left_rect.h * 2,
        };
        this.wrap_root_node_in_node_with_rect(extend_top_left_rect, 2);
        this.wrap_root_node_in_node_with_rect(extend_bottom_right_rect, 0);
    };
    QuadTree.prototype.wrap_root_node_in_node_with_rect = function (rect, node_pos) {
        var wrapper_node = new QuadTreeBranch(rect.x, rect.y, rect.w, rect.h);
        wrapper_node.create_child_branches();
        if (!wrapper_node.child_branch_nodes)
            throw new Error();
        wrapper_node.child_branch_nodes[node_pos] = this.root_branch;
        this.root_branch = wrapper_node;
    };
    QuadTree.prototype.change_element = function (element, rect) {
        this.remove(element);
        element.x = rect.x;
        element.y = rect.y;
        element.w = rect.w;
        element.h = rect.h;
        this.add(element);
    };
    QuadTree.prototype.remove = function (element) {
        if (!this.root_branch.remove(element)) {
            throw new TreeElementNotFoundException_1.TreeElementNotFoundException();
        }
    };
    QuadTree.prototype.is_empty = function () {
        return this.root_branch.is_empty();
    };
    QuadTree.prototype.clear = function () {
        this.root_branch.clear(8);
    };
    return QuadTree;
}());
exports.QuadTree = QuadTree;
var QuadTreeBranch = /** @class */ (function (_super) {
    __extends(QuadTreeBranch, _super);
    function QuadTreeBranch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.child_branch_nodes = null;
        _this.elements = [];
        return _this;
    }
    QuadTreeBranch.prototype.add = function (element) {
        if (this.child_branch_nodes === null) {
            this.elements.push(element);
            this.create_child_branches_if_necessary();
            return true;
        }
        ;
        var overlapping_branches = this.child_branch_nodes.filter(function (branch) {
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
    };
    QuadTreeBranch.prototype.readd_own_elements = function () {
        var _this = this;
        var elements = this.elements.splice(0);
        elements.forEach(function (element) {
            _this.add(element);
        });
    };
    QuadTreeBranch.prototype.create_child_branches_if_necessary = function () {
        if (this.elements.length < 10)
            return;
        this.create_child_branches();
        this.readd_own_elements();
    };
    QuadTreeBranch.prototype.create_child_branches = function () {
        var w_half = this.w / 2;
        var h_half = this.h / 2;
        this.child_branch_nodes = [
            new QuadTreeBranch(this.x, this.y, w_half, h_half),
            new QuadTreeBranch(this.x + w_half, this.y, w_half, h_half),
            new QuadTreeBranch(this.x + w_half, this.y + h_half, w_half, h_half),
            new QuadTreeBranch(this.x, this.y + h_half, w_half, h_half),
        ];
    };
    QuadTreeBranch.prototype.pick = function (rect, result) {
        if (result === void 0) { result = []; }
        if (!this.overlaps_with(rect))
            return result;
        result.push.apply(result, this.elements.filter(function (element) { return Rect_1.Rect.overlap(rect, element); }));
        if (this.child_branch_nodes === null)
            return result;
        if (this.is_within(rect))
            return this.pick_all(result);
        for (var _i = 0, _a = this.child_branch_nodes; _i < _a.length; _i++) {
            var branch = _a[_i];
            branch.pick(rect, result);
        }
        return result;
    };
    QuadTreeBranch.prototype.pick_all = function (result) {
        result.push.apply(result, this.elements);
        if (this.child_branch_nodes === null)
            return result;
        for (var _i = 0, _a = this.child_branch_nodes; _i < _a.length; _i++) {
            var branch = _a[_i];
            branch.pick_all(result);
        }
        return result;
    };
    QuadTreeBranch.prototype.remove = function (element) {
        var id = this.elements.indexOf(element);
        if (id !== -1) {
            this.elements.splice(id, 1);
            return true;
        }
        if (this.child_branch_nodes === null)
            return false;
        for (var _i = 0, _a = this.child_branch_nodes; _i < _a.length; _i++) {
            var branch = _a[_i];
            if (branch.remove(element))
                return true;
        }
        return false;
    };
    QuadTreeBranch.prototype.is_empty = function () {
        if (!this.is_self_empty())
            return false;
        if (this.child_branch_nodes === null)
            return true;
        for (var _i = 0, _a = this.child_branch_nodes; _i < _a.length; _i++) {
            var branch = _a[_i];
            if (!branch.is_empty())
                return false;
        }
        return true;
    };
    QuadTreeBranch.prototype.is_self_empty = function () {
        return this.elements.length === 0;
    };
    QuadTreeBranch.prototype.clear = function (max_levels_deep) {
        this.elements.splice(0);
        if (this.child_branch_nodes) {
            if (max_levels_deep <= 0) {
                this.child_branch_nodes = null;
            }
            else {
                this.child_branch_nodes.forEach(function (node) {
                    node.clear(max_levels_deep - 1);
                });
            }
        }
    };
    return QuadTreeBranch;
}(Rect_1.Rect));
exports.QuadTreeBranch = QuadTreeBranch;

},{"./exceptions/TreeElementNotFoundException":"../node_modules/@game.object/ts-game-toolbox/src/trees/exceptions/TreeElementNotFoundException.ts","../geometries/Rect":"../node_modules/@game.object/ts-game-toolbox/src/geometries/Rect.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/trees/index.ts":[function(require,module,exports) {
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
var QuadTree_1 = require("./QuadTree");
var TreeElementNotFoundException_1 = require("./exceptions/TreeElementNotFoundException");
__exportStar(require("./QuadTree"), exports);
__exportStar(require("./exceptions/TreeElementNotFoundException"), exports);
exports.trees = {
    exceptions: {
        TreeElementNotFoundException: TreeElementNotFoundException_1.TreeElementNotFoundException,
    },
    QuadTree: QuadTree_1.QuadTree,
};

},{"./QuadTree":"../node_modules/@game.object/ts-game-toolbox/src/trees/QuadTree.ts","./exceptions/TreeElementNotFoundException":"../node_modules/@game.object/ts-game-toolbox/src/trees/exceptions/TreeElementNotFoundException.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/models/Model.ts":[function(require,module,exports) {
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

},{}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/views/View.ts":[function(require,module,exports) {
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

},{}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/views/CanvasView.ts":[function(require,module,exports) {
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

},{"./View":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/views/View.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/helpers/ControllerEvent.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerEventConstructor = exports.event = void 0;
function event(event, time_provider) {
    return new ControllerEventConstructor(event, time_provider);
}
exports.event = event;
var ControllerEventConstructor = /** @class */ (function () {
    function ControllerEventConstructor(event, time_provide) {
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
    ControllerEventConstructor.prototype.after_x_seconds = function (seconds) {
        this.fire_at = this.time_provide.ingame_time_in_seconds + seconds;
        return this;
    };
    ControllerEventConstructor.prototype.set_data = function (data) {
        Object.assign(this, data);
        return this;
    };
    return ControllerEventConstructor;
}());
exports.ControllerEventConstructor = ControllerEventConstructor;

},{}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/helpers/ControllerResponse.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_controller_response = void 0;
var Controller_1 = require("../controllers/Controller");
var ControllerEvent_1 = require("../events/ControllerEvent");
var View_1 = require("../views/View");
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

},{"../controllers/Controller":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/controllers/Controller.ts","../events/ControllerEvent":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/events/ControllerEvent.ts","../views/View":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/views/View.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/MVCgame.ts":[function(require,module,exports) {
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
            if (!_this.active_controller.custom_event)
                return false;
            _this.apply_controller_response(_this.active_controller.custom_event(event));
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

},{"./helpers/ControllerResponse":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/helpers/ControllerResponse.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/MvcGame.ts":[function(require,module,exports) {
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
            if (!_this.active_controller.custom_event)
                return false;
            _this.apply_controller_response(_this.active_controller.custom_event(event));
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

},{"./MvcGame":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/MvcGame.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/models/ModelTable.ts":[function(require,module,exports) {
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
        return __spreadArrays(this.models);
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

},{}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/controllers/PromiseController.ts":[function(require,module,exports) {
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
exports.FinalPromiseController = exports.PromiseController = void 0;
var ControllerResponse_1 = require("../helpers/ControllerResponse");
var PromiseController = /** @class */ (function () {
    function PromiseController(resolver) {
        this.next = null;
        this.cached_response = null;
        this.resolver = this.create_resolver_function(resolver);
    }
    PromiseController.prototype.create_resolver_function = function (resolver) {
        var _this = this;
        return function () {
            var response = (typeof resolver === "object") ? resolver : resolver();
            response.controller.next = _this.create_controller_next_function(response);
            return response;
        };
    };
    PromiseController.prototype.create_controller_next_function = function (response) {
        var _this = this;
        return function () {
            if (_this.next === null)
                return _this;
            _this.resolver = _this.next.resolver;
            _this.cached_response = null;
            _this.next = _this.next.next;
            return _this;
        };
    };
    Object.defineProperty(PromiseController.prototype, "response", {
        get: function () {
            if (this.cached_response)
                return this.cached_response;
            var response = this.resolver();
            this.cached_response = {};
            ControllerResponse_1.update_controller_response(this.cached_response, response);
            return this.cached_response;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PromiseController.prototype, "view", {
        get: function () {
            var _a;
            return (_a = this.response) === null || _a === void 0 ? void 0 : _a.view;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PromiseController.prototype, "controller", {
        get: function () {
            var _a;
            return (_a = this.response) === null || _a === void 0 ? void 0 : _a.controller;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PromiseController.prototype, "events", {
        get: function () {
            var _a;
            return (_a = this.response) === null || _a === void 0 ? void 0 : _a.events;
        },
        enumerable: false,
        configurable: true
    });
    PromiseController.prototype.then = function (resolve) {
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
    };
    PromiseController.prototype.finaly = function (resolve) {
        if (this.next) {
            this.next.finaly(resolve);
        }
        else {
            this.next = new FinalPromiseController(resolve);
        }
        return this;
    };
    return PromiseController;
}());
exports.PromiseController = PromiseController;
var FinalPromiseController = /** @class */ (function (_super) {
    __extends(FinalPromiseController, _super);
    function FinalPromiseController(resolver) {
        return _super.call(this, function () {
            var response = (typeof resolver === "object") ? resolver : resolver();
            return response;
        }) || this;
    }
    FinalPromiseController.prototype.create_resolver_function = function (resolver) {
        return function () {
            return (typeof resolver === "object") ? resolver : resolver();
        };
    };
    return FinalPromiseController;
}(PromiseController));
exports.FinalPromiseController = FinalPromiseController;

},{"../helpers/ControllerResponse":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/helpers/ControllerResponse.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/abstract/index.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abstract = void 0;
var Model_1 = require("./mvc/models/Model");
var View_1 = require("./mvc/views/View");
var Controller_1 = require("./mvc/controllers/Controller");
var CanvasView_1 = require("./mvc/views/CanvasView");
var ControllerEvent_1 = require("./mvc/helpers/ControllerEvent");
var MVCgame_1 = require("./mvc/MVCgame");
var MvcCanvasGame_1 = require("./mvc/MvcCanvasGame");
var ModelTable_1 = require("./mvc/models/ModelTable");
var ControllerResponse_1 = require("./mvc/helpers/ControllerResponse");
var PromiseController_1 = require("./mvc/controllers/PromiseController");
var ControllerEvent_2 = require("./mvc/events/ControllerEvent");
var UserInterfaceModelAdapter_1 = require("./mvc/adapters/UserInterfaceModelAdapter");
exports.abstract = {
    mvc: {
        MvcGame: MVCgame_1.MvcGame,
        MvcCanvasGame: MvcCanvasGame_1.MvcCanvasGame,
        helpers: {
            update_controller_response: ControllerResponse_1.update_controller_response,
        },
        models: {
            Model: Model_1.Model,
            ModelTable: ModelTable_1.ModelTable,
        },
        views: {
            CanvasView: CanvasView_1.CanvasView,
            View: View_1.View,
        },
        controllers: {
            Controller: Controller_1.Controller,
            PromiseController: PromiseController_1.PromiseController
        },
        adapters: {
            UserInterfaceModelAdapter: UserInterfaceModelAdapter_1.UserInterfaceModelAdapter,
        },
        events: {
            ControllerEventConstructor: ControllerEvent_1.ControllerEventConstructor,
            is_controller_event: ControllerEvent_2.is_controller_event,
            is_specific_controller_event: ControllerEvent_2.is_specific_controller_event,
        }
    },
};

},{"./mvc/models/Model":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/models/Model.ts","./mvc/views/View":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/views/View.ts","./mvc/controllers/Controller":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/controllers/Controller.ts","./mvc/views/CanvasView":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/views/CanvasView.ts","./mvc/helpers/ControllerEvent":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/helpers/ControllerEvent.ts","./mvc/MVCgame":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/MVCgame.ts","./mvc/MvcCanvasGame":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/MvcCanvasGame.ts","./mvc/models/ModelTable":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/models/ModelTable.ts","./mvc/helpers/ControllerResponse":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/helpers/ControllerResponse.ts","./mvc/controllers/PromiseController":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/controllers/PromiseController.ts","./mvc/events/ControllerEvent":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/events/ControllerEvent.ts","./mvc/adapters/UserInterfaceModelAdapter":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/adapters/UserInterfaceModelAdapter.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/data/RgbColor.ts":[function(require,module,exports) {
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

},{}],"../node_modules/@game.object/ts-game-toolbox/src/data/index.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
var RgbColor_1 = require("./RgbColor");
exports.data = {
    RgbColor: RgbColor_1.RgbColor
};

},{"./RgbColor":"../node_modules/@game.object/ts-game-toolbox/src/data/RgbColor.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/commons/Colors.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = void 0;
var RgbColor_1 = require("../data/RgbColor");
exports.Colors = {
    RED: new RgbColor_1.RgbColor(255, 0, 0),
    BLUE: new RgbColor_1.RgbColor(0, 0, 255),
    GREEN: new RgbColor_1.RgbColor(0, 255, 0),
    BLACK: new RgbColor_1.RgbColor(0, 0, 0),
    WHITE: new RgbColor_1.RgbColor(255, 255, 255),
};

},{"../data/RgbColor":"../node_modules/@game.object/ts-game-toolbox/src/data/RgbColor.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/commons/index.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commons = void 0;
var Colors_1 = require("./Colors");
exports.commons = {
    Colors: Colors_1.Colors,
};

},{"./Colors":"../node_modules/@game.object/ts-game-toolbox/src/commons/Colors.ts"}],"../node_modules/@game.object/ts-game-toolbox/src/flow/asserts/AssertNever.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert_never = void 0;
function assert_never(variable) {
    return variable;
}
exports.assert_never = assert_never;

},{}],"../node_modules/@game.object/ts-game-toolbox/src/flow/responses/BranchingResponse.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchingResponse = void 0;
/**
 * @class BranchingResponse
 *
 * Use this as a function response to allow reacting
 * of diffrent states determined inside the function.
 *
 * e.g.
 *
 * function handle_number(value:number) : BranchingResponse<number, "even"|"odd"|"negative", number> {
 *      if (value < 0) return new BranchingResponse("negative", value);
 *      if (value % 2 === 0) return new BranchingResponse("even", value);
 *      return new BranchingResponse("odd", value + 1);
 * }
 *
 * let x = ...
 * let positive_even = handle_number(x)
 *      .do_on_match(()=>0, "negative");
 */
var BranchingResponse = /** @class */ (function () {
    function BranchingResponse(state, params, response) {
        this.state = state;
        this.params = params;
        this.response = response;
    }
    BranchingResponse.prototype.do_on_match = function (callback, state) {
        if (state === this.state)
            return this;
        this.response = callback(this.params, this.response);
        return this;
    };
    ;
    BranchingResponse.prototype.do_on_any = function (callback, states) {
        if (!states.includes(this.state))
            return this;
        this.response = callback(this.params, this.response);
        return this;
    };
    ;
    BranchingResponse.prototype.do_on_none = function (callback, states) {
        var _this = this;
        if (!states.reduce(function (none_fit, state) { return (none_fit && _this.state !== state); }, true))
            return this;
        this.response = callback(this.params, this.response);
        return this;
    };
    ;
    return BranchingResponse;
}());
exports.BranchingResponse = BranchingResponse;

},{}],"../node_modules/@game.object/ts-game-toolbox/src/flow/index.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flow = void 0;
var AssertNever_1 = require("./asserts/AssertNever");
var BranchingResponse_1 = require("./responses/BranchingResponse");
exports.flow = {
    BranchingResponse: BranchingResponse_1.BranchingResponse,
    assert_never: AssertNever_1.assert_never,
};

},{"./asserts/AssertNever":"../node_modules/@game.object/ts-game-toolbox/src/flow/asserts/AssertNever.ts","./responses/BranchingResponse":"../node_modules/@game.object/ts-game-toolbox/src/flow/responses/BranchingResponse.ts"}],"../node_modules/@game.object/ts-game-toolbox/index.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tools = void 0;
var signals_1 = require("./src/signals");
var assets_1 = require("./src/assets");
var geometries_1 = require("./src/geometries");
var testing_1 = require("./src/testing");
var trees_1 = require("./src/trees");
var abstract_1 = require("./src/abstract");
var data_1 = require("./src/data");
var commons_1 = require("./src/commons");
var flow_1 = require("./src/flow");
exports.tools = {
    signals: signals_1.signals,
    assets: assets_1.assets,
    geometries: geometries_1.geometries,
    testing: testing_1.testing,
    trees: trees_1.trees,
    abstract: abstract_1.abstract,
    data: data_1.data,
    commons: commons_1.commons,
    flow: flow_1.flow,
};

},{"./src/signals":"../node_modules/@game.object/ts-game-toolbox/src/signals/index.ts","./src/assets":"../node_modules/@game.object/ts-game-toolbox/src/assets/index.ts","./src/geometries":"../node_modules/@game.object/ts-game-toolbox/src/geometries/index.ts","./src/testing":"../node_modules/@game.object/ts-game-toolbox/src/testing/index.ts","./src/trees":"../node_modules/@game.object/ts-game-toolbox/src/trees/index.ts","./src/abstract":"../node_modules/@game.object/ts-game-toolbox/src/abstract/index.ts","./src/data":"../node_modules/@game.object/ts-game-toolbox/src/data/index.ts","./src/commons":"../node_modules/@game.object/ts-game-toolbox/src/commons/index.ts","./src/flow":"../node_modules/@game.object/ts-game-toolbox/src/flow/index.ts"}],"game/models/MenuButtonModel.ts":[function(require,module,exports) {
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
exports.MenuButtonModel = void 0;

var index_1 = require("@game.object/ts-game-toolbox/index");

var Model_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/models/Model");

var Rect_1 = require("@game.object/ts-game-toolbox/src/geometries/Rect");

var UserInterfaceAction_1 = require("../config/UserInterfaceAction");

var MenuButtonModel = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(MenuButtonModel, _Model_1$Model);

  var _super = _createSuper(MenuButtonModel);

  function MenuButtonModel() {
    var _this;

    _classCallCheck(this, MenuButtonModel);

    _this = _super.apply(this, arguments); // graphics

    _this.background = index_1.tools.commons.Colors.BLUE;
    _this.foreground = index_1.tools.commons.Colors.WHITE;
    _this.is_visible = true;
    _this.title = "Menu";
    _this.id = MenuButtonModel.next_id++;
    _this.parent_group_id = null;
    _this.collider = new Rect_1.Rect(0, 0, 0, 0);
    _this.action_id = UserInterfaceAction_1.UserInterfaceAction.OPTION_1;
    return _this;
  }

  _createClass(MenuButtonModel, [{
    key: "click",
    value: function click() {
      return this.action_id;
    }
  }, {
    key: "is_clickable",
    get: function get() {
      return this.is_visible;
    }
  }]);

  return MenuButtonModel;
}(Model_1.Model);

exports.MenuButtonModel = MenuButtonModel; // logic

MenuButtonModel.next_id = 1;
},{"@game.object/ts-game-toolbox/index":"../node_modules/@game.object/ts-game-toolbox/index.ts","@game.object/ts-game-toolbox/src/abstract/mvc/models/Model":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/models/Model.ts","@game.object/ts-game-toolbox/src/geometries/Rect":"../node_modules/@game.object/ts-game-toolbox/src/geometries/Rect.ts","../config/UserInterfaceAction":"game/config/UserInterfaceAction.ts"}],"game/models/MenuGroupModel.ts":[function(require,module,exports) {
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
exports.MenuGroupModel = void 0;

var index_1 = require("@game.object/ts-game-toolbox/index");

var Model_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/models/Model");

var Rect_1 = require("@game.object/ts-game-toolbox/src/geometries/Rect");

var MenuGroupModel = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(MenuGroupModel, _Model_1$Model);

  var _super = _createSuper(MenuGroupModel);

  function MenuGroupModel() {
    var _this;

    _classCallCheck(this, MenuGroupModel);

    _this = _super.apply(this, arguments); // graphics

    _this.background = index_1.tools.commons.Colors.BLUE;
    _this.foreground = index_1.tools.commons.Colors.WHITE;
    _this.is_visible = true;
    _this.title = "Menu Group";
    _this.id = MenuGroupModel.next_id++;
    _this.z_index = 0;
    _this.toggle_button_id = null;
    _this.collider = new Rect_1.Rect(0, 0, 0, 0);
    return _this;
  }

  _createClass(MenuGroupModel, [{
    key: "click",
    value: function click() {
      return null;
    }
  }, {
    key: "is_clickable",
    get: function get() {
      return this.is_visible;
    }
  }, {
    key: "children",
    get: function get() {
      var _this2 = this;

      return this.models.menu_buttons.all().filter(function (button) {
        return button.parent_group_id === _this2.id;
      });
    }
  }]);

  return MenuGroupModel;
}(Model_1.Model);

exports.MenuGroupModel = MenuGroupModel; // logic

MenuGroupModel.next_id = 1;
},{"@game.object/ts-game-toolbox/index":"../node_modules/@game.object/ts-game-toolbox/index.ts","@game.object/ts-game-toolbox/src/abstract/mvc/models/Model":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/models/Model.ts","@game.object/ts-game-toolbox/src/geometries/Rect":"../node_modules/@game.object/ts-game-toolbox/src/geometries/Rect.ts"}],"game/controllers/event_controllers/MenuEventController.ts":[function(require,module,exports) {
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
exports.MenuEventController = void 0;

var UserInterfaceModelAdapter_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/adapters/UserInterfaceModelAdapter");

var Vector2_1 = require("@game.object/ts-game-toolbox/src/geometries/Vector2");

var MenuButtonModel_1 = require("../../models/MenuButtonModel");

var MenuGroupModel_1 = require("../../models/MenuGroupModel");

var BaseController_1 = require("../BaseController");

var MenuEventController = /*#__PURE__*/function (_BaseController_1$Bas) {
  _inherits(MenuEventController, _BaseController_1$Bas);

  var _super = _createSuper(MenuEventController);

  function MenuEventController() {
    _classCallCheck(this, MenuEventController);

    return _super.apply(this, arguments);
  }

  _createClass(MenuEventController, [{
    key: "mouse_pressed",
    value: function mouse_pressed(event, x, y) {
      var menu_item_clicked = this.get_menu_item_hit(this.models.menu_groups.all().sort(function (a, b) {
        return b.z_index - a.z_index;
      }), {
        x: x,
        y: y
      });

      if (menu_item_clicked) {
        return this.handle_menu_item_selected(menu_item_clicked);
      }

      return null;
    }
  }, {
    key: "handle_menu_item_selected",
    value: function handle_menu_item_selected(item) {
      var action = item.click();
      if (action === null) return null;
      return {
        event_name: "user-interface-event",
        action_id: action,
        target: item
      };
    }
  }, {
    key: "get_menu_item_hit",
    value: function get_menu_item_hit(items, target) {
      var _a;

      var hit = (_a = items.filter(function (button) {
        return UserInterfaceModelAdapter_1.UserInterfaceModelAdapter.for(button).is_clicked(target);
      }).shift()) !== null && _a !== void 0 ? _a : null;

      if (hit instanceof MenuGroupModel_1.MenuGroupModel && hit.is_visible) {
        var inner_position = new Vector2_1.Vector2(target).sub({
          x: hit.collider.x,
          y: hit.collider.y
        });
        var inner_hit = this.get_menu_item_hit(hit.children, inner_position);
        if (inner_hit) return inner_hit;
      }

      return hit;
    }
  }, {
    key: "toggle_menu_group",
    value: function toggle_menu_group(event) {
      var button = event.target;
      if (!(button instanceof MenuButtonModel_1.MenuButtonModel)) return null;
      var toggled_groups = this.models.menu_groups.all().filter(function (group) {
        return group.toggle_button_id === button.id;
      });
      toggled_groups.forEach(function (group) {
        group.is_visible = !group.is_visible;
      });
      return null;
    }
  }]);

  return MenuEventController;
}(BaseController_1.BaseController);

exports.MenuEventController = MenuEventController;
},{"@game.object/ts-game-toolbox/src/abstract/mvc/adapters/UserInterfaceModelAdapter":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/adapters/UserInterfaceModelAdapter.ts","@game.object/ts-game-toolbox/src/geometries/Vector2":"../node_modules/@game.object/ts-game-toolbox/src/geometries/Vector2.ts","../../models/MenuButtonModel":"game/models/MenuButtonModel.ts","../../models/MenuGroupModel":"game/models/MenuGroupModel.ts","../BaseController":"game/controllers/BaseController.ts"}],"game/controllers/ControllerCollection.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_controllers = void 0;

var GameController_1 = require("./GameController");

var GameEventController_1 = require("./event_controllers/GameEventController");

var DelayController_1 = require("./promise_controllers/DelayController");

var MenuEventController_1 = require("./event_controllers/MenuEventController");

function create_controllers(models, views) {
  var controllers = {};
  var buffer = {
    game_controller: new GameController_1.GameController(models, views, controllers),
    delay_controller: new DelayController_1.DelayController(models, views, controllers),
    for_event: {
      game_controller: new GameEventController_1.GameEventController(models, views, controllers),
      menu: new MenuEventController_1.MenuEventController(models, views, controllers)
    }
  };
  return Object.assign(controllers, buffer);
}

exports.create_controllers = create_controllers;
},{"./GameController":"game/controllers/GameController.ts","./event_controllers/GameEventController":"game/controllers/event_controllers/GameEventController.ts","./promise_controllers/DelayController":"game/controllers/promise_controllers/DelayController.ts","./event_controllers/MenuEventController":"game/controllers/event_controllers/MenuEventController.ts"}],"tools/RemoteChainProperty.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RCP = exports.RemoteChainProperty = void 0;

var RemoteChainProperty = /*#__PURE__*/function () {
  function RemoteChainProperty(chain, remote, key) {
    _classCallCheck(this, RemoteChainProperty);

    this.chain = chain;
    this.remote = remote;
    this.key = key;
  }

  _createClass(RemoteChainProperty, [{
    key: "set",
    value: function set(value) {
      this.remote[this.key].set(value);
      return this.chain;
    }
  }, {
    key: "get",
    value: function get() {
      return this.remote[this.key].get();
    }
  }]);

  return RemoteChainProperty;
}();

exports.RemoteChainProperty = RemoteChainProperty;
exports.RCP = RemoteChainProperty;
},{}],"game/views/main/MainView.ts":[function(require,module,exports) {
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

var index_1 = require("@game.object/ts-game-toolbox/index");

var ChainProperty_1 = require("@game.object/ts-game-toolbox/src/signals/ChainProperty");

var CanvasView_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/views/CanvasView");

var RemoteChainProperty_1 = require("../../../tools/RemoteChainProperty");

var MainView = /*#__PURE__*/function (_CanvasView_1$CanvasV) {
  _inherits(MainView, _CanvasView_1$CanvasV);

  var _super = _createSuper(MainView);

  function MainView(canvas, collection, menu_view) {
    var _this;

    _classCallCheck(this, MainView);

    _this = _super.call(this, canvas, collection); /// Base Colors

    _this.bg_color = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), index_1.tools.commons.Colors.BLACK);
    _this.fg_color = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), index_1.tools.commons.Colors.WHITE);
    _this.hi_color = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), index_1.tools.commons.Colors.RED);
    _this.camera = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), null);
    _this.menu_groups = new RemoteChainProperty_1.RemoteChainProperty(_assertThisInitialized(_this), _this.collection.menu, 'menu_groups');
    return _this;
  }

  _createClass(MainView, [{
    key: "draw",
    value: function draw() {
      if (!this.camera.get()) return;
      this.reset_canvas_state();
      this.collection.menu.camera.set(this.camera.get()).draw();
      this.context.fillStyle = "#ff0000";
      this.context.fillText("Test", 400, 300);
    }
    /**
     * Reset default canvas state and paint the background
     */

  }, {
    key: "reset_canvas_state",
    value: function reset_canvas_state() {
      _get(_getPrototypeOf(MainView.prototype), "reset_canvas_state", this).call(this);

      this.context.resetTransform();
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
},{"@game.object/ts-game-toolbox/index":"../node_modules/@game.object/ts-game-toolbox/index.ts","@game.object/ts-game-toolbox/src/signals/ChainProperty":"../node_modules/@game.object/ts-game-toolbox/src/signals/ChainProperty.ts","@game.object/ts-game-toolbox/src/abstract/mvc/views/CanvasView":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/views/CanvasView.ts","../../../tools/RemoteChainProperty":"tools/RemoteChainProperty.ts"}],"game/views/main/MenuView.ts":[function(require,module,exports) {
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
exports.MenuView = void 0;

var index_1 = require("@game.object/ts-game-toolbox/index");

var ChainProperty_1 = require("@game.object/ts-game-toolbox/src/signals/ChainProperty");

var CanvasView_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/views/CanvasView");

var MenuView = /*#__PURE__*/function (_CanvasView_1$CanvasV) {
  _inherits(MenuView, _CanvasView_1$CanvasV);

  var _super = _createSuper(MenuView);

  function MenuView() {
    var _this;

    _classCallCheck(this, MenuView);

    _this = _super.apply(this, arguments); /// Base Colors

    _this.bg_color = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), index_1.tools.commons.Colors.BLACK);
    _this.fg_color = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), index_1.tools.commons.Colors.WHITE);
    _this.hi_color = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), index_1.tools.commons.Colors.RED); /// memory cards

    _this.menu_groups = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), []);
    _this.camera = new ChainProperty_1.ChainProperty(_assertThisInitialized(_this), null);
    return _this;
  }

  _createClass(MenuView, [{
    key: "draw",
    value: function draw() {
      var _this2 = this;

      if (!this.camera.get()) return;
      this.reset_canvas_state();
      this.context.strokeStyle = "#282828";
      this.menu_groups.get().forEach(function (group) {
        _this2.draw_menu_group(group);
      });
    }
  }, {
    key: "draw_menu_group",
    value: function draw_menu_group(group) {
      var _this3 = this;

      if (!group.is_visible) return;
      this.draw_menu_item_borders(group);
      this.context.save();
      this.context.translate(group.collider.x, group.collider.y);
      this.context.beginPath();
      group.children.forEach(function (item) {
        if ('children' in item) {
          _this3.draw_menu_group(item);
        } else {
          _this3.draw_menu_button(item);
        }
      });
      this.context.strokeStyle = this.fg_color.get().to_hex();
      this.context.stroke();
      this.context.restore();
    }
  }, {
    key: "draw_menu_button",
    value: function draw_menu_button(button) {
      this.draw_menu_item_borders(button);
      this.context.fillStyle = button.foreground.to_hex();
      this.context.fillText(button.title, button.collider.x + button.collider.w / 2, button.collider.y + button.collider.h / 2);
    }
  }, {
    key: "draw_menu_item_borders",
    value: function draw_menu_item_borders(item) {
      if (!item.is_visible) return;
      this.context.fillStyle = item.background.to_hex();
      this.context.fillRect(item.collider.x, item.collider.y, item.collider.w, item.collider.h);
      this.context.rect(item.collider.x, item.collider.y, item.collider.w, item.collider.h);
    }
    /**
     * Reset default canvas state and paint the background
     */

  }, {
    key: "reset_canvas_state",
    value: function reset_canvas_state() {
      _get(_getPrototypeOf(MenuView.prototype), "reset_canvas_state", this).call(this);

      this.context.resetTransform();
      this.context.lineWidth = 2;
      this.context.font = "16px monospace";
      this.context.lineJoin = "round";
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.imageSmoothingEnabled = false;
    }
  }]);

  return MenuView;
}(CanvasView_1.CanvasView);

exports.MenuView = MenuView;
},{"@game.object/ts-game-toolbox/index":"../node_modules/@game.object/ts-game-toolbox/index.ts","@game.object/ts-game-toolbox/src/signals/ChainProperty":"../node_modules/@game.object/ts-game-toolbox/src/signals/ChainProperty.ts","@game.object/ts-game-toolbox/src/abstract/mvc/views/CanvasView":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/views/CanvasView.ts"}],"game/views/main/TestView.ts":[function(require,module,exports) {
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
exports.TestView = void 0;

var CanvasView_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/views/CanvasView");

var TestView = /*#__PURE__*/function (_CanvasView_1$CanvasV) {
  _inherits(TestView, _CanvasView_1$CanvasV);

  var _super = _createSuper(TestView);

  function TestView() {
    _classCallCheck(this, TestView);

    return _super.apply(this, arguments);
  }

  _createClass(TestView, [{
    key: "draw",
    value: function draw() {
      this.reset_canvas_state();
      this.context.fillText("Test", 100, 100);
    }
    /**
     * Reset default canvas state and paint the background
     */

  }, {
    key: "reset_canvas_state",
    value: function reset_canvas_state() {
      _get(_getPrototypeOf(TestView.prototype), "reset_canvas_state", this).call(this);

      this.context.fillStyle = "#000000";
      this.context.fillRect(0, 0, 800, 600);
      this.context.fillStyle = "#ff0000";
      this.context.lineWidth = 2;
      this.context.font = "16px monospace";
      this.context.lineJoin = "round";
      this.context.textAlign = "left";
      this.context.textBaseline = "top";
      this.context.imageSmoothingEnabled = false;
    }
  }]);

  return TestView;
}(CanvasView_1.CanvasView);

exports.TestView = TestView;
},{"@game.object/ts-game-toolbox/src/abstract/mvc/views/CanvasView":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/views/CanvasView.ts"}],"game/views/ViewCollection.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_views = void 0;

var MainView_1 = require("./main/MainView");

var MenuView_1 = require("./main/MenuView");

var TestView_1 = require("./main/TestView");

function create_views(canvas) {
  var collection = {
    partials: {}
  };
  collection.menu = new MenuView_1.MenuView(canvas, collection);
  collection.test = new TestView_1.TestView(canvas, collection);
  collection.main = new MainView_1.MainView(canvas, collection, collection.menu);
  return collection;
}

exports.create_views = create_views;
},{"./main/MainView":"game/views/main/MainView.ts","./main/MenuView":"game/views/main/MenuView.ts","./main/TestView":"game/views/main/TestView.ts"}],"game/models/GameModel.ts":[function(require,module,exports) {
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
exports.GameModel = void 0;

var Model_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/models/Model");

var GameModel = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(GameModel, _Model_1$Model);

  var _super = _createSuper(GameModel);

  function GameModel() {
    _classCallCheck(this, GameModel);

    return _super.apply(this, arguments);
  }

  return GameModel;
}(Model_1.Model);

exports.GameModel = GameModel;
},{"@game.object/ts-game-toolbox/src/abstract/mvc/models/Model":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/models/Model.ts"}],"game/models/CameraModel.ts":[function(require,module,exports) {
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

var Model_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/models/Model");

var AssertNever_1 = require("@game.object/ts-game-toolbox/src/flow/asserts/AssertNever");

var Rect_1 = require("@game.object/ts-game-toolbox/src/geometries/Rect");

var Vector2_1 = require("@game.object/ts-game-toolbox/src/geometries/Vector2");

var CameraModel = /*#__PURE__*/function (_Model_1$Model) {
  _inherits(CameraModel, _Model_1$Model);

  var _super = _createSuper(CameraModel);

  function CameraModel() {
    var _this;

    _classCallCheck(this, CameraModel);

    _this = _super.apply(this, arguments); // Center of the camera

    _this.center = new Vector2_1.Vector2(0, 0);
    return _this;
  }

  _createClass(CameraModel, [{
    key: "reverse_transform",
    value: function reverse_transform(shape) {
      if (shape instanceof Rect_1.Rect) return this.reverse_transform_rect(shape);
      if (shape instanceof Vector2_1.Vector2) return this.reverse_transform_vector_2(shape);
      return AssertNever_1.assert_never(shape);
    }
  }, {
    key: "transform",
    value: function transform(shape) {
      if (shape instanceof Rect_1.Rect) return this.transform_rect(shape);
      if (shape instanceof Vector2_1.Vector2) return this.transform_vector_2(shape);
      return AssertNever_1.assert_never(shape);
    }
  }, {
    key: "reverse_transform_vector_2",
    value: function reverse_transform_vector_2(vector2) {
      return vector2.sub(this.center);
    }
  }, {
    key: "reverse_transform_rect",
    value: function reverse_transform_rect(rect) {
      rect.x -= this.center.x;
      rect.y -= this.center.y;
      return rect;
    }
  }, {
    key: "transform_vector_2",
    value: function transform_vector_2(vector2) {
      return vector2.add(this.center);
    }
  }, {
    key: "transform_rect",
    value: function transform_rect(rect) {
      rect.x += this.center.x;
      rect.y += this.center.y;
      return rect;
    }
  }]);

  return CameraModel;
}(Model_1.Model);

exports.CameraModel = CameraModel;
},{"@game.object/ts-game-toolbox/src/abstract/mvc/models/Model":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/models/Model.ts","@game.object/ts-game-toolbox/src/flow/asserts/AssertNever":"../node_modules/@game.object/ts-game-toolbox/src/flow/asserts/AssertNever.ts","@game.object/ts-game-toolbox/src/geometries/Rect":"../node_modules/@game.object/ts-game-toolbox/src/geometries/Rect.ts","@game.object/ts-game-toolbox/src/geometries/Vector2":"../node_modules/@game.object/ts-game-toolbox/src/geometries/Vector2.ts"}],"game/models/ModelCollection.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_models = void 0;

var ModelTable_1 = require("@game.object/ts-game-toolbox/src/abstract/mvc/models/ModelTable");

var GameModel_1 = require("./GameModel");

var MenuButtonModel_1 = require("./MenuButtonModel");

var CameraModel_1 = require("./CameraModel");

var MenuGroupModel_1 = require("./MenuGroupModel");

function create_models() {
  var collection = {};
  return Object.assign(collection, {
    game: new GameModel_1.GameModel(collection),
    camera: new CameraModel_1.CameraModel(collection),
    menu_buttons: new ModelTable_1.ModelTable(collection, MenuButtonModel_1.MenuButtonModel),
    menu_groups: new ModelTable_1.ModelTable(collection, MenuGroupModel_1.MenuGroupModel)
  });
}

exports.create_models = create_models;
},{"@game.object/ts-game-toolbox/src/abstract/mvc/models/ModelTable":"../node_modules/@game.object/ts-game-toolbox/src/abstract/mvc/models/ModelTable.ts","./GameModel":"game/models/GameModel.ts","./MenuButtonModel":"game/models/MenuButtonModel.ts","./CameraModel":"game/models/CameraModel.ts","./MenuGroupModel":"game/models/MenuGroupModel.ts"}],"game/base/Game.ts":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55653" + '/');

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