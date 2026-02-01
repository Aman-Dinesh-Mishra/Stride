const calculateATSScore = (skills = [], keywords = []) => {
  if (!skills.length || !keywords.length) return 0;

  const skillSet = skills.map((s) => s.toLowerCase());

  const matched = keywords.filter((k) => skillSet.includes(k.toLowerCase()));

  return Math.min(100, Math.round((matched.length / keywords.length) * 100));
};

export default calculateATSScore;
