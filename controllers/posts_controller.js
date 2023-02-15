const Post = require('../models/post')
const Comment = require('../models/comment')

// module.exports.create = function(req, res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err, post){
//         if(err){console.log('error in creating a post'); return;}

//         return res.redirect('back');
//     });
// }


// module.exports.destroy = function(req, res){
//     Post.findById(req.params.id, function(err, post){
//         // .id means converting the object id into string
//         if(post.user == req.user.id){
//             post.remove();

//             Comment.deleteMany({post: req.params.id}, function(err){
//                 return res.redirect('back');
//             })
//         }
//         else{
//             return res.redirect('back');
//         }
//     })
// }

module.exports.create = async function(req, res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "post created"
            })
        }

        req.flash('success', 'Content Posted');
        return res.redirect('back');
    } catch (error) {
        console.log("Error");
        return;
    }
}

module.exports.destroy = async function(req, res){
    try {
        let post = await Post.findById(req.params.id)

        if(post.user == req.user.id){
            post.remove();

            let deleteComment = await Comment.deleteMany({post: req.params.id})
            req.flash('success', 'Post Deleted Successfully');
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}
