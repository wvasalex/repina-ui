import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ContentBlock } from '@shared/types';
import { AgencyService } from './agency.service';

@Component({
  selector: 'r-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyComponent implements OnInit {
  public render = this.agencyService.render;

  public content_blocks: ContentBlock[] = [
    {
      block_type: 'agency-primary',
      props: {},
      content_elements: [],
    },
    {
      block_type: 'agency-achievements',
      props: {},
      content_elements: [],
    },
    {
      block_type: 'agency-repina',
      props: {},
      content_elements: [],
    },
    {
      block_type: 'agency-team',
      props: {},
      content_elements: [],
    },
    {
      block_type: 'agency-awards',
      props: {},
      content_elements: [],
    },
    {
      block_type: 'agency-feedback',
      props: {},
      content_elements: [],
    }
  ];

  constructor(private agencyService: AgencyService) {
  }

  ngOnInit(): void {
  }

}
