import { Injectable } from "@angular/core"
import { AdItem } from "./dynamic.model";
import { HeroJobComponent,HeroProfileComponent } from "./component"

@Injectable()
export class DynamicService{

  constructor(){}

  getAds(){
    return[
      new AdItem(HeroProfileComponent, {name: 'dada', bio: 'Brave as they come'}),
      new AdItem(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come'}),
      new AdItem(HeroJobComponent,   {headline: 'Hiring for several positions',
        body: 'Submit your resume today!'}),
      new AdItem(HeroJobComponent,   {headline: 'Openings in all departments',
        body: 'Apply today'}),
    ]
  }
}
