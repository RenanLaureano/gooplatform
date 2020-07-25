import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCriancaComponent } from './create-crianca.component';

describe('CreateCriancaComponent', () => {
  let component: CreateCriancaComponent;
  let fixture: ComponentFixture<CreateCriancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCriancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCriancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
