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

Team dataset

| gameid                | side   | result   | position   |   patch |   kills |   deaths |   assists |   damagetochampions |     dpm |   damagemitigatedperminute |   visionscore |   vspm |   totalgold |   goldspent |   minionkills |   towers | firstblood   | firstdragon   |   dragons | firstbaron   |   barons | firsttower   | firsttothreetowers   |   inhibitors | datacompleteness   |
|:----------------------|:-------|:---------|:-----------|--------:|--------:|---------:|----------:|--------------------:|--------:|---------------------------:|--------------:|-------:|------------:|------------:|--------------:|---------:|:-------------|:--------------|----------:|:-------------|---------:|:-------------|:---------------------|-------------:|:-------------------|
| ESPORTSTMNT01_2690210 | Blue   | False    | team       |   12.01 |       9 |       19 |        19 |               56560 | 1981.09 |                    2364.73 |           197 | 6.9002 |       47070 |       44570 |           680 |        3 | True         | False         |         1 | False        |        0 | True         | True                 |            0 | complete           |
| ESPORTSTMNT01_2690210 | Red    | True     | team       |   12.01 |      19 |        9 |        62 |               79912 | 2799.02 |                    2872.33 |           205 | 7.1804 |       52617 |       45850 |           792 |        6 | False        | True          |         3 | False        |        0 | False        | False                |            1 | complete           |
| ESPORTSTMNT01_2690219 | Blue   | False    | team       |   12.01 |       3 |       16 |         7 |               59579 | 1690.98 |                    3109.61 |           277 | 7.8619 |       57629 |       53945 |           994 |        3 | False        | False         |         1 | False        |        0 | False        | False                |            0 | complete           |
| ESPORTSTMNT01_2690219 | Red    | True     | team       |   12.01 |      16 |        3 |        39 |               74855 | 2124.55 |                    2868.42 |           346 | 9.8202 |       71004 |       66410 |          1013 |       11 | True         | True          |         4 | True         |        2 | True         | True                 |            2 | complete           |

Role dataset

| gameid                | side   | result   | position   | champion   |   patch |   kills |   deaths |   assists |   damagetochampions |     dpm |   damagemitigatedperminute |   visionscore |   vspm |   totalgold |   goldspent |   minionkills |   towers | firstblood   |   firstdragon |   dragons |   firstbaron |   barons |   firsttower |   firsttothreetowers |   inhibitors | datacompleteness   | playername   |
|:----------------------|:-------|:---------|:-----------|:-----------|--------:|--------:|---------:|----------:|--------------------:|--------:|---------------------------:|--------------:|-------:|------------:|------------:|--------------:|---------:|:-------------|--------------:|----------:|-------------:|---------:|-------------:|---------------------:|-------------:|:-------------------|:-------------|
| ESPORTSTMNT01_2690210 | Blue   | False    | top        | Renekton   |   12.01 |       2 |        3 |         2 |               15768 | 552.294 |                    777.793 |            26 | 0.9107 |       10934 |       10275 |           220 |      nan | False        |           nan |       nan |          nan |        0 |          nan |                  nan |            0 | complete           | Soboro       |
| ESPORTSTMNT01_2690210 | Blue   | False    | jng        | Xin Zhao   |   12.01 |       2 |        5 |         6 |               11765 | 412.084 |                    650.158 |            48 | 1.6813 |        9138 |        8750 |            33 |      nan | True         |           nan |       nan |          nan |        0 |          nan |                  nan |            0 | complete           | Raptor       |
| ESPORTSTMNT01_2690210 | Blue   | False    | mid        | LeBlanc    |   12.01 |       2 |        2 |         3 |               14258 | 499.405 |                    227.776 |            29 | 1.0158 |        9715 |        8725 |           177 |      nan | False        |           nan |       nan |          nan |        0 |          nan |                  nan |            0 | complete           | Feisty       |
| ESPORTSTMNT01_2690210 | Blue   | False    | bot        | Samira     |   12.01 |       2 |        4 |         2 |               11106 | 389.002 |                    218.879 |            25 | 0.8757 |       10605 |       10425 |           208 |      nan | True         |           nan |       nan |          nan |        0 |          nan |                  nan |            0 | complete           | Gamin        |
| ESPORTSTMNT01_2690210 | Blue   | False    | sup        | Leona      |   12.01 |       1 |        5 |         6 |                3663 | 128.301 |                    490.123 |            69 | 2.4168 |        6678 |        6395 |            42 |      nan | True         |           nan |       nan |          nan |        0 |          nan |                  nan |            0 | complete           | Loopy        |
| ESPORTSTMNT01_2690210 | Red    | True     | top        | Gragas     |   12.01 |       1 |        1 |        12 |               17455 | 611.384 |                   1210.3   |            30 | 1.0508 |       10001 |        9750 |           221 |      nan | False        |           nan |       nan |          nan |        0 |          nan |                  nan |            0 | complete           | DnDn         |
| ESPORTSTMNT01_2690210 | Red    | True     | jng        | Viego      |   12.01 |       4 |        1 |        10 |               10564 | 370.017 |                    530.438 |            39 | 1.366  |       10293 |        8750 |            47 |      nan | False        |           nan |       nan |          nan |        0 |          nan |                  nan |            1 | complete           | Sylvie       |
| ESPORTSTMNT01_2690210 | Red    | True     | mid        | Viktor     |   12.01 |       6 |        3 |        12 |               20690 | 724.693 |                    426.935 |            29 | 1.0158 |       11532 |        8900 |           196 |      nan | False        |           nan |       nan |          nan |        0 |          nan |                  nan |            0 | complete           | FIESTA       |
| ESPORTSTMNT01_2690210 | Red    | True     | bot        | Jinx       |   12.01 |       8 |        2 |        10 |               26687 | 934.746 |                    186.655 |            40 | 1.4011 |       14018 |       12800 |           299 |      nan | False        |           nan |       nan |          nan |        0 |          nan |                  nan |            0 | complete           | vital        |
| ESPORTSTMNT01_2690210 | Red    | True     | sup        | Alistar    |   12.01 |       0 |        2 |        18 |                4516 | 158.179 |                    518.004 |            67 | 2.3468 |        6773 |        5650 |            29 |      nan | False        |           nan |       nan |          nan |        0 |          nan |                  nan |            0 | complete           | Blessing     |

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
