import * as React from "react";

import { Button, Table, Row, Col } from "antd";

import { Query } from "react-apollo";
import gql from "graphql-tag";

export default () => {
  return (
    <Row>
      <Button>Test</Button>

      <Query
        query={gql`
          query {
            posts(limit: 5) {
              title
            }
          }
      `}
      >
        {({ loading, data }) => {
          const columns = [{ title: "Title", dataIndex: "title" }];

          const dataSource = data.posts || [];
          return (
            <Table
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
