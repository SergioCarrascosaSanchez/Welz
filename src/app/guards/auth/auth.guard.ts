import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const token: string = localStorage.getItem('token');
  if (token === null || token.length < 1) {
    router.navigate(['/auth']);
    return false;
  }
  return true;
};
