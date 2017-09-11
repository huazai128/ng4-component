import { Component } from "@angular/core";
import { DynamicService } from "./dynamic.service";
import { AdItem } from "./dynamic.model";

@Component({
  selector:"app-dynamic",
  template:`
    <div>
      <h2>hua</h2>
      <app-ad [ads]="ads"></app-ad>
    </div>
  `
})

export class DynamicComponent{

  public ads:AdItem[] = [];

  constructor(private service:DynamicService){}

  ngOnInit(){
    this.ads = this.service.getAds();
  }
}


