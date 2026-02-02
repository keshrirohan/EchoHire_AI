app.post("/parse-jd", async (req, res) => {
  const { jd } = req.body;

  // TEMP (later AI)
  res.json({
    role: "Frontend Developer",
    skills: ["React", "Next.js", "JavaScript"],
    level: "Fresher"
  });
});
