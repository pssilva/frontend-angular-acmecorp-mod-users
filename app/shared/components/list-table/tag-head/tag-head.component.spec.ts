import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagHeadComponent } from './tag-head.component';

describe('TagHeadComponent', () => {
  let component: TagHeadComponent;
  let fixture: ComponentFixture<TagHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagHeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
