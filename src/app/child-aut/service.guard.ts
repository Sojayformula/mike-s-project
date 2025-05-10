import { CanActivateChildFn } from '@angular/router';

export const serviceGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
