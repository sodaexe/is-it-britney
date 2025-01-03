from collections import Counter
import random

reader = open('lib/db/extrait-sherlock.txt')
counter = Counter()
successor_map = {}
window = []


def trigram():
  for line in reader:
    for word in line.split():
      clean_word = word.strip('.;,-“’”:?—‘!()_').lower()
      counter[clean_word] += 1
      window.append(clean_word)
    
      if len(window) == 3:
        key = tuple([window[0], window[1]])
        value = window[2]
        if key not in successor_map:
          successor_map[key] = [value]
        else:
          successor_map[key].append(value)
        window.pop(0)

  print(counter)

  word1 = 'en'
  word2 = 'ce'
  for i in range(30):
    print(word1, end=' ')
    word3 = random.choice(successor_map[(word1, word2)])
    word1, word2 = word2, word3


trigram()