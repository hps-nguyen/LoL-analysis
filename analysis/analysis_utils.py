"""
Functions to get the data of interest
"""
import pandas as pd
import numpy as np

import plotly.express as px
pd.options.plotting.backend = 'plotly'



def get_game_rows(raw):
    """
    Takes in the raw DataFrame and returns a DataFrame
    containing 2 rows for every game, each row contains
    the data of Blue or Red team in that game
    """
    if 'position' in raw.columns:
        game = raw[raw['position'] == 'team']
    else:
        game = raw[raw['playername'].isna()]
    return game

def get_player_rows(raw):
    """
    Takes in the raw DataFrame and returns a DataFrame
    containing 10 rows for every game, each row contains
    the data of a player in that game
    """
    player = raw[~raw['playername'].isna()]
    return player

def get_tier_one(df):
    """
    Returns a DataFrame of only games within tier-one leagues,
    each game has 12 rows (10 player-rows 2 game-rows)
    """
    return df[df['league']
              .isin(['LCK', 'LPL',
                     'LEC', 'LCS',
                     'PCS', 'VCS',
                     'CBLOL', 'LLA'])]

def plot_wl_hist(game_df, col):
    """
    Shows histograms of win teams' and defeat teams'
    measurement in a column game_df
    """
    win_df = game_df[game_df['result']].drop(['result'], axis=1)
    defeat_df = game_df[~game_df['result']].drop(['result'], axis=1)

    def win_defeat_distr(win_df, defeat_df, col):
        df = (win_df[['gameid', col]]
            .merge(defeat_df[['gameid', col]], on='gameid')
            .set_index('gameid'))
        df.columns = [f'{col}_win', f'{col}_defeat']
        return df
    
    fig = px.histogram(
        win_defeat_distr(win_df, defeat_df, col),
        x=[f'{col}_win', f'{col}_defeat'],
        histnorm='probability',
        nbins=100,
        opacity=0.7,
        color_discrete_sequence=['#3288bd', '#d53e4f'],
        barmode='group',
        title=f'Distribution of {col} for Winning and Losing Teams',
    )
    
    fig.update_traces(
        name='Win',
        legendgroup='Win',
        selector=dict(name=f'{col}_win')
    )
    fig.update_traces(
        name='Lose',
        legendgroup='Lose',
        selector=dict(name=f'{col}_defeat')
    )
    fig.update_layout(
        legend_title="Team",
        xaxis_title=col,
        yaxis_title="Probability"
    )

    fig.show()

def get_position_stats(raw, position, stats=None):
    """
    Returns a DataFrame containing the rows of a specified position
    and columns specified as a list passed to `stats`
    """
    if stats is None:
        stats = raw.columns.drop(['gameid', 'result'])
        df = raw[raw['position'] == position]
    else:
        df = raw[raw['position'] == position][['gameid', 'result'] + stats]
    rename = {stat: f'{position}_{stat}' for stat in stats}
    return df.rename(columns=rename)
