function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import "./index.css";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var RadioItem = function RadioItem(props) {
  var className = props.className,
      disabled = props.disabled,
      onChange = props.onChange,
      value = props.value;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      checked = _useState2[0],
      setChecked = _useState2[1];

  var clas = classNames(_defineProperty({
    'cat-radio': true,
    'cat-radio-disabled': disabled
  }, className, !!className));
  var clasLeft = classNames({
    'cat-radio-left': true,
    'cat-radio-checked': checked
  });
  useEffect(function () {
    if (typeof props.checked !== 'boolean') {
      return;
    }

    if (props.checked !== checked) {
      setChecked(props.checked);
    }
  }, [props.checked]);

  var click = function click() {
    if (disabled) return;
    setChecked(true);

    if (value && typeof onChange === 'function') {
      onChange(value);
    }
  };

  return /*#__PURE__*/_jsxs("span", {
    className: clas,
    onClick: click,
    children: [/*#__PURE__*/_jsx("span", {
      className: clasLeft
    }), /*#__PURE__*/_jsx("span", {
      className: "cat-radio-label",
      children: props.children
    })]
  });
};

export default RadioItem;