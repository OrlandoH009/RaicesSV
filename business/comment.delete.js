const commentService = require('./comment.server');

const deleteComment = async (req, res) => {
    try {
        const currentUser = req.session.user;
        const { id } = req.params;

        await commentService.deleteComment(id, currentUser);

        res.status(200).json({ deleted: true });
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo eliminar el comentario. Inténtalo de nuevo.';

        console.error(error);
        res.status(error && error.status ? error.status : 400).send(safeMessage);
    }
};

module.exports = deleteComment;
