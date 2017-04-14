var express = require('express');
var router = express.Router();

var {post} = require('../../models');

router.get('/page/:id', (req, res, next) => {
    let pageId = req.params.id;

    post
        .findById(pageId)
        .then( findedPost=>{
            res.render('./posts/page', {postInfo: findedPost});
        })
});

// 게시글 전체 보기 페이지
router.get('/', (req, res, next) => {

    let limit = parseInt(req.query.limit) || 3,
        currentPage = parseInt(req.query.currentPage);

    if (!currentPage || currentPage < 0){
        currentPage = 0;
    }

    let offset = limit * currentPage;

    post
        .findAndCountAll({
            // raw: true,
            limit : limit,
            offset : offset
        })
        .then((posts)=>{
            res.render('./posts/list', { posts: posts.rows, currentPage: currentPage, prePage: currentPage-1, nextPage: currentPage +1, maxPage: Math.ceil(posts.count / limit) });
        })
});

//글쓰기 페이지
router.get('/write', (req, res, next) => {
    res.render('./posts/write', { title: 'board write' });
});

// 글수정 페이
router.get('/update', (req, res, next) => {
    res.render('./posts/update', { title: 'board update' });
});

// 글쓰기
router.post('/write', (req, res, next)=>{
    let title = req.body.title,
        content = req.body.content;

    post.create({
        title: title,
        content: content
    }).then(() =>{
        res.redirect('/API_V1/posts');
    })
});

router.put('/write/:id', (req, res, next)=>{
    res.end(req.params.id);
})

module.exports = router;
