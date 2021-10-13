const Blog = require('../models/blog')

const blog_index = (req, res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('./blogs/index', {title:'All Blogs', blogs:result})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const blog_details = (req, res)=>{
    const id = req.params.id
    Blog.findById(id)
    .then((result)=>{
        res.render('./blogs/details', {blog:result, title: 'Blog Details'})
    })
    .catch((err)=>{
        res.status(404).render('404', {title:'Not Found'}) 
    })
}

const blog_post =(req, res)=>{
    const blog = new Blog(req.body)
    blog.save()
    .then((result)=>{
        res.redirect('/blogs')
    })
    .catch((err)=>{
        console.log(err)
    })
 }
const blog_delete = (req, res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect: '/blogs'})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const blog_create = (req, res)=>{
    res.render('./blogs/create', {title:'creating new blog'})
}
 module.exports = {
     blog_index, blog_details, blog_post,
     blog_delete, blog_create
 }