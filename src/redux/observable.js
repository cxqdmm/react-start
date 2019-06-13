
import { fromJS, isImmutable} from 'immutable';
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
    asObservableObject(target).addObservableProp(prop, initialValue)
  });
  return decoratorFactory.apply(null, arguments);
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
    return decorator.apply(null, arguments);
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

function asObservableObject(target) {
  if (Object.prototype.hasOwnProperty.call(target, $store))
    return target[$store];
  const adm = new ObservableObjectAdministration(target);
  addHiddenProp(target, $store, adm);
  return adm;
}

// 数据源的代理 代理内部管理数据
class ObservableObjectAdministration {
  constructor(target) {
    this.$value = new Map();
    this.$dispatch = new Map();
    this.target = target;
  }
  read(prop) {
    let value = this.$value.get(prop);
    if (isImmutable(value)) {
      return value.toJS();
    }
    return value;
  }
  write(prop, value) {
    let immutableValue = value;
    if (!isImmutable(value)) {
      immutableValue = fromJS(value)
    }
    this.$value.set(prop, immutableValue);
    const dispatch = this.$dispatch.get(prop);
    if (!dispatch) {
      throw new Error(`${prop} is not observable, please use observable decorater to ${prop}`)
    } 
    if (dispatch) {
      dispatch(value);
    }
  }
  addObservableProp(prop, value) {
    // to do 添加enhancer 生成observableValue
    let target = this.target;
    //observableValue 实际上是一个proxy，可以很方便监控对象的任何行为
    this.$value.set(prop, fromJS(value));
    Object.defineProperty(target, prop, {
      configurable: true,
      enumerable: true,
      get: function () {
        return this[$store].read(prop);
      },
      set: function (v) {
        this[$store].write(prop, v);
      }
    })
  }
  outputProps() {
    return Object.keys(this.$value);
  }
  setDispatch(prop, dispatch) {
    this.$dispatch.set(prop, dispatch);
  }
  getDispatch(prop) {
    return this.$dispatch.get(prop);
  }
}

// 监控属性值的操作，用proxy实现

function getObservableProps(model) {
  if (!model[pendingDecorators]) {
    return [];
  }
  return Object.keys(model[pendingDecorators]);
}
function getObservablePropDispatch(model, prop) {
  if (!model[$store]) {
    throw new Error('model is not observable')
  }
  return model[$store].getDispatch(prop);
}
function setObservablePropDispatch(model, prop, dispatch) {
  if (!model[$store]) {
    throw new Error('model is not observable')
  }
  model[$store].setDispatch(prop, dispatch);
}

let observable = createObservable;

export { observable, getObservableProps, setObservablePropDispatch, getObservablePropDispatch }
