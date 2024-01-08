import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  template: `<app-modal [open]="open" (closeEmmitter)="onClose()">{{
    content
  }}</app-modal>`,
})
class ModalHostComponent {
  content;
  open;

  onClose() {
    this.open = false;
  }
}

describe('ModalComponent', () => {
  let component: ModalHostComponent;
  let fixture: ComponentFixture<ModalHostComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalHostComponent, ModalComponent, CardComponent],
    });
    fixture = TestBed.createComponent(ModalHostComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.content = 'hola';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render inner content only if is open ', () => {
    const content = 'Test content';
    component.content = content;
    component.open = true;
    fixture.detectChanges();
    expect(debugElement.nativeElement.textContent).toContain(content);

    component.open = false;
    fixture.detectChanges();
    expect(debugElement.nativeElement.textContent).not.toContain(content);
  });

  it('should close when click on close button', () => {
    const content = 'Test close button';
    component.content = content;
    component.open = true;
    fixture.detectChanges();
    expect(debugElement.nativeElement.textContent).toContain(content);

    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();
    expect(debugElement.nativeElement.textContent).not.toContain(content);
  });

  it('should close when click on background', () => {
    const content = 'Test close button';
    component.content = content;
    component.open = true;
    fixture.detectChanges();
    expect(debugElement.nativeElement.textContent).toContain(content);

    const background = fixture.nativeElement.querySelector('.modal-container');
    expect(background).toBeTruthy();
    background.click();
    fixture.detectChanges();
    expect(debugElement.nativeElement.textContent).not.toContain(content);
  });
});
