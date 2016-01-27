import { defaultOptionKeys } from '../config'

export default function findOptionByValue (value, options, optionKeys = defaultOptionKeys) {
  let optionsLength = options.length
  let option

  for (let o = 0; o < optionsLength; o++) {
    option = options[o]
    if (option[optionKeys.value] === value) {
      return {
        label: option[optionKeys.label],
        value: option[optionKeys.value]
      }
    }
  }

  return { value: null, label: null }
}
