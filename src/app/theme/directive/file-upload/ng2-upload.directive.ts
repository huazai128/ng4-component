import { Directive,ElementRef } from "@angular/core"; // Renderer2：类似于jquery
import { FileUploadService } from "./ng2-upload.service";
@Directive({
  selector:"[ng2Upload]"  // 必须使用[]
})

export class NgUploadDirective{

  private isUploadButton:boolean = false;

  constructor(private el:ElementRef,
              private _service:FileUploadService){ // this.el 只当前指令注入的元素
    this.isValidButton();
    this.el.nativeElement.addEventListener("change",this.onChange.bind(this));
  }

  // 监听input的改变
  private onChange() {
    const files = this.el.nativeElement.files;
    this._service.addFiles(files); // 多文件添加
    this.reset();
  }

  // 重置
  private reset():void{
    this.el.nativeElement.value = "";
  }


  private isValidButton(): void{
    const ele:ElementRef = this.el.nativeElement;
    if(ele instanceof  HTMLInputElement && Object.is((ele.type),"file")){
      this.isUploadButton = true;
    }
  }

  //
}
