const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const fs = require('fs');
const path = require('path');

chai.use(chaiHttp);

const postsFilePath = path.join(__dirname, '../data/posts.json');

describe('Posts API', () => {
    let postId;

    beforeEach((done) => {
        // Clear posts file before each test
        fs.writeFileSync(postsFilePath, JSON.stringify([]));
        done();
    });

    it('should get all posts (empty array)', (done) => {
        chai.request(app)
            .get('/api/posts')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.equal(0);
                done();
            });
    });

    it('should create a new post', (done) => {
        const newPost = { title: 'Test Post', content: 'This is a test post.' };
        chai.request(app)
            .post('/api/posts')
            .send(newPost)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title', 'Test Post');
                postId = res.body.id;
                done();
            });
    });

    describe('with a post', () => {
        let post;

        beforeEach((done) => {
            const newPost = { id: 'test-id', title: 'Existing Post', content: 'This is an existing post.' };
            fs.writeFileSync(postsFilePath, JSON.stringify([newPost]));
            post = newPost;
            postId = newPost.id;
            done();
        });

        it('should get a post by id', (done) => {
            chai.request(app)
                .get(`/api/posts/${postId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('id', postId);
                    done();
                });
        });

        it('should update a post', (done) => {
            const updatedPost = { title: 'Updated Post', content: 'This is an updated post.' };
            chai.request(app)
                .put(`/api/posts/${postId}`)
                .send(updatedPost)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('title', 'Updated Post');
                    done();
                });
        });

        it('should delete a post', (done) => {
            chai.request(app)
                .delete(`/api/posts/${postId}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });
});
