import * as React from "react";

import { Table } from "antd";

import { Query } from "react-apollo";
import gql from "graphql-tag";

export default () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Query
        query={gql`
          query GetPosts {
            posts {
              id, title
            }
          }
        `}
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
            <Table
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
};
