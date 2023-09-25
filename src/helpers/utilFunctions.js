import cityToState from "./city_state";
import statesToCities from "./statesCities";

// Checks
export const check = (Param) => Param !== null && Param !== undefined;
export const checkArray = (Param) => !!Param && Param.constructor === Array;
export const checkObject = (Param) =>
  !!Param && typeof Param === "object" && !checkArray(Param);

// String Functions
export const ReadableString = (string) =>
  string && string.replace(/([A-Z])/g, " $1");
export const capitalize = (string) =>
  string && string[0].toUpperCase() + string.slice(1);

export const removeFields = (obj, fields) => {
  if (obj && fields) {
    const newObj = Object.assign({}, obj);
    fields.forEach((field) => {
      delete newObj[field];
    });
    return newObj;
  } else {
    return obj;
  }
};

export const getProps = (object = {}, props = []) =>
  props.reduce((newObj, prop) => {
    newObj[prop] = object[prop];
    return newObj;
  }, {});

export const debounce = (func, timeout = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};


export const findCities = (city)=>{
  const state = cityToState[city]
  const cities = statesToCities[state] || null
  return cities || null
}