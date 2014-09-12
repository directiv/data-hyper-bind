/** @directiv data-stateless */

exports.requires = ['hyper-store'];

exports.exposes = [
  'data-hyper-bind',
  'data-bind'
];

exports.compile = function(input, props) {
  var path = input.split('.');
  return {
    path: input,
    target: path[path.length - 1]
  };
};

exports.state = function(config, state) {
  var res = this('hyper-store').get(config.path, state.get());
  if (!res.completed) return false;
  return state.set(config.target, res.value);
};

exports.children = function(config, state, scope, children) {
  return state.get(config.target) || '';
};
