import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAuthenticateErrorImgComponent } from './show-authenticate-error-img.component';

describe('ShowAuthenticateErrorImgComponent', () => {
  let component: ShowAuthenticateErrorImgComponent;
  let fixture: ComponentFixture<ShowAuthenticateErrorImgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAuthenticateErrorImgComponent]
    });
    fixture = TestBed.createComponent(ShowAuthenticateErrorImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
