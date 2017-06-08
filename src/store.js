const redux = require('redux')
const reducer = require('./reducers')

module.exports = redux.createStore(reducer)
