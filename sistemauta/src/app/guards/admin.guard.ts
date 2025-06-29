// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {




    constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.isAdmin('ADMINISTRADOR')) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']); // Redirigir a una página de acceso no autorizado
      return false;
    }
  }


}
