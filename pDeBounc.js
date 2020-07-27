        // Source: https://github.com/sindresorhus/p-debounce/blob/master/index.js
// @ts-ignore
function pDebounce(fn, wait, options = {}) {
  if (!Number.isFinite(wait)) {
    throw new TypeError("Expected `wait` to be a finite number")
  }

  // @ts-ignore
  let leadingValue
  // @ts-ignore
  let timer
  // @ts-ignore
  let resolveList = []

  // @ts-ignore
  return function(...arguments_) {
    return new Promise(resolve => {
      // @ts-ignore
      const runImmediately = options.leading && !timer

      // @ts-ignore
      clearTimeout(timer)

      timer = setTimeout(() => {
        timer = null

        // @ts-ignore
        const result = options.leading
          // @ts-ignore
          ? leadingValue
          // @ts-ignore
          : fn.apply(this, arguments_)

        // @ts-ignore
        for (resolve of resolveList) {
          resolve(result)
        }

        resolveList = []
      }, wait)

      if (runImmediately) {
        // @ts-ignore
        leadingValue = fn.apply(this, arguments_)
        resolve(leadingValue)
      } else {
        resolveList.push(resolve)
      }
    })
  }
}