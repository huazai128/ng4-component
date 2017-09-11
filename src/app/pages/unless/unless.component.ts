import { Component,ViewEncapsulation } from "@angular/core";
import { Hero,heroes } from "./unless.model"

@Component({
  selector:"app-unless",
  templateUrl:"./unless.html",
  styles:[require("./unless.scss")],
  encapsulation:ViewEncapsulation.Native
})

export class UnlessComponent{
  public heroes = heroes;
  public hero:Hero = this.heroes[0];
  public condition:boolean = false;

  public logs:string[] = [];
  public showSad:boolean = true;
  public status = 'ready';

  constructor(){}

  //
  public trackById(index:number,hero:Hero):number{
    return hero.id
  }
}
