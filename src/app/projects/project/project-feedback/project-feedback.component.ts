import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseBlock } from '@shared/blocks/block.component';
import { SelectOption } from '@shared/components/select/select.model';
import { ContentListItem } from '../../../lists/lists.model';
import { ListsService } from '../../../lists/lists.service';

@Component({
  selector: 'r-project-feedback',
  templateUrl: './project-feedback.component.html',
  styleUrls: ['./project-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFeedbackComponent extends BaseBlock implements OnInit {

  public comment: ContentListItem;

  public feedbacks$ = this.listsService.resolve('feedback')
    .pipe(map((feedbacks: ContentListItem[]) => {
      return feedbacks.map((comment: ContentListItem) => {
        return {
          value: comment.props.text,
          label: comment.props.name + ' ' + comment.props.quote,
          meta: comment,
        };
      });
    }));

  constructor(
    private listsService: ListsService,
  ) {
    super();
  }

  public ngOnInit() {
    const feedback = this.$parseValue(this.props.feedback)[0];
    if (feedback) {
      this.comment = feedback.meta;
    }
  }

  public $valueChanged(value: SelectOption[]) {
    this.props.feedback = JSON.stringify(value.slice(-1));
  }

  public $parseValue(json: string): SelectOption[] {
    return this.props.feedback ?
      JSON.parse(this.props.feedback) :
      [];
  }

}
