import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCriancaComponent } from './edit-crianca.component';

describe('EditCriancaComponent', () => {
  let component: EditCriancaComponent;
  let fixture: ComponentFixture<EditCriancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCriancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCriancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
