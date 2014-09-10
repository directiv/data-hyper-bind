/** @directiv data-stateless */

exports.requires = ['hyper-store'];

exports.attributes = [
  'data-hyper-bind',
  'data-bind'
];

exports.compile = function(input, props) {
  var path = input.split('.');
  return {
    path: path,
    target: path[path.length - 1]
  };
};

exports.state = function(config, state) {
  var res = this('hyper-store').get(config.path, state());
  return state(config.path, {$set: res});
};

exports.pending = function(config, state) {
  return !state(config.target).isComplete;
};

exports.scope = function(config, state, scope) {
  var target = config.target;
  var res = state(target);
  return scope(target, {$set: res.value});
}

exports.props = function(config, state, props) {
  return props;
};

exports.children = function(config, state, scope, children) {
  return state(config.target).value || '';
}
