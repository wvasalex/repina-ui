import { Component, OnInit } from '@angular/core';
import { MenuService } from '@shared/menu/menu.service';
import { Observable } from 'rxjs';
import { MenuItem } from '@shared/menu/menu.model';
import { ContentBlock } from '@shared/types';

@Component({
  selector: 'r-menu-editor',
  templateUrl: './menu-editor.component.html',
  styleUrls: ['./menu-editor.component.scss']
})
export class MenuEditorComponent implements OnInit {

  public menu$: Observable<ContentBlock[]> = this.menuService.get();

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {

  }

}
