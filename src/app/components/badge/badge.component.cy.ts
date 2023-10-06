import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  it('should print text and apply color', () => {
    const text = 'Test text';
    const color = 'rgb(48, 48, 48)';
    cy.mount(BadgeComponent, {
      componentProperties: {
        text: text,
        color: color,
      },
      declarations: [BadgeComponent],
    });

    cy.contains(text);
    cy.contains(text).should('have.css', 'background-color', color);
  });

  it('should apply another color', () => {
    const text = 'Test text 2';
    const color = 'rgb(255, 0, 0)';
    cy.mount(BadgeComponent, {
      componentProperties: {
        text: text,
        color: color,
      },
      declarations: [BadgeComponent],
    });

    cy.contains(text);
    cy.contains(text).should('have.css', 'background-color', color);
  });
});
