import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { TreetableComponent } from './component/treetable.component';
export { Node, Options} from './models';
import { DebugPipe } from './pipes';

@NgModule({
  declarations: [
    TreetableComponent,
    DebugPipe,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatTableModule,
    MatIconModule
  ],
  exports: [
    TreetableComponent
  ]
})
export class TreetableModule { }
