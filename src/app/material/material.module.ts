import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule,
         MatListModule, MatMenuModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
         MatSortModule, MatTableModule, MatSelectModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    MatSelectModule,
    MatTabsModule,
    MatSidenavModule,

  ],
  exports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTabsModule,
    MatSelectModule,
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
