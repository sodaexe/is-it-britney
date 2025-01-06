import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
from torch.utils.data import DataLoader, TensorDataset
from sklearn.metrics import accuracy_score
import numpy as np

def train_model(train_texts, train_labels, num_epochs, batch_size=16):
    # Initialisation
    tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
    model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=2)
    
    # Tokenization
    encodings = tokenizer(train_texts, truncation=True, padding=True, max_length=128)
    input_ids = torch.tensor(encodings['input_ids'])
    attention_mask = torch.tensor(encodings['attention_mask'])
    labels = torch.tensor(train_labels)
    
    # Dataset et DataLoader
    dataset = TensorDataset(input_ids, attention_mask, labels)
    loader = DataLoader(dataset, batch_size=batch_size, shuffle=True)
    
    # Optimiseur
    optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)
    
    # Boucle d'entraînement
    accuracies = []
    for epoch in range(num_epochs):
        model.train()
        epoch_loss = 0
        for batch in loader:
            optimizer.zero_grad()
            input_ids, attention_mask, labels = batch
            outputs = model(input_ids, attention_mask=attention_mask, labels=labels)
            loss = outputs.loss
            loss.backward()
            optimizer.step()
            epoch_loss += loss.item()
            
        # Évaluation
        model.eval()
        predictions = []
        actual_labels = []
        with torch.no_grad():
            for batch in loader:
                input_ids, attention_mask, labels = batch
                outputs = model(input_ids, attention_mask=attention_mask)
                preds = torch.argmax(outputs.logits, dim=1)
                predictions.extend(preds.cpu().numpy())
                actual_labels.extend(labels.cpu().numpy())
        
        accuracy = accuracy_score(actual_labels, predictions)
        accuracies.append(accuracy)
        print(f"Epoch {epoch+1}/{num_epochs} - Loss: {epoch_loss/len(loader):.4f} - Accuracy: {accuracy:.4f}")
    
    return model, accuracies

# Exemple d'utilisation
texts = ["This is positive", "This is negative", "Great movie!", "Terrible experience"]
labels = [1, 0, 1, 0]

# Tester différents nombres d'époques
epochs_to_test = [3, 5, 10]
for epochs in epochs_to_test:
    print(f"\nEntraînement avec {epochs} époques:")
    model, accuracies = train_model(texts, labels, epochs)
    print(f"Accuracies par époque: {accuracies}")