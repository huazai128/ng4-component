import { Component,ViewEncapsulation } from "@angular/core";

@Component({
  selector:"app-pages",
  template:`<router-outlet></router-outlet>`,
  encapsulation:ViewEncapsulation.None
})
export class PagesComponent{

}

