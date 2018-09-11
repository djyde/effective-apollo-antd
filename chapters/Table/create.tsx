import * as React from "react";

import { Table, Select, Button, Modal, Form, Input, message } from "antd";

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const GET_POSTS = gql`
  query GetPost($limit: Int) {
    posts(limit: $limit) {
      id, title
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($post: PostInput!) {
    createPost(post: $post) {
      id, title
    }
  }
`;

class CreatePost extends React.Component {
  state = {
    modalVisible: false,
    pagination: {
      pageSize: 5,
      current: 1
    }
  };

  handleTableChange = pagination => {
    const pager = { ...pagination };
    pager.current = pagination.current;

    this.setState({ pagination: pager });
  };

  showModal = () => {
    this.setState({ modalVisible: true });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  onCreatePost = createPost => {
    const { form } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        await createPost({ variables: { post: values } });
        this.closeModal();
        form.resetFields();
      }
    });
  };

  updatePostList = (cache, { data: { createPost } }) => {
    const { posts } = cache.readQuery({
      query: GET_POSTS,
      variables: {
        limit: this.state.pagination.pageSize,
        page: this.state.pagination.current
      }
    });
    cache.writeQuery({
      query: GET_POSTS,
      variables: {
        limit: this.state.pagination.pageSize,
        page: this.state.pagination.current
      },
      data: { posts: [createPost].concat(posts) }
    });
  };

  refetchPost = () => {
    return [{ query: GET_POSTS }];
  };

  render() {
    const { form } = this.props;

    return (
      <div style={{ padding: "2rem" }}>
        <Query
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

            const dataSource = data.posts || [];
            return (
              <React.Fragment>
                <Mutation update={this.updatePostList} mutation={CREATE_POST}>
                  {(createPost, { loading, data }) => {
                    return (
                      <Modal
                        onOk={e => this.onCreatePost(createPost)}
                        onCancel={this.closeModal}
                        title="Create Post"
                        confirmLoading={loading}
                        visible={this.state.modalVisible}
                      >
                        <Form>
                          <Form.Item label="Title">
                            {form.getFieldDecorator("title", {
                              rules: [{ required: true }]
                            })(<Input />)}
                          </Form.Item>
                          <Form.Item label="Body">
                            {form.getFieldDecorator("body", {
                              rules: [{ required: true }]
                            })(<Input.TextArea />)}
                          </Form.Item>
                        </Form>
                      </Modal>
                    );
                  }}
                </Mutation>
                <div style={{ marginBottom: "12px" }}>
                  <Button onClick={this.showModal} type="primary">
                    New Post
                  </Button>
                </div>
                <Table
                  onChange={this.handleTableChange}
                  pagination={this.state.pagination}
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

export default Form.create()(CreatePost);
