function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import classNames from 'classnames';
import React from 'react';
import "./index.css";
import { jsx as _jsx } from "react/jsx-runtime";

var Input = function Input(props) {
  var className = props.className;
  var clas = classNames(_defineProperty({
    'cat-input': true
  }, className, !!className));
  return /*#__PURE__*/_jsx("div", {
    children: "Input"
  });
};

export default Input;