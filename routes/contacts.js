const express = require('express')

const router = express.Router()
    // @route Get api/contacts
    //desc get all user contacts
    //@access Private

router.get('/', (req, res) => {
    res.send('Get all contacts')
})

// @route POST api/contacts
//desc add a contact
//@access Private

router.post('/', (req, res) => {
    res.send('add a contact')
})

// @route PUT api/contacts
//desc update a contact
//@access Private

router.put('/', (req, res) => {
    res.send('update a contact')
})

// @route DELETE api/contacts
//desc delete a contact
//@access Private

router.delete('/', (req, res) => {
    res.send('delete a contact')
})

module.exports = router