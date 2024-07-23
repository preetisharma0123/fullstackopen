const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
   // receive an array of blogs as a parameter
  // return the total sum of likes in all of the blog posts
  // if the array is empty, return 0

  const sumOfLikes = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(sumOfLikes, 0);
}

// define function favoriteBlog
const favoriteBlog = (blogs) => {
  // receive an array of blogs as a parameter
  // return the blog with the most likes
  const mostLikedBlog = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max;
  }, blogs[0]);

  const blogData = {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };

  return blogData;
};

// define function mostBlogs
const mostBlogs = (blogs) => {
  // count the occurences of each author
  const authorCounts = _.countBy(blogs, "author");

  // get the name of the author with the most blogs
  const maxAuthorName = _.maxBy(
    Object.keys(authorCounts),
    (author) => authorCounts[author]
  );

  // create an object with the author name and the number of blogs
  const authorBlogCount = {
    author: maxAuthorName,
    blogs: authorCounts[maxAuthorName],
  };

  return authorBlogCount;
};


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}