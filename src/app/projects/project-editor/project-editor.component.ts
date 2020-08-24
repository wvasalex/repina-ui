import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SelectOption } from '@shared/components/select/select.model';
import { ProjectsService } from '../projects.service';
import { Project } from '../projects.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '@shared/toaster/toaster.service';
import { ContentBlock, ContentElement, StrMap } from '@shared/types';

@Component({
  selector: 'r-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEditorComponent implements OnInit {
  public project: Project;

  public render = this.projectsService.render;

  public availableElements: SelectOption[] = [
    { value: 'blank', label: 'Пустой' },
    { value: 'project-text', label: 'Текст' },
    { value: 'project-image', label: 'Изображение' },
    { value: 'project-quote', label: 'Цитата' },
    { value: 'project-video', label: 'Видео' },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private projectsService: ProjectsService,
    private toasterService: ToasterService) {
  }

  public ngOnInit(): void {
    const snapshot = this.activatedRoute.snapshot;
    this.project = snapshot.data.project || {};

    if (!this.project.content_blocks?.length) {
      this.project.content_blocks = [
        {
          block_type: 'project-root',
          props: {},
          content_elements: [],
        },
      ];
    }

    console.log(this.project);
  }

  public $addBlock(e: StrMap<any>) {
    const { target, offset } = e;
    const index = this.project.content_blocks.indexOf(target) + offset;

    this.project.content_blocks.splice(index, 0, {
      block_type: 'project-block',
      props: {
        title: '',
        subtitle: '',
      },
      content_elements: [
        {
          element_type: 'blank',
          props: {},
        },
        {
          element_type: 'blank',
          props: {},
        },
      ],
    });
  }

  public $save() {
    this._save();
  }

  private _save() {
    if (!this.project.title) {
      alert('Название статьи обязательно!');
      return;
    }

    if (this.project.content_blocks[0].content_elements[0]?.content_file) {
      this.project.preview_file = this.project.content_blocks[0].content_elements[0]?.content_file;
    }

    this.project.content_blocks.forEach((block: ContentBlock, index: number) => {
      block.position = index;

      block.content_elements.forEach((element: ContentElement, elementIndex: number) => {
        element.position = elementIndex;

        if (element.hasOwnProperty('content_file')) {
          delete element.content_file;
        }
      });
    });

    const req = this.projectsService.save(this.project).toPromise().then((a: Project) => {
      if (a.slug != this.project.slug) {
        this.router.navigate(['/projects', a.slug, 'edit']);
      } else {
        this.project = a;
        this.changeDetectorRef.detectChanges();
      }
    });

    this.toasterService.wrapPromise(req, 'Сохранено', 'Не удалось сохранить');
  }
}
