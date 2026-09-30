module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/style.css");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("builtTime", (dateObj) => {
    const d = new Date(dateObj);
    const day = d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
    const time = d.toISOString().slice(11, 16);
    return `${time} UTC on ${day}`;
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("atomDate", (dateObj) => {
    return new Date(dateObj).toISOString().replace(/\.\d{3}Z$/, "Z");
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
