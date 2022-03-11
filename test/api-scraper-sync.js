let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

const url = "http://localhost:9001/api/v1"

describe('Scraper Sync', () => {
    describe('Extract', () => {
        it('Deve extrair todas as informações da pagina', (done) => {

            
            const path = "/sync/scraper"
            const body = { "url": "localhost:9009" }

            chai.request(url).post(path).send(body)
                .end((err, res) => {

                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.have.property('uuid').to.not.be.empty
                    res.body.should.have.property('url').eql(body.url)
                    res.body.should.have.property('isSuccess').eql(true)
                    res.body.should.have.property('executionTime').to.not.be.empty
                    res.body.should.have.property('extractedTarget').to.not.be.empty
                                        

                    chai.request(url).get(`/execution?uuid=${res.body.uuid}`)
                        .end((err, res) => {

                            res.should.have.status(200);
                            res.body.should.be.a('object')
                            res.body.executions.should.be.a('array')
                            res.body.executions[0].should.be.a('object')

                            res.body.executions[0].should.have.property('url').eql(body.url)
                            res.body.executions[0].should.have.property('isLast').eql(true)
                            res.body.executions[0].should.have.property('isSuccess').eql(true)
                            res.body.executions[0].should.have.property('level').eql(0)
                            res.body.executions[0].should.have.property('scriptTarget').eql("new XMLSerializer().serializeToString(document)")
                            res.body.executions[0].should.have.property('_id')
                            res.body.executions[0].should.have.property('createdAt')
                            res.body.executions[0].should.have.property('updatedAt')
                            res.body.executions[0].should.have.property('monitoringId')
                            res.body.executions[0].should.have.property('uuid')
                            res.body.executions[0].should.have.property('startTime')
                            res.body.executions[0].should.have.property('endTime')
                            res.body.executions[0].should.have.property('executionTime')
                            res.body.executions[0].should.have.property('hashTarget')
                            res.body.executions[0].should.have.property('hashTargetChanged')
                            res.body.executions[0].should.have.property('hashTargetUnique')

                            res.body.executions[0].options.should.have.property('filterDomain').eql(true)
                            res.body.executions[0].options.should.have.property('enableUserAgentRandom').eql(true)
                            res.body.executions[0].options.should.have.property('printscreen').eql(false)
                            res.body.executions[0].options.should.have.property('printscreenFullPage').eql(false)
                            res.body.executions[0].options.should.have.property('timeout')
                            res.body.executions[0].options.should.have.property('waitUntil')                            


                            chai.request(url).get(`/monitoring/${res.body.executions[0].monitoringId}`)
                            .end((err, res) => {

                                res.should.have.status(200);
                                res.body.should.be.a('object')

                                res.body.should.have.property('url').eql(body.url)
                                res.body.should.have.property('disabled').eql(true)
                                res.body.options.should.have.property('temporary').eql(true)
                                res.body.should.have.property('regularity').eql('*/3 * * * *')
                                res.body.should.have.property('createdAt')   
                                res.body.should.have.property('updatedAt')   

                                res.body.notifications[0].webhook[0].should.have.property('method').to.have.string('PATCH')
                                res.body.notifications[0].webhook[0].should.have.property('url').to.have.string('/sync')

                                done()
                            })                            
                        })
                })
        })
    })
    describe('Extract PDF', () => {
    })
    describe('Extract Links', () => {
    })
    describe('Extract Images', () => {
    })
    describe('Extract Screenshot', () => {
    })
    describe('Extract Screenshot Full', () => {
    })

})



