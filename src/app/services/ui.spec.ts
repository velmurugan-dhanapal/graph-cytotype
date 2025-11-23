import { TestBed } from '@angular/core/testing';

import { UiService } from './ui';

describe('Ui', () => {
  let service: UiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
