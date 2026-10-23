import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ejercicio5Cookies } from './ejercicio5-cookies';

describe('Ejercicio5Cookies', () => {
  let component: Ejercicio5Cookies;
  let fixture: ComponentFixture<Ejercicio5Cookies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejercicio5Cookies],
    }).compileComponents();

    fixture = TestBed.createComponent(Ejercicio5Cookies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
