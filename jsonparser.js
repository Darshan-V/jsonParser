// null parser
function nullParser (input) {
  if (input.startsWith('null')) return [null, input.slice(4)]
  return null
}

// boolean parser
function booleanParser (input) {
  if (input.startsWith('true')) return [true, input.slice(4)]
  if (input.startsWith('false')) return [false, input.slice(5)]
  return null
}
// string parser
function stringParser (input) {
  if (input[0] !== '"') return null
  const escChar = ['"', '\\', '/', 'b', 'f', 'n', 'r', 't', 'u']
  const invalid = [9, 10]
  let i = 1
  while (input[i] !== '"') {
    if (invalid.includes(input[i].charCodeAt(0))) return null
    if (input[i] === '\\') {
      if (!escChar.includes(input[i + 1])) return null
      if (input[i + 1] === 'u') {
        i += 4
      }
      i += 2
    } else { i++ }
  }
  return [input.slice(1, i), input.slice(i + 1)]
}
// number parser
function numberParser (input) {
  input = input.trim()
  const regex = /^-?((0\.[0-9]+)|([1-9][0-9]*(\.[0-9]+)?)|0[,}\]])([eE][-+]?[0-9]+)?/
  const result = input.match(regex)
  if (result === null) return null
  return [input.slice(0, result[0].length), input.slice(result[0].length)]
}
// array parser
function arrayParser (input) {
  if (!input.startsWith('[')) return null
  input = input.slice(1).trim()
  const arr = []
  let value
  while (!input.startsWith(']')) {
    value = valueParser(input)
    if (!value) return null
    arr.push(value[0])
    input = value[1].trim()
    if (input[0] === ',') {
      input = input.slice(1).trim()
      if (input[0] === ']') {
        return null
      }
      continue
    }
  }
  return [arr, input.slice(1)]
}
// object parser
function objectParser (input) {
  if (!input.startsWith('{')) return null
  input = input.slice(1).trim()
  const parsedObj = {}
  let value
  while (!input.startsWith('}')) {
    input = input.trim()
    const parseStr = stringParser(input)
    if (!parseStr) return null
    const key = parseStr[0]
    input = parseStr[1].trim()
    if (input[0] === ':') {
      input = input.slice(1)
      value = valueParser(input)
    }
    if (!value) return null
    parsedObj[key] = value[0]
    input = value[1].trim()
    if (input[0] === ',') {
      input = input.slice(1).trim()
      if (input[0] === '}') return null
    }
  }
  return [parsedObj, input.slice(1)]
}
// value parser
function valueParser (input) {
  input = input.trim()
  return (
    nullParser(input) ||
    booleanParser(input) ||
    numberParser(input) ||
    stringParser(input) ||
    arrayParser(input) ||
    objectParser(input))
}

function JSONParser (input) {
  input = input.trim()
  const parsedValue = arrayParser(input) || objectParser(input)
  if (!parsedValue || parsedValue[1]) return null
  return JSON.stringify(parsedValue[0])
}
const fs = require('fs')
// for (let i = 1; i <= 33; i++) {
const i = 5
const data = fs.readFileSync(`./test/pass${i}.json`, 'utf8')
console.log(i, JSONParser(data.trim()))
// }
