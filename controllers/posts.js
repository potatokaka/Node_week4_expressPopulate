const handleSuccess = require('../service/handleSuccess')
const handleError = require('../service/handleError')
const Post = require('../model/postModel')
// 引入　user Model
const User = require('../model/userModel')

const PostControllers = {
  async getPosts(req, res) {
    try {
      const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt"
      const q = req.query.q !== undefined ? { "content": new RegExp(req.query.q) } : {};
      const postData = await Post.find(q).populate({
        path: 'user',
        select: 'name photo'
      }).sort(timeSort);
      handleSuccess(res, postData)
    } catch (error) {
      handleError(res, error)
    }
  },
  async createPost(req, res) {
    try {
      const { body } = req
      if ( body.content ) {
        const newPost = await Post.create({
          user: body.user,
          content: body.content,
          // type: body.type,
          // tags: body.tags
        })
        handleSuccess(res, newPost)
      } else {
        handleError(res)
      }
    } catch (error) {
      handleError(res, error)
    }
  },
  // async deletePosts(req, res) {
  //   try {
  //     const postData = await Post.deleteMany({})
  //     handleSuccess(res, postData)
  //   } catch (err) {
  //     handleError(res, err)
  //   }
  // },
  // async deletePost(req, res) {
  //   try {
  //     const { id } = req.params
  //     const postData = await Post.findByIdAndDelete(id);
  //     if (postData) {
        
  //       handleSuccess(res, postData)
  //     } else {
  //       console.log('找不到id');
  //       throw new Error( '查無此 id')
  //     }
  //   } catch (err) {
  //     handleError(res, err)
  //   }
  // },
  // async updatePost(req, res) {
  //   try {
  //     const { id } = req.params
  //     const { body } = req
  //     const postData = await Post.findByIdAndUpdate(
  //       id,
  //       {
  //         name: body.name,
  //         content: body.content,
  //         image: body.image,
  //         type: body.tags,
  //         tags: body.type
  //       }
  //     )
  //     handleSuccess(res, postData)
  //   } catch (err) {
  //     handleError(res, err)
  //   }
  // }
}

module.exports = PostControllers