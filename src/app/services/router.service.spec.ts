import { Router } from '@angular/router';

import { RouterService } from './router.service';

describe('RouterService', () => {
  let service: RouterService;
  const router = <Router>{};
  beforeEach(() => {
    service = new RouterService(router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
