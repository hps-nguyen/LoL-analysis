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

**Team data**

| gameid                | side   | result   | position   |   patch |   kills |   deaths |   assists |
|:----------------------|:-------|:---------|:-----------|--------:|--------:|---------:|----------:|
| ESPORTSTMNT01_2690210 | Blue   | False    | team       |   12.01 |       9 |       19 |        19 |
| ESPORTSTMNT01_2690210 | Red    | True     | team       |   12.01 |      19 |        9 |        62 |
| ESPORTSTMNT01_2690219 | Blue   | False    | team       |   12.01 |       3 |       16 |         7 |
| ESPORTSTMNT01_2690219 | Red    | True     | team       |   12.01 |      16 |        3 |        39 |

**Role data**

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

We began by analyzing the distributions of key game metrics such as kills, damage, and gold. Since each game involves two teams, we focused on comparing these metrics between the winning and losing teams to understand their impact on game outcomes.

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

It appears that the distribution of each key metric exhibits a distinct pattern between winning and losing teams. In general, winning teams have higher values (shifted to the right) in metrics such as `Kills`, `Damage to Champions`, and `Total Gold`. While it's clear that these end-game statistics are typically dominated by the winning team, this analysis helps us verify these patterns and sets the stage for exploring more interesting relationships in subsequent analyses.

#### An aggregates statistic: Team's first baron analysis

To explore more patterns between winning and losing teams, we might examine the number of Barons a team killed and whether a team secured the first Baron. Statistics related to Baron kills may provide valuable insights into winning chances, as securing Baron grants a strategic advantage by granting the team that obtains the Baron buff an upper hand in destroying the opposing team's Nexus, the final objective to win the game. Moreover, Baron is typically targeted in the mid and late game stages, as it requires significant damage and team collaboration to defeat. Thus, having Barons signifies a team's control of the game as it nears its conclusion. Therefore, our analysis of Baron statistics may benefit later modeling efforts. With that said, let's analyze the association between the team that secured the first Baron and the game result.

The table and the heatmap below shows the conditional probabilities of securing the first Baron based on whether a team wins or loses the game:

| result   |   Secured First Baron |   Did Not Secure First Baron |
|:---------|----------------------:|-----------------------------:|
| Win      |              0.805191 |                     0.194809 |
| Defeat   |              0.142331 |                     0.857669 |

<iframe
  src="assets/heatmap.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

**Interpretation**:

- Winning Teams: 80.52% of the time, winning teams secured the first Baron, while only 19.48% of winning teams did not secure the first Baron.
- Losing Teams: 14.23% of the time, losing teams secured the first Baron, whereas 85.77% of losing teams did not secure the first Baron.

This result highlights a strong correlation between securing the first Baron and winning the game. Specifically, teams that secure the first Baron are much more likely to win the game, as indicated by the high probability (80.52%). Conversely, teams that do not secure the first Baron are more likely to lose (85.77%).

According to Bayesian Theorem, the probability of an event can be updated based on new evidence. In this context, securing the first Baron serves as evidence that can significantly increase the probability of winning the game. The relationship between securing the first Baron and winning the game appears to be strongly polarized, meaning that this event is a critical factor in determining game outcomes.

This observation offers valuable insights for further exploration and modeling. By including the event of securing the first Baron as a feature in our predictive model, we can improve its accuracy. The strong correlation suggests that this feature is a significant predictor of game outcomes, making it an essential factor in our analysis.

### Explore individual role data

Upon further correlation exploration among the columns in the team dataset, we found no particularly interesting correlations between the numeric features. We mainly observed strong, obvious associations between features, such as total gold and minion kills, which are likely to exhibit multicollinearity and not be very useful for later analysis and prediction. Therefore, we've decided to shift our focus to exploring features based on individual roles rather than team features.

#### Bivariate Analysis

Explore individual role data

We'll start by investigating the statistics of bot-lane players. The bot-lane role is particularly intriguing because it is often central to a team's strategy. In most games, bot-lane players choose ranged champions that deal damage primarily through regular attacks rather than skills. They typically start the game weak and need resources to become stronger in the late game. One common strategy is for the team to invest effort in allowing the bot-laner to gain resources (gold through kills, assists, and minion kills) and protect them during combat so they can deal maximal damage to opponent champions. Since the bot-lane role often deals substantial and consistent damage for the team during the late game, a stronger bot-laner generally improves the team's chances of winning. Therefore, to address our central question about team wins and losses, it's worthwhile to explore bot-lane data and the dynamic between bot-lane and other support roles.

Questions of interest:

- Does the vision score (VS) from supports (and/or junglers, mid-laners) help bot-laners earn more resources and become stronger?
- Is there a relationship between bot-laners' creep score (CS) and damage to champions?
- In general, do bot-laners deal the most damage to enermy champions per gold spent?

##### Bot-lane total creep score vs. Supportive vision score

Let's start by visualizing the relationship between the bot-lane's total creep score and the total vision score contributed by the support, jungle, and mid-laner.

<iframe
  src="assets/creep_vs_vision.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

We observe a strong positive linear correlation between the bot-lane's creep score and the combined vision scores of the support, mid-laner, and jungler (correlation coefficient of 0.74). This suggests that better vision control is linked to a higher creep score for the bot-lane. This role is crucial as it focuses on dealing maximum damage to opponents, especially in the late game.

Furthermore, there is a notable difference in the trends of the bot-lane's total creep score when comparing scores below and above 100. One explanation could be that games with a low bot-lane creep score tend to end early. As a result, the relationship between vision score and creep score in these instances may vary from games where the bot-lane has a higher creep score. Given our focus on the bot-lane's impact in the late game and on overall game results, we will exclude instances where the bot-lane's creep score is less than 100.

##### Bot-lane's damage to champions vs. Gold spent by bot-laner

Creep score is the primary resource for a bot laner, especially in the early game when it is harder for them to earn gold through kills or destroying structures. Gold spent is the direct resource for any player to get stronger since they can buy items to increase their damage. Consequently, it is intuitive to see a positive trend between bot-laners' gold spent and their damage to enemy champions:

<iframe
  src="assets/dtc_vs_gspent.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

#### Damage to champions per gold spent by roles

So far, we have verified the positive relationships between bot-laners' resource gains and their damage to enemy champions. This also raises an interesting question: Does gold spending (the use of resource gain) in other roles similarly contribute to dealing damage to enemies? Let's compare the damage dealt to enemy champions by each role per gold they spent.

<iframe
  src="assets/roles_dtc_boxes.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

As we can see, mid-laners and bot-laners typically deal the most damage to champions by utilizing the resources they gain, primarily gold. Junglers and supports, on the other hand, focus more on supporting their teammates by facilitating resource gains and disrupting opponents, often sacrificing their own damage output. This difference in roles is reflected in the plot.

For top-laners, their damage to champions per gold spent is slightly lower than that of bot-laners and mid-laners. This could be due to the fact that top-laners are usually the strongest champions (both offensively and defensively) at the start of the game, although there are exceptions depending on specific champions. As the game progresses, bot-laners and mid-laners become stronger through acquiring more items from the resources they gain, leading to them dealing much more damage during late-game combat. Additionally, top-laners often transition into 'tankers,' who absorb damage from enemy champions. Let's see if our data reflects this pattern in League of Legends games by observing the trend of damage dealt by top-laners, mid-laners, and bot-laners as the game length increases.

#### Top, mid, bot-laners' damage to champions by game length

<iframe
  src="assets/roles_gl_lines.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

It is observed that, on average, bot-laners relatively deal more damage to champions as the game progresses. While the data doesn't reflect our initial expectations regarding top-laners' early game damage, it does show that bot-laners and mid-laners are the roles that deal the most damage to champions in the late game. This aligns with the typical roles of these positions as the primary damage dealers or "carries" of a team. We will revisit the analysis of the carrying potential of bot-laners and mid-laners in the hypothesis testing section.

## Assessment of Missingness

For the purpose of later analysis and prediction of game outcomes, we will include the following nominal columns: `firstblood`, `firstdragon`, `firstbaron`, `firsttower`, `firsttothreetowers`.

| Column             |   Number of Missing Values |
|:-------------------|---------------------------:|
| firsttothreetowers |                     127778 |
| firsttower         |                     127778 |
| firstbaron         |                     127778 |
| firstdragon        |                     127778 |
| dragons            |                     124140 |
| towers             |                     124140 |

We can see that there are columns with identical number of missingness (e.g. firstdragon, firstbaron), we will analyze the missingness in these columns since they might have the same missingness mechanism. 

Here is one instance of a game in our full dataset:

| gameid                | position   | side   |   firstdragon |   firstbaron |   firsttower |   firsttothreetowers |
|:----------------------|:-----------|:-------|--------------:|-------------:|-------------:|---------------------:|
| ESPORTSTMNT01_2690210 | top        | Blue   |           nan |          nan |          nan |                  nan |
| ESPORTSTMNT01_2690210 | jng        | Blue   |           nan |          nan |          nan |                  nan |
| ESPORTSTMNT01_2690210 | mid        | Blue   |           nan |          nan |          nan |                  nan |
| ESPORTSTMNT01_2690210 | bot        | Blue   |           nan |          nan |          nan |                  nan |
| ESPORTSTMNT01_2690210 | sup        | Blue   |           nan |          nan |          nan |                  nan |
| ESPORTSTMNT01_2690210 | top        | Red    |           nan |          nan |          nan |                  nan |
| ESPORTSTMNT01_2690210 | jng        | Red    |           nan |          nan |          nan |                  nan |
| ESPORTSTMNT01_2690210 | mid        | Red    |           nan |          nan |          nan |                  nan |
| ESPORTSTMNT01_2690210 | bot        | Red    |           nan |          nan |          nan |                  nan |
| ESPORTSTMNT01_2690210 | sup        | Red    |           nan |          nan |          nan |                  nan |
| ESPORTSTMNT01_2690210 | team       | Blue   |             0 |            0 |            1 |                    1 |
| ESPORTSTMNT01_2690210 | team       | Red    |             1 |            0 |            0 |                    0 |

It appears that if we focus solely on rows where the position column does not contain the value team, the missingness in these `first...` columns (i.e. firstdragon, firstbaron, etc.) is by design (MD). This is because we can infer from the position column whether there are missing values in these columns.

However, when the position column value is team, we cannot determine if there is a missing value in these `first...` columns. Therefore, we need to carefully analyze these rows by separating them from the full dataset, similar to how we analyzed game measurements in the previous section.

**Addressing Missingness in `first...` Columns in Game Rows**

For the analysis of missingness in the `first...` columns only for rows where position is team, we will treat the DataFrame containing only these team rows as a separate dataset. Although the `first...` columns in the raw DataFrame contain a mix of individual role data and team data, they exhibit different missingness mechanisms when considered separately (as we have already verified the missingness mechanism of `first...` columns for individual role data as MD). This section will focus on analyzing the missingness mechanism for `first...` columns of team data alone.

After filtering our all the role rows, we discover that the number of games with missing values (1819 games, which corresponds to 1819 * 2 = 3638 rows in the DataFrame) matches the number of missing values in each of the `first...` columns (3638 values), the missingness in these columns occurs in the same instances. Therefore, we can analyze and draw conclusions about them collectively.

It appears that game rows with missing `first...` columns are related to the values in the `datacompleteness` column. Upon, examine values in `datacompleteness` and values in the `first...` columns, it is apparent that all the missing values occur in rows where `datacompleteness` is `partial`. 

|      | datacompleteness   | is_missing   |
|-----:|:-------------------|:-------------|
|    0 | partial            | True         |
|    1 | partial            | True         |
|    2 | partial            | True         |
|    3 | partial            | True         |

However, this alone does not indicate a Missing by Design (MD) mechanism, as there are `partial` `completeness` rows that do not have missing values in these `first...` columns. Nevertheless, this observation prompts us to conduct a permutation test on the categorical distribution of the datacompleteness column for missing and non-missing values in the `first...` columns. The outcome of the test could suggest a Missing at Random (MAR) mechanism for the missingness.

**Permutation test for verifying MAR of first... columns**
<iframe
  src="assets/mar_hist_dep.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

The p-value of the is less than 0.001. As the p-value of the test is extremely small, it's evident that the missing rows in the `first...` columns have a distribution distinct from that of the non-missing rows, as indicated by the values in `datacompleteness`. Therefore, since the missingness in `first...` columns depends on `datacompleteness`, their missing mechanism is Missing at Random (MAR).

## Hypothesis Testing
Through exploring the data, we have found that mid-laners and bot-laners generally do the most damage to champions per gold spent. This observation inspired a key question: Which role, mid-laners or bot-laners, contributes more damage overall when carrying their team? Let's explore this question further.

To answer this, we need to define what it means to 'carry' and determine the appropriate metric for measuring how much a role carries their team.

**Defining 'Carry'**: In this context, a 'carry' is defined as the role that deals the most damage on their team in a game. This damage includes all forms: damage to champions, minions/monsters, and structures, as each type of damage contributes significantly to the team's victory.

We focus on damage rather than kills because damage is a more direct measure of contribution to a team's success, whereas kills can be influenced by the specific champions being played (some champions can secure kills more easily than others).

**Metric**: We choose to use the amount of damage dealt per minute as our metric. Specifically, we look at cases where mid-laners or bot-laners deal the most damage for their team to measure how much damage they have dealt when they carry their team. We exclude data points where neither the bot-laner nor mid-laner deals the most overall damage, as the carrying role in these cases would be another position. These exclusions help avoid complications from unconventional picks, game strategies, or unusually short games.

Let's first visualize the observed distributions of Damage per Minute from mid-laners and bot-laners:

<iframe
  src="assets/hist_mid_bot.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

It appears that the average damage dealt by carry bot-laners is slightly greater than the average damage dealt by carry mid-laners. Let's perform a permutation test to formally determine if the average damage dealt by carry bot-laners is significantly greater.

Note: Since we only have two samples of damage distributions from carry bot-laners and carry mid-laners without any well-defined population distribution models, we choose to use a permutation test as the suitable method for this case.

Let's establish our hypotheses:

- **Null hypothesis**: The damage dealt by carry bot-laners and carry mid-laners comes from the same distribution.
- **Alternative hypothesis**: The damage dealt by carry bot-laners comes from a distribution that is greater than that of carry mid-laners.
- **Test statistic**: The difference in group means of damage per minute (bot-laners' mean Damage per Minute minus mid-laners' mean Damage per Minute).

<iframe
  src="assets/hypo_hist.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

Since p-value of the test is less than 0.001, which is very small, we reject the null hypothesis.

**Permutation Test Conclusion**: The test provided strong evidence that the mean damage dealt by carry bot-laners is significantly greater than that dealt by carry mid-laners. Therefore, we are more confident to believe that, in general, bot-laners deal more damage when carrying their team compared to mid-laners.

## Framing a Prediction Problem

As previously mentioned, our goal is to predict whether a team will win a game. We will develop a classifier that categorizes a team as 'win' or 'lose' based on their input features.

Importantly, our classifier aims to predict the outcome before the game's conclusion. Therefore, we will avoid using any features that can only be collected at the end of the game, such as total gold or the number of turrets destroyed. Although this means we cannot use some valuable features like total gold and damage per minute, which we identified as having strong patterns between winning and losing in earlier analyses, we can leverage in-game features that might correlate strongly with these end-game statistics. For example, gold at the 15-minute mark might have a strong linear relationship with total gold by the end of the game. We will investigate these in-game features to establish a baseline model in the next section.

Additionally, there are many potential nominal features that could be engineered to enhance our classifier, such as the champions picked or whether a team secured the first blood or first baron. We will explore these features in subsequent sections.

## Baseline Model

### Decide features

Since `totalgold` shows clear patterns between winning and losing, we will consider a team's `goldat10` and/or `goldat15` as the first feature(s) for our classifier. We observe that `goldat10` and `goldat15` exhibit the strongest correlations with `totalgold` (0.96) among in-game features. To establish a baseline model, we'll leverage these two quantitatice features as predictors in a `DecisionTreeClassifier`.

Our choice of `DecisionTreeClassifier` is informed by previous data exploration, which revealed distinct patterns in `totalgold` distribution across two classes of result (win and lose).

Additionally, we include `firstbaron` as a nominal feature for the classifier. Our prior analysis has showed that securing the first Baron significantly increases the likelihood of winning the game, making it a valuable feature for our baseline model.

To ensure generalization and hyperparameter tuning, we'll split the data into training and test sets and employ k-fold cross-validation. Specifically, we'll utilize `GridSearchCV` from `sklearn` to efficiently optimize the `max_depth` hyperparameter. Our evaluation metric will be accuracy score, which we'll use consistently throughout this analysis to assess the performance of subsequent models relative to this baseline.

### Train, evaluate the baseline model, next step

We have trained the model with a training set of 15892 data points, and tested it on a test set of 5298 data points. The training set accuracy is 0.69 and the test set accuracy is 0.68.

The baseline model's training accuracy indicates its suitability for prediction, as it significantly exceeds 0.5, outperforming random guessing in binary classification. The test accuracy, which closely mirrors the training accuracy, further suggests that the model generalizes well. As a result, we will use this model's design as a baseline for future improvements and set the test accuracy as the benchmark for evaluating subsequent enhancements.

## Final Model

### Prepare

To enhance our classifier, we need to engineer additional useful features. We will begin by incorporating more in-game features into our dataset. Additionally, to ensure the generalization of the final model, we will design and refine the model exclusively using the training set.

### Add pick and patch features, one-hot encode

The ban/pick stage is a crucial part of a game that can significantly impact a team's strategy and winning chances, especially in professional play. Professional players often specialize in one or two roles and have a set of champions they have mastered. Additionally, certain champions may be stronger or more suitable for the trending tactics of the current game version. Thus, it is highly advantageous if a professional player can pick one of their skilled champions, particularly if it is one of the season's "hot" picks.

Given this context, knowing a team's picks is undoubtedly a valuable predictor for game outcomes. Therefore, we will include picking and version information as predictive features for our classifier to learn these complexities.

Since both picked champions and patches (small version updates) are nominal, we plan to employ one-hot encoding for feature engineering. We recognize that some champion names may appear in the test set but not in the training set. For simplicity, we will set the `handle_unknown` parameter in `OneHotEncoder` to `'ignore'`.

Furthermore, we acknowledge that the model may not generalize well to predict results for games in other years, as game versions and "hot" picks change constantly. However, this approach can still provide a framework for building predictive models with other datasets.

After training, the model's train accuracy is 0.847 and the best hyperparameters are entropy criterion and tree's maximum depth of 4. Since the training accuracy shows a significant improvement from the baseline model, we will incorporate these new features into our final model.

### Add `first...` features

We are also incorporating "first-take-down" features (e.g., first blood, first dragon) into our model. We believe these features are useful as they provide information about a team's early game performance. While these features may not be as strong indicators as firstbaron (a mid-late game feature) for a team's winning chance, they still offer valuable insights into the dynamic relationship between early and late game performance that the model might be able to capture.

After training, the model's train accuracy is 0.852 and the best hyperparameters are entropy criterion and tree's maximum depth of 5. Adding these early game features improves the training accuracy by a noticeable amount. We also observe that the optimal maximum depth of our Decision Tree classifier increases by 1, indicating increased model complexity. This is unlikely to cause overfitting since the optimal maximum depth stops at 5 rather than continuing to increase.

### Decide a candidate for the final model

Since the improved model's training accuracy has increased significantly compared to the baseline model's test accuracy, the current model has learned to better capture the data's complexity and reduce bias. Therefore, we have decided to evaluate it on the test set to see if it can generalize to unseen data.

The test set accuracy of the current model is 0.836. Since the test accuracy is close to the training accuracy and reflects an improvement over the baseline model, we consider the current model a strong candidate for the final model.

### Experiment with `RandomForestClassifier`

To further improve the model, we decide to fit all the engineered features to a `RandomForestClassifier` to see if the accuracy increases. Our motivation is to determine if introducing randomness to our features, while using the same learning principles, can produce a better classifier. The idea is that ensemble learning from random subsets of the training data and engineered features might help in generalizing the model while also potentially improving the complexity of the learning to reduce the model's bias.

After training, the model's train accuracy is 0.873 and the best hyperparameters are gini criterion, number of estimators of 150 and tree's maximum depth of 15. This model has a test accuracy of 0.822. 

It is observed that although the training accuracy for this model is greater than that of our current best model, the test accuracy does not show any improvement. This contrasts with our goal of using the `RandomForestClassifier` to enhance generalization. Since employing the `RandomForestClassifier` not only fails to improve the classifier's performance but also increases the computational cost of training, we have decided to discard this model and continue using our final `DecisionTreeClassifier`.

### Finalize the final model

Since we are staying with our best model using the `DecisionTreeClassifier`, we will finalize it by fitting the entire dataset to the model and computing the final accuracy.

After training on the entire dataset, the final model's accuracy is 0.847.

## Fairness Analysis

### Identify groups

Upon fitting the entire dataset to our final model, a question arises about the fairness of our classifier: *Does our classifier perform better for teams/games in Tier 1 professional leagues than it does for teams/games in lower leagues?* This question stems from our intuition that our assumptions about game tactics and team behaviors when we built our model might be more accurate for professional players/teams in Tier 1 leagues than for those in lower leagues. It is possible that the tactics and players in Tier 1 leagues are more consistent than those in lower leagues. Although it is uncertain whether our model's performance might favor the Tier 1 group, it is reasonable to conduct a fairness analysis on these two groups.

To address this question, we will divide our dataset into two groups: one containing data from Tier 1 leagues and the other containing data from lower leagues. We will then use our final trained model to classify the results (win/lose) with the labeled groups and compute their accuracy scores, using the same metric we used to build the final model. Our goal is to conduct a statistical analysis to determine if our model performs fairly across both groups.

### Perform permutation test

As we already have the fairness-grouped data as well as the actual, predicted values, we are going to perform a permutation test using the **absolute difference in group accuracy scores** as the test statistic to see if our model's performance biases one group over the other. Here is the test's hypotheses:

- Null hypothesis: Our model is fair. Its accuracy for Tier 1 leagues and lower leagues are roughly the same, and any differences are due to random chance.
- Alternative Hypothesis: Our model is unfair. Its accuracy for Tier 1 leagues is different from its accuracy for lower leagues.

<iframe
  src="assets/fair_hist.html"
  width="800"
  height="600"
  frameborder="0"
></iframe>

The p-value is 0.96.

### Fairness analysis conclusion

As we failed to reject the null hypothesis with a p-value of 0.9, the permutation test provided a strong evident that the difference between the accuracy scores of our classifier for Tier 1 leagues and lower league groups is not significant. Thus we are confident that our classifier's performance is fair for both Tier 1 leagues and lower leagues groups.
