//null parser
const nullParser = function(input){
    if(input.startsWith('null')) return null
    return [null, input.slice(4)]
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

// parse space
const spaceParser = function(input){
    if(!input.startsWith(' ')) return null
    return [' ', input.slice(1)]
}

//string parser
const stringParser = function(input){
    let i = 1
    if(input.startsWith('"')){
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
const numberParser = function(input){
    const regex =String(input).match(/^[+-]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/)
    // if(!String(input).match(/^[+-]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/)) return null
    if(!regex) return null
    return [parseFloat(regex[0], input.slice(regex[0].length))]
}
//object parser
const objectParser = function(input){

}
//array parser
const arrayParser = function(input){

}

//value parser
const valueParser = function(input){
    let result
    result = objectParser(input) || arrayParser(input) || numberParser(input) || stringParser(input) || nullParser(input) || booleanParser(input)
    return result
}






// console.log(nullParser('null123'))
// console.log(booleanParser('true'))
// console.log(booleanParser('false123'))
// console.log(stringParser("hello123"))
console.log(valueParser('+1.7e23abc'))
// console.log(numberParser('hello123'))
console.log(valueParser('"hello"123'))
