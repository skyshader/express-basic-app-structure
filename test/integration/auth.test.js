'use strict';

describe('Test Controller Auth', () => {

    describe('#signup()', function() {
        it('should successfully create user', function (done) {
            request(app)
                .post(api_url + '/auth/signup')
                .send({
                    "username": "test",
                    "email": "test@test.com",
                    "password": "123456",
                    "first_name": "Test"
                })
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function(err, res) {
                    if (err) throw err;
                    assert.equal(res.body.data.user.username, 'test');
                    assert.property(res.body.data, 'token');
                    done();
                });
        });

        it('should fail to create user if required field is missing', function (done) {
            request(app)
                .post(api_url + '/auth/signup')
                .send({
                    "email": "test@test.com",
                    "password": "123456",
                    "first_name": "Test"
                })
                .expect('Content-Type', /json/)
                .expect(500, done);
        });

        it('should not create duplicate user', function (done) {
            request(app)
                .post(api_url + '/auth/signup')
                .send({
                    "username": "test",
                    "email": "test@test.com",
                    "password": "123456",
                    "first_name": "Test"
                })
                .expect('Content-Type', /json/)
                .expect(500, done);
        });
    });

    describe('#login()', function() {
            it('should login user successfully with valid credentials', function (done) {
                request(app)
                    .post(api_url + '/auth/login')
                    .send({
                        "username": "test@test.com",
                        "password": "123456"
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) throw err;
                        assert.equal(res.body.data.user.email, 'test@test.com');
                        assert.property(res.body.data, 'token');
                        global.authToken = res.body.data.token;
                        done();
                    });
            });

            it('should not allow login user with invalid credentials', function (done) {
                request(app)
                    .post(api_url + '/auth/login')
                    .send({
                        "email": "test@test.com",
                        "password": "1234567"
                    })
                    .expect('Content-Type', /json/)
                    .expect(401, done);
            });
        });
});
