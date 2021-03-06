import { Node } from '../models';
import { Task } from './models';

export const mockTreeTemplate: Node<any>[] = [
  {
    value: {
      name: 'Tasks for Sprint 1',
      completed: true,
      owner: 'Marco',
      data: 'not working', /* {
        a: 5,
        b: 10,
        c: 12,
      }, */
    },
    children: [
      {
        value: {
          name: 'Complete feature #123',
          completed: true,
          owner: 'Marco'
        },
        children: []
      },
      {
        value: {
          name: 'Update documentation',
          completed: true,
          owner: 'Jane'
        },
        children: [
          {
            value: {
              name: 'Proofread documentation',
              completed: true,
              owner: 'Bob'
            },
            children: []
          }
        ]
      }
    ]
  },
  {
    value: {
      name: 'Tasks for Sprint 2',
      completed: false,
      owner: 'Erika',
    },
    children: [
      {
        value: {
          name: 'Fix bug #567',
          completed: false,
          owner: 'Marco'
        },
        children: []
      },
      {
        value: {
          name: 'Speak with clients',
          completed: true,
          owner: 'James'
        },
        children: []
      }
    ]
  }
];

