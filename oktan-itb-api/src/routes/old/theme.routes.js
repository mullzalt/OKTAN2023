const router = require('express').Router()

const themes = require('../controllers/theme.controller')
const verify = require('../middlewares/userVerification')

router.get('/', themes.getAll)
router.get('/:themeId', themes.getOne)
router.post('/', themes.createTheme)
router.put('/:themeId', themes.editTheme)
router.delete('/:themeId', themes.deleteTheme)


module.exports = router