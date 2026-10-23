import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ejercicio5LocalStorage } from './ejercicio5-local-storage';

describe('Ejercicio5LocalStorage', () => {
  let component: Ejercicio5LocalStorage;
  let fixture: ComponentFixture<Ejercicio5LocalStorage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejercicio5LocalStorage],
    }).compileComponents();

    fixture = TestBed.createComponent(Ejercicio5LocalStorage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
