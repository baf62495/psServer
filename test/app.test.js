const supertest = require('supertest')
const app = require('../app')
const { expect } = require('chai')

describe('GET /apps', () => {
    it('should return an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1)
                const app = res.body[0]
                expect(app).to.include.all.keys(
                    'App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs', 'Type', 'Price', 'Content Rating', 'Genres', 'Last Updated', 'Current Ver', 'Android Ver'
                )
            })
    })

    it('should return 400 if sort query is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'MISTAKE' })
            .expect(400, 'Sort must be one of the following: rating, app')
    })

    it('should return 400 if genre query is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({ genres: 'MISTAKE' })
            .expect(400, 'Genres must be one of the folling: Action, Puzzle, Strategy, Casual, Arcade, Card')
    })

    it('should sort by App', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'App' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                let sorted = true

                let i = 0
                while (i < res.body.length - 1) {
                    const appAtI = res.body[i]
                    const appAtIPlus1 = res.body[i + 1]
                    if (appAtIPlus1.App > appAtI.App) {
                    sorted = false
                    break
                    }
                    i++
                }
                expect(sorted).to.be.true
            })
    })

    it('should sort by Rating', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'Rating' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                let sorted = true

                let i = 0
                while (i < res.body.length - 1) {
                    const appAtI = res.body[i]
                    const appAtIPlus1 = res.body[i + 1]
                    if (appAtIPlus1.Rating > appAtI.Rating) {
                    sorted = false
                    break
                    }
                    i++
                }
                expect(sorted).to.be.true
            })
    })
})