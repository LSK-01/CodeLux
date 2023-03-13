import numpy as np
import pandas as pd

# Define the number of samples to generate
num_samples = 100000

# Define the ranges for each input metric
budget_range = [10000, 5000000]
num_commits_range = [0, 10000]
code_analysis_range = [0.0, 1.0]
training_range = [0.0, 6.0]
team_satisfaction_range = [0.0, 6.0]
team_confidence_range = [0.0, 6.0]
customer_satisfaction_range = [0.0, 6.0]
customer_contact_frequency_range = [0.0, 6.0]
commit_sentiment_range = [-1.0, 1.0]

# Generate synthetic data
budget = np.random.uniform(low=budget_range[0], high=budget_range[1], size=num_samples)
num_commits = np.random.randint(low=num_commits_range[0], high=num_commits_range[1], size=num_samples)
code_analysis = np.random.uniform(low=code_analysis_range[0], high=code_analysis_range[1], size=num_samples)
training = np.random.uniform(low=training_range[0], high=training_range[1], size=num_samples)
team_satisfaction = np.random.uniform(low=team_satisfaction_range[0], high=team_satisfaction_range[1], size=num_samples)
team_confidence = np.random.uniform(low=team_confidence_range[0], high=team_confidence_range[1], size=num_samples)
customer_satisfaction = np.random.uniform(low=customer_satisfaction_range[0], high=customer_satisfaction_range[1], size=num_samples)
customer_contact_frequency = np.random.uniform(low=customer_contact_frequency_range[0], high=customer_contact_frequency_range[1], size=num_samples)
commit_sentiment = np.random.uniform(low=commit_sentiment_range[0], high=commit_sentiment_range[1], size=num_samples)
# Combine the input metrics into a dataframe
data = pd.DataFrame({
    # Management causal factors (accounts for 65%)
    'budget': budget,
    'customer_contact_frequency': customer_contact_frequency,
    'customer_satisfaction': customer_satisfaction,
    'team_satisfaction': team_satisfaction,
    'team_confidence': team_confidence,
    # Technical causal factors (accounts for 35%)
    'training': training,
    'code_analysis': code_analysis,
    'num_commits': num_commits,
    'commit_sentiment': commit_sentiment
})

def generate_target_variable(df):
    # Define the weights for each metric
    weights = {
        # Management causal factors (accounts for 65%)
        'budget': 0.2,
        'customer_contact_frequency': 0.15,
        'customer_satisfaction': 0.1,
        'team_satisfaction': 0.075,
        'team_confidence': 0.075,
        'commit_sentiment': 0.05,
        # Technical causal factors (accounts for 35%)
        'training': 0.2,
        'code_analysis': 0.15,
        'num_commits': 0.05
    }

    def weighted_row_sum(row):
        sum = 0
        for col, weight in weights.items():
            sum += weight * row[col]
        return sum

    def scale_value(value):
        return (value + 1) / 2

    # Normalize dataframe with min-max
    norm_df = df.copy(deep=True)
    norm_df['commit_sentiment'] = norm_df['commit_sentiment'].apply(scale_value)
    print(norm_df.head())
    norm_df = (df-df.min())/(df.max()-df.min())
    
    # Calculate the weighted sum of the input metrics
    norm_df['success_coef'] = norm_df.apply(weighted_row_sum, axis = 1)

    # Define the threshold to classify a project as a success or failure
    threshold = 0.5

    # Define the target variable based on the threshold
    norm_df['success'] = norm_df['success_coef'].apply(lambda x: 1 if x > threshold else 0)

    # Append the target variable to the original dataframe
    df['success_coef'] = norm_df['success_coef']
    df['success'] = norm_df['success']

    return df

# Print the first 5 rows of the data
#print(data.head())
data = generate_target_variable(data)
#print(data.head())

# saving the dataframe
data.to_csv('projects.csv')