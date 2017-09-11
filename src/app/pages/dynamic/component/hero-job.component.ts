import { Component,Input } from "@angular/core";
import { AdComponent } from "../dynamic.model";

@Component({
  template:`
    <div class="job-ad">
      <h4>{{data.headline}}</h4>
      {{data.body}}
    </div>
  `
})

export class HeroJobComponent implements AdComponent{
  @Input() data:any;
}
