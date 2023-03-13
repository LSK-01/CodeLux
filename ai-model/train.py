# Load libraries
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split # Import train_test_split function
from sklearn import metrics #Import scikit-learn metrics module for accuracy calculation
import matplotlib.pyplot as plt

data = pd.read_csv("projects.csv")

# Split dataset in features and target variable
feature_cols = ['budget', 'customer_contact_frequency', 'customer_satisfaction', 'team_satisfaction', 'team_confidence', 'training', 'code_analysis', 'num_commits', 'commit_sentiment']
X = data[feature_cols] # features
y = data.success # Target varaible

# Split dataset into training set and test set
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1) # 80% training and 20% test

# Create and train classifier
# Random forest
rf = RandomForestClassifier(n_estimators=2171, min_samples_split = 2, min_samples_leaf = 1, max_depth=200, criterion = 'gini', bootstrap = True, random_state=42)
rf = rf.fit(X_train, y_train)

# Predict the response for test dataset
y_pred_rf = rf.predict(X_test)

# Model Accuracy, how often is the classifier correct?
# Model score on train data vs test data
print('Train Accuracy', rf.score(X_train, y_train))
print('Test Accuracy', rf.score(X_test, y_test))

# Calculate feature importance using Gini importance
print(pd.DataFrame(rf.feature_importances_, index=X_train.columns).sort_values(by=0, ascending=False))

# Save classifier to disk
with open('rf.pkl', 'wb') as k:
    pickle.dump(rf, k)