import { Directive,Input,ViewContainerRef,TemplateRef, } from "@angular/core";

@Directive({
    selector:'[myUnless]'
})

export class UnlessDirective{
    private hasView = false;

    constructor(private templateRef:TemplateRef<any>,
        private viewContainer: ViewContainerRef){}

    @Input() set myUnless(condition:boolean){
        if(!condition && !this.hasView){
            // 实例化基础上的嵌入视图`templateRef`并将其插入到在指定这个容器中
            this.viewContainer.createEmbeddedView(this.templateRef)
            this.hasView = true;
        }else if(condition && this.hasView){
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}