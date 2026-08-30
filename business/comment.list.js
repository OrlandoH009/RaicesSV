const commentService = require('./comment.server');

const listComments = async (req, res) => {
    try {
        const currentUser = req.session && req.session.user ? req.session.user : null;
        const { id } = req.params;

        const comments = await commentService.listComments(id, currentUser);

        res.status(200).json({ comments });
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudieron cargar los comentarios. Inténtalo de nuevo.';

        console.error(error);
        res.status(error && error.status ? error.status : 400).send(safeMessage);
    }
};

module.exports = listComments;
