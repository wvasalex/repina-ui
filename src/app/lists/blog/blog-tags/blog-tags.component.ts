import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ListsService } from '../../lists.service';
import { BlogTagsService } from '../blog-tags.service';

@Component({
  selector: 'r-blog-tags',
  templateUrl: './blog-tags.component.html',
  styleUrls: ['./blog-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ListsService,
      useClass: BlogTagsService,
    }
  ]
})
export class BlogTagsComponent implements OnInit {

  constructor(private listsService: ListsService) { }

  ngOnInit(): void {
    this.listsService.resolve('blog-tags').subscribe();
  }

}
