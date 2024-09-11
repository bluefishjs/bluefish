module.exports = {
  content: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./**/*.{ js,vue,ts,md}"],
    options: {
      safelist: ["html", "body"],
    },
  },
};
