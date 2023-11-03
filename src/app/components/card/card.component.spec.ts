import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';
import { DebugElement } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  template: `<app-card [type]="type">{{ content }}</app-card>`,
})
class CardHostComponent {
  content;
  type;
}

describe('CardComponent', () => {
  it('should create', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    let debugElement: DebugElement;
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render inner content', () => {
    let component: CardHostComponent;
    let fixture: ComponentFixture<CardHostComponent>;
    TestBed.configureTestingModule({
      declarations: [CardComponent, CardHostComponent],
    });
    fixture = TestBed.createComponent(CardHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const content = 'Test content';
    component.content = content;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').textContent).toContain(
      content
    );
  });

  it('should have card class depending of card type - subcard', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.type = 'subcard';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.subcard'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.card'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.thin-card'))).toBeFalsy();
  });

  it('should have card class depending of card type - card ', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.type = 'card';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.card'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.subcard'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.thin'))).toBeFalsy();
  });

  it('should have card class depending of card type - thin-card', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.type = 'subcard';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.subcard'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.card'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.thin-card'))).toBeFalsy();
  });

  it('should have card class by default', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.type).toBe('card');
  });
});
