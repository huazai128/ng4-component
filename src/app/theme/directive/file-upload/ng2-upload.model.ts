export class NgUploadOptions{ // 上传文件配置
  type?:"POST" | "PATCH"; // 上传方法| 二选一
  url:string; // 上传路径
  headers:Object; // 请求头配置
  params:Object; // 上传参数
}

// 响应
export class UploadResponse{
  index? : number;
  filename?: string;
  status?:number;
  response?: any;
  isAllUploaded?:boolean;
  progress?: number;
}

// 列队上传
export class QueueItem {
  file:any; // 当前图片信息
  options:NgUploadOptions; // 配置
  progress?: number;  // 进度
  status?: number; // 状态
  response?: any; // 响应
  isUploading?: boolean; // 判断是否正在上传
  preview?:any; //
  remove?:Function; // 删除
  start?:Function; // 上传
}

// 上传进度条
export class Progress {
  index: number;
  progress: number;
}
