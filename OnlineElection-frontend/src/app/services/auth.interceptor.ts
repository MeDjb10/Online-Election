import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  console.log('Interceptor: Token:', token); // Add logging
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    console.log('Interceptor: Cloned Request:', cloned); // Add logging
    return next(cloned);
  } else {
    return next(req);
  }
};
