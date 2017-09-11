import {Component, ViewEncapsulation, Renderer, ElementRef, ViewChild} from "@angular/core";
import { FileUploadService,NgUploadOptions,QueueItem } from "../../theme/directive/file-upload";

@Component({
  selector:"app-upload-file",
  templateUrl: "./upload.html",
  styles: [require("./upload.scss")],
  encapsulation:ViewEncapsulation.None,
  providers:[FileUploadService]
})

export class UploadFileComponent{

  public images:number[];


  public config:Object = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30
  }

  @ViewChild("file") file:ElementRef; //

  public options:NgUploadOptions; // 配置文献
  public queue:QueueItem[] = []; //

  constructor(private uploadService:FileUploadService,private render:Renderer){
    this.options = {
      url:"http://localhost:8080/images",
      headers:{ // 请求头配置
        'Authorization': 'Bearer somekey',
        'Accept': 'application/json'
      },
      params:{  // 上传参数
        'title': 'sometitle',
        'type': 'image'
      }
    };
    this.uploadService.setOptions(this.options); // 上传配置
    this.getQueue();
  }

  // 初始化
  ngOnInit(){
    this.images = [1,2,3,4,5]
  }

  // 获取文件上传列队
  private getQueue():void{
    this.queue = this.uploadService.queue;
    console.log(this.queue);
  }

  // 选择文件上传
  public selectFiles():void{
    // 调用元素中的方法
    this.render.invokeElementMethod(this.file.nativeElement, "click")
  }

  // 上传所有
  public uploadAll():void{
    this.uploadService.uploadAll();
  }

  // 删除列队
  public clearQueue():void{
    this.uploadService.clearQueue();
  }

  // 更新
  uploadFiles():void{
    let files:any = this.file.nativeElement.files;
    if (files.length > 0) {
      for ( let i = 0; i < files.length; i++) {
        this.uploadService.addFile(files[0], this.options);
      }
    }
    this.file.nativeElement.value = '';
  }

}
