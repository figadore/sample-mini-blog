/* eslint-env browser */
/* eslint no-unused-vars: 0 */
/* global React, ReactDOM, Remarkable, $ */

var Post = React.createClass({
  rawMarkup: function mdPost() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return {__html: rawMarkup};
  },
  render: function render() {
    return (
      <div className="post">
        <h2 className="postTitle">
          {this.props.title}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var PostsBox = React.createClass({
  loadPostsFromServer: function loadPostsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function success(data) {
        this.setState({data: data.data});
      }.bind(this),
      error: function error(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function getInitialState() {
    return {data: []};
  },
  componentDidMount: function componentDidMount() {
    this.loadPostsFromServer();
  },
  render: function render() {
    return (
      <div className="postsBox">
        <h1>Posts</h1>
        <PostList data={this.state.data} />
        <PostForm />
      </div>
    );
  }
});

var PostList = React.createClass({
  render: function render() {
    var postNodes = this.props.data.map(function renderPost(post) {
      return (
        <Post title={post.title} key={post.id}>
          {post.text}
        </Post>
      );
    });
    return (
      <div className="postList">
        {postNodes}
      </div>
    );
  }
});

var PostForm = React.createClass({
  getInitialState: function getInitialState() {
    return {title: '', text: ''};
  },
  handleTitleChange: function handleTitleChange(e) {
    this.setState({title: e.target.value});
  },
  handleTextChange: function handleTextChange(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var text = this.state.text.trim();
    if (!text || !title) {
      return;
    }
    this.setState({title: '', text: ''});
  },
  render: function render() {
    return (
      <form className="postForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <input
          type="text"
          placeholder="Write something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

ReactDOM.render(
  <PostsBox url="/api/posts" />,
  document.getElementById('content')
);
