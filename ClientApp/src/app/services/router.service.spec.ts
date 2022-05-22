/* eslint-disable no-unused-vars */
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { RouterService } from './router.service';

describe('RouterService', () => {
  let service: RouterService;
  const events = of();
  const router = jasmine.createSpyObj('Router', ['events', 'pipe', 'filter', 'subscribe']);
  router.events = events;
  beforeEach(() => {
    service = new RouterService(router);
  });

  it('should be created', () => {
    const spy = spyOn<RouterService>(router, 'events' as never);
    expect(service).toBeTruthy();
  });
});
