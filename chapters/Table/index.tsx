import * as React from "react";

import { Button, Table, Row, Col } from "antd";

import { Query } from "react-apollo";
import gql from "graphql-tag";

export default () => {
  return (
    <Row>
      <Query
        query={gql`
          query {
            posts(limit: 10) {
            id,
              title
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
              size="small"
              loading={loading}
              dataSource={dataSource}
              columns={columns}
            />
          );
        }}
      </Query>
    </Row>
  );
};
