const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(array, i) {
      const newArray = (array instanceof Array) ? array.slice() : Object.values(array)
      for (let x = 0; x < newArray.length; x++){
        i(newArray[x])
      }

      return array
    },

    map: function(array, i) {
      let newArray = []
      if (!(array instanceof Array)){
        array = Object.values(array)
      }
      for (let x = 0; x < array.length; x++)
        newArray.push(i(array[x]))

      return newArray
    },


		reduce: function(c = [], callback = () => {}, x) {
			let array = c.slice(0)
			
			if (!x) {
				x = array[0]
				array = array.slice(1)
			}
      let size = array.length;
			for (let i = 0; i < size; i++) {
				x = callback(x, array[i], array)
			}
			return x;
		},
    values: function(obj){
      const values = []
      for (let k in obj){
        values.push(obj[k])
      }
      return values
    },
    keys: function(obj){
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },
    uniq: function(collection, sorted=false, iteratee=false){
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },
    flatten: function(array, shallow, newArray = []) {
      if (!Array.isArray(array)) return newArray.push(array)
      if (shallow) {
        for (let value of array)
          Array.isArray(value) ? this.unpack(newArray, value) : newArray.push(value)
      } else {
        for (let value of array) {
          this.flatten(value, false, newArray)
        }
      }
      return newArray
    },
    unpack: function(item, array) {
      for (let value of array)
        item.push(value)
    },
    sortBy: function(array, callback) {
      const newArr = [...array]
      return newArr.sort(function(a, b) {
        return callback(a) - callback(b)
      })
    },
    compact: function(array) {
      const items = new Set([false, null, 0, "", undefined, NaN])
      return array.filter(element => !items.has(element))
    },

    last: function(array, start = false){
      return (start) ? array.slice(array.length - start, array.length) : array[array.length - 1]
    },

    first: function(array, stop=false){
      return (stop) ? array.slice(0, stop) : array[0]
    },

    size: function(array){
      return (array instanceof Array) ? array.length : Object.keys(array).length
    },

    filter: function(array, predicate){
      if (!(array instanceof Array))
      array = Object.values(array)
      const newArray = []
      for (let i = 0; i < array.length; i++)
        if (predicate(array[i])) newArray.push(array[i])
      return newArray
    },

    find: function(array, predicate){
      if (!(array instanceof Array))
      array = Object.values(array)

    for (let i = 0; i < array.length; i++)
      if (predicate(array[i])) return array[i]

    return undefined
    },

    functions: function(obj) {
      let functions = []
      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functions.push(key)
        }
      }
      return functions.sort()
    },


  }
})()

fi.libraryMethod()
