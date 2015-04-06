export default (posts) => {
  return Object.keys(posts).reduce((memo, id) => {
    let post = posts[id];
    let { tags } = post;

    post.tags = tags.filter(tag => {
      if (/^_post\./.test(tag)) {
        let [prop, value] = tag.split(".").pop().split(":");

        post[prop] = value;

        return false;
      }
      else if (/^_people\:/.test(tag)) {
        let name = tag.split(":").pop();

        post.name = name;
      }

      return true;
    });

    memo[id] = post;
    return memo;
  }, {});
}
