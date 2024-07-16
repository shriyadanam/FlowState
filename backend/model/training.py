import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestClassifier
from sklearn import metrics
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score, precision_score, recall_score, confusion_matrix
from sklearn.metrics import f1_score, classification_report
from sklearn.model_selection import train_test_split 
from sklearn.model_selection import cross_val_score 
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import learning_curve
from sklearn.utils import shuffle
import joblib

# duration,protocol_type,service,flag,src_bytes,dst_bytes,land,wrong_fragment,urgent,hot,num_failed_logins,logged_in,num_compromised,root_shell,su_attempted,num_root,num_file_creations,num_shells,num_access_files,num_outbound_cmds,is_host_login,is_guest_login,count,srv_count,serror_rate,srv_serror_rate,rerror_rate,srv_rerror_rate,same_srv_rate,diff_srv_rate,srv_diff_host_rate,dst_host_count,dst_host_srv_count,dst_host_same_srv_rate,dst_host_diff_srv_rate,dst_host_same_src_port_rate,dst_host_srv_diff_host_rate,dst_host_serror_rate,dst_host_srv_serror_rate,dst_host_rerror_rate,dst_host_srv_rerror_rate,attack

def main():
    filename = "../data/network_dataset.csv"
    data = pd.read_csv(filename)
    
    label_encoder = LabelEncoder()
    data['service'] = label_encoder.fit_transform(data['service'])

    X = data[['duration', 'src_bytes', 'num_file_creations', 'num_shells', 'service', 'num_failed_logins']]
    y = data['attack']

    # Count occurrences of each class
    class_counts = y.value_counts()
    print(class_counts)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=.2, train_size=.8, shuffle=True, stratify=y)
    
    class_counts = X_train.value_counts()
    print("X train counts", class_counts)

    class_counts = X_test.value_counts()
    print("X test counts", class_counts)

    class_counts = y_train.value_counts()
    print("Y train counts", class_counts)

    class_counts = y_test.value_counts()
    print("Y test counts", class_counts)


    rf = RandomForestClassifier()
    rf.fit(X_train, y_train)
    y_pred = rf.predict(X_test)
    
    model_filename = 'random_forest_model.pkl'
    joblib.dump(rf, model_filename)

    label_encoder_filename = 'label_encoder.pkl'
    joblib.dump(label_encoder, label_encoder_filename)

    test(rf, y_test, y_pred, X_train, y_train)


def test(rf, y_test, y_pred, X_train, y_train):
    accuracy = accuracy_score(y_test, y_pred)
    print("Accuracy:", accuracy)

    f1 = f1_score(y_test, y_pred, average='weighted')
    print("F1 Score:", f1)

    report = classification_report(y_test, y_pred)
    print("Classification Report:\n", report)

    scores = cross_val_score(rf, X_train, y_train, cv=5)  # 5-fold cross-validation
    print("Cross-validation scores:", scores)
    print("Mean cross-validation score:", scores.mean())
    

if __name__ == "__main__":
    main()