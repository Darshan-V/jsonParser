//null parser
const nullParser = function(input){
   if(!input.startsWith('null')) return null
   return [input.slice(4), null]
}

//boolean parser
const booleanParser = function(input) {
    if(input.startsWith('true'))
    return [true, input.slice(4)]
    
    if(input.startsWith('false'))
    return[false, input.slice(5)]

    return null
}

//comma parser
const commaParser = function(input){
    if(!input.startsWith(',')) return null
    return [',', input.slice(1)]
}

//colon parser
const colonParser = function(input){
    if(!input.startsWith(':')) return null
    return [':', input.slice(1)]
}
//space parser
const spaceParser = function(input) {
    var Index = input.search(/^(\s)+/)
    while (Index === 0) {
      input = input.slice(Index + 1, input.length)
      Index = input.search(/^(\s|\n|\t|\b)+/)
    }
    if (Index === -1) { return [input] }
  }
//string parser
const stringParser = function(input){
  let i = 0
  let spaceFound
  let data
  data = (spaceFound = spaceParser(input)) ? spaceFound[0] : input

  if (data[0] === '"') {
    data = data.substring(1, data.length)
    i = data.search('"')
    return ([data.substring(0, i), data.slice(i + 1, data.length)])
  }
  return null
}

//number parser
    const numberParser = function(input){
    const regex = /^\s*(-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?)\s*/
    const matched = regex.exec(input)
    if(matched !== null && matched.index === 0) {
    return [ parseFloat(matched[1], input.trim().slice(matched[0].length))]
    }
    return null
}


//array parser
const arrayParser = function(input){
   
    if (input[0] !== '[') return null
    var arr = []
    var result
    let spaceFound
    input = input.slice(1)
    input = (spaceFound = spaceParser(input)) ? spaceFound[0] : input
    while (input.length) {
      result = valueParser(input)
      if (result === null) return null
      arr.push(result[0])
      input = result[1].slice()
  
      input = (spaceFound = spaceParser(input)) ? spaceFound[0] : input
  
      if (input[0] === ']') { return [arr, input.slice(1)] }
      result = commaParser(input)
  
      if (result === null) return null
      input = result[1].slice()
    }
  }

//value parser
const valueParser = function(input){
    let result
    result = /*objectParser(input) ||*/ arrayParser(input) || numberParser(input) || stringParser(input) || nullParser(input) || booleanParser(input)
    return result
}

const objectParser = function(input){

}






// console.log(nullParser('null123'))
// console.log(booleanParser('true'))
// console.log(booleanParser('false123'))
// console.log(stringParser('"hello123"'))
// console.log(stringParser('"hello123\u1235"'))
// console.log(valueParser('-1.7e23'))
// console.log(numberParser('e+1'))
// console.log(valueParser('"hello"123'))
console.log(arrayParser('["Ford", "BMW", "Fiat"]'))
// console.log(spaceParser('123'))

// console.log(JSON.parse('"hello124\u1235"'))