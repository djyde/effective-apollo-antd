import * as React from "react";

import { Table } from "antd";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_POSTS = gql`
  query GetPosts($limit: Int!, $page: Int) {
    postsWithMeta(limit: $limit, page: $page) {
      metadata {
        total
      },

      data {
        id, title
      }
    } 
  }
`;

export default class Pagination extends React.Component {
  state = {
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0
    }
  };

  onCompleteQuery = ({
    postsWithMeta: {
      metadata: { total }
    }
  }) => {
    const pagination = { ...this.state.pagination };
    pagination.total = total;
    this.setState({ pagination });
  };

  handleTableChange = pagination => {
    const pager = { ...pagination };
    pager.current = pagination.current;
    this.setState({ pagination });
  };

  render() {
    return (
      <div style={{ padding: "2rem" }}>
        <Query
          onCompleted={this.onCompleteQuery}
          query={GET_POSTS}
          variables={{
            limit: this.state.pagination.pageSize,
            page: this.state.pagination.current
          }}
        >
          {({ loading, data }) => {
            const columns = [
              {
                title: "ID",
                dataIndex: "id"
              },
              { title: "Title", dataIndex: "title" }
            ];

            console.log(JSON.stringify(data));
            const dataSource = data.postsWithMeta
              ? data.postsWithMeta.data
              : [];

            return (
              <Table
                pagination={this.state.pagination}
                onChange={this.handleTableChange}
                rowKey={record => record.id}
                size="small"
                loading={loading}
                dataSource={dataSource}
                columns={columns}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}
