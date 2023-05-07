/* eslint-disable no-undef */
/// <reference types="cypress" />

import env from '../../../src/env'

const { SELF_URL } = env
const defaultUrl = 'http://localhost:3000'

describe('search user functionality', () => {
  beforeEach(() => {
    cy.visit(SELF_URL || defaultUrl)
  })

  it('query search should exist on the DOM when user filling search input with query then click submit button', () => {
    cy.get('[data-testid="search-input"]').type('facebook').should('have.value', 'facebook')
    cy.get('[data-testid="submit-button"]').click()
    cy.get('[data-testid="query-search"]').should('have.text', 'Showing users for "facebook"')
  })

  it('search result should be less than or equal to 5', () => {
    cy.get('[data-testid="search-input"]').type('facebook')
    cy.get('[data-testid="submit-button"]').click()

    cy.get('[data-testid="user-card"]').should('have.length.lte', 5)
  })

  it('should show "No Data" when no matching user', () => {
    cy.get('[data-testid="search-input"]').type('$$$___$$$')
    cy.get('[data-testid="submit-button"]').click()

    cy.get('[data-testid="user-card"]').should('have.length', 0)
    cy.get('[data-testid="user-empty"]').should('exist')
  })
})
