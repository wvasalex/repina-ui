import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiConfig } from '@shared/services/api/api.model';
import { JournalTagsService } from '../journal/journal-tags.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesGroupsService extends JournalTagsService {

  public config: ApiConfig = {
    path: '/service_tag_groups/',
  };

  public type: BehaviorSubject<string> = new BehaviorSubject<string>('services-groups');

}
