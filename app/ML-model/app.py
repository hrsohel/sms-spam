import subprocess
subprocess.run(["pip", "install", "--upgrade", "pip"])
subprocess.run(["pip", "install", "nltk"])
subprocess.run(["pip", "install", "scikit-learn"])
import sys
import nltk
from nltk.corpus import stopwords
import string
from nltk.stem import PorterStemmer
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer


arguements = sys.argv[1:]
folder = "".join(arguements[0])
text_input = "".join(arguements[1])
ps = PorterStemmer()
model = pickle.load(open(folder + "/model.pkl", 'rb'))
vector = pickle.load(open(folder + "/vectorizer.pkl", 'rb'))

def transform_text(text):
    text = text.lower()
    text = nltk.word_tokenize(text)
    y = []
    for i in text:
        if i.isalnum():
            y.append(i)
    text = y[:]
    y.clear()
    for i in text:
        if i not in stopwords.words('english') and i not in string.punctuation:
            y.append(i)
    text = y[:]
    y.clear()
    for i in text:
        y.append(ps.stem(i))
    return " ".join(y)

transformed_text = transform_text(text_input)
vector_input = vector.transform([transformed_text])
result = model.predict(vector_input)[0]
print(result)