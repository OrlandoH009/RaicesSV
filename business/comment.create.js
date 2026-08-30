const commentService = require('./comment.server');

const createComment = async (req, res) => {
    try {
        const currentUser = req.session.user;
        const { id } = req.params;

        const comment = await commentService.createComment(id, currentUser, req.body.text);

        res.status(201).json({ comment });
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo publicar el comentario. Inténtalo de nuevo.';

        console.error(error);
        res.status(error && error.status ? error.status : 400).send(safeMessage);
    }
};

module.exports = createComment;
