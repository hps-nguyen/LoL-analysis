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
In this section, we describe the data cleaning steps we took to prepare the dataset for analysis. This process is crucial to ensure that the data is in a consistent format, free of errors, and suitable for later exploration and analysis.

#### Steps Taken
1. Reading and Converting Data Types:
*Problem*: Some columns in the dataset contain mixed types (e.g., integers and strings).
*Solution*: We specified the data types for these problematic columns to ensure they are read as strings. This prevents potential type-related issues during analysis.

2. Converting Binary Nominal Columns:
*Problem*: Binary columns containing 0's and 1's should be converted to True/False for better clarity and consistency.
*Solution*: We converted these columns to boolean types while preserving NaN values.

3. Removing Outlier Games:
*Problem*: There were two instances where no team won a game, which are outliers since each game should have a winning team. We will ignore these instances since our analysis focuses heavily on win/loss outcomes.
*Solution*: These outlier games were identified and removed from the dataset.

4. Creating Functions for Data Access:
*Problem*: For later analysis, we need to easily access team and player data separately.
*Solution*: We created functions to filter and return the relevant rows for team data and player data. Here are the parts of the separated DataFrame returned by these functions.

Team data

| gameid                | side   | result   | position   |   patch |   kills |   deaths |   assists |
|:----------------------|:-------|:---------|:-----------|--------:|--------:|---------:|----------:|
| ESPORTSTMNT01_2690210 | Blue   | False    | team       |   12.01 |       9 |       19 |        19 |
| ESPORTSTMNT01_2690210 | Red    | True     | team       |   12.01 |      19 |        9 |        62 |
| ESPORTSTMNT01_2690219 | Blue   | False    | team       |   12.01 |       3 |       16 |         7 |
| ESPORTSTMNT01_2690219 | Red    | True     | team       |   12.01 |      16 |        3 |        39 |

Role data

| gameid                | side   | result   | position   | champion   |   patch |   kills |   deaths |
|:----------------------|:-------|:---------|:-----------|:-----------|--------:|--------:|---------:|
| ESPORTSTMNT01_2690210 | Blue   | False    | top        | Renekton   |   12.01 |       2 |        3 |
| ESPORTSTMNT01_2690210 | Blue   | False    | jng        | Xin Zhao   |   12.01 |       2 |        5 |
| ESPORTSTMNT01_2690210 | Blue   | False    | mid        | LeBlanc    |   12.01 |       2 |        2 |
| ESPORTSTMNT01_2690210 | Blue   | False    | bot        | Samira     |   12.01 |       2 |        4 |
| ESPORTSTMNT01_2690210 | Blue   | False    | sup        | Leona      |   12.01 |       1 |        5 |
| ESPORTSTMNT01_2690210 | Red    | True     | top        | Gragas     |   12.01 |       1 |        1 |
| ESPORTSTMNT01_2690210 | Red    | True     | jng        | Viego      |   12.01 |       4 |        1 |
| ESPORTSTMNT01_2690210 | Red    | True     | mid        | Viktor     |   12.01 |       6 |        3 |
| ESPORTSTMNT01_2690210 | Red    | True     | bot        | Jinx       |   12.01 |       8 |        2 |
| ESPORTSTMNT01_2690210 | Red    | True     | sup        | Alistar    |   12.01 |       0 |        2 |

#### Impact of Data Cleaning
These data cleaning steps were essential for ensuring the accuracy and reliability of our analyses. By converting data types and handling binary columns properly, we minimized the risk of type-related errors. Removing outlier games helped ensure that each game had a clear win/loss outcome. The functions we created for accessing team and player data will streamline our analysis process, making it easier to perform targeted analyses on specific subsets of the data.

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
