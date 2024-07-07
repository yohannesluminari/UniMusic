import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YohannesLuminariComponent } from './yohannes-luminari.component';

describe('YohannesLuminariComponent', () => {
  let component: YohannesLuminariComponent;
  let fixture: ComponentFixture<YohannesLuminariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YohannesLuminariComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YohannesLuminariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
