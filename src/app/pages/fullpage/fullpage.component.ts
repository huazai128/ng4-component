import { Component,ViewEncapsulation,Input,Output } from "@angular/core";
import { FullpageService,MnFullPageOptions } from "../../theme"

@Component({
  selector:"app-fullpage",
  templateUrl:"./fullpage.html",
  styleUrls:["./fullpage.scss"],
  encapsulation:ViewEncapsulation.None,
  providers:[FullpageService]
})
export class FullpageComponent{
  constructor(private fullpageService:FullpageService){}


  // @Input() public options: MnFullPageOptions = new MnFullPageOptions({
  //   controlArrows: false,
  //   scrollingSpeed: 1000,
  //
  //   menu: '.menu',
  //   css3: true,
  //   anchors: [
  //     'menuAnchor1', 'menuAnchor2', 'menuAnchor3',
  //     'menuAnchor4', 'menuAnchor5', 'menuAnchor6'
  //   ]
  // });
  //
  // @Output() public templates = {
  //   install: require('raw-loader!./templates/install.template.txt'),
  //   usage: {
  //     slides: {
  //       module: require('raw-loader!./templates/usage/slides/slide1/module.template.txt'),
  //       html: require('raw-loader!./templates/usage/slides/slide2/html.template.txt')
  //     }
  //   },
  //   configuration: {
  //     slides: {
  //       attributes: require('raw-loader!./templates/configurartion/slides/slide1/usage.attributes.slide.template.txt'),
  //       classOptions: require('raw-loader!./templates/configurartion/slides/slide2/usage.class.options.template.txt'),
  //       mix: require('raw-loader!./templates/configurartion/slides/slide3/usage.mix.template.txt')
  //     }
  //   },
  //   service: require('raw-loader!./templates/service.tempalte.txt'),
  // };

}
