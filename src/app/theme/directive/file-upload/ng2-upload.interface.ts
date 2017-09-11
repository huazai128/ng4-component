import { NgUploadOptions } from "./ng2-upload.model";

export interface NgUploadInterface{
  setOptions(options:NgUploadOptions); // 设置配置
  addFile(file:any,options?:NgUploadOptions); // 单个文件文件zengjia
  addFiles(file:any[],options?:NgUploadOptions); // 多个文件增加
  removeFile(index:number); // 删除
  uploadAll(); // 上传所有
  uploadOne(index:number); // 单个上传
  uploadFile(file:any,options?:NgUploadOptions); // 上传文件
  clearQueue();
  notifier();
}
