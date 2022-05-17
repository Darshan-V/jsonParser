//null parser
const nullParser = function(input){
   if(!input.startsWith('null')) return null
   return [input.slice(4), null]
}

//boolean parser
const booleanParser = function(input) {
  if (input.startsWith('true')) return [true, input.slice(4)]
  if (input.startsWith('false')) return [false, input.slice(5)]
  return null
}

//string parser   
const stringParser = function(input){
  let result = 0
  let finResult = ''
  const obj = { '"': '"', '\\': '\\', "'": "'", n: '\n', r: '\r', b: '\b', f: '\f', t: '\t', '/': '/' }
  if (input.startsWith('"')) {
    for (let i = 1; i < input.length; i++) {
      if (input[i] === '\\') {
        if (input[i + 1] === 'u') {
          finResult += String.fromCodePoint(
            parseInt('0x' + input.slice(i + 2, i + 6))
          )
          i += 6
        } else {
          finResult += obj[input[i + 1]]
          i += 2
        }
      } else {
        finResult += input[i]
        i++
      }
      if (input[i] === '"') {
        result = i
        break
      }
      i--
    }
  } else return null
  return [finResult.slice(0, finResult.length), input.slice(result + 1)]
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
  if (input.startsWith('[')) {
    input = input.slice(1)
    const arr = []
    let final = input
    while (final) {
      final = final.trim()
      const temp =
      nullParser(final) ||
      booleanParser(final) ||
      numberParser(final) ||
      stringParser(final) ||
      arrayParser(final)
      if (temp === null) {
        return null
      }
      const first = temp[0]
      arr.push(first)
      let second = temp[1].trim()
      if (!(second[0] === ',' || second[0] === ']')) return null
      if (second[0] === ',') {
        second = second.slice(1)
      } else if (second[0] === ']') {
        return [arr, second.slice(1)]
      } final = second
    }
  } else return null
}

//value parser
const valueParser = function(input){
    let result
    return result = nullParser(input) || booleanParser(input) || stringParser(input) || numberParser(input) || arrayParser(input) || objectParser(input)

}

const objectParser = function(input){
   
  }





// console.log(nullParser('nul'))
// console.log(booleanParser('true'))
// console.log(booleanParser('false123'))
// console.log(stringParser(('"Hello123\s\nghtg\tyyyy\n\u7777"')))
// console.log(stringParser('"hello123\u8888"'))
// console.log(valueParser('-1.7e23'))
// console.log(numberParser('e+1'))
// console.log(valueParser('"hello"123'))
// console.log(arrayParser('["Ford", "BMW", "Fiat"]'))
// console.log(arrayParser('["mismatch"}'))
// console.log(stringParser('"abc\\nghi\tjfjfj\u7777"jjjj'))
