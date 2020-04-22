import { Component, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { ColumnDefs, Node, Options } from './treetable/models';
import { mockTree } from './treetable/mocks/mockTree';
import { mockTreeAsArrayOfNodes } from './treetable/mocks/mockTreeAsArrayOfNodes';
import { mockTreeTemplate } from './treetable/mocks/mockTreeTemplate';
import { Folder, Task } from './treetable/mocks/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('completedTemplate', {static: true}) completedTemplate: TemplateRef<any>;

  /* @ViewChild('completedTemplate', {static: false}) set setCompletedTemplate(template: TemplateRef<any>) {
    this.completedTemplate = template;
  }
  private completedTemplate: TemplateRef<any>; */

  singleRootTree: Node<Folder> = mockTree;
  arrayOfNodesTree: Node<Task>[] = mockTreeAsArrayOfNodes;

  // Template tree
  templateTree: Node<Task>[] = mockTreeTemplate;
  templateTreeOptions: Options<any> = {
    verticalSeparator: false,
    capitalisedHeader: true,
    elevation: 0,
  };
  templateTreeColumnDefs: ColumnDefs = {
    completed: {
      label: 'Completed',
      template: this.completedTemplate,
    }
  };

  ngAfterViewInit() {
    // NOTE: ViewChild is undefined before view init.
    this.templateTreeColumnDefs = {
      completed: {
        label: 'Completed',
        template: this.completedTemplate,
      }
    };
  }
}
