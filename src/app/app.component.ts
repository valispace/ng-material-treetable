import { Component, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { ColumnDefs, Node, Options } from './treetable/models';
import { mockTree } from './treetable/mocks/mockTree';
import { mockTreeTemplate } from './treetable/mocks/mockTreeTemplate';
import { mockTreeAsArrayOfNodes } from './treetable/mocks/mockTreeAsArrayOfNodes';
import { Folder, Task } from './treetable/mocks/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('nameTemplate', {static: true}) nameTemplate: TemplateRef<any>;
  @ViewChild('completedTemplate', {static: true}) completedTemplate: TemplateRef<any>;
  @ViewChild('dataTemplate', {static: true}) dataTemplate: TemplateRef<any>;

  singleRootTree: Node<Folder> = mockTree;
  arrayOfNodesTree: Node<Task>[] = mockTreeAsArrayOfNodes;

  // Template tree
  templateTree: Node<Task>[] = mockTreeTemplate;
  templateTreeColumnDefs: ColumnDefs = {};
  templateTreeOptions: Options<any> = {
    verticalSeparator: false,
    capitalisedHeader: true,
    elevation: 0,
  };

  // Drag & drop tree
  dragAndDropTree: Node<Task>[] = mockTreeAsArrayOfNodes;
  dragAndDropTreeOptions: Options<any> = {
    verticalSeparator: false,
    capitalisedHeader: true,
    dragAndDropEnabled: true,
    elevation: 0,
  };

  ngAfterViewInit() {
    // Init column defs (ViewChild is undefined before view init).
    this.templateTreeColumnDefs = {
      name: {
        label: 'Name mod',
        template: this.nameTemplate,
      },
      completed: {
        label: 'Completed (icon)',
        template: this.completedTemplate,
      },
      data: {
        label: 'Data (object)',
        template: this.dataTemplate,
      },
    };
  }

  addEntry() {
    const randInt = Math.round(Math.random() * 100);
    const newTemplateTree = this.templateTree.slice();
    newTemplateTree.push({
      value: {
        name: `New entry ${randInt}`,
        completed: randInt % 2 === 0,
        owner: `Owner ${randInt}`,
      },
      children: [],
    });
    this.templateTree = newTemplateTree;
  }

  /* itemMoved(event: any) {
    console.log('itemMoved');
    console.log(event);
  } */
}
