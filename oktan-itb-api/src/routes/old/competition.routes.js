const router = require('express').Router()

const competition = require('../controllers/competition.controller')
const verify = require('../middlewares/userVerification')
const validate = require('../middlewares/formsValidation')
const { uploadFile, formData } = require('../middlewares/fileUploader')
const submission = require('../controllers/submission.controller')



router.post(
    '/',
    [
        verify.protect,
        // verify.isModerator,
        validate.validateCompetition
    ],
    competition.createCompetition)

router.get('/', competition.getAll)
router.get('/:competitionId', competition.getCompetition)
router.get('/:competitionId/participants', competition.getCompetitionAndParticipant)

router.post('/:competitionId/enroll',
    [verify.protect,
        uploadFile],
    competition.enrollTeamMember
)

router.get('/:competitionId/participants/:memberId',
    [verify.protect],
    competition.getTeamDetail
)

router.get('/:competitionId/me',
    [verify.protect],
    competition.getMyEnrollStatus

)
router.post('/:competitionId/participants/:memberId/submit',
    [verify.protect,
        uploadFile
    ],
    submission.submitPapper
)

router.delete('/:competitionId/participants/:memberId/delete',
    [verify.protect],
    submission.deletePapper
)

router.get('/:competitionId/submissions',
    [verify.protect],
    submission.getAllPapeer
)

router.get('/:competitionId/submissions/me',
    [verify.protect],
    submission.getMyPaper
)

router.get('/:competitionId/cards',
    [verify.protect],
    competition.getAllCard
)

router.get('/:competitionId/card/:memberId',
    [verify.protect],
    competition.getOneCard
)


module.exports = router