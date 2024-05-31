const Post = require('../models/Posts');
const Users = require('../models/User');
class PostController {
    async create(req, res) {
        const { image, description } = req.body;
        const newPost = await Post.create({
            image,
            description,
            author_id: req.userId
        });
        if (!newPost) {
            return res.status(400).json({ error: "Erro ao criar posts" })
        }

        return res.status(200).json({ image, description });
    }
    async delete(req, res) {
        try {
            const { id } = req.params;

            const verifyPosts = await Post.findOne({
                where: {
                    id
                }
            });

            if (!verifyPosts) {
                return res.status(404).json({ message: "O post não existe" })
            }

            if (verifyPosts.author_id != req.userId) {
                return res.status(403).json({ message: "O usuario não pode deletar esse post" })
            }

            const deletePost = await Post.destroy({
                where: {
                    id
                }
            });
            if (!deletePost) {
                return res.status(404).json({ message: "não foi possivel deletar o post" })
            }

            res.status(200).json({ message: "post deletado com sucesso" })
        } catch (error) {
            return res.status(500).json({ error: `An error occurred while deleting the post ${error}` });

        }



    }

    async update(req, res) {
        const { id } = req.params;

        const verifyPosts = await Post.findOne({
            where: {
                id
            }
        });

        if (!verifyPosts) {
            return res.status(404).json({ message: "O post não existe" })
        }

        if (verifyPosts.author_id != req.userId) {
            return res.status(403).json({ message: "O usuario não pode auterar esse post" })
        }
        const updatedPost = await Post.update(req.body, {
            where: {
                id
            }
        })

        if (!updatedPost) {
            return res.status(403).json({ message: "Não foi possivel alterar o post" })

        }

        return res.status(200).json({ message: "Post alterado com sucesso" })

    }


    async addLikes(req, res) {
        const { id } = req.params;

        const verifyPosts = await Post.findOne({
            where: {
                id
            }
        });

        if (!verifyPosts) {
            return res.status(404).json({ message: "O post não existe" })
        }

        const updatedPost = await Post.update({ number_likes: verifyPosts.number_likes + 1 }, { where: { id } }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: "Erro ao adicionar like no post" })

        }
        return res.status(200).json({ message: " like adicionado no post" })


    }

    async ListMyPosts(req, res) {
        const MyPost = await Post.findAll({
            where: {
                author_id: req.userId
            }
        })

        if (!MyPost) {
            return res.status(400).json({ message: "Erro ao pegar os postar" })
        }

        const FormattData = []

        for (const item of MyPost) {
            FormattData.push({
                id: item.id,
                image: item.image,
                author_id: item.author_id,
                number_likes: item.number_likes
            })

        }



        return res.status(200).json({ data: FormattData })
    }

    async listAllPosts(req, res) {
        const allPosts = await Post.findAll({
          order:[
            ['id','DESC']
          ],
          attributes: ['id', 'description', 'image', 'number_likes'],
          include: [
            {
              model: Users,
              as: 'user',
              required: true,
              attributes: ['id', 'user_name'],
            },
          ],
        });
    
        return res.status(200).json({
          data: allPosts,
        });
      }
}

module.exports = new PostController();