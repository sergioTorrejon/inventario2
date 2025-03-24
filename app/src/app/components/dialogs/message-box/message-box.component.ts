import {
  Component,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-box',
  template: `<h2 matDialogTitle>{{ data.titulo === undefined ? 'Alerta': data.titulo }}</h2>
  <mat-dialog-content>
    <div [innerHTML]="data.descripcion"></div>
    <div>
    <section class="example-section">
      <mat-checkbox class="example-margin" [(ngModel)]="checked">Estoy de acuerdo</mat-checkbox>
    </section>
  </div>

  </mat-dialog-content>
  <mat-dialog-actions align="end">

    <button mat-button mat-raised-button matDialogClose="confirm" color="primary"
      matTooltip="Aceptar y cerrar el mensaje" *ngIf="data.aceptarBtn&&this.checked"> Aceptar</button>
    <button mat-button mat-raised-button matDialogClose="cancel" color="warn" *ngIf="data.cancelarBtn">Cancelar</button>

  </mat-dialog-actions>`,
  //styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    checked = false;
}
