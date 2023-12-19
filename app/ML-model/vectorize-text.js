import natural from "natural";
import stopword from "stopword";
import _ from "lodash";

const transformText = (text) => {
  // Convert to lowercase
  text = text.toLowerCase();

  // Tokenize the text
  const tokens = text.split(/\s+/);

  // Remove non-alphanumeric characters
  const alphanumericTokens = tokens.filter((token) => token.match(/^\w+$/));

  // Remove stopwords and punctuation
  const filteredTokens = stopword.removeStopwords(alphanumericTokens);

  // Perform stemming
  const stemmedTokens = filteredTokens.map((token) =>
    natural.PorterStemmer.stem(token)
  );

  // Join the tokens back into a string
  return stemmedTokens.join(" ");
};

export { transformText };
