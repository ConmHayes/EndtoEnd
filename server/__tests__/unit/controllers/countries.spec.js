const { defaults } = require('pg');
const countriesController = require('../../../controllers/countries');
const Country = require('../../../models/Country')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe('countries controller', () => {
    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe('index', () => {
        it('should return countries with a status code 200', async () => {
            const testCountry = []
            jest.spyOn(Country, 'getAll')
                .mockResolvedValue(testCountry)

            await countriesController.index(null, mockRes)
            expect(Country.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockSend).toHaveBeenCalledWith(testCountry)
        })
        it('sends an error upon fail', async () => {
            jest.spyOn(Country, 'getAll')
                .mockRejectedValue(new Error('Something happened to your db'))

            await countriesController.index(null, mockRes)
            expect(Country.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
        })
    })
})
