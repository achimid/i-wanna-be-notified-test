let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

const url = "http://localhost:9001/api/v1"


it('Uol', (done) => {

    
    const path = "/sync/scraper"
    const body = { 
        "url": "https://www.uol.com.br",
        "scriptTarget": "[...new Set([...document.querySelectorAll('.headlineSub__content')].map(i => i.innerText.trim()).filter(i => i))]"
    }

    chai.request(url).post(path).send(body)
        .end((err, res) => {

            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body.should.have.property('extractedTarget').to.not.be.empty                
            res.body.should.have.property('url').eql(body.url)
            res.body.should.have.property('isSuccess').eql(true)
            res.body.should.have.property('executionTime').to.not.be.empty
            res.body.should.have.property('extractedTarget').to.not.be.empty

            res.body.extractedTarget.should.be.a('array')
            res.body.extractedTarget.length.should.be.greaterThan(5)

            done()
        })  
})