from collections import Counter
import random

reader = open('lib/db/lyrics/celine-sous-le-vent.txt')
counter = Counter()
successor_map = {}
window = []

for line in reader:
  for word in line.split():
    clean_word = word.strip('.;,-“’”:?—‘!()_').lower()
    counter[clean_word] += 1
    window.append(clean_word)
  
    if len(window) == 2:
      if window[0] not in successor_map:
        successor_map[window[0]] = [window[1]]
      else:
        successor_map[window[0]].append(window[1])
      window.pop(0)

# print(counter)
word = 'si'
for i in range(20):
  print(word, end=' ')
  word = random.choice(successor_map[word])