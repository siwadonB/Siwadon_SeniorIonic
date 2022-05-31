import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Result1Page } from './result1.page';

describe('Result1Page', () => {
  let component: Result1Page;
  let fixture: ComponentFixture<Result1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Result1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Result1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
