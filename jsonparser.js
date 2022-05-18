// null parser
const nullParser = function (input) {
  if (!input.startsWith('null')) return null
  return [input.slice(4), null]
}

// boolean parser
const booleanParser = function (input) {
  if (input.startsWith('true')) return [true, input.slice(4)]
  if (input.startsWith('false')) return [false, input.slice(5)]
  return null
}

// string parser
const stringParser = function (input) {
  let result = 0
  let finResult = ''
  const obj = {
    '"': '"',
    '\\': '\\',
    "'": "'",
    n: '\n',
    r: '\r',
    b: '\b',
    f: '\f',
    t: '\t',
    '/': '/'
  }
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

// number parser
const numberParser = function (input) {
  if(input.startsWith('0e')) return null
  const regex = /^\s*(-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?)\s*/
  const matched = regex.exec(input)
  if (matched !== null && matched.index === 0) {
    return [parseFloat(matched[1], input.trim().slice(matched[0].length))]
  }
  return null
}

// array parser
const arrayParser = function (input) {
  if (input.startsWith('[')) {
    input = input.slice(1)
    const arr = []
    let final = input
    while (final) {
      final = final.trim()
      const temp = valueParser(final)
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
      }
      final = second
    }
  } else return null
}

// object parser
const objectParser = function (input) {
  const result = {}
  if (!input.startsWith('{')) return null
  input = input.slice(1).trim()
  while (input.length !== 0 && input[0] !== '}') {
    input = input.trim()

    const sValue = stringParser(input)
    if (!sValue) return null
    const keyData = sValue[0]
    input = sValue[1].trim()
    if (input[0] !== ':') return null
    input = input.slice(1).trim()

    const value = valueParser(input)
    if (!value) return null
    result[keyData] = value[0]
    input = value[1]
    input = input.trim()
    if (input[0] !== ',') break
    input = input.slice(1).trim()
    if (input[0] === '}') return null
  }
  return input[0] === '}' ? [result, input.slice(1)] : null
}

// value parser
const valueParser = function (input) {
  let result
  return (result =
    nullParser(input) ||
    booleanParser(input) ||
    stringParser(input) ||
    numberParser(input) ||
    arrayParser(input) ||
    objectParser(input))
}

// console.log(nullParser('nul'))
// console.log(booleanParser('true'))
// console.log(booleanParser('false123'))
// console.log(stringParser(('"Hello123\s\nghtg\tyyyy\n\u7777"')))
// console.log(stringParser('"hello123\u8888"'))
// console.log(valueParser('-1.7e23'))
// console.log(numberParser('1e+99'))
// console.log(valueParser('"hello"123'))
// console.log(arrayParser('["Ford", "BMW", "Fiat"]'));
// console.log(arrayParser('["mismatch"}'))
// console.log(stringParser('"abc\\nghi\tjfjfj\u7777"jjjj'))
// console.log(objectParser('{"Comma instead if closing brace": true,'))
const fs = require('fs')
// for (let i = 17; i <= 3; i++) {
  let i = 17
  const data = fs.readFileSync(`./test/fail${i}.json`, 'utf8')
  console.log(i, JSONParser(data.trim()))

function JSONParser (input) {
  const jsonValue = arrayParser(input) || objectParser(input)
  if (jsonValue === null || jsonValue[1] !== '') return null
  return jsonValue[0]
}
