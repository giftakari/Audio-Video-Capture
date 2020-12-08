import { TestBed } from '@angular/core/testing';

import { AudiorecordService } from './audiorecord.service';

describe('AudiorecordService', () => {
  let service: AudiorecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudiorecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
