const data = require('../data')
const userSchema = require('../models/user')

// create new user
exports.createUser = async (req, res, next) => {
  try {
    const { id, login, password, age, isDeleted } = req.body
    await userSchema.validateAsync(req.body)
    data.push({
      id,
      login,
      password,
      age,
      isDeleted
    })
    res.status(200).json({
      status: 'OK',
      data
    })
  } catch (err) {
    res.status(400).json({
      status: 'Bad Request',
      data: err.message
    })
  }
}

// get one user by id
exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params
    const foundUser = data.find(user => user.id === userId)
    if (foundUser === undefined) {
      throw new Error()
    }
    res.status(200).json({
      status: 'OK',
      data: foundUser
    })
  } catch (err) {
    res.status(404).json({
      status: 'Not Found',
      data: 'User doesnt exist'
    })
  }
}

// update user
exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    await userSchema.validateAsync(req.body)
    const updatedUser = data.find(user => user.id === userId ? Object.assign(user, req.body) : user)
    if (updatedUser === undefined) {
      throw new Error()
    }
    res.status(200).json({
      status: 'OK',
      data
    })
  } catch (err) {
    res.status(400).json({
      status: 'Bad Request',
      data: err.message
    })
  }
}

exports.getAutoSuggestUsers = async (req, res, next) => {
  try {
    const { loginSubstring = '', limit = 1 } = req.body
    const filteredBySubStr = data.filter(user => user.login.includes(loginSubstring))
    if (filteredBySubStr.length === 0) {
      throw new Error()
    }
    const limitedAndSorted = (filteredBySubStr.length > limit ? filteredBySubStr.slice(0, limit) : filteredBySubStr).sort((a, b) => a.login.localeCompare(b.login))
    res.status(200).json({
      status: 'OK',
      data: limitedAndSorted
    })
  } catch {
    res.status(404).json({
      status: 'Not Found',
      data: 'There is no proper User'
    })
  }
}

// soft delete - change user isDeleted status, from false to true
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const deletedUser = data.find(user => user.id === userId)
    if (deletedUser) {
      deletedUser.isDeleted = true
    } else {
      throw new Error()
    }
    res.status(200).json({
      status: 'OK',
      data
    })
  } catch (err) {
    res.status(400).json({
      status: 'Bad Request',
      data: 'User doesnt exist'
    })
  }
}
