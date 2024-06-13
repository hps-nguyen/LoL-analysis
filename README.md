# League of Legends Win/Lose Analysis

## Introduction
Welcome to our League of Legends esports data analysis project! We're excited to explore the world of competitive League of Legends and uncover the key factors that contribute to a team's success in winning games. Our project is centered around the following key questions:

- What are the most significant factors influencing a team's chances of winning a League of Legends game?
- How can we quantify and weight these factors to predict game outcomes?

This project centers around exploring competitive match data from the 2022 season, sourced from Oracle’s Elixir. The dataset contains information from over 10,000 matches, each consisting of up to 12 rows, one for each player on both teams and two containing summary data for the teams.

The entire dataset contains 148992 rows and 131 columns, with key columns such as position (game role), champion, damage to champions, damage per minute, visionscore, goldspent, creep score, first baron, etc. To access the dataset, please visit the provided Google Drive on [Oracle’s Elixir](https://oracleselixir.com/tools/downloads).

Whether you're a seasoned League of Legends enthusiast or new to the world of esports, we invite you to join us on this journey of discovery. Let's dive into the data and uncover the secrets behind winning in League of Legends!

## Data Cleaning and Exploratory Data Analysis
### Data Cleaning

### Explore team data
#### Univariate analysis on team's statistics
<iframe
  src="assets/wl_distr_0.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

<iframe
  src="assets/wl_distr_3.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

<iframe
  src="assets/wl_distr_7.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

#### An aggregates statistic: Team's first baron analysis
<iframe
  src="assets/heatmap.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

### Explore individual role data
#### Bivariate Analysis
<iframe
  src="assets/creep_vs_vision.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

<iframe
  src="assets/dtc_vs_gspent.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

#### Damage to champions per gold spent by roles
<iframe
  src="assets/roles_dtc_boxes.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

#### Top, mid, bot-laners' damage to champions by game length
<iframe
  src="assets/roles_gl_lines.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

## Assessment of Missingness
<iframe
  src="assets/mar_hist_dep.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>


## Hypothesis Testing
<iframe
  src="assets/hist_mid_bot.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

<iframe
  src="assets/hypo_hist.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

## Framing a Prediction Problem

## Baseline Model

## Final Model

## Fairness Analysis
<iframe
  src="assets/fair_hist.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>
