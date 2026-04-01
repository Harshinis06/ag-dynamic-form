import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <a href="#" (click)="onDelete($event)">Delete</a> `,
})
export class DeleteCellRenderer implements ICellRendererAngularComp {
    params: any;
    agInit(params: ICellRendererParams): void {
        this.params = params;
    }
    refresh(): boolean {
        return false;
    }

    onDelete(event:Event) {
        event.preventDefault();
        this.params.onDelete(this.params.data);
    }
}