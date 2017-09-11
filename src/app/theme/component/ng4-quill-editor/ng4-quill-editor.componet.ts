import { Component,
    ViewEncapsulation,
    Input,
    Output,
    ElementRef,
    EventEmitter,
    SimpleChanges,
    forwardRef,
    OnChanges } from "@angular/core";

// 用于ngModel的双向绑定
import { NG_VALUE_ACCESSOR,ControlValueAccessor } from "@angular/forms";

const Quills = require('quill');

import { StringMap,RangeStatic,DeltaStatic,Sources,Quill as QuillType } from "quill";

@Component({
    selector:"ng4-quill",
    template:`<div class="quill-editor"></div>`,
    styles:[require("./ng4-quill-editor.scss")],
    providers:[{
        provide:NG_VALUE_ACCESSOR,
        useExisting:forwardRef(() => QuillEditorComponent),
        multi: true
    }],
    encapsulation:ViewEncapsulation.None
})

export class QuillEditorComponent implements ControlValueAccessor{

  // 数据配置
  quillEditor:QuillType;
  editorElem:HTMLElement; // 当前编辑元素
  content:string;

  // 传入配置
  @Input() options:Object; // 配置

  // 派发事件
  @Output() blur:EventEmitter<QuillType> = new EventEmitter();
  @Output() focus:EventEmitter<QuillType> = new EventEmitter();
  @Output() ready:EventEmitter<QuillType> = new EventEmitter();
  @Output() change:EventEmitter<{editor: QuillType, html: String, text: String}> = new EventEmitter();

  //
  defaultModules:StringMap = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  onModalChange:Function = () => {};
  onModalTouched:Function = () => {};

  constructor(private el:ElementRef){}

  ngOnInit(){
  }

  // 视图初始化之后执行
  ngAfterViewInit(){
    // this.el 指向当前自定义组件的元素
    this.editorElem = this.el.nativeElement.children[0];

    this.quillEditor = new Quills(this.editorElem,Object.assign({
      modules:this.defaultModules, // 模块，用于制定Quill的功能和方法
      placeholder:'Insert text here ...',
      readOnly:false,
      theme:'snow',
      boundary: document.body,
    },this.options || {}));

    // 写入内容
    if(this.content){
      this.quillEditor.clipboard.dangerouslyPasteHTML(this.content)
    }

    this.ready.emit(this.quillEditor);

    // 监听选择项的变化，
    this.quillEditor.on("selection-change",(range:RangeStatic) => {
      if(!range){
        this.onModalTouched();
        this.blur.emit(this.quillEditor);// 失去焦点
      }else{
        this.focus.emit(this.quillEditor); // 获取焦点
      }
    });

    // 监听编辑内容的变化
    this.quillEditor.on("text-change",(dalta:DeltaStatic,oldDelta:DeltaStatic,source:Sources) => {
      let html = this.editorElem.children[0].innerHTML; // 获取输入的内容；
      const text = this.quillEditor.getText();
      if(html === '<p><br></p>') html = null;
      this.onModalChange(html);
      this.change.emit({
        editor:this.quillEditor,
        html:html,
        text:text
      })
    })
  }

  // 数据已经实现双向绑定，可以通过ngOnChanges 来监听数据的改变
  ngOnChanges(changes:SimpleChanges){
    if(changes['readyOnly'] && this.quillEditor){
      this.quillEditor.enable(!changes['readyOnly'].currentValue)
    }
  }

  // 写入数据
  writeValue(currentValue:string){
    this.content = currentValue;
    if(this.quillEditor){
      if(currentValue){
        this.quillEditor.clipboard.dangerouslyPasteHTML(currentValue);//
        return ;
      }
      this.quillEditor.setText('');
    }
  }

  // 注册事件，用于监听值的改变
  registerOnChange(fn:Function){
    this.onModalChange = fn;
  }

  // 注册事件
  registerOnTouched(fn:Function){
    this.onModalTouched = fn;
  }


}

