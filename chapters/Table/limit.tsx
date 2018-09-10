import * as React from "react";

import { Table, Select } from "antd";

import { Query } from "react-apollo";
import gql from "graphql-tag";

export default class Limit extends React.Component {
  state = {
    limit: 5
  };

  onChangeLimit = val => {
    this.setState({ limit: val });
  };

  render() {
    return (
      <div style={{ padding: "2rem" }}>
        <Query
          query={gql`
            query GetPosts($limit: Int) {
              posts(limit: $limit) {
                id, title
              }
            }
          `}
          variables={{ limit: this.state.limit }}
        >
          {({ loading, data }) => {
            const columns = [
              {
                title: "ID",
                dataIndex: "id"
              },
              { title: "Title", dataIndex: "title" }
            ];

            const dataSource = data.posts || [];
            return (
              <React.Fragment>
                <div style={{ marginBottom: "12px" }}>
                  <Select
                    onChange={this.onChangeLimit}
                    value={this.state.limit}
                    style={{ width: "100px" }}
                  >
                    <Select.Option value={5}>5</Select.Option>
                    <Select.Option value={10}>10</Select.Option>
                    <Select.Option value={15}>15</Select.Option>
                  </Select>
                </div>
                <Table
                  rowKey={record => record.id}
                  size="small"
                  loading={loading}
                  dataSource={dataSource}
                  columns={columns}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}
