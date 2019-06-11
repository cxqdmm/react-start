
const LazyInitializeSymbol = Symbol('lazy initialize symbol');
const pendingDecorators = Symbol('pending decorator');
const $store = Symbol('@proxy')
let cacheDescriptor = {};

function createObservable(target, prop, descriptor) {
  let decoratorFactory = createPropDecorator(function propertyCreator(target, prop, descriptor) {
    var initialValue = descriptor
      ? descriptor.initializer
        ? descriptor.initializer.call(target)
        : descriptor.value
      : undefined;
      asObservableObject(target, prop).addObservableProp(target, prop, initialValue)
  });
  decoratorFactory.apply(null, arguments);
}

function createPropDecorator(propertyCreator) {
  return function decoratorFactory() {
    let decorator = function decorate(target, prop, descriptor) {
      if (!Object.prototype.hasOwnProperty.call(target, pendingDecorators)) {
        var inheritedDecorators = target[pendingDecorators];
        addHiddenProp(target, pendingDecorators, Object.assign({}, inheritedDecorators));
      }
      target[pendingDecorators][prop] = {
        prop: prop,
        propertyCreator: propertyCreator,
        descriptor: descriptor,
        decoratorTarget: target,
      };
      return createPropertyInitializerDescriptor(prop);
    }
    decorator.apply(null, arguments);
  }
}
// 返回初始的Descriptor
function createPropertyInitializerDescriptor(prop) {
  return (cacheDescriptor[prop] ||
    (cacheDescriptor[prop] = {
      configurable: true,
      enumerable: true,
      get: function () {
        initializeInstance(this);
        return this[prop];
      },
      set: function (value) {
        initializeInstance(this);
        this[prop] = value;
      }
    }));
}

// 该函数相当牛逼，用于修改实例属性的decorator 从 createPropertyInitializerDescriptor => propertyCreator,
// 注册实例属性的代理
function initializeInstance(target) {
  if (target[LazyInitializeSymbol] === true)
    return;
  var decorators = target[pendingDecorators];
  if (decorators) {
    addHiddenProp(target, LazyInitializeSymbol, true);
    for (var key in decorators) {
      var d = decorators[key];
      d.propertyCreator(target, d.prop, d.descriptor);
    }
  }
}

function addHiddenProp(object, propName, value) {
  Object.defineProperty(object, propName, {
    enumerable: false,
    writable: true,
    configurable: true,
    value: value
  });
}

function asObservableObject(target, defaultEnhancer) {
  if (Object.prototype.hasOwnProperty.call(target, $store))
  return target[$store];
  const adm = new ObservableObjectAdministration(target);
  addHiddenProp(target, $store, adm);
  return adm;
}

function ObservableObjectAdministration(target) {
  this.$value = new Map(); 
  this.target = target;
}
ObservableObjectAdministration.prototype.read = function (prop) {
  this.$value[prop].get(prop);
}
ObservableObjectAdministration.prototype.write = function (prop, value) {
  this.$value[prop].set(prop, value);
}
ObservableObjectAdministration.prototype.addObservableProp = function (target, prop, initvalue) {
  this.$value[prop].set(prop, initvalue);
  return {
    configurable: true,
    enumerable: true,
    get: function () {
      return this[$store].read(prop);
    },
    set: function (v) {
        this[$store].write(prop, v);
    }
  }
}

let observable = createObservable;
export { observable }
