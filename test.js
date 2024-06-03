const errors = {
  name: {
    name: 'ValidatorError',
    message: 'Path `name` is required.',
    properties: {
      message: 'Path `name` is required.',
      type: 'required',
      path: 'name',
    },
    kind: 'required',
    path: 'name',
  },
};

const errorSource = Object.values(errors)
console.log(errorSource);


