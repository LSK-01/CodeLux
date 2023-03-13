from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import RandomizedSearchCV
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split # Import train_test_split function
import pandas as pd
from sklearn.metrics import accuracy_score

data = pd.read_csv("projects.csv")

# Split dataset in features and target variable
feature_cols = ['budget', 'customer_contact_frequency', 'customer_satisfaction', 'team_satisfaction', 'team_confidence', 'training', 'code_analysis', 'num_commits', 'commit_sentiment']
X = data[feature_cols] # features
y = data.success # Target varaible

# Split dataset into training set and test set
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42) # 80% training and 20% test

# Number of estimators in forest
n_estimators = np.linspace(100, 3000, int((3000-100)/200) + 1, dtype=int)
# Number of features to consider at every split
max_features = ['auto', 'sqrt']
# Max depth per estimator
max_depth = [1, 5, 10, 20, 50, 75, 100, 150, 200]
# Minimum number of samples required to split a node
min_samples_split = [1, 2, 5, 10, 15, 20, 30]
# Minimum number of samples required at each leaf node
min_samples_leaf = [1, 2, 3, 4]
# Method of selecting samples for training each tree
bootstrap = [True, False]
# Criterion
criterion=['gini', 'entropy']
random_grid = {'n_estimators': n_estimators,
               'max_features': max_features,
               'max_depth': max_depth,
               'min_samples_split': min_samples_split,
               'min_samples_leaf': min_samples_leaf,
               'bootstrap': bootstrap,
               'criterion': criterion}

rf_base = RandomForestClassifier()
rf_rand = RandomizedSearchCV(estimator = rf_base,
                               param_distributions = random_grid,
                               n_iter = 30, cv = 5,
                               verbose=2,
                               random_state=42, n_jobs = 4)

rf_rand.fit(X_train, y_train)

print(rf_rand.best_params_)

print (rf_rand.score(X_train, y_train))
print(rf_rand.score(X_test, y_test))

