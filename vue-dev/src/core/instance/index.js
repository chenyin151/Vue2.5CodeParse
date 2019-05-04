import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 这里才是Vue的定义,我们在这里看清了它的庐山真面目，实际上它是一个function,然后它挂载了
// 很多挂载原型的方法
function Vue (options) {
  // !(this instanceof Vue)这句代表this不是Vue的实例，不是通过new的方式来实现的,并且
  // 当前的开发环境不是生产环境，那么就要抛出一个警告，这就是ES5实现class的方式
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
