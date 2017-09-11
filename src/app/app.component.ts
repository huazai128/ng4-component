import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';


@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  template: `
    <a routerLink="/pages/upload">文件上传</a>
    <a routerLink="/pages/dynamic">动态组件</a>
    <a routerLink="/pages/unless">结构属性</a>
    <a routerLink="/pages/editor">编辑器</a>
    <a routerLink="/pages/fullpage">插件Fullpage</a>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {


  constructor(
    public appState: AppState
  ) {
    console.log($);
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

