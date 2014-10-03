/**
 * Module dependencies
 */

hyperBind.requires = ['store-hyper'];

/**
 * Expose the 'hyper-bind' directive
 */

module.exports = hyperBind;

/**
 * Initialize the 'hyper-bind' directive
 *
 * @param {StoreHyper} store
 */

function hyperBind(store) {
  this.compile = function(input) {
    var path = input.split('.');
    return {
      path: input,
      target: path[path.length - 1]
    };
  };

  this.state = function(config, state) {
    var res = store.get(config.path, state);
    if (!res.completed) return false;
    return state.set(config.target, res.value);
  };

  this.children = function(config, state, children) {
    var value = state.get(config.target);
    if (typeof value === 'undefined') return '';
    return value;
  };
}
