import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResponsavelComponent } from './create-responsavel.component';

describe('CreateResponsavelComponent', () => {
  let component: CreateResponsavelComponent;
  let fixture: ComponentFixture<CreateResponsavelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateResponsavelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
