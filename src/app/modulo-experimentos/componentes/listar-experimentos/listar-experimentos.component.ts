import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi, Constants, ColumnApi } from 'ag-grid-community';
import { Observable } from 'rxjs';

import { ExperimentosServiceService } from './../../services/experimentos-service.service';
import { compararFechas, dateFormat } from 'src/app/generic-functions/ag-grid-functions';
import { BotonVerExperimentoComponent } from '../boton-ver-experimento/boton-ver-experimento.component';

const OPTIONDATE = { day: '2-digit', month: '2-digit', year: 'numeric' } as Constants;

@Component({
  selector: 'app-listar-experimentos',
  templateUrl: './listar-experimentos.component.html',
  styleUrls: ['./listar-experimentos.component.scss']
})
export class ListarExperimentosComponent  {
  public columnDefs: ColDef[] = [ {
      headerName: "ESPECTROMETRO",
      field: "espectrometro"
    }, {
      headerName: "SONDA",
      field: "sonda"
    }, {
      headerName: "MUESTRA",
      field: "muestra"
    }, {
      headerName: "SOLICITUD",
      field: "solicitud"
    }, {
      headerName: "USUARIO (ENTRADA)",
      field: "usuario_entrada"
    }, {
      headerName: "FECHA (ENTRADA)",
      field: "fecha_entrada",
      filter: "agDateColumnFilter",
      valueFormatter: dateFormat,
      filterParams: {
        comparator: compararFechas,
        newRowsAction: 'keep'
      },
      suppressMenu: true
    }, {
      headerName: "",
      field: "completo",
      suppressMenu: true,
      filter: false,
      minWidth: 25,
      maxWidth: 25,
      width: 25,
      cellStyle: function (params) {
        if (params.value)
          return { backgroundColor: 'green', color: 'green' };
        else
          return { backgroundColor: 'red', color: 'red' };
      },
    }, {
      headerName: "USUARIO (SALIDA)",
      field: "usuario_salida"
    }, {
      headerName: "FECHA (SALIDA)",
      field: "fecha_salida",
      filter: "agDateColumnFilter",
      valueFormatter: dateFormat,
      filterParams: {
        comparator: compararFechas,
        newRowsAction: 'keep'
      },
      suppressMenu: true
    }, {
      headerName: "VER",
      filter: false,
      pinned: "right",
      field: "value",
      cellRenderer: BotonVerExperimentoComponent,
      colId: "params",
      width: 100,
      minWidth: 100
    }
  ];

  public defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    filterParams: {
      caseSensitive: false,
      newRowsAction: 'keep'
    },
    resizable: true,
    sortable: true,
    minWidth: 100,
    floatingFilter: true
  };

  public rowData$!: Observable<any[]>;
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(
    private apiExperimento: ExperimentosServiceService,
  ) {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData$ = this.apiExperimento.getExperimentos$();
    this.getFiltros();
  }

  getFiltros() {
    if (localStorage.getItem('ColumnStateExperimentos') != "" && localStorage.getItem('ColumnStateExperimentos') != null) {
      const columnStateToken = JSON.parse(localStorage.getItem('ColumnStateExperimentos')!);
      this.gridColumnApi.applyColumnState({
        state: columnStateToken,
        applyOrder: true,
      });
    }

    if (localStorage.getItem('FilterModelExperimentos') != "" && localStorage.getItem('FilterModelExperimentos') != null) {
      const filterModelToken: string = JSON.parse(localStorage.getItem('FilterModelExperimentos')!);
      this.gridApi.setFilterModel(filterModelToken);
    }
  }

  onFilterChanged(_value) {
    this.guardar();
  }

  resetearFiltros() {
    localStorage.setItem('ColumnStateExperimentos', "");
    localStorage.setItem('FilterModelExperimentos', "");
    localStorage.setItem('SortModelExperimentos', "");

    this.gridColumnApi.applyColumnState({
      defaultState: { sort: null },
    });

    this.gridApi.setFilterModel(null);
  }

  onBtExport() {
    var params = {
      processCellCallback: function (param) {
        var valor = param.value;
        if (param.value) {
          switch (param.column.colDef.field) {
            case "fecha_entrada":
              valor = new Date(param.value).toLocaleDateString('es-ES', OPTIONDATE);
              break;
            case "fecha_salida":
              valor = new Date(param.value).toLocaleDateString('es-ES', OPTIONDATE);
              break;
            default:
              return param.value;
          }
        }
        return valor;
      }
    }
    this.gridApi.exportDataAsCsv(params);
  }

  private guardar() {
    localStorage.setItem('ColumnStateExperimentos', JSON.stringify(this.gridColumnApi.getColumnState()));
    localStorage.setItem('FilterModelExperimentos', JSON.stringify(this.gridApi.getFilterModel()));
  }
}
