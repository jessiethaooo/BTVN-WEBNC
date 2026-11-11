import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Kiểm tra trạng thái trong localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    return true; // Cho phép vào
  } else {
    alert ('Bạn chưa đăng nhập! Ai cho mà vào?')
  }
  router.navigate(['/login']); 
  return false;
};