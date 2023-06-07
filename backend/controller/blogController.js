const Blog = require("../model/Blog");
const fs = require("fs");

exports.read = async (req, res) => {
  Blog.find()
    .then((result) => {
      return res.json(result);
      console.log(result);
    })
    .catch((err) => {
      return res.json(err);
    });
};

exports.add = async (req, res) => {
  const startYear = new Date(0);
  const now = new Date();
  const totalSeconds = Math.floor((now - startYear) % 10000000);
  if (req.body.image) {
    const imageData = req.body.image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(imageData, "base64");
    fs.writeFile(`public/image${totalSeconds}.jpg`, buffer, (error) => {
      if (error) {
        console.error(error);
        console.log("Failed to upload image!");
      } else {
        console.log("Image uploaded successfully!");
        let image = `/image${totalSeconds}.jpg`;
        const newblog = new Blog({
          title: req.body.title,
          content: req.body.content,
          image: req.body.image,
          like: 0,
          watch: 0,
          user_name: req.body.user_name,
        });
        newblog
          .save()
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      }
    });
  } else {
    const newblog = new Blog({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      like: 0,
      watch: 0,
      user_name: req.body.user_name,
    });
    newblog
      .save()
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  }
};
exports.update = async (req, res) => {
  Blog.findByIdAndUpdate(req.body._id, {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  }).then((re) => res.json(re));
};
exports.deleteblog = async (req, res) => {
  Blog.findByIdAndRemove(req.params.id).then((result) => res.json(result));
};
exports.like = async (req, res) => {
  Blog.findById(req.params.id).then((result) => {
    result.like = result.like + 1;
    result.save().then((ss) => res.json(ss));
  });
};
exports.watch = async (req, res) => {
  Blog.findById(req.params.id).then((result) => {
    result.watch = result.watch + 1;
    result.save().then((ss) => res.json(ss));
  });
};
