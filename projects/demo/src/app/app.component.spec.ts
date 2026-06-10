import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('creates the demo app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('builds a layout token string from the selected controls', () => {
    const component = fixture.componentInstance;

    component.direction = 'column';
    component.wrap = 'nowrap';
    component.mainAxis = 'center';
    component.crossAxis = 'stretch';

    expect(component.layoutValue).toBe('column nowrap center p-stretch');
  });
});
