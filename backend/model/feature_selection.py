import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestClassifier
from sklearn import metrics
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score, precision_score, recall_score, confusion_matrix
from sklearn.model_selection import train_test_split 
from sklearn.model_selection import cross_val_score 
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import learning_curve
from sklearn.utils import shuffle
from sklearn.ensemble import RandomForestClassifier

np.random.seed(445)
    
# duration,protocol_type,service,flag,src_bytes,dst_bytes,land,wrong_fragment,urgent,hot,num_failed_logins,logged_in,num_compromised,root_shell,su_attempted,num_root,num_file_creations,num_shells,num_access_files,num_outbound_cmds,is_host_login,is_guest_login,count,srv_count,serror_rate,srv_serror_rate,rerror_rate,srv_rerror_rate,same_srv_rate,diff_srv_rate,srv_diff_host_rate,dst_host_count,dst_host_srv_count,dst_host_same_srv_rate,dst_host_diff_srv_rate,dst_host_same_src_port_rate,dst_host_srv_diff_host_rate,dst_host_serror_rate,dst_host_srv_serror_rate,dst_host_rerror_rate,dst_host_srv_rerror_rate,attack

def main():
    filename = "data/network_dataset.csv"
    data = pd.read_csv(filename)
    data['service'] = LabelEncoder().fit_transform(data['service'])
    data['protocol_type'] = LabelEncoder().fit_transform(data['protocol_type'])
    data['flag'] = LabelEncoder().fit_transform(data['flag'])
    data['service'] = LabelEncoder().fit_transform(data['service'])

    X = data[['duration', 'protocol_type', 'service', 'flag', 'src_bytes', 'dst_bytes', 'land', 'wrong_fragment', 'urgent', 'hot',
    'num_failed_logins', 'logged_in', 'num_compromised','root_shell','su_attempted','num_root','num_file_creations','num_shells',
    'num_access_files','num_outbound_cmds','is_host_login','is_guest_login','count','srv_count','serror_rate','srv_serror_rate',
    'rerror_rate','srv_rerror_rate','same_srv_rate','diff_srv_rate','srv_diff_host_rate','dst_host_count','dst_host_srv_count',
    'dst_host_same_srv_rate','dst_host_diff_srv_rate','dst_host_same_src_port_rate','dst_host_srv_diff_host_rate','dst_host_serror_rate',
    'dst_host_srv_serror_rate','dst_host_rerror_rate','dst_host_srv_rerror_rate']]
    y = data['attack']
  
        
    X, y = shuffle(X, y, random_state=42)

    # Count occurrences of each class
    class_counts = y.value_counts()
    print(class_counts)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=.3, train_size=.7, shuffle=True, random_state=42, stratify=y)
    

    print("before rf")

    rf = RandomForestClassifier()
    rf.fit(X_train, y_train)

    importances = rf.feature_importances_
    features = X.columns
    importance_df = pd.DataFrame({'Feature': features, 'Importance': importances})
    importance_df = importance_df.sort_values(by='Importance', ascending=False)
    print(importance_df)

    # y_pred = rf.predict(X_test)
    # accuracy = accuracy_score(y_test, y_pred)
    # f1 = f1_score(y_test, y_pred)
    # print("Accuracy:", accuracy)
    # print("F1 Score:", f1)

    


if __name__ == "__main__":
    main()