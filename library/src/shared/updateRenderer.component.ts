import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <a href="#" (click)="edit($event)">Update</a> `,
})

export class UpdateRenderer  implements ICellRendererAngularComp {
    params: any;
     agInit(params:any):void{
        this.params =params;
     }

      refresh(): boolean {
        return false;
    }

    edit(event:Event) {
        event.preventDefault();
        this.params.onEdit(this.params.data);
    }
}