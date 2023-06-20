import axios from "axios";

describe('Recipe app', () => {
    before(() => {
        cy.fixture('recipe').then(Recipe => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3080/recipes',
                body: Recipe,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        });
    });

    describe('Test that a GET request to the `/recipes` endpoint returns results', () => {
        it('should return a list of recipes', async () => {
            const response = await cy.request('http://localhost:3080/recipes');

            expect(JSON.stringify(response.body)).to.include('Ham Sandwich');
            expect(response.status).to.eql(200);
        });
    });

    describe('Test that a GET request to the `/recipes` search endpoint returns results', () => {
        it('should return a list of recipes', async () => {
            const response = await cy.request('http://localhost:3080/recipes?search=Ham');

            expect(JSON.stringify(response.body)).to.include('Ham Sandwich');
            expect(response.status).to.eql(200);
        });
    });
});