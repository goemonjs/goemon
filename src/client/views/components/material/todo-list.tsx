import React from 'react';
import MaterialTable from 'material-table';

export type TodoDataType = {
  caption: string,
  completed: boolean,
  createdAt: number,
  updatedAt: number
};

interface IProps extends React.Props<{}> {
  data: TodoDataType[];
}

export class TodoList extends React.Component<IProps, any> {
  render() {
    const columns: any = [
      { title: 'Caption', field: 'caption' },
      { title: 'Completed', field: 'completed' },
      { title: 'CreateAt', field: 'createAt', type: 'numeric' },
      { title: 'UpdateAt', field: 'updateAt', type: 'numeric' }
    ];

    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={columns}
          data={this.props.data}
          title="Demo Title"
        />
      </div>
    );
  }
}

