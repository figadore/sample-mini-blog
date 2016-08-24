/* eslint-env browser */
/* eslint no-unused-vars: 0 */
/* global React, ReactDOM, Remarkable, $ */

// Component representing a blog post
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

// Component for containing all blog functionality
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
  // Send form data to API to create new blog post
  handlePostSubmit: function handlePostSubmit(post) {
    console.log({post});
    $.ajax({
      url: this.props.url,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(post),
      success: function onSuccess(data) {
        this.setState({data: data.data});
      }.bind(this),
      error: function onError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function render() {
    return (
      <div className="postsBox">
        <h1>New Blog Post</h1>
        <PostForm onPostSubmit={this.handlePostSubmit} />
        <h1>Blog</h1>
        <PostList data={this.state.data} />
      </div>
    );
  }
});

// Component for listing blog posts
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

// Component for creating a new post
var PostForm = React.createClass({
  getInitialState: function getInitialState() {
    return {title: '', text: ''};
  },
  // Keep state in sync with frontend form
  handleTitleChange: function handleTitleChange(e) {
    this.setState({title: e.target.value});
  },
  handleTextChange: function handleTextChange(e) {
    this.setState({text: e.target.value});
  },
  // Submit post after validation, then clear form
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var text = this.state.text.trim();
    if (!text || !title) {
      return;
    }
    this.props.onPostSubmit({title: title, text: text});
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
        <br />
        <textarea
          rows="20"
          cols="80"
          placeholder="Write something, use markdown..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
});

ReactDOM.render(
  <PostsBox url="/api/posts" />,
  document.getElementById('content')
);
