exports.compare = (req, res) => {
  const { input1, input2, caseSensitive = true } = req.body;
  if (typeof input1 !== 'string' || typeof input2 !== 'string') {
    return res.status(400).json({ error: 'input1 and input2 must be strings' });
  }

  const s1 = input1;
  const s2 = input2;

  let matchCount = 0;
  for (let i = 0; i < s1.length; i++) {
    let found = false;
    const c1 = caseSensitive ? s1[i] : s1[i].toLowerCase();

    for (let j = 0; j < s2.length; j++) {
      const c2 = caseSensitive ? s2[j] : s2[j].toLowerCase();

      if (c1 === c2) {
        if (!found) {
          found = true;
          matchCount++;
        }
      }
    }
  }

  const total = s1.length === 0 ? 1 : s1.length;
  const percent = (matchCount / total) * 100;
  res.json({ totalChars: s1.length, matched: matchCount, percent: Number(percent.toFixed(2)) });
};
