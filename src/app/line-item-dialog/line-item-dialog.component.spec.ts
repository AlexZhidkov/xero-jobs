import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemDialogComponent } from './line-item-dialog.component';

describe('LineItemDialogComponent', () => {
  let component: LineItemDialogComponent;
  let fixture: ComponentFixture<LineItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineItemDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
