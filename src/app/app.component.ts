import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // Asegúrate de importar este módulo
import { ConfirmationService } from 'primeng/api'; // Y este servicio
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [CommonModule, RouterModule,ConfirmDialogModule],
  providers: [ConfirmationService, MessageService]
})

export class AppComponent {
  title = 'SellMaster';
}
