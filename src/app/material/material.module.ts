import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule,
         MatListModule, MatMenuModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
         MatSortModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    MatTabsModule,
    MatSidenavModule,

  ],
  exports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialModule { }
