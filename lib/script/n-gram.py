from collections import Counter
import random

reader = open('lib/db/lyrics/celine-sous-le-vent.txt')
counter = Counter()
successor_map = {}
window = []


def bigram():
  for line in reader:
    for word in line.split():
      clean_word = word.strip('.;,-“’”:?—‘!()_').lower()
      counter[clean_word] += 1
      window.append(clean_word)
    
      if len(window) == 2:
        key = window[0]
        value = window[1]
        if key not in successor_map:
          successor_map[key] = [value]
        else:
          successor_map[key].append(value)
        window.pop(0)

  # print(counter)
  word = 'si'
  for i in range(20):
    print(word, end=' ')
    word = random.choice(successor_map[word])


bigram()