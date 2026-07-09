# Loom walkthrough script (~3 minutes)

Read this in your own words, don't recite it verbatim — but the structure and timing are calibrated so you don't ramble. Suggested screen to show is noted in *[brackets]*.

---

**[0:00-0:20] Hook — screen: README or dashboard hero]**

"This is a research project I built comparing Nigeria's tariff policy across three sectors — refined petroleum, automobiles, and rice — between 2023 and 2025. The question I wanted to answer: does the size of a tariff actually predict whether a country successfully replaces imports with local production? Everyone assumes more protection means more substitution. I found the opposite."

**[0:20-0:55] The finding — screen: sector comparison chart or Table 1]**

"Petroleum has almost no tariff — half a percent — and it's had the fastest import substitution of the three, because Dangote built a 650,000-barrel-a-day refinery. Automobiles have a 35 to 40 percent tariff wall specifically designed to reward local assembly, and I pulled the actual government capacity data — 34 licensed assemblers are running at just 29 percent of installed capacity. Rice has the heaviest tariff, 70 percent, and it's the single most-smuggled commodity through Nigerian customs. So the tariff rate is basically the opposite of a useful predictor. What actually matters is whether there's a real, scaled domestic supply behind the policy."

**[0:55-1:40] How I built it — screen: repo structure or data/raw folder]**

"I did the research myself — sourced primary data from Nigeria's statistics bureau, the automotive regulator, USDA trade reports, and about 600 news and policy sources, all cited. Where sources disagreed, I flagged the conflict instead of picking one silently — that's in the sources.md files if you want to check my work. From there I built the whole pipeline: cleaned datasets, Python analysis scripts that generate the charts, and then four different outputs from the same underlying data."

**[1:40-2:20] The deliverables — screen: switch between paper, deck, dashboard]**

"There's a full academic paper with a literature review — I grounded it against real trade-policy theory, Corden's effective protection framework, Krueger on rent-seeking — so it's not just description, it's actually testing an argument. There's an investment memo that translates the same findings into a capital-allocation call. A slide deck in a consulting format. And this —" *[switch to live dashboard]* "— is an interactive dashboard I built in React, pulling from the same processed data as everything else, so the numbers are consistent across every format."

**[2:20-2:50] The honest part — screen: AfCFTA section of paper or dashboard]**

"One thing I want to call out: I went in expecting the story to be about AfCFTA — Nigeria's regional trade agreement — pulling against its own protectionism. The data didn't support that cleanly. I could only confirm AfCFTA's actual tariff treatment for one of the three sectors. So I said that directly in the paper instead of forcing a narrative the evidence didn't back up."

**[2:50-3:00] Close]**

"Everything's on GitHub — data, code, and all four write-ups, so you can check any number back to its source. Happy to walk through any piece of it in more depth."

---

### Notes for recording
- Aim for 2:45-3:15 actual runtime — a little under is better than running long.
- Practice the sector numbers (0.5%, 29.0%, 70%) once out loud so they don't trip you up live.
- If Loom's free tier caps you at 5 minutes, you have margin — don't rush.
- Cut the "honest part" section only if you're tight on time; everything else should stay, it's the differentiator.
