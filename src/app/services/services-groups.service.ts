import { Injectable } from '@angular/core';
import { JournalTagsService } from '../journal/journal-tags.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesGroupsService extends JournalTagsService {

  public config: ApiConfig = {
    path: '/service_tag_groups/',
  };

  public type: BehaviorSubject<string> = new BehaviorSubject<string>('services-groups');

}
