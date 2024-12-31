// DOM utility functions
export const createElement = (tag, className = '') => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  return element;
};

export const getElement = (selector) => document.querySelector(selector);

export const appendChildren = (parent, ...children) => {
  children.forEach(child => parent.appendChild(child));
};