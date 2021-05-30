context('Querying', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })


    it('should login', () => {
        cy.get('.realtor')
            .first()
            .click()

        cy.location('pathname').should('include', 'messages')
    })

    it('should read messages', () => {
        cy.get('.realtor')
            .first()
            .click()

    
        cy.get('.message-item')
            .first()
            .click()


        cy.get('.message-content')
            .should('exist')
    })
})