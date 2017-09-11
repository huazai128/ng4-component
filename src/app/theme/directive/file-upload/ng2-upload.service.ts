import { Injectable } from "@angular/core";
import { Subject,Observable,Subscription } from "rxjs";
import { NgUploadOptions,UploadResponse,Progress,QueueItem } from "./ng2-upload.model";
import { NgUploadInterface } from "./ng2-upload.interface";

@Injectable()
export class FileUploadService implements NgUploadInterface{ // 实现接口，必须调用里面的方法
  public queue:QueueItem[] = []; // 上传文件列队；
  private options:NgUploadOptions; // 上传配置
  private tempQueue:QueueItem[] = []; //
  private _interveller:any; //
  private currentUpload:number; // 当前上传文件在数组中的下标
  private allUploadFlag:boolean; // 判断是否正在上传所有文件
  private xhr:XMLHttpRequest; // XML请求
  private uploadSource:Subject<UploadResponse> = new Subject<UploadResponse>(); // 上传资源
  private progressSource:Subject<Progress> = new Subject<Progress>(); // 进度

  constructor(){
    this.options = {
      url:"",
      headers:{},
      params:{},
    };
  }

  // 上传文件配置
  setOptions(options:NgUploadOptions):void{
    this.options = options;
  }

  // 单个文件
  addFile(file:File,options?:NgUploadOptions):void{
    this.queue.push({  // 添加到列队中
      file:file,
      options:this.setFileOptions(options)
    });
    this.configurePrototypes();
    this.extractDataURLs();
  }

  // 进度条
  onProgress(): Observable<Progress> {
    return this.progressSource.asObservable();
  }

  // 多个文件
  addFiles(files:File[],options?:NgUploadOptions):void{
    for(let i = 0; i < files.length; i++){
      this.queue.push({
        file:files[i],
        options:this.setFileOptions(options)
      })
    }
    this.configurePrototypes(); // 给每个元素添加删除和上传方法
    this.extractDataURLs(); // 使图片生成路径
  }

  // 删除
  removeFile(index:number):void{
    // 判断图片是否上传
    if(this.currentUpload === index){
      this.cancelUpload(); // 终止上传
    }
    if(this.queue[index]){
      this.queue.splice(index,1);
    }

    if(this.currentUpload >= 0 && this.allUploadFlag){
      this.uploadAll(); // 上传所有
    }
    this.configurePrototypes();
  }

  // 上传所有
  uploadAll():void{
    if(this.queue.length >= 0){
      this.allUploadFlag = true;
      this.uploadQueue(0,true);
    }
  };

  // 单个上传
  uploadOne(index:number):void{
    if(this.queue[index]){
      this.uploadQueue(index,false,false);
    }
  };

  // 上传文件
  uploadFile(file:any,options?:NgUploadOptions):void{
    this.tempQueue = this.queue;
    this.queue = []; // 清空列队
    this.queue.push({
      file:file,
      options:this.setFileOptions(options)
    });
    this.uploadQueue(0,false,true)
  };

  // 清除列队
  clearQueue():void{
    this.cancelUpload(); // 取消上传
    this.currentUpload = undefined;
    this.queue = [];
  };

  // 通知
  notifier():Observable<UploadResponse>{
    return this.uploadSource.asObservable();
  };

  // 设置文件配置
  private setFileOptions(options:NgUploadOptions):NgUploadOptions{
    const opt:NgUploadOptions = this.options || options;
    if(options){
      return options;
    }else{
      return this.options;
    }
  };

  // 配置原型
  private configurePrototypes():void{
    (this.queue || []).forEach((q,i) => {
      q.remove = () => {this.removeFile(i)}; // 在每个图片中添加删除和上传的功能
      q.start = () => {this.uploadOne(i)}; // 上传
    })
  }

  // 取消上传
  private cancelUpload():void{
    if(this.currentUpload >= 0){
      this.xhr.abort(); // 终止上传
    }
  }

  // 上传文件
  private uploadQueue(index:number,allFlag:boolean,resetQ?: boolean):void{
    if(!this.queue[index]) return;
    // 判断是否正在上
    if(this.queue[index].isUploading){
      return null;
    }
    const formData:FormData = new FormData(); //它可以更灵活方便的发送表单数据
    this.xhr = new XMLHttpRequest();
    console.log(this.queue[index].options.type);
    this.xhr.open(this.queue[index].options.type || 'POST',this.queue[index].options.url,true); // 发送请求
    formData.append("file",this.queue[index].file); // 添加发送字段

    this.xhr.onload = () => {
      console.log(this.xhr.responseText);
      this.queue.splice(index,1);
    }
    Object.keys(this.queue[index].options.params).forEach((k) => {
      if(this.queue[index].options.params[k]){
        formData.append(k,this.queue[index].options.params); // 参数
      }
    });
    Object.keys(this.queue[index].options.headers).forEach((k) => {
      if(this.queue[index].options.headers[k]){
        this.xhr.setRequestHeader(k,this.queue[index].options.headers[k]); // 请求头
      }
    });

    this.xhr.onreadystatechange = () => {
      if(this.xhr.readyState === 4 && this.xhr.status === 200){
        const res = this.xhr.response;
        if(resetQ){
          this.queue = this.tempQueue;
          this.tempQueue = [];
        }
        this.queue[index].response = res;
        this.queue[index].status = 1;
        if((allFlag) && this.queue[index+1]){
          this.uploadQueue(index +1,allFlag,resetQ); // 递归
        }
        this.currentUpload = null;
        this.uploadSource.next({
          index:index,
          filename:this.queue[index].file.name,
          status:this.xhr.status,
          response:res,
          isAllUploaded:this.queue[index+1] ? false : true
        });
      }
    };

    // 监听进度
    this.xhr.upload.onprogress = (event) => {
      this.queue[index].progress = Math.round(event.loaded / event.total * 100);
      this.progressSource.next({
        index:index,
        progress:this.queue[index].progress
      })
    };
    this.interveller();
    //
    this.queue[index].isUploading = true;
    this.currentUpload = index;
    this.xhr.send(formData);

  }

  //x
  private interveller():void{
    this._interveller = setInterval(() => {},10)
  }

  // 异步读取文件
  private extractDataURLs():void{
    // 文件格式
    const validExts:any[] = ['jpg','jpeg','svg','png','gif'];
    (this.queue || []).forEach((q,i) => {
      const name:any = q.file.name.split(".");
      if(validExts.indexOf(name[name.length - 1]) >= 0){
        const reader:FileReader = new FileReader(); // 读取本地文件
        reader.addEventListener("load", () => { // 加载成功
          q.preview = reader.result;
        });
        reader.readAsDataURL(q.file);
      }
    })
  }

  //
  private clearInterveller():void{
    clearInterval(this._interveller);
  }

}
