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
      Index = input.search(/^(\s|\n|\t)+/)
    }
    if (Index === -1) { return [input] }
  }
//string parser
const stringParser = function(input){
    if(input.startsWith('"')){
        let i = 1
        
        let s = ''
        while(input[i] !== '"'){
            if(input[i] === '\\'){
                s = s + input.substring(i, 2)
                i += 2
            }
            else {
                s = s + input[i]
                i++
            }
        }
        return [s, input.slice(i + 1)]
    }
    return null
}

//number parser
// const numberParser = function(input){
//     const regex = /^\s*(-?(0|[1-9][0-9]*)(\.[0-9]+)?(0|[eE][+-]?[0-9]+)?)\s*/
//     // const regex = /^-?((0?0\.\d*)?([1-9]\d*(\.\d+)?))([eE][+-]?\d+)?/
//     const matched = String(input).match(regex)
//     if(!matched) return null
//     return [ parseFloat(matched[0], input.slice(matched[0].length))]
// }
function numberParser (input) {
    if (input[0] === '-' && /[^.e\d]/i.test(input[2]) && input[1] === '0') {
      return [0, input.slice(2)]
    }
    if (input[0] === '0' && /[^.e\d]/i.test(input[1])) {
      return [0, input.slice(1)]
    }
    const result = input.match(
      /(^-?[1-9]\d*(\.\d+)?(e-?\d+)?)|(^-?\d\.\d+(e-?\d+)?)|(^-?0e-?\d+)/gi
    )
    if (result == null) return null
    const resLength = result[0].length
    let fResult = Number(input.slice(0, resLength))
    if (fResult === 0) {
      fResult = 0
    }
    return [fResult, input.slice(resLength)]
}

//array parser
const arrayParser = function(input){
    let arr = []
    let result
    if(!input.startsWith('[')) return null
    
    input = input.slice(1)
    while(input){
        result = spaceParser(input)
        if(result !== null) input = result[1]
        result = valueParser(input)
        if(result === null) break
        arr.push(result[0])
        input = result[1]
        result = spaceParser(input)
        if(result !== nullParser) return result[1]
        result = commaParser(input)
        if(result === null) break
        input = result[i]
        if(input.startsWith(']')) return null
    }
    result = spaceParser(input)
    if(result !== null) 
    input = result[1]
    if(!input.startsWith(']')){
        return [arr, arr.slice(1)]
    }
    return null
}

//value parser
const valueParser = function(input){
    let result
    result = /*objectParser(input) ||*/ arrayParser(input) || numberParser(input) || stringParser(input) || nullParser(input) || booleanParser(input)
    return result
}






// console.log(nullParser('null123'))
// console.log(booleanParser('true'))
// console.log(booleanParser('false123'))
// console.log(stringParser('"hello123"'))
// console.log(stringParser('"hello123\""'))
// console.log(valueParser('+1.7e23abc'))
console.log(numberParser('0.12'))
// console.log(valueParser('"hello"123'))
// console.log(arrayParser('["Ford", "BMW", "Fiat"]'))
// console.log(spaceParser('123'))

// console.log(JSON.parse('0e+'))