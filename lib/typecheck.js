const isAnObject = (thing) => {
  if (Object.getPrototypeOf(thing) === Object.prototype) return true;

  return false;
};

const failsArrayTest = (argsType, type) => {
  if (type !== 'array') return false;

  if (!Array.isArray(argsType)) {
    if (type === 'array') return true;
  }
  return false;
};

const passesTypeCheck = (args) => {
  if (!isAnObject(args)) {
    return console.error('Typecheck error: args must be an object literal');
  }
  let error = '';
  Object.keys(args).forEach((type) => {
    type = type.toLowerCase();
    if (Array.isArray(args[type]) && type !== 'array') {
      args[type].forEach((item) => {
        if (typeof item !== type) {
          error += `${args[type]} is not type ${type}; `;
        }
      });
    } else {
      if (failsArrayTest(args[type], type) || typeof args[type] !== type) {
        error += `${args[type]} is not type ${type}; `;
      }
    }
  });

  if (error.length) return console.error(error);
  return true;
};
export default passesTypeCheck;
