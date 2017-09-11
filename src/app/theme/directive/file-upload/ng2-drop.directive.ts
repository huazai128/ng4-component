import { Directive,ElementRef,Renderer,HostListener,Output,EventEmitter } from "@angular/core";
import { FileUploadService } from "./ng2-upload.service";

@Directive({
  selector:"[ng2UploadDrop]"
})

export class NgUploadDrop{

  private isUploadBottom:boolean = false;
  @Output() onFileOver:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onFileDrop:EventEmitter<File[]> = new EventEmitter<File[]>();

  constructor(private el:ElementRef,
              private _server:FileUploadService){}

  // 拖拽事件
  @HostListener("drop",['$event'])
  onDropHandler($event):void{
    const transfer = this._getTransfer($event);
    console.log(transfer);
    if(this._havaFile(transfer)){
      return;
    }

    this._preventAndStop($event); //  阻止事件冒泡
    this._server.addFiles((<any>transfer).files);
    this.onFileDrop.emit((<any>transfer).files);
  }

  @HostListener("dragleave")
  onDragOverLeave($event):void{
    this.onFileOver.emit(false);
  }

  @HostListener("dragover")
  onDragOverHandler($event):void{
    const transfer = this._getTransfer(event);
    if(!this._havaFile((<any>transfer).types)){
      return
    }
    this.onFileOver.emit(true);
    console.log("====")
  }

  // 阻止事件冒泡
  private _preventAndStop(event:any):any{
    event.preventDefault();
    event.stopPropagation();
  }

  // DataTransfer 对象用来保存被拖动的数据
  private _getTransfer(event):void{
    return event.dataTransfer ? event.dataTransfer :event.originalEvent.dataTransfer;
  }

  //
  private _havaFile(types:any):any{
    console.log(types);
    if(!types){
      return false;
    }
    if(types.indexOf){
      return types.indexOf("Files") != -1
    }else if(types.contains){
      return types.contains("Files");
    }else{
      return false;
    }
  }
}
