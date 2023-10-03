const Country = require('../../../models/Country')
const db = require('../../../database/connect')

describe('Country Model', () => {
    describe('getAll', () => {
        it('resolves with countries on successful', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{ name: 'Mexico', capital: 'Mexico City' }, { name: 'Mexico', capital: 'Mexico City' }, { name: 'Mexico', capital: 'Mexico City' }]
                })

            const countries = await Country.getAll()
            expect(countries).toHaveLength(3)
            expect(countries[0]).toHaveProperty('name')
        })

        it('should throw an Error on db query error', async () => {
            // jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [] })

            try {
                await Country.getAll()
            } catch (err) {
                expect(err).toBeDefined()
                expect(err.message).toBe("No countries available")
            }
        })
    })
})

