const data = require('../data')
const userSchema = require('../models/user')
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
      status: 'User Not Found',
      data: err.message
    })
  }
}

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
      data: err.message
    })
  }
}
