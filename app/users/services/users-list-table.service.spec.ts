import { TestBed } from '@angular/core/testing';

import { UsersListTableService } from './users-list-table.service';

describe('UsersListTableService', () => {
  let service: UsersListTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersListTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
