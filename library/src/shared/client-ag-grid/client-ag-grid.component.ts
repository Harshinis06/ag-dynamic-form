import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry, RowSelectionMode, RowSelectionOptions } from 'ag-grid-community';
import { ColDef } from 'ag-grid-community';
import { GridApi } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-client-ag-grid',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './client-ag-grid.component.html',
  styleUrl: './client-ag-grid.component.scss'
})
export class ClientAgGridComponent {

  gridHeight = 0;

  gridAPI!: GridApi;

  @Input() rowData: any[] = [];

  @Input() colDefs: ColDef[] = [];

  paginationPageSize = 5;
  pagesizeoptions = [5, 10, 20, 50];

  ngOnChanges() {
    this.calculateGridHeight();
  }

  defaultColDef: ColDef = {
    sortable: true,
    flex: 1,
  }

  calculateGridHeight() {
    const rowCount = this.rowData.length || 0;
    const rowHeight = 50;
    const headerHeight = 50;

    const calculatedHeight = (rowCount * rowHeight) + headerHeight;

    this.gridHeight = Math.max(calculatedHeight, 300);
  }

  onGridReady(params: any) {
    this.gridAPI = params.api;
  }

  rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "multiRow",
  };
}
