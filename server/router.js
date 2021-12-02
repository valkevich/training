import Router from 'express';

const router = new Router;

router.get('/', (req, res) => {
    try {
        res.status(200).json('Работает :)');
    } catch (e) {
        res.json(e);
    }
})
router.post('/', (req, res) => {
    try {
        console.log(req.files);
        res.status(200).json('Пришло!');
    } catch (e) {
        res.json(e);
    }
});

export default router;