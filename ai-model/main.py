import os
from flask import Flask, jsonify, request
import pickle
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn import metrics, tree
from transformers import pipeline, DistilBertTokenizerFast, DistilBertForSequenceClassification


app = Flask(__name__)

# Load fitted model
# Random forest
with open('rf.pkl', 'rb') as k:
    rf = pickle.load(k)

# Interprets a random forest
def interpret_random_forest(X, rf):

    feature_cols = ['budget', 'customer_contact_frequency', 'customer_satisfaction', 'team_satisfaction', 'team_confidence', 'training', 'code_analysis', 'num_commits', 'commit_sentiment']
    
    # Predict the class for the input row
    pred_class = rf.predict(X)[0]

    # Get the trees used in the random forest
    trees = rf.estimators_

    # Extract the features used in each tree's decision path for the input row
    features = []
    for tree in trees:
        path = tree.decision_path(X)
        for node_id in path.indices:
            if tree.tree_.feature[node_id] != -2:
                features.append(feature_cols[tree.tree_.feature[node_id]])

    # Calculate the feature importances based on the features used in the decision paths
    feature_importances = pd.Series(features).value_counts(normalize=True)

    return pred_class, feature_importances

@app.route('/classify', methods=['POST'])
def classify():

    # get the inputs from the request
    inputs = request.json.get('metrics')
    inputs = [[inputs['budget'], inputs['customer_contact_frequency'], inputs['customer_satisfaction'], inputs['team_satisfaction'], 
               inputs['team_confidence'], inputs['training'], inputs['code_analysis'], inputs['num_commits'], inputs['commit_sentiment']]]
    
    # classify the data
    classification = rf.predict_proba(inputs)[0]

    # find the suggested metrics
    pred_class, features = interpret_random_forest(inputs, rf)

    print("Predicted class:", pred_class)
    print("Features:", features)

    # return the classification as JSON
    return jsonify({'classification': classification.tolist(), 'predicted_class': pred_class.tolist(), 'features': features.to_dict()})

@app.route('/retrain', methods=['POST'])
def retrain():
    # get the inputs from the request
    inputs = request.json.get('metrics')
    inputData = pd.DataFrame({
    'budget': inputs['budget'],
    'customer_contact_frequency': inputs['customer_contact_frequency'],
    'customer_satisfaction': inputs['customer_satisfaction'],
    'team_satisfaction': inputs['team_satisfaction'],
    'team_confidence': inputs['team_confidence'],
    'training': inputs['training'],
    'code_analysis': inputs['code_analysis'],
    'num_commits': inputs['num_commits'],
    'success': inputs['success'],
    'commit_sentiment': inputs['commit_sentiment']
    })

    data = pd.read_csv("projects.csv")
    data = data.append(inputData)

    # Split dataset in features and target variable
    feature_cols = ['budget', 'customer_contact_frequency', 'customer_satisfaction', 'team_satisfaction', 'team_confidence', 'training', 'code_analysis', 'num_commits', 'commit_sentiment']
    X = data[feature_cols] # features
    y = data.success # Target varaible

    # Split dataset into training set and test set
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1) # 80% training and 20% test

    # Create and re-train classifier
    # Random forest
    rf = RandomForestClassifier(max_depth=5, random_state = 1)
    rf = rf.fit(X_train, y_train)

    # Model Accuracy, how often is the classifier correct?
    # Predict the response for test dataset
    y_pred_rf = rf.predict(X_test)
    print("rf Accuracy:",metrics.accuracy_score(y_test, y_pred_rf))

    # Save classifier images
    with open('rf.pkl', 'wb') as k:
        pickle.dump(rf, k)

    # saving the dataframe
    data.to_csv('projects.csv')
    return jsonify({'success': True})

@app.route('/sentiment', methods=['POST'])
def sentiment():
    inputs = request.json.get('sentiment')

    tokenizer = DistilBertTokenizerFast.from_pretrained('distilbert-base-uncased-finetuned-sst-2-english')
    model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased-finetuned-sst-2-english', num_labels=2)

    classifier = pipeline('text-classification', model=model, tokenizer=tokenizer)

    scores = []
    for text in inputs:
        result = classifier(text, top_k=1)[0]
        score = result['score']
        label = result['label']
        if label == 'NEGATIVE':
            score = -score
        scores.append(score)

    average_sentiment = sum(scores) / len(scores)
    return jsonify({'average_sentiment': average_sentiment})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))