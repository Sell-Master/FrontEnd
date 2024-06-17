import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { CustomersComponent } from '../customers/customers.component';
import { ProductsComponent } from '../products/products.component';
import { SalesComponent } from '../sales/sales.component';
import { SellsComponent } from '../sells/sells.component';
import { EmployeesComponent } from '../employees/employees.component';
import { InventoryComponent } from '../inventory/inventory.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    MenuModule,
    PanelMenuModule,
    CustomersComponent,
    ProductsComponent,
    SalesComponent,
    SellsComponent,
    EmployeesComponent,
    InventoryComponent
  ]
})
export class HomeComponent implements OnInit {
  sidebarVisible: boolean = false;
  items: MenuItem[] = [];
  activeSection: string = 'home';

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Administrator',
        expanded: true,
        items: [
          { label: 'Employees', icon: 'pi pi-fw pi-users', command: () => this.changeSection('employees') },
          { label: 'Products', icon: 'pi pi-fw pi-box', command: () => this.changeSection('products') },
          { label: 'Sells', icon: 'pi pi-fw pi-shopping-cart', command: () => this.changeSection('sells') },
          { label: 'Inventory', icon: 'pi pi-fw pi-briefcase', command: () => this.changeSection('inventory') }
        ]
      },
      {
        label: 'Reports',
        expanded: true,
        items: [
          { label: 'Sales', icon: 'pi pi-fw pi-chart-bar', command: () => this.changeSection('sales') }
        ]
      }
    ];
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  changeSection(section: string) {
    this.activeSection = section;
  }
}
