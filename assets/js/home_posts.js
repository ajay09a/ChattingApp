// method to submit the form data for the new post using ajax
let createPost = function(){
    let newPostForm = $('#new-post-form');

    newPostForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/posts/create',
            data: newPostForm.serialize(),
            success: function(data){
                console.log(data);
            }, Error: function(error){
                console.log(error.responseText);
            }
        })
    })
}

createPost();

// method to create a post in DOM