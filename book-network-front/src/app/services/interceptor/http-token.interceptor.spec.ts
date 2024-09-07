import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { httpTokenInterceptor } from './http-token.interceptor';

describe('HttpTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      httpTokenInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: HttpInterceptorFn = TestBed.inject(httpTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
