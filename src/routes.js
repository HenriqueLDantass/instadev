const { Router } = require('express');
//schemas 
const UserSchema = require('./schema/user.schema.json')
const AuthSchema = require('./schema/AuthSchema.json')
const PostSchema = require('./schema/post.schema.json')


//middlewares
const schemaValidator = require("./apps/middlewares/validator");
const AutenticationMiddleware = require('./apps/middlewares/autentication');

//controlles
const UserController = require('./apps/controllers/userController');
const AuthController = require('./apps/controllers/authController');
const userController = require('./apps/controllers/userController');
const FileController = require('./apps/controllers/fileController');
const PostController = require('./apps/controllers/postController');


const {upload} = require('./configs/multer');
const routes = new Router();

routes.post("/user",schemaValidator(UserSchema) , UserController.create);
routes.post("/auth", schemaValidator(AuthSchema),AuthController.authentication)
routes.use(AutenticationMiddleware);
routes.get("/userProfile", userController.userProfile)
routes.put("/user", UserController.update);
routes.delete("/user", UserController.delete);

routes.post("/create-post", schemaValidator(PostSchema), PostController.create)
routes.delete("/delete-post/:id", PostController.delete)
routes.put("/update-post/:id", PostController.update)
routes.put("/addlike/:id", PostController.addLikes)
routes.get("/list-my-posts", PostController.ListMyPosts);
routes.get("/listPosts", PostController.listAllPosts);




routes.post('/uploads', upload.single('image'), FileController.uploads);

 routes.get('/health', (req, res) => {
    res.send({message:"connectado com sucesso"})
})


module.exports = routes;