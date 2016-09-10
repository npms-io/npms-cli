const tests = [
  'search',
  'json',
  'version',
  'info'
]

const test = () => tests.forEach((test) => require(`./${test}`)('gulp'))

describe('npmscli', test)
