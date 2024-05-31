class FileController {
    async uploads(req, res) {
        const { filename } = req.file; // Mudei de req.body para req.file
        return res.status(200).json({ url: `uploads/${filename}` });
    }
}

module.exports = new FileController();