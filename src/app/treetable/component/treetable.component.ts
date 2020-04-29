import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Subject } from 'rxjs';
import { flatMap, defaults } from 'lodash-es';

import { ColumnDefs, Node, TreeTableNode, Options, SearchableNode } from '../models';
import { TreeService } from '../services/tree/tree.service';
import { ValidatorService } from '../services/validator/validator.service';
import { ConverterService } from '../services/converter/converter.service';
import { defaultOptions } from '../default.options';
import { Required } from '../decorators/required.decorator';


@Component({
  selector: 'treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss']
})
export class TreetableComponent<T> implements OnInit {
  @Input() @Required tree: Node<T> | Node<T>[];
  @Input() options: Options<T> = {};
  @Input() columnDefs: ColumnDefs = {};
  @Output() nodeClicked: Subject<TreeTableNode<T>> = new Subject();
  @Output() itemMoved: EventEmitter<any> = new EventEmitter<any>();
  private searchableTree: SearchableNode<T>[];
  private treeTable: TreeTableNode<T>[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<TreeTableNode<T>>;
  dragItemId: string; // Item currently in drag.
  dropDisabledDict: any = {}; // Holds ID of parent of dragged object if it has one, used to disable drop.

  constructor(
    private treeService: TreeService,
    private validatorService: ValidatorService,
    private converterService: ConverterService,
    elem: ElementRef
  ) {}

  ngOnInit() {
    this.tree = Array.isArray(this.tree) ? this.tree : [this.tree];
    this.options = this.parseOptions(defaultOptions);
    const customOrderValidator = this.validatorService.validateCustomOrder(this.tree[0], this.options.customColumnOrder);
    if (this.options.customColumnOrder && !customOrderValidator.valid) {
      throw new Error(`
        Properties ${customOrderValidator.xor.map(x => `'${x}'`).join(', ')} incorrect or missing in customColumnOrder`
      );
    }
    this.displayedColumns = this.options.customColumnOrder
      ? this.options.customColumnOrder
      : this.extractNodeProps(this.tree[0]);
    this.searchableTree = this.tree.map(t => this.converterService.toSearchableTree(t));
    const treeTableTree = this.searchableTree.map(st => this.converterService.toTreeTableTree(st));
    this.treeTable = flatMap(treeTableTree, this.treeService.flatten);
    this.dataSource = this.generateDataSource();

    // console.log(this.dataSource);
    // console.log(this.searchableTree);
  }

  extractNodeProps(tree: Node<T> & { value: { [k: string]: any } }): string[] {
    return Object.keys(tree.value).filter(x => typeof tree.value[x] !== 'object');
  }

  generateDataSource(): MatTableDataSource<TreeTableNode<T>> {
    return new MatTableDataSource(this.treeTable.filter(x => x.isVisible));
  }

  formatIndentation(node: TreeTableNode<T>): any {
    return {
      paddingLeft: node.depth * this.options.stepSize + 'px',
    };
  }

	formatElevation(): string {
		return `mat-elevation-z${this.options.elevation}`;
	}

  onNodeClick(clickedNode: TreeTableNode<T>): void {
    clickedNode.isExpanded = !clickedNode.isExpanded;
    this.treeTable.forEach(el => {
      el.isVisible = this.searchableTree.every(st => {
        return this.treeService.searchById(st, el.id).
          fold([], n => n.pathToRoot)
          .every(p => this.treeTable.find(x => x.id === p.id).isExpanded);
      });
    });
    this.dataSource = this.generateDataSource();
    this.nodeClicked.next(clickedNode);
  }

  // Overrides default options with those specified by the user
  parseOptions(defaultOpts: Options<T>): Options<T> {
    return defaults(this.options, defaultOpts);
  }

  // Drag & Drop
  dragStarted(row: any) {

    console.log('dragStarted', row.id);

    this.dragItemId = row.id;
    /* this.dataSource.data.forEach(entry => {
      if (entry.children.map(child => child.id).includes(this.dragItemId)) {
        this.dropDisabledDict[entry.id] = true;
      }
    }); */
    // console.log('dropDisabledDict', this.dropDisabledDict);
  }
  dragReleased() {
    this.dragItemId = null;
    // this.dropDisabledDict = {};
  }

  dropListDropped(event: any) {

    console.log('dropListDropped', event);

    // Do the checking if it was legit.

    const source = event.previousContainer;
    const target = event.container;
    if (target.id !== source.id) {
      this.itemMoved.emit({
        item: event.item.data.value,
        target: target.data.value,
        source: source.data.value, // This is actually the object itself bc we use rows as both drag and drop list.
      });
    }
  }
}
