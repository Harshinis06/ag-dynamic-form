import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAgGridComponent } from './client-ag-grid.component';

describe('ClientAgGridComponent', () => {
  let component: ClientAgGridComponent;
  let fixture: ComponentFixture<ClientAgGridComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAgGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientAgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
