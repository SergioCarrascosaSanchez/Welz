import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent, ALERT_TYPES } from '../alert/alert.component';
import {
  BudgetCategoryFormComponent,
  Title,
  EmptyError,
  CorrectAdditionMessage,
  MinAndEmptyError,
  MinError,
  DuplicatedCategoryName,
  EditTitle,
} from './budget-category-form.component';
import { By } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data/data.service';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';
import { Observable } from 'rxjs';
import { IconButtonComponent } from '../icon-button/icon-button.component';

describe('BudgetCategoryFormComponent', () => {
  let component: BudgetCategoryFormComponent;
  let fixture: ComponentFixture<BudgetCategoryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BudgetCategoryFormComponent,
        ColorPickerComponent,
        AlertComponent,
      ],
      imports: [ReactiveFormsModule],
      providers: [{ provide: DataService, useClass: DataServiceMock }],
    });
    fixture = TestBed.createComponent(BudgetCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render inputs, title and button', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain(Title);
    expect(
      fixture.debugElement.query(By.css('input[formControlName="description"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('input[formControlName="max"]'))
    ).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.color-box'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('button'))).toBeTruthy();
  });

  it('should render inputs, title and button - edit', () => {
    component.edit = true;
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(EditTitle);
    expect(
      fixture.debugElement.query(By.css('input[formControlName="description"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('input[formControlName="max"]'))
    ).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.color-box'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('button'))).toBeTruthy();
  });

  it('should render error message if all inputs are empty', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EmptyError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });

  it('should render error message if description is empty', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.categoryForm.controls.max.setValue(3);
    component.categoryForm.controls.color.setValue('#FFFFF');

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EmptyError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });

  it('should render error message if max is empty', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.categoryForm.controls.description.setValue('test description');
    component.categoryForm.controls.color.setValue('#FFFFF');

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EmptyError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });

  it('should render error message if color is empty', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.categoryForm.controls.description.setValue('test description');
    component.categoryForm.controls.max.setValue(108.3);

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      EmptyError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });

  it('should not render error message if no category is empty and render success message', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );
    component.categoryForm.controls.description.setValue('test description');
    component.categoryForm.controls.max.setValue(108.3);
    component.categoryForm.controls.color.setValue('#FFFFF');

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeTrue();
    expect(component.errors).toBeFalsy();

    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeFalsy();
  });

  it('should render error message if quantity is 0', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.categoryForm.controls.description.setValue('Test');
    component.categoryForm.controls.max.setValue(0);
    component.categoryForm.controls.color.setValue('#FFFFF');

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(MinError);
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });

  it('should render error message if quantity is less than 0', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.categoryForm.controls.description.setValue('Test');
    component.categoryForm.controls.max.setValue(-1);
    component.categoryForm.controls.color.setValue('#FFFFF');

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(MinError);
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });

  it('should render error message if quantity is 0 or less and there is a empty field', () => {
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EmptyError
    );

    component.categoryForm.controls.description.setValue('Test');
    component.categoryForm.controls.max.setValue(0);

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      MinAndEmptyError
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });

  it('should render error message if name is duplicated', () => {
    component.categoryForm.controls.description.setValue(budgetCategory.name);
    component.categoryForm.controls.max.setValue(1);
    component.categoryForm.controls.color.setValue('#FFFFF');

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.correctAddition).toBeFalse();
    expect(component.errors).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      DuplicatedCategoryName
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      CorrectAdditionMessage
    );
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
  });
});

/* DataServiceMocks */

class DataServiceMock {
  error = new Observable<string>();
  addNewCategory(budgetCategory: BudgetCategory) {}

  checkCategoryName(name: string) {
    return name !== budgetCategory.name;
  }
}

const budgetCategory: BudgetCategory = {
  name: 'Mock1',
  max: 1000,
  color: 'red',
};
