# Angular Material TreeTable Component

NOTE: this package is work in progress and customized for Valispace stack.

<!-- [![Build Status](https://travis-ci.com/mlrv/ng-material-treetable.svg?branch=master)](https://travis-ci.com/mlrv/ng-material-tree-table) -->
[![Licence](https://img.shields.io/npm/l/ng-dynamic-component.svg?maxAge=2592000)](https://github.com/mlrv/ng-material-treetable/LICENSE)
<!-- [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) -->
<!-- [![Npm](https://img.shields.io/npm/v/ng-material-treetable.svg?maxAge=2592000)](https://badge.fury.io/js/ng-material-treetable) -->


A simple, customisable, and easy to use Angular Material TreeTable component.

[Live Demo](http://ng-material-treetable.surge.sh/) (original)

[StackBlitz Demo](https://stackblitz.com/edit/angular-qnlruj) (original)

---

## Table of Contents

1. [Installation](#installation)
1. [Data Format](#data-format)
1. [Options](#options)
1. [Events](#events)

## Build & publish

- Delete `/dist` folder
- Increment package version (0.5.5-valispace.x)
- Build and publish:

  ```
  npm run packagr
  npm publish dist
  ```

## Installation

Simply install the package through `npm`

```
npm i @valispace/ng-material-treetable --save
```

Make sure you have the angular material packages installed

```
npm i @angular/material @angular/cdk @angular/animations --save
```

import the main module

```typescript
import { TreetableModule } from '@valispace/ng-material-treetable';

@NgModule({
    ...
  imports: [
    ...
    TreetableModule
  ],
  ...
})
export class AppModule { }
```

and use the component in your template

```html
<treetable [tree]="yourTreeDataStructure"></treetable>
```

Finally, make sure you import the required material icons font in your `styles.css`

```css
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700|Material+Icons');
```

## Data Format

The tree object that's rendered by the component can either be a `Node<T>` or a `Node<T>[]` where `Node<T>` is the following interface

```typescript
import { Node } from 'ng-material-treetable';

interface Node<T> {
  value: T;
  children: Node<T>[];
}
```

Here's a simple example.


```javascript
{
  value: {
    name: 'Reports',
    owner: 'Eric',
    protected: true,
    backup: true
  },
  children: [
    {
      value: {
        name: 'Charts',
        owner: 'Stephanie',
        protected: false,
        backup: true
      },
      children: []
    },
    {
      value: {
        name: 'Sales',
        owner: 'Virginia',
        protected: false,
        backup: true
      },
      children: []
    },
    {
      value: {
        name: 'US',
        owner: 'Alison',
        protected: true,
        backup: false
      },
      children: [
        {
          value: {
            name: 'California',
            owner: 'Claire',
            protected: false,
            backup: false
          },
          children: []
        },
        {
          value: {
            name: 'Washington',
            owner: 'Colin',
            protected: false,
            backup: true
          },
          children: [
            {
              value: {
                name: 'Domestic',
                owner: 'Oliver',
                protected: true,
                backup: false
              },
              children: []
            },
            {
              value: {
                name: 'International',
                owner: 'Oliver',
                protected: true,
                backup: true
              },
              children: []
            }
          ]
        }
      ]
    }
  ]
}
```

## Options

> Work in Progress...

An `option` input property can be used to customise the component

```typescript
import { Node, Options } from 'ng-material-treetable';
```

---

```html
<treetable
  [tree]="yourTreeDataStructure"
  [options]="yourOptions">
</treetable>
```

| Name                  | Description                                                                                                                                                                                                                                                                                | Type      | Default |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|---------|
| `horizontalSeparator` | If `true`, separates table rows with horizontal lines (Valispace).                                                                                                                                                                                                                                   | `boolean` | `true`  |
| `verticalSeparator`   | If `true`, separates table columns with  vertical lines.                                                                                                                                                                                                                                   | `boolean` | `true`  |
| `capitalisedHeader`   | If `true`, capitalise the first letter of each column header.                                                                                                                                                                                                                              | `boolean` | -       |
| `highlightRowOnHover` | If `true`, hovering the mouse over a row highlights its background.                                                                                                                                                                                                                        | `boolean` | `true`  |
| `customColumnOrder`   | By default, the columns are ordered following  the array generated by calling `Object.keys()` on the nodes of the tree object; this option  can be used to specify a custom order. Note that `customColumnOrder` needs to be an  array containing all the keys present in the node object. | `Array`   | -         |
| `stepSize`            | Indentation size for each level in px (Valispace).                                                                                                                                                                                                                        | `number`  | `20`  |
| `elevation`           | Sets the elevation of the card element wrapping the tree component.                                                                                                                                                                                                                        | `number`  | `5`  |
| `dragAndDropEnabled`  | Enables drag & drop (Valispace)                                                                                                                                                                                                                        | `boolean`  | `false`  |

### customColumnOrder

Given a tree data type like

```typescript
interface Person {
  name: string;
  age: number;
  married: boolean;
}

const tree: Node<Person> = ...
```

a custom column order can be specified with the following `options` object

```typescript
const opts: Options<Person> = {
  customColumnOrder: ['married', 'age', 'name']
}
```

an incomplete or incorrect `customColumnOrder` value will result in an error

```typescript
customColumnOrder: ['married', 'age'] // 'name' missing
customColumnOrder: ['married', 'age', 'name', 'surname'] // 'surname' is not a valid key
```

## Events

> Work in Progress...

| Name          | Description                                                                              | Type      |
|---------------|------------------------------------------------------------------------------------------|-----------|
| `nodeClicked` | Whenever a node is expanded or collapsed, emits an event with the new status of the node | `Node<T>` |
| `itemMoved`   | Only in drag & drop mode, emits an event with item, item, source and target of the DnD move | `any` |


### nodeClicked

```html
<treetable
  [tree]="yourTreeDataStructure"
  (nodeClicked)="logToggledNode($event)">
</treetable>
```

---

```typescript
logToggledNode(node: Node<SomeNodeType>): void {
  console.log(node);
}
```


### itemMoved

```html
<treetable
  [tree]="yourTreeDataStructure"
  (itemMoved)="logItemMoved($event)">
</treetable>
```

---

```typescript
logItemMoved(event: any): void {
  console.log('Item:', event.item);
  console.log('Source:', event.source);
  console.log('Target:', event.target);
}
```
