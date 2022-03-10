let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Monitorings', () => {
    describe('/GET', () => {
        it('it should GET all the books', (done) => {
            chai.request("localhost:9001/api/v1")
                .get('/monitoring')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                })
        })
    })
})