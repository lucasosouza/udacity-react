<Link className="commentsBox" to={`/add-comment/${post.id}`}>
  <button>+ Add new comment</button>
</Link>
<Route
  path='/add-comment/:postId'
  render={({match, history}) => (
    <AddComment history={history} postId={match.params.postId}/>
  )}
/>
