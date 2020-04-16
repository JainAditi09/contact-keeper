const express = require('express')

const router = express.Router()

// @route GET api/auth
//desc logged in a user
//@access Private

router.get('/', (req, res) => {
    res.send('logged in a User')
})

// @route Post api/auth
//desc auth user/get token
//@access Public

router.post('/', (req, res) => {
    res.send('get token/auth User')
})

module.exports = router