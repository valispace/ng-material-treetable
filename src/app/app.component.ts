import { Component, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { ColumnDefs, Node, Options } from './treetable/models';
import { mockTree } from './treetable/mocks/mockTree';
import { mockTreeAsArrayOfNodes } from './treetable/mocks/mockTreeAsArrayOfNodes';
import { Folder, Task } from './treetable/mocks/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('completedTemplate', {static: true}) completedTemplate: TemplateRef<any>;

  singleRootTree: Node<Folder> = mockTree;
  arrayOfNodesTree: Node<Task>[] = mockTreeAsArrayOfNodes;

  // Template tree
  templateTree: Node<Task>[] = mockTreeAsArrayOfNodes;
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
      completed: {
        label: 'Completed (icon)',
        template: this.completedTemplate,
      }
    };
  }
}
